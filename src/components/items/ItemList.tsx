"use client";

import { useEffect, useState } from "react";
import { getPokemonList, PokemonListResponse } from "@/lib/api";
import ItemCard from "./ItemCard";
import Pagination from "../pagination/Pagination";


export default function ItemList() {
  const [data, setData] = useState<PokemonListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const limit = 20;
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const offset = (page - 1) * limit;
        const res = await getPokemonList(limit, offset);
        setData(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [page]);

  return (
    <div>
      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {data?.results.map((pokemon) => {
          const id = pokemon.url.split("/").filter(Boolean).pop();
          return (
            <ItemCard
              key={pokemon.name}
              id={id!}
              name={pokemon.name}
            />
          );
        })}
      </div>

      {data && (
        <Pagination
          currentPage={page}
          totalItems={data.count}
          itemsPerPage={limit}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
