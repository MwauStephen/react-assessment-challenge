"use client";

import { useEffect, useState } from "react";
import { getPokemonList, getPokemonByType } from "@/lib/api";
import ItemCard from "./ItemCard";
import Pagination from "../pagination/Pagination";
import SearchFilterSort from "../filter/SearchFilterSort";
import { useSearchParams } from "next/navigation";
import { applySearchAndSort } from "@/lib/utils";
import { useFavorites } from "@/hooks/useFavorites";

interface PokemonTypeResponse {
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
}

export default function ItemList() {
  const [data, setData] = useState<{ name: string; url: string }[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const searchParams = useSearchParams();
  const q = searchParams.get("q")?.toLowerCase() || "";
  const type = searchParams.get("type") || "";
  const sort = searchParams.get("sort") || "name_asc";
  const favoritesOnly = searchParams.get("favorites") === "true";

  const { favorites } = useFavorites();
  const limit = 20;

  const fetchData = (signal: AbortSignal) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        setError(null);
        setLoading(true);

        let results: { name: string; url: string }[] = [];

        if (type) {
          const res = await getPokemonByType(type, signal);
          results = res.pokemon.map((p: PokemonTypeResponse) => p.pokemon);
        } else {
          const offset = (page - 1) * limit;
          const res = await getPokemonList(limit, offset, signal);
          results = res.results;
          setCount(res.count);
        }

        // Filter favorites if active
        if (favoritesOnly) {
          results = results.filter((p) => {
            const id = p.url.split("/").filter(Boolean).pop();
            return favorites.has(String(id));
          });
        }

        // Apply search + sort
        const processed = applySearchAndSort(results, q, sort);

        // Update count after filtering
        setCount(processed.length);

        // Paginate locally
        const paginated = processed.slice((page - 1) * limit, page * limit);

        setData(paginated);
        resolve();
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error(err);
          setError("Failed to load Pokémon");
          reject(err);
        }
      } finally {
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, q, type, sort, favoritesOnly, favorites]);

  // Skeleton component
  const ItemCardSkeleton = () => (
    <div className="bg-white p-4 rounded-lg shadow animate-pulse">
      <div className="bg-gray-200 h-28 w-full rounded mb-4" />
      <div className="bg-gray-200 h-5 w-3/4 mx-auto rounded" />
    </div>
  );

  return (
    <div>
      <SearchFilterSort onChangePage={() => setPage(1)} />

      {/* Error state */}
      {error && (
        <div className="text-center my-6">
          <p className="text-red-500 mb-2">{error}</p>
          <button
            onClick={() => {
              const controller = new AbortController();
              fetchData(controller.signal);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      )}

      {/* Skeletons or real data */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: limit }).map((_, idx) => (
            <ItemCardSkeleton key={idx} />
          ))
          : data.map((pokemon) => {
            const id = pokemon.url.split("/").filter(Boolean).pop();
            return <ItemCard key={pokemon.name} id={id!} name={pokemon.name} />;
          })}
      </div>

      {/* Pagination */}
      {!loading && count > 0 && (
        <Pagination
          currentPage={page}
          totalItems={count}
          itemsPerPage={limit}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
