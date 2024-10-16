import { Module } from '@nestjs/common';
import { AlunoModule } from './aluno/aluno.module';
import { DocumentoModule } from './documento/documento.module';

@Module({
  imports: [
    AlunoModule,
    DocumentoModule
  ],
})
export class AppModule {}
