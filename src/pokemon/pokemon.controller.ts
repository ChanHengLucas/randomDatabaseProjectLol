import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) {}

    @Post('initialize')
    async initializePokemonData() {
        await this.pokemonService.checkAndInsertPokemonData();
        return { message: 'Pokémon data initialized successfully.' };
    }

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
    async getAllPokemon() {
        const pokemons = await this.pokemonService.getPokemon();
        return pokemons;
    }

    @Get(':id')
    async getPokemon(@Param('id') pokemonId: string) {
        const pokemon = await this.pokemonService.getSinglePokemon(pokemonId);
        return pokemon;
    }

    @Get('name/:name')
    async getPokemonByName(@Param('name') pokemonName: string) {
        const pokemon = await this.pokemonService.getPokemonByName(pokemonName);
        return pokemon;
    }

    @Patch(':id')
    async updatePokemon(
        @Param('id') pokemonId: string,
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
        await this.pokemonService.updatePokemon(
            pokemonId,
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
        return { message: 'Pokémon updated successfully.' };
    }

    @Patch('name/:name')
    async updatePokemonByName(
        @Param('name') pokemonName: string,
        @Body('type1') pokemonType1: string,
        @Body('type2') pokemonType2: string,
        @Body('height') pokemonHeight: number,
        @Body('weight') pokemonWeight: number,
        @Body('dexNumber') pokemonDexNumber: number,
        @Body('image') pokemonImage: string,
        @Body('shinyImage') pokemonShinyImage: string,
        @Body('cry') pokemonCry: string,
    ) {
        await this.pokemonService.updatePokemonByName(
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
        return { message: 'Pokémon updated successfully.' };
    }

    @Delete(':id')
    async removePokemon(@Param('id') pokemonId: string) {
        await this.pokemonService.deletePokemon(pokemonId);
        return { message: 'Pokémon deleted successfully.' };
    }

    @Delete('name/:name')
    async removePokemonByName(@Param('name') pokemonName: string) {
        await this.pokemonService.deletePokemonByName(pokemonName);
        return { message: 'Pokémon deleted successfully.' };
    }
}