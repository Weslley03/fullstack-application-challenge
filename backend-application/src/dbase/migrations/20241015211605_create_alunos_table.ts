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
  .createTable('modalidade', (table) => {
    table.increments('id').primary();
    table.string('modalidade_name').notNullable();
  });

  await knex.schema
  .createTable('tipo_curso', (table) => {
    table.increments('id').primary();
    table.string('tipo_curso_name').notNullable();
  });

  await knex.schema
  .createTable('curso', (table) => {
    table.increments('id').primary();
    table.string('curso_name').notNullable();
    table.integer('tipo_curso_id').unsigned();
    table.integer('modalidade_id').unsigned();
    table.integer('curso_valor').notNullable();
    table.integer('curso_mensalidade').notNullable();
  });

  await knex.schema
  .createTable('matricula', (table) => {
    table.increments('id').primary();
    table.integer('aluno_id').unsigned();
    table.integer('curso_id').unsigned();
  });

  ///////////////////////////
  
  await knex.schema
  .alterTable('aluno', (table) => {
    table.foreign('documento_id').references('id').inTable('documento').onDelete('SET NULL');
  });

  await knex.schema
  .alterTable('documento', (table) => {
    table.foreign('aluno_id').references('id').inTable('aluno').onDelete('CASCADE');
  });

  await knex.schema
  .alterTable('curso', (table) => {
    table.foreign('tipo_curso_id').references('id').inTable('tipo_curso').onDelete('CASCADE');
    table.foreign('modalidade_id').references('id').inTable('modalidade').onDelete('CASCADE');
  });

  await knex.schema
  .alterTable('matricula', (table) => {
    table.foreign('aluno_id').references('id').inTable('aluno').onDelete('CASCADE');
    table.foreign('curso_id').references('id').inTable('curso').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  
  await knex.schema.alterTable('documento', (table) => {
    table.dropForeign(['aluno_id']);
  });

  await knex.schema.alterTable('aluno', (table) => {
    table.dropForeign(['documento_id']);
  });

  await knex.schema.alterTable('curso', (table) => {
    table.dropForeign(['tipo_curso_id']);
    table.dropForeign(['modalidade_id']);
  });

  await knex.schema.alterTable('matricula', (table) => {
    table.dropForeign(['aluno_id']);
    table.dropForeign(['curso_id']);
  });
  
  await knex.schema
  .dropTable('aluno');

  await knex.schema
  .dropTable('documento');

  await knex.schema
  .dropTable('curso');

  await knex.schema
  .dropTable('tipo_curso');

  await knex.schema
  .dropTable('modalidade');

  await knex.schema
  .dropTable('matricula');
}
