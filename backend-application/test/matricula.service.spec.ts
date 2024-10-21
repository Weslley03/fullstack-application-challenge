import { Test, TestingModule } from "@nestjs/testing";
import { CreateMatriculaDto } from "src/matricula/dto/create-matricula.dto";
import { MatriculaService } from "src/matricula/matricula.service";
import { Matricula } from "src/matricula/models/matricula.model";

jest.mock('../src/matricula/models/matricula.model');

describe('MatriculaService', () => {
  let service: MatriculaService;

  beforeEach( async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatriculaService],
    }).compile();
      service = module.get<MatriculaService>(MatriculaService);
  });

  afterAll( () => {
    jest.clearAllMocks();
  });

  describe('createMatricula', () => {
    
    it('should return success message after create a matricuala', async () => {
      
      const createMatriculaDto: CreateMatriculaDto = {
        curso_id: 1,
      };
      
      const aluno_id = 1;

      const newMatricula = { id: 1, ...createMatriculaDto, aluno_id };

      (Matricula.query as jest.Mock).mockReturnValue({
        insert: jest.fn().mockResolvedValueOnce(newMatricula)
      });

      const result = await service.createMatricula(createMatriculaDto, aluno_id);

      expect(result).toEqual({
        status: true,
        message: 'successfully enrolled in the course',
        registration: `student ${newMatricula.aluno_id} enrolled in the course ${newMatricula.curso_id}.`
      });

    });
  
  });

});