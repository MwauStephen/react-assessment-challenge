export interface PokemonListResult {
  name: string;
  url: string;
}
export interface PokemonTypeResponse {
  results: { name: string; url: string }[];
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListResult[];
}

export interface PokemonDetailResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    other: {
      dream_world: { front_default: string };
      ["official-artwork"]: { front_default: string };
    };
  };
  types: { slot: number; type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  base_experience: number;
}

const BASE_URL = "https://pokeapi.co/api/v2";


export async function getPokemonList(
  limit = 20,
  offset = 0,
  signal?: AbortSignal
): Promise<PokemonListResponse> {
  const res = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
    { signal }
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch Pokémon list`);
  }
  return res.json();
}

export async function getPokemonDetail(
  id: string | number,
  signal?: AbortSignal
): Promise<PokemonDetailResponse> {
  const res = await fetch(`${BASE_URL}/pokemon/${id}`, { signal });
  if (!res.ok) {
    throw new Error(`Failed to fetch Pokémon details`);
  }
  return res.json();
}

export async function getPokemonTypes(signal?: AbortSignal): Promise<PokemonTypeResponse> {
  const res = await fetch(`${BASE_URL}/type`, { signal });
  if (!res.ok) {
    throw new Error(`Failed to fetch Pokémon types`);
  }
  return res.json();
}

export async function getPokemonByType(type: string, signal?: AbortSignal) {
  const res = await fetch(`${BASE_URL}/type/${type}`, { signal });
  if (!res.ok) {
    throw new Error(`Failed to fetch Pokémon by type`);
  }
  return res.json();
}
