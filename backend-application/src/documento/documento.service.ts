import { Injectable } from '@nestjs/common';
import { JwtPayload, verify } from 'jsonwebtoken';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { Aluno } from 'src/aluno/models/aluno.model';
import { Documento } from './models/documento.model';
import * as dotenv from 'dotenv';
dotenv.config();

type ResponseBody = {
  status: boolean;
  message: string;
}

async function verifyToken(token: string): Promise<number> {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  if (!JWT_SECRET_KEY) {
    throw new Error('JWT_SECRET_KEY is not defined in the environment variables');
  }
  try {
    const trimmedToken = token.trim();
    const decoded = verify(trimmedToken, JWT_SECRET_KEY) as JwtPayload;
    const aluno_id = decoded.aluno_id;
    if (!aluno_id) {
      throw new Error('aluno_id is missing in the token');
    };
    const alunoIdAsNumber = parseInt(aluno_id, 10);
    if (isNaN(alunoIdAsNumber)) {
      throw new Error('aluno_id is not a valid number');
    };
    return alunoIdAsNumber;
  } catch (error) {
    console.error('token verification failed:', error);
    throw new Error('invalid token');
  }
}

@Injectable()
export class DocumentoService {
  async createDocumento(createDocumentoDto: CreateDocumentoDto, token: string ): Promise<ResponseBody> {
    const aluno_id = await verifyToken(token);

    const data = {
      ...createDocumentoDto,
      aluno_id: aluno_id
    } 

    const newDocument = await Documento.query().insert(data);

    try{
      await Aluno.query()
      .findById(Number(aluno_id))
      .patch({
        documento_id: newDocument.id.toString()
      })
    }catch(err){
      console.error(`error when adding the document ID to the student table. ${err}`);
      const response: ResponseBody = {
        status: false,
        message: 'document created error',
      };
      return response;
    }

    const response: ResponseBody = {
      status: true,
      message: 'document file created sucefully',
    };
    return response;
  }
}

