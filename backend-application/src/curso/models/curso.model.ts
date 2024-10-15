import { Model } from 'objection';
import { Matricula } from 'src/matricula/models/matricula.model';
import { Modalidade } from 'src/modalidade/models/modalidade.model';
import { Tipo_Curso } from 'src/tipo_curso/models/tipo_curso.model';

export class Curso extends Model {
  static tableName = 'curso';
  id!: number;
  curso_name!: string;
  tipo_curso_id!: number;
  modalidade_id!: number;
  curso_valor!: number;
  curso_mensalidade!: number;

  static relationMappings = {
    matricula: {
      relation: Model.HasManyRelation,
      modelClass: Matricula,
      join: {
        from: 'curso.id',
        to: 'matricula.curso_id',
      },
    },

    tipo_curso: {
      relation: Model.HasManyRelation,
      modelClass: Tipo_Curso,
      join: {
        from: 'curso.tipo_curso_id',
        to: 'tipo_curso.id',
      },
    },

    modalidade: {
      relation: Model.HasManyRelation,
      modelClass: Modalidade,
      join: {
        from: 'curso.modalidade_id',
        to: 'modalidade.id',
      },
    },
  };
}
