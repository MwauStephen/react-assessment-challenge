"use client";

import { useEffect, useState } from "react";

const FAVORITES_KEY = "favorites";

export function useFavorites(key = FAVORITES_KEY) {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const raw = localStorage.getItem(key);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  });

  // persist on change
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(Array.from(favorites)));
    } catch {
      console.error("Failed to save favorites to localStorage");
    }
  }, [favorites, key]);

  const isFavorite = (id: string | number) => favorites.has(String(id));

  const toggleFavorite = (id: string | number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      const sid = String(id);
      if (next.has(sid)) next.delete(sid);
      else next.add(sid);
      return next;
    });
  };

  const removeFavorite = (id: string | number) =>
    setFavorites((prev) => {
      const next = new Set(prev);
      next.delete(String(id));
      return next;
    });

  return { favorites, isFavorite, toggleFavorite, removeFavorite };
}
