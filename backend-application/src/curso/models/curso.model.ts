import { Model } from 'objection';

export class Curso extends Model {
  static tableName = 'curso';
  id!: number;
  curso_name!: string;
  tipo_curso_id!: number;
  modalidade_id!: number;
  curso_valor!: number;
  curso_mensalidade!: number;

  static relationMappings = {};
}
