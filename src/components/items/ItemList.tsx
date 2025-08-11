"use client";

import { useEffect, useState } from "react";
import { getPokemonList, PokemonListResponse } from "@/lib/api";
import ItemCard from "./ItemCard";

export default function ItemList() {
  const [data, setData] = useState<PokemonListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null); 
        const res = await getPokemonList(20, 0);
        setData(res);
      } catch (err) {
        console.error(err);
        setError("Failed to load Pokémon list. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {data?.results.map((pokemon) => {
        const id = pokemon.url.split("/").filter(Boolean).pop();
        return <ItemCard key={pokemon.name} id={id!} name={pokemon.name} />;
        
      })}
    </div>
  );
}
