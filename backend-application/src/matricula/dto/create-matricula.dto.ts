import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMatriculaDto {
  @IsNotEmpty({ message: 'The field aluno_id is required' })
  @IsNumber()
  aluno_id: number;

  @IsNotEmpty({ message: 'The field curso_id is required' })
  @IsNumber()
  curso_id: number;
}
