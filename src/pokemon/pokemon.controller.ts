import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';

import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) {}

    @Post()
    async addPokemon(
        @Body('name') pokemonName: string,
        @Body('type1') pokemonType1: string,
        @Body('type2') pokemonType2: string,
        @Body('height') pokemonHeight: number,
        @Body('weight') pokemonWeight: number,
        @Body('dexNumber') pokemonDexNumber: number,
        @Body('image') pokemonImage: string,
        @Body('shinyImage') pokemonShinyImage: string,
        @Body('cry') pokemonCry: string,
    ) {
        const generatedId = await this.pokemonService.insertPokemon(
            pokemonName,
            pokemonType1,
            pokemonType2,
            pokemonHeight,
            pokemonWeight,
            pokemonDexNumber,
            pokemonImage,
            pokemonShinyImage,
            pokemonCry,
        );
        return { id: generatedId };
    }

    @Get()
    async getAllPokemon() { // get ALL Pokemon
        const pokemons = await this.pokemonService.getPokemon();
        return pokemons;
    }

    @Get(':id')
    getPokemon(@Param('id') pokemonId: string) {
        return this.pokemonService.getSinglePokemon(pokemonId);
    }

}
