import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pokemon } from './pokemon.model';

@Injectable()
export class PokemonService {
    constructor(@InjectModel('Pokemon') private readonly pokemonModel: Model<Pokemon>) {}

}