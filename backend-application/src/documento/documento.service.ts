import { Injectable } from '@nestjs/common';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { Aluno } from 'src/aluno/models/aluno.model';
import { Documento } from './models/documento.model';

type ResponseBody = {
  status: boolean;
  message: string;
}

@Injectable()
export class DocumentoService {
  async createDocumento(createDocumentoDto: CreateDocumentoDto, aluno_id: number ): Promise<ResponseBody> {
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

