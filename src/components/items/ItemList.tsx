"use client";

import { useEffect, useState } from "react";
import { getPokemonList, getPokemonByType } from "@/lib/api";
import ItemCard from "./ItemCard";
import Pagination from "../pagination/Pagination";
import SearchFilterSort from "../filter/SearchFilterSort";
import { useSearchParams } from "next/navigation";
import { applySearchAndSort } from "@/lib/utils";

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
  const [page, setPage] = useState(1);

  const searchParams = useSearchParams();
  const q = searchParams.get("q")?.toLowerCase() || "";
  const type = searchParams.get("type") || "";
  const sort = searchParams.get("sort") || "name_asc";

  const limit = 20;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        let results: { name: string; url: string }[] = [];

        if (type) {
          const res = await getPokemonByType(type);
          results = res.pokemon.map((p: PokemonTypeResponse) => p.pokemon);
        } else {
          const offset = (page - 1) * limit;
          const res = await getPokemonList(limit, offset);
          results = res.results;
          setCount(res.count);
        }

        // Apply search + sort
        const processed = applySearchAndSort(results, q, sort);

        // For type filter, update count after filtering
        if (type) setCount(processed.length);

        // Paginate locally 
        const paginated = processed.slice((page - 1) * limit, page * limit);

        setData(paginated);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page, q, type, sort]);

  return (
    <div>
      <SearchFilterSort onChangePage={() => setPage(1)} />

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {data.map((pokemon) => {
          const id = pokemon.url.split("/").filter(Boolean).pop();
          return <ItemCard key={pokemon.name} id={id!} name={pokemon.name} />;
        })}
      </div>

      {count > 0 && (
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
