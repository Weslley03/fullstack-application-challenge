import { Body, Headers, Controller, Post } from "@nestjs/common";
import { CreateDocumentoDto } from "./dto/create-documento.dto";
import { DocumentoService } from "./documento.service";
import { AuthService } from "src/auth/auth.service";

@Controller('documento')
export class DocumentoController {
  constructor(
    private readonly authService: AuthService,
    private readonly documentoService: DocumentoService
  ) {}

  @Post() 
  async createDocumento(
    @Body() createDocumentoDto: CreateDocumentoDto,
    @Headers('Authorization') authorization: string,
  ) {
    const token = authorization.replace('Bearer', '');
    const aluno_id = await this.authService.verifyToken(token);
    const response = await this.documentoService.createDocumento(createDocumentoDto, aluno_id);
    return response;
  }
}