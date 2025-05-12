import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2';

const httpClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getPokemons = async (offset: number = 0, limit: number = 10) => {
  try {
    // TODO: Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await httpClient.get(`/pokemon?offset=${offset}&limit=${limit}`);
    if (response.data) {
      return response.data.results.map((pokemon: any) => ({
        name: pokemon.name,
        isFavorite: false,
      }));
    }
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    throw error;
  }
};

const getPokemonByName = async (name: string) => {
  try {
    const response = await httpClient.get(`/pokemon/${name}`);
    if (response.data) {
      return {
        name,
        isFavorite: false,
        weight: response.data.weight,
        height: response.data.height,
        types: response.data.types.map((type: any) => type.type.name),
        image: response.data.sprites.front_default,
      };
    }
  } catch (error) {
    throw error;
  }
};

export { getPokemons, getPokemonByName };
