import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('aluno', (table) => {
    table.increments('id').primary();
    table.string('aluno_nome').notNullable();
    table.string('aluno_email').notNullable().unique();
    table.string('aluno_telefone').notNullable();
    table.string('aluno_CPF').notNullable();
    table.date('aluno_nascimento').notNullable();
    table.string('aluno_CEP').notNullable();
    table.string('documento_number').notNullable();
    table.string('documento_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('aluno');
}
