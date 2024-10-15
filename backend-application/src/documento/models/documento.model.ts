import { Model } from 'objection';

export class Matricula extends Model {
  static tableName = 'documento';
  id!: number;
  aluno_id!: number;
  documento_number!: number;
  documento_desc!: string;
  documento_image!: string;

  static relationMappings = {};
}
