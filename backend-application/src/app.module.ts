import { Module } from '@nestjs/common';
import { AlunoModule } from './aluno/aluno.module';
import { DocumentoModule } from './documento/documento.module';
import { CursoModule } from './curso/curso.module';

@Module({
  imports: [
    AlunoModule,
    DocumentoModule,
    CursoModule,
  ],
})
export class AppModule {}
