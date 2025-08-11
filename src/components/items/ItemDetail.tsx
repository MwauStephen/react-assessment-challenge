"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPokemonDetail, PokemonDetailResponse } from "@/lib/api";

export default function ItemDetail() {
  const { id } = useParams(); 
  const [pokemon, setPokemon] = useState<PokemonDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getPokemonDetail(id as string);
        setPokemon(data);
      } catch (err) {
        setError("Failed to fetch Pokémon details");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!pokemon) return <p>No Pokémon found</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-3xl font-bold capitalize mb-4">
        #{pokemon.id} {pokemon.name}
      </h1>

      <div className="flex justify-center mb-4">
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="h-48 w-48 object-contain"
        />
      </div>

      <div className="mb-4">
        <h2 className="font-semibold mb-2">Type(s)</h2>
        <div className="flex gap-2">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className="px-3 py-1 rounded-full bg-gray-200 capitalize"
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold mb-2">Abilities</h2>
        <ul className="list-disc list-inside capitalize">
          {pokemon.abilities.map((a) => (
            <li key={a.ability.name}>{a.ability.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="font-semibold mb-2">Stats</h2>
        {pokemon.stats.map((s) => (
          <div key={s.stat.name} className="mb-1">
            <span className="capitalize">{s.stat.name}:</span> {s.base_stat}
          </div>
        ))}
      </div>
    </div>
  );
}
