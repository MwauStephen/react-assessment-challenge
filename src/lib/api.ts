
export interface PokemonListResult {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListResult[];
}

const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(limit = 20, offset = 0): Promise<PokemonListResponse> {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch Pokémon list`);
  }

  return res.json();
}
