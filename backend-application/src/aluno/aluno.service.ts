import { Injectable } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { Aluno } from './models/aluno.model';
import { sign } from 'jsonwebtoken';

type ResponseBody = {
  status: boolean;
  message: string;
  token?: string;
};

async function generateToken(aluno_id: string): Promise<string> {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  if (!JWT_SECRET_KEY)
    throw new Error(
      'JWT_SECRET_KEY is not defined in the environment variables',
    );

  const payload = { aluno_id };
  const token = sign(payload, JWT_SECRET_KEY, {
    expiresIn: '1h',
  });
  return token;
}

@Injectable()
export class AlunoService {
  async createAluno(createAlunoDto: CreateAlunoDto): Promise<ResponseBody> {
    const userExist = await Aluno.query().where(
      'aluno_email',
      createAlunoDto.aluno_email,
    );

    if (userExist.length == 1) {
      const response: ResponseBody = {
        status: false,
        message: 'this user already exists',
      };
      return response;
    }

    const newAluno = await Aluno.query().insert(createAlunoDto);

    const token = await generateToken(newAluno.id.toString());

    const response: ResponseBody = {
      status: true,
      message: 'user created sucefully',
      token: token,
    };
    return response;
  }
}
