import { Model } from 'objection';
import { Documento } from 'src/documento/models/documento.model';
import { Matricula } from 'src/matricula/models/matricula.model';

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

  static relationMappings = {
    documento: {
      relation: Model.HasOneRelation,
      modelClass: Documento,
      join: {
        from: 'aluno.documento_id',
        to: 'documento.id',
      },
    },

    matricula: {
      relation: Model.HasManyRelation,
      modelClass: Matricula,
      join: {
        from: 'aluno.id',
        to: 'matricula.aluno_id',
      },
    },
  };
}
