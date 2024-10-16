import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAlunoDto {
  @IsNotEmpty({ message: 'The field aluno_nome is required' })
  @IsString()
  aluno_nome: string;

  @IsNotEmpty({ message: 'The field aluno_email is required' })
  @IsEmail({}, { message: 'The field aluno_email must be a valid email' })
  aluno_email: string;

  @IsNotEmpty({ message: 'The field aluno_telefone is required' })
  @IsString()
  aluno_telefone: string;

  @IsNotEmpty({ message: 'The field aluno_CPF is required' })
  @IsString()
  aluno_CPF: string;

  @IsNotEmpty({ message: 'The field aluno_nascimento is required' })
  @IsString()
  aluno_nascimento: Date;

  @IsNotEmpty({ message: 'The field aluno_CEP is required' })
  @IsString()
  aluno_CEP: string;

  @IsNotEmpty({ message: 'The field documento_number is required' })
  @IsString()
  documento_number: string;

  @IsOptional()
  @IsString()
  documento_id?: string;
}
