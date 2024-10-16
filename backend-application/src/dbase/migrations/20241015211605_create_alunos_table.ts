import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema
  .createTable('aluno', (table) => {
    table.increments('id').primary();
    table.string('aluno_nome').notNullable();
    table.string('aluno_email').notNullable().unique();
    table.string('aluno_telefone').notNullable();
    table.string('aluno_CPF').notNullable();
    table.date('aluno_nascimento').notNullable();
    table.string('aluno_CEP').notNullable();
    table.string('documento_number').notNullable();
    table.integer('documento_id').unsigned();
  });

  await knex.schema
  .createTable('documento', (table) => {
    table.increments('id').primary();
    table.integer('aluno_id').unsigned().notNullable();
    table.string('documento_desc').notNullable();
    table.string('documento_image').notNullable();
  });

  await knex.schema
  .alterTable('aluno', (table) => {
    table.foreign('documento_id').references('id').inTable('documento').onDelete('SET NULL');
  });

  await knex.schema
  .alterTable('documento', (table) => {
    table.foreign('aluno_id').references('id').inTable('aluno').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  
  await knex.schema.alterTable('documento', (table) => {
    table.dropForeign(['aluno_id']);
  });

  await knex.schema.alterTable('aluno', (table) => {
    table.dropForeign(['documento_id']);
  });
  
  await knex.schema
  .dropTable('aluno');

  await knex.schema
  .dropTable('documento');
}
