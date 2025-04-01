export async function dataFromPokemonApi() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        if (!response.ok) {
            throw new Error('Failed to fetch.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export interface Pokemon {
    name: string;
    type1: string | null;
    type2: string | null;
    height: number;
    weight: number;
    dexNumber: number;
    image: string | null;
    shinyImage: string | null;
    cry: string;
}

export class PokemonModel {
    constructor(public data: Pokemon) {}
}

export async function getPokemonData() {
    const pokemon: PokemonModel[] = [];
    const initialData = await dataFromPokemonApi();

    for (let i = 1; i <= 1025; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        if (!response.ok) {
            throw new Error('Failed to fetch.');
        }
        const data = await response.json();
        
        const newPokemon: Pokemon = {
            name: data.species?.name || null,
            type1: data.types[0]?.type?.name || null,
            type2: data.types[1]?.type?.name || null,
            height: data.height,
            weight: data.weight,
            dexNumber: data.id,
            image: data.sprites?.front_default || null,
            // image url: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
            shinyImage: data.sprites?.front_shiny || null,
            // shiny image url: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png
            cry: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${data.id}.ogg`
            // cry url: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg"
        };

        pokemon.push(new PokemonModel(newPokemon));
    }
    return pokemon;
}

// Automatically store the dataset with 1025 Pokémon by default
getPokemonData().then(pokemon => {
    // Store the dataset as needed, e.g., in a database or a file
    console.log('Fetched and stored 1025 Pokémon:', pokemon);
}).catch(error => {
    console.error('Error fetching Pokémon data:', error);
});