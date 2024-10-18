import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/dbase/database.module";
import { DocumentoController } from "./documento.controller";
import { DocumentoService } from "./documento.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [DocumentoController],
  providers: [DocumentoService],
  exports: [DocumentoService],
})

export class DocumentoModule {}