import * as mongoose from 'mongoose';

export const PokemonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type1: { type: String, required: true },
    type2: { type: String, required: false },
    // description: { type: String, required: true }, 
    // dex entries might be hard to include
    // considering how different Pokemon games have different dex entries
    // and how different Pokemon don't have dex entries in some games
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    dexNumber: { type: Number, required: true },
    image: { type: String, required: true }, 
    // image url: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
    shinyImage: { type: String, required: true },
    // shiny image url: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png
    cry: { type: String, required: true },
    // cry url: "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg"
});

export interface Pokemon extends mongoose.Document {
    id: string;
    name: string;
    type1: string;
    type2: string;
    // description: string;
    height: number;
    weight: number;
    dexNumber: number;
    image: string;
    shinyImage: string;
    cry: string;
}

// Idea: change between normal and shiny by clicking on image