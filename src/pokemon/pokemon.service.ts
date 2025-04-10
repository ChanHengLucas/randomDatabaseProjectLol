import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from './pokemon.model';
import { getPokemonData, PokemonModel } from './dataFromPokemonApi';

@Injectable()
export class PokemonService implements OnModuleInit {
    constructor(@InjectModel('Pokemon') private readonly pokemonModel: Model<Pokemon>) {}

    async onModuleInit() {
        await this.checkAndInsertPokemonData();
    }

    async checkAndInsertPokemonData() {
        try {
            const pokemonData = await getPokemonData();
            for (const pokemon of pokemonData) {
                const existingPokemon = await this.pokemonModel.findOne({ dexNumber: pokemon.data.dexNumber }).exec();
                if (!existingPokemon) {
                    await this.insertPokemon(
                        pokemon.data.name || '',
                        pokemon.data.type1 || '',
                        pokemon.data.type2 || '',
                        pokemon.data.height,
                        pokemon.data.weight,
                        pokemon.data.dexNumber,
                        pokemon.data.image || '',
                        pokemon.data.shinyImage || '',
                        pokemon.data.cry
                    );
                }
            }
            console.log('Checked and inserted Pokémon data.');
        } catch (error) {
            console.error('Error checking and inserting Pokémon data:', error);
        }
    }

    async insertPokemon(
        name: string,
        type1: string,
        type2: string,
        height: number,
        weight: number,
        dexNumber: number,
        image: string,
        shinyImage: string,
        cry: string
    ) {
        const newPokemon = new this.pokemonModel({
            name,
            type1,
            type2,
            height,
            weight,
            dexNumber,
            image,
            shinyImage,
            cry
        });
        await newPokemon.save();
    }


    async getPokemon() {
        const pokemons = await this.pokemonModel.find().exec(); // returns a promise
        return pokemons.map(pokemon => ({
            id: pokemon.id,
            name: pokemon.name,
            type1: pokemon.type1,
            type2: pokemon.type2,
            height: pokemon.height,
            weight: pokemon.weight,
            dexNumber: pokemon.dexNumber,
            image: pokemon.image,
            shinyImage: pokemon.shinyImage,
            cry: pokemon.cry,
        })); // yields a list of Pokemon
    }

    async getSinglePokemon(pokemonId: string){
        const pokemon = await this.findPokemon(pokemonId);
        return {
            id: pokemon.id,
            name: pokemon.name,
            type1: pokemon.type1,
            type2: pokemon.type2,
            height: pokemon.height,
            weight: pokemon.weight,
            dexNumber: pokemon.dexNumber,
            image: pokemon.image,
            shinyImage: pokemon.shinyImage,
            cry: pokemon.cry,
        };
    }

    async getPokemonByName(pokemonName: string) {
        const pokemon = await this.pokemonModel.findOne({ name: pokemonName }).exec();
        if (!pokemon) {
            throw new Error('Could not find Pokemon.');
        }
        return {
            id: pokemon.id,
            name: pokemon.name,
            type1: pokemon.type1,
            type2: pokemon.type2,
            height: pokemon.height,
            weight: pokemon.weight,
            dexNumber: pokemon.dexNumber,
            image: pokemon.image,
            shinyImage: pokemon.shinyImage,
            cry: pokemon.cry,
        };
    }

    async updatePokemon(pokemonId: string, name: string, type1: string, type2: string, height: number, weight: number, dexNumber: number, image: string, shinyImage: string, cry: string) {
        const updatedPokemon = await this.findPokemon(pokemonId);
        if (name) {
            updatedPokemon.name = name;
        }
        if (type1) {
            updatedPokemon.type1 = type1;
        }
        if (type2) {
            updatedPokemon.type2 = type2;
        }
        if (height) {
            updatedPokemon.height = height;
        }
        if (weight) {
            updatedPokemon.weight = weight;
        }
        if (dexNumber) {
            updatedPokemon.dexNumber = dexNumber;
        }
        if (image) {
            updatedPokemon.image = image;
        }
        if (shinyImage) {
            updatedPokemon.shinyImage = shinyImage;
        }
        if (cry) {
            updatedPokemon.cry = cry;
        }
        updatedPokemon.save();
    }

    async updatePokemonByName(name: string, type1: string, type2: string, height: number, weight: number, dexNumber: number, image: string, shinyImage: string, cry: string) {
        const updatedPokemon = await this.pokemonModel.findOne({ name: name }).exec();
        if (!updatedPokemon) {
            throw new Error('Could not find Pokemon.');
        }
        if (type1) {
            updatedPokemon.type1 = type1;
        }
        if (type2) {
            updatedPokemon.type2 = type2;
        }
        if (height) {
            updatedPokemon.height = height;
        }
        if (weight) {
            updatedPokemon.weight = weight;
        }
        if (dexNumber) {
            updatedPokemon.dexNumber = dexNumber;
        }
        if (image) {
            updatedPokemon.image = image;
        }
        if (shinyImage) {
            updatedPokemon.shinyImage = shinyImage;
        }
        if (cry) {
            updatedPokemon.cry = cry;
        }
        updatedPokemon.save();
    }

    async deletePokemon(pokemonId: string) {
        const result = await this.pokemonModel.deleteOne({ _id: pokemonId }).exec();
        if (result.deletedCount === 0) {
            throw new Error('Could not find Pokemon.');
        }
    }

    async deletePokemonByName(pokemonName: string) {
        const result = await this.pokemonModel.deleteOne({ name: pokemonName }).exec();
        if (result.deletedCount === 0) {
            throw new Error('Could not find Pokemon.');
        }
    }

    private async findPokemon(id: string) {
        let pokemon;
        try {
            pokemon = await this.pokemonModel.findById(id);
        } catch (error) {
            throw new Error('Could not find Pokemon.');
        }
        if (!pokemon) {
            throw new Error('Could not find Pokemon.');
        }
        return pokemon;
    }
}