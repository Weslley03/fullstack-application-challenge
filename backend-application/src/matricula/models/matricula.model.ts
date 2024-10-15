import { Model } from 'objection';
import { Aluno } from 'src/aluno/models/aluno.model';
import { Curso } from 'src/curso/models/curso.model';

export class Matricula extends Model {
  static tableName = 'matricula';
  id!: number;
  aluno_id!: number;
  curso_id!: number;

  static relationMappings = {
    aluno: {
      relation: Model.BelongsToOneRelation,
      modelClass: Aluno,
      join: {
        from: 'matricula.aluno_id',
        to: 'aluno.id',
      },
    },

    curso: {
      relation: Model.BelongsToOneRelation,
      modelClass: Curso,
      join: {
        from: 'matricula.curso_id',
        to: 'curso.id',
      },
    },
  };
}
