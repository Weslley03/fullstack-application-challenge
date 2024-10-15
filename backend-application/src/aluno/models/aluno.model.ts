import { Model } from 'objection';

export class Aluno extends Model {
  static tableName = 'aluno';
  id!: number;
  aluno_nome!: string;
  aluno_email!: string;
  aluno_telefone!: number;
  aluno_CPF!: number;
  aluno_nascimento!: Date;
  aluno_CEP!: number;
  documento_id!: number;

  static relationMappings = {};
}
