import { Injectable } from "@nestjs/common";
import { Curso } from "./models/curso.model";

@Injectable()
export class CursoService {
  async findAllCurso(): Promise<Curso[]> {
    const allCursos = await Curso.query();
    return allCursos; 
  };
}