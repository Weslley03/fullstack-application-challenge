import { Model } from 'objection';

export class Curso extends Model {
  static tableName = 'modalidade';
  id!: number;
  modalidade_name!: string;

  static relationMappings = {};
}
