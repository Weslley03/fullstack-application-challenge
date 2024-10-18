import { Injectable } from "@nestjs/common";
import { JwtPayload, verify } from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  async verifyToken(token: string): Promise<number> {
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
};