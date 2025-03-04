import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [PokemonModule, MongooseModule.forRoot(
    "mongodb+srv://lucaschan:308432308432@defaultboringclustermom.gvucs.mongodb.net/"
  )], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
