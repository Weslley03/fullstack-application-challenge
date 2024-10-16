import { Body, Controller, Post } from "@nestjs/common";
import { MatriculaService } from "./matricula.service";
import { CreateMatriculaDto } from "./dto/create-matricula.dto";

@Controller('matricula')
export class MatriculaController {
  constructor(private readonly matriculaService: MatriculaService) {}

  @Post()
  async createMatricula(@Body() createMatriculaDto: CreateMatriculaDto) {
    const response = this.matriculaService.createMatricula(createMatriculaDto)
    return response;
  }
}