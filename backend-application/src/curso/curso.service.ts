import { Injectable } from "@nestjs/common";
import { Curso } from "./models/curso.model";

@Injectable()
export class CursoService {
  async findAllCurso(): Promise<Curso[]> {
    const allCursos = await Curso.query();
    return allCursos; 
  };

  async findByTypeCurso(type_curso_id: number): Promise<Curso[]> {
    const byType = await Curso.query().where(
      'tipo_curso_id',
      type_curso_id
    );
    return byType;
  }
}