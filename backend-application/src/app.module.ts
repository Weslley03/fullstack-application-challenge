import { Module } from '@nestjs/common';
import { AlunoModule } from './aluno/aluno.module';
import { DocumentoModule } from './documento/documento.module';
import { CursoModule } from './curso/curso.module';
import { MatriculaModule } from './matricula/matricula.module';

@Module({
  imports: [
    AlunoModule,
    DocumentoModule,
    CursoModule,
    MatriculaModule,
  ],
})
export class AppModule {}
