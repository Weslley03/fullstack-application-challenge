import { Injectable } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { Aluno } from './models/aluno.model';

type ResponseBody = {
  status: boolean;
  message: string;
};

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

    await Aluno.query().insert(createAlunoDto);

    const response: ResponseBody = {
      status: true,
      message: 'user created sucefully',
    };
    return response;
  }
}
