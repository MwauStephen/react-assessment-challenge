import { PokemonListResult } from "./api";

export function applySearchAndSort(
  results: PokemonListResult[],
  q: string,
  sort: string
) {
  let filtered = results;

  // Search filter
  if (q) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(q)
    );
  }

  // Sorting
  filtered.sort((a, b) => {
    const idA = parseInt(a.url.split("/").filter(Boolean).pop() || "0");
    const idB = parseInt(b.url.split("/").filter(Boolean).pop() || "0");

    switch (sort) {
      case "name_asc":
        return a.name.localeCompare(b.name);
      case "name_desc":
        return b.name.localeCompare(a.name);
      case "id_asc":
        return idA - idB;
      case "id_desc":
        return idB - idA;
      default:
        return 0;
    }
  });

  return filtered;
}
