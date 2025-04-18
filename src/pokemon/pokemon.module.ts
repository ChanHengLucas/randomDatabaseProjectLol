import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { PokemonSchema } from './pokemon.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Pokemon', schema: PokemonSchema }])],
  controllers: [PokemonController],
  providers: [PokemonService],
  // exports: [PokemonService],
})

export class PokemonModule {}