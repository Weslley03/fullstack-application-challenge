import { Module, Global } from '@nestjs/common';
import knexConfig from './knexfile';
import { Model } from 'objection';
import Knex from 'knex';
const knex = Knex(knexConfig);
Model.knex(knex);
@Global()
@Module({
  providers: [
    {
      provide: 'KnexConnection',
      useValue: knex,
    },
  ],
  exports: ['KnexConnection'],
})
export class DatabaseModule {}
