import { Model } from 'objection';
import { Documento } from 'src/documento/models/documento.model';
import { Matricula } from 'src/matricula/models/matricula.model';

export class Aluno extends Model {
  static tableName = 'aluno';
  id!: number;
  aluno_nome!: string;
  aluno_email!: string;
  aluno_telefone!: string;
  aluno_CPF!: string;
  aluno_nascimento!: Date;
  aluno_CEP!: string;
  documento_number!: string;
  documento_id?: string;

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
