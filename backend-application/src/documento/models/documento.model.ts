import { Model } from 'objection';
import { Aluno } from 'src/aluno/models/aluno.model';

export class Documento extends Model {
  static tableName = 'documento';
  id!: number;
  aluno_id!: number;
  documento_desc!: string;
  documento_image!: string;

  static relationMappings = {
    aluno: {
      relation: Model.BelongsToOneRelation,
      modelClass: Aluno,
      join: {
        from: 'documento.aluno_id',
        to: 'aluno.id',
      },
    },
  };
}
