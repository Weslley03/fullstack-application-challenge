import { Controller, Get } from "@nestjs/common";
import { CursoService } from "./curso.service";
import { Curso } from "./models/curso.model";

@Controller('cursos')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}
  
  @Get()
  async findAllCurso(): Promise<Curso[]> {
    return this.cursoService.findAllCurso();
  };
};