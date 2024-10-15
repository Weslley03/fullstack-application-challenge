import { Model } from 'objection';

export class Curso extends Model {
  static tableName = 'tipo_curso';
  id!: number;
  tipo_curso_name!: string;

  static relationMappings = {};
}
