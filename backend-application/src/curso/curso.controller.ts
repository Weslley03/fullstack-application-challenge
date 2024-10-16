import { Controller, Get, Param } from "@nestjs/common";
import { CursoService } from "./curso.service";
import { Curso } from "./models/curso.model";

@Controller('cursos')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}
  
  @Get()
  async findAllCurso(): Promise<Curso[]> {
    return this.cursoService.findAllCurso();
  };

  @Get('bytype/:type_curso_id')
  async findByTypeCurso(@Param('type_curso_id') type_curso_id: number ): Promise<Curso[]> {
    return this.cursoService.findByTypeCurso(type_curso_id);
  };

  @Get('bymodality/:modalidade_id')
  async findByModalityCurso(@Param('modalidade_id') modalidade_id: number ): Promise<Curso[]> {
    return this.cursoService.findByModalityCurso(modalidade_id);
  }
};