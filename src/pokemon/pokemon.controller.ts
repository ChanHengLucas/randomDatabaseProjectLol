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

    @Get('type/:type')
    async getPokemonByType(@Param('type') pokemonType: string) {
        const pokemons = await this.pokemonService.getPokemonByType(pokemonType);
        return pokemons;
    }

    @Get('dex/:dexNumber')
    async getPokemonByDexNumber(@Param('dexNumber') pokemonDexNumber: number) {
        const pokemon = await this.pokemonService.getPokemonByDexNumber(pokemonDexNumber);
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

// Hosting API online through flydev
// Or check on other projects and make adjustments or modifications to those
// Or literally combine everything I've done so far

// So far there's 4 things I can do:
// 1. Continue with this project and make it a website
// 2. Improve the pokemon battle in the about me project
// 3. Modify the pokemon explosion game (so when a pokemon passes by another one, the other one explodes)
// 4. Create an entirely new project that would have real life applications (and sneak some pokemon in there)
// If I were to make a new project, I would have to define my goal before I get started

// Could be ranging anywhere from a fun game to a serious project
// I want it to either be a fun game or a mixture of both
// Something too serious just doesn't feel right since I'm already working on that

// I could try to implement a multiplayer game so people can play it on a website on different devices
// Game can range anywhere from a Pokemon battle simulator (PVP or PVE with AI)
// Brief idea: Generate a final stage Pokemon that the AI will use; the player would choose another Pokemon to try to defeat it
// The AI would choose the 4 best moves that the Pokemon can learn that would counter the player's chosen Pokemon
// The AI could also choose an item to use on the Pokemon
// The player would have to choose the moveset and item for their Pokemon

// There would also be double battles or a full team of 6 Pokemon

// For PVP, both players would choose a team of 6 Pokemon, then the teams would be revealed
// The players would then choose the moves and items for their Pokemon
// Players can set defaults for movesets and items

// This idea seems way too difficult for a solo project lol

// I could add a twist to this project, where there's different types of rounds
// Could include 5 rounds where the players have to guess the Pokemon based on its properties for points (make sure the Pokemon aren't repeated)
// Then include a battle where the players can choose the moves and items for one of the previously mentioned Pokemon (more points)
// Then generate a random scenario for the players to choose one of the previous Pokemon that they think would fit best, along with reasoning (more points)
// Then ...
// The player with the most points at the end wins
// Also seems way too difficult

// I would simply stick to one of the above ideas and implement it