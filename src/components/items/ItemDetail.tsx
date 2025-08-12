"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPokemonDetail, PokemonDetailResponse } from "@/lib/api";
import { useFavorites } from "@/hooks/useFavorites";
import Image from "next/image";

export default function ItemDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<PokemonDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [note, setNote] = useState("");
  const [validationError, setValidationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Favorites hook
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(id as string);

  useEffect(() => {
    if (!id) return;
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getPokemonDetail(id as string);
        setPokemon(data);

        // Load saved note
        const savedNotes = JSON.parse(localStorage.getItem("pokemonNotes") || "{}");
        if (savedNotes[id as string]) {
          setNote(savedNotes[id as string]);
        }
      } catch {
        setError("Failed to fetch Pokémon details");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleSaveNote = () => {
    if (note.trim().length < 3) {
      setValidationError("Note must be at least 3 characters long.");
      return;
    }
    if (note.length > 200) {
      setValidationError("Note must be less than 200 characters.");
      return;
    }

    setValidationError("");
    const savedNotes = JSON.parse(localStorage.getItem("pokemonNotes") || "{}");
    savedNotes[id as string] = note;
    localStorage.setItem("pokemonNotes", JSON.stringify(savedNotes));

    setSuccessMessage("Note saved successfully!");
    setTimeout(() => setSuccessMessage(""), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow animate-pulse">
        <div className="bg-gray-200 h-8 w-1/3 rounded mb-6" />
        <div className="bg-gray-200 h-64 w-full rounded mb-4" />
        <div className="space-y-2">
          <div className="bg-gray-200 h-4 w-3/4 rounded" />
          <div className="bg-gray-200 h-4 w-2/4 rounded" />
          <div className="bg-gray-200 h-4 w-full rounded" />
        </div>
      </div>
    );
  }

  if (error) return <p className="text-red-500">{error}</p>;
  if (!pokemon) return <p>No Pokémon found</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow relative">
      <button
        onClick={() => toggleFavorite(id as string)}
        aria-label={fav ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={fav}
        className={`absolute top-4 right-4 p-1 rounded-full focus:outline-none cursor-pointer
          ${fav ? "bg-yellow-50 hover:scale-105" : "bg-white hover:bg-gray-100"}`}
        title={fav ? "Remove from favorites" : "Add to favorites"}
      >
        <Image
          src={fav ? "/icons/star_filled.png" : "/icons/star_outline.png"}
          alt={fav ? "Favorited" : "Not favorited"}
          width={30}
          height={30}
          className="transition-transform duration-200"
        />
      </button>

      <h1 className="text-3xl font-bold capitalize mb-4">
        #{pokemon.id} {pokemon.name}
      </h1>

      <div className="flex justify-center mb-4">
        <Image
          width={500}
          height={500}
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="h-64 w-64 object-contain"
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
      {successMessage && <p className="text-green-600 mt-5">{successMessage}</p>}

      <div className="mt-6">
        <h2 className=" font-semibold mb-2">Add a personal note</h2>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="Write something about this Pokémon..."
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:border-gray-500"
        />
        {validationError && <p className="text-red-500 text-sm mt-1">{validationError}</p>}
        <button
          onClick={handleSaveNote}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Note
        </button>
      </div>
    </div>
  );
}
