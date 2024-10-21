import { Test, TestingModule } from '@nestjs/testing';
import { Aluno } from 'src/aluno/models/aluno.model';
import { DocumentoService } from 'src/documento/documento.service';
import { CreateDocumentoDto } from 'src/documento/dto/create-documento.dto';
import { Documento } from 'src/documento/models/documento.model';

jest.mock('../src/documento/models/documento.model');
jest.mock('../src/aluno/models/aluno.model');

describe('DocumentService', () => {
  let service: DocumentoService;
  let originalConsoleError;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentoService],
    }).compile();
    service = module.get<DocumentoService>(DocumentoService);

    originalConsoleError = console.error;
    console.error = jest.fn(); //mocka os console.error pra não logar nos testes
  });

  afterAll(() => {
    jest.clearAllMocks();
    console.error = originalConsoleError;
  });

  describe('createDocumento', () => {

    it('should create a document and update the aluno with document ID', async () => {
      const createDocumentoDto: CreateDocumentoDto = {
        documento_desc: 'CNH',
        documento_image: 'base64-png-img-simulate',
      };

      const aluno_id = 1;

      const newDocument = { id: 1, ...createDocumentoDto, aluno_id };

      (Documento.query as jest.Mock).mockReturnValue({
        insert: jest.fn().mockResolvedValueOnce(newDocument),
      });

      (Aluno.query as jest.Mock).mockReturnValue({
        findById: jest.fn().mockReturnValue({
          patch: jest.fn().mockResolvedValueOnce({}),
        }),
      });

      const result = await service.createDocumento(
        createDocumentoDto,
        aluno_id,
      );

      expect(result).toEqual({
        status: true,
        message: 'document file created sucefully',
      });

      expect(Documento.query().insert).toHaveBeenCalledWith({
        ...createDocumentoDto,
        aluno_id,
      });

      expect(Aluno.query().findById).toHaveBeenCalledWith(aluno_id);

      expect(Aluno.query().findById(aluno_id).patch).toHaveBeenCalledWith({
        documento_id: newDocument.id.toString(),
      });
    });

    it('should return an error if updating aluno with document ID fails', async () => {
      const createDocumentoDto: CreateDocumentoDto = {
        documento_desc: 'CNH',
        documento_image: 'base64-png-img-simulate',
      };
      const aluno_id = 1;


      const newDocument = { id: 1, ...createDocumentoDto, aluno_id };

      (Documento.query as jest.Mock).mockReturnValue({
        insert: jest.fn().mockResolvedValueOnce(newDocument),
      });

      const mockFindById = jest.fn().mockReturnValue({
        patch: jest.fn().mockRejectedValueOnce(new Error('Database error')),
      });

      (Aluno.query as jest.Mock).mockReturnValue({
        findById: mockFindById, 
      });

      const result = await service.createDocumento(createDocumentoDto, aluno_id);

      expect(result).toEqual({
        status: false,
        message: 'document created error',
      });

      expect(Documento.query().insert).toHaveBeenCalledWith({
        ...createDocumentoDto,
        aluno_id,
      });

      expect(Aluno.query().findById).toHaveBeenCalledWith(aluno_id)
      expect(Aluno.query().findById(aluno_id).patch).toHaveBeenCalled()
    });

  });
});
