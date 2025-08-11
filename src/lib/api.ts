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
  base_experience:number
}

const BASE_URL = "https://pokeapi.co/api/v2";


export async function getPokemonList(
  limit = 20,
  offset = 0
): Promise<PokemonListResponse> {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch Pokémon list`);
  }
  return res.json();
}


export async function getPokemonDetail(
  id: string | number
): Promise<PokemonDetailResponse> {
  const res = await fetch(`${BASE_URL}/pokemon/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch Pokémon details`);
  }
  return res.json();
}
