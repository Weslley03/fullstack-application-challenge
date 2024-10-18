import { Model } from 'objection';
import { Curso } from 'src/curso/models/curso.model';

export class Tipo_Curso extends Model {
  static tableName = 'tipo_curso';
  id!: number;
  tipo_curso_name!: string;

  static relationMappings = {
    curso: {
      relation: Model.BelongsToOneRelation,
      modelClass: Curso,
      join: {
        from: 'tipo_curso.id',
        to: 'curso.tipo_curso_id',
      },
    },
  };
}
