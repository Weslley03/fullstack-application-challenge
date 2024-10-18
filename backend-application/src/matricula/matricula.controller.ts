import { Body, Headers, Controller, Post } from "@nestjs/common";
import { MatriculaService } from "./matricula.service";
import { CreateMatriculaDto } from "./dto/create-matricula.dto";
import { AuthService } from "src/auth/auth.service";

@Controller('matricula')
export class MatriculaController {
  constructor(
    private readonly authService: AuthService,  
    private readonly matriculaService: MatriculaService
  ) {}

  @Post()
  async createMatricula(
    @Body() createMatriculaDto: CreateMatriculaDto,
    @Headers('Authorization') authorization: string,
  ) {
    const token = authorization.replace('Bearer', '');
    const aluno_id = await this.authService.verifyToken(token)
    const response = this.matriculaService.createMatricula(createMatriculaDto, aluno_id)
    return response;
  }
}