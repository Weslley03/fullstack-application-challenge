import { Test, TestingModule } from '@nestjs/testing';
import { AlunoService } from '../src/aluno/aluno.service';
import { Aluno } from '../src/aluno/models/aluno.model';
import { CreateAlunoDto } from 'src/aluno/dto/create-aluno.dto';
import { sign } from 'jsonwebtoken';

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

    it('should return create a user and return a token', async () => {
      const createAlunoDto: CreateAlunoDto = {
        aluno_email: 'test@exemplo.com',
        aluno_nome: 'testName',
        aluno_telefone: '4499999999',
        aluno_CPF: '45687441236',
        aluno_nascimento: new Date('2003-09-06'),
        aluno_CEP: '78562345',
        documento_number: '632558963',
      };

      const newAluno = { id: 1 };

      (Aluno.query as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValueOnce([]),
        insert: jest.fn().mockReturnValueOnce(newAluno),
      });

      const token = 'mocked_token';

      (sign as jest.Mock).mockReturnValueOnce(token);

      const result = await service.createAluno(createAlunoDto);
    
      expect(result).toEqual({
        status: true,
        message: 'user created sucefully',
        token: token,
      });;

      expect(Aluno.query().insert).toHaveBeenCalledWith(createAlunoDto)

      expect(sign).toHaveBeenCalledWith(
        { aluno_id: newAluno.id.toString() },
        process.env.JWT_SECRET_KEY, 
        { expiresIn: '1h' },
      );
    });

  });
});
