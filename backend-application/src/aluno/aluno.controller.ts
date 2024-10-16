import { Body, Controller, Post } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';

@Controller('alunos')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  async createAluno(@Body() createAlunoDto: CreateAlunoDto) {
    const respose = await this.alunoService.createAluno(createAlunoDto);
    return respose;
  }
}
