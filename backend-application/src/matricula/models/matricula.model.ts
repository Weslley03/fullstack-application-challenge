import { Model } from 'objection';

export class Matricula extends Model {
  static tableName = 'matricula';
  id!: number;
  aluno_id!: number;
  curso_id!: number;

  static relationMappings = {};
}
