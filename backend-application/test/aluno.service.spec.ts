import { Test, TestingModule } from '@nestjs/testing';
import { AlunoService } from '../src/aluno/aluno.service';
import { Aluno } from '../src/aluno/models/aluno.model';

jest.mock('../src/aluno/models/aluno.model.ts');
jest.mock('jsonwebtoken');

describe('AlunoService', () => {
  let service: AlunoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlunoService],
    }).compile();
    service = module.get<AlunoService>(AlunoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createAluno', () => {
    it('should return an error if user already exists', async () => {
      const createUserDto = {
        aluno_email: 'test@exemplo.com',
        aluno_nome: 'testName',
        aluno_telefone: '4499999999',
        aluno_CPF: '45687441236',
        aluno_nascimento: new Date('2003-09-06'),
        aluno_CEP: '78562345',
        documento_number: '632558963',
      };

      (Aluno.query as jest.Mock).mockReturnValue({
        where: jest.fn().mockResolvedValueOnce([{}]),
      });

      const result = await service.createAluno(createUserDto);

      expect(result).toEqual({
        status: false,
        message: 'this user already exists',
      });
      expect(Aluno.query().where).toHaveBeenCalledWith(
        'aluno_email',
        createUserDto.aluno_email,
      );
    });
  });
});
