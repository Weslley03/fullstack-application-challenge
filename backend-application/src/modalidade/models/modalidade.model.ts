import { Model } from 'objection';
import { Curso } from 'src/curso/models/curso.model';

export class Modalidade extends Model {
  static tableName = 'modalidade';
  id!: number;
  modalidade_name!: string;

  static relationMappings = {
    curso: {
      relation: Model.BelongsToOneRelation,
      modelClass: Curso,
      join: {
        from: 'modalidade.id',
        to: 'curso.modalidade_id',
      },
    },
  };
}
