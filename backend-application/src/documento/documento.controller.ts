import { Body, Headers, Controller, Post } from "@nestjs/common";
import { CreateDocumentoDto } from "./dto/create-documento.dto";
import { DocumentoService } from "./documento.service";

@Controller('documento')
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}

  @Post() 
  async createDocumento(
    @Body() createDocumentoDto: CreateDocumentoDto,
    @Headers('Authorization') authorization: string,
  ) {
    const token = authorization.replace('Bearer', '');
    const response = await this.documentoService.createDocumento(createDocumentoDto, token);
    return response;
  }
}