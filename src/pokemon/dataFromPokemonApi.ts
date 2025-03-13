
// function dataFromPokemonApi() { // outdated function from js
//     let pokemon = [];

    // for (i = 1; i <= 1025; i++){
    //     fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    //     pokemon[i]['name'] = (`https://pokeapi.co/api/v2/pokemon/${i}`)['species']['name'];
    // }

// }

async function dataFromPokemonApi() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        if (!response.ok) {
            throw new Error('Failed to fetch.');
        }
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

interface Pokemon {
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

class PokemonModel {
    constructor(public data: Pokemon) {}
}

async function getPokemonData() {
    const pokemon: PokemonModel[] = [];
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
            shinyImage: data.sprites?.front_shiny || null,
            cry: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${i}.ogg` // Assuming a URL pattern for Pokémon cries
        };

        pokemon.push(new PokemonModel(newPokemon));
    }
    return pokemon;
}