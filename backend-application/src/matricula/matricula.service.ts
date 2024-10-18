import { Injectable } from "@nestjs/common";
import { Matricula } from "./models/matricula.model";
import { CreateMatriculaDto } from "./dto/create-matricula.dto";

type ResponseBodyMatricula = {
  status: boolean;
  message: string;
  registration: string;
};

@Injectable()
export class MatriculaService {
  async createMatricula(createMatriculaDto: CreateMatriculaDto, aluno_id: number): Promise<ResponseBodyMatricula> {
    
    const data = {
      ...createMatriculaDto,
      aluno_id
    }
    const enrolled = await Matricula.query().insert(data);
    
    const response = {
      status: true,
      message: 'successfully enrolled in the course',
      registration: `student ${enrolled.aluno_id} enrolled in the course ${enrolled.curso_id}.`
    };
    return response;
  }
};