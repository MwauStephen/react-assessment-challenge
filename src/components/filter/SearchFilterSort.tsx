"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { getPokemonTypes } from "@/lib/api";

interface Props {
  onChangePage?: () => void;
}

export default function SearchFilterSort({ onChangePage }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [selectedType, setSelectedType] = useState(searchParams.get("type") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "name_asc");
  const [favoritesOnly, setFavoritesOnly] = useState(searchParams.get("favorites") === "true");

  const [types, setTypes] = useState<string[]>([]);

  // Fetch Pokémon types
  useEffect(() => {
    getPokemonTypes()
      .then((res) => setTypes(res.results.map((t) => t.name)))
      .catch((err) => console.error(err));
  }, []);

  // Debounce + update URL
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams();
      if (search) params.set("q", search);
      if (selectedType) params.set("type", selectedType);
      if (sort) params.set("sort", sort);
      if (favoritesOnly) params.set("favorites", "true");

      router.push(`${pathname}?${params.toString()}`);
      onChangePage?.();
    }, 300);

    return () => clearTimeout(handler);
  }, [search, selectedType, sort, favoritesOnly]);

  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      {/* Search */}
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 outline-none focus:border-gray-600 px-3 py-2 rounded w-64"
      />

      {/* Type filter */}
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="border border-gray-300 outline-none focus:border-gray-600 px-3 py-2 rounded"
      >
        <option value="">All Types</option>
        {types.map((t) => (
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border border-gray-300 outline-none focus:border-gray-600 px-3 py-2 rounded"
      >
        <option value="name_asc">Name (asc)</option>
        <option value="name_desc">Name (desc)</option>
        <option value="id_asc">ID (asc)</option>
        <option value="id_desc">ID (desc)</option>
      </select>

      {/* Favorites filter */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={favoritesOnly}
          onChange={(e) => setFavoritesOnly(e.target.checked)}
          className="accent-yellow-500 w-4 h-4"
        />
        Favorites only
      </label>
    </div>
  );
}
