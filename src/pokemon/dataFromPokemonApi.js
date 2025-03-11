import fetch from 'node-fetch';

function dataFromPokemonApi() {
    let pokemon = [];

    for (i = 1; i <= 1025; i++){
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        pokemon[i]['name'] = (`https://pokeapi.co/api/v2/pokemon/${i}`)['species']['name'];
    }

}

export default dataFromPokemonApi;