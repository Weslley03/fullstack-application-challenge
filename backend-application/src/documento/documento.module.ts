import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/dbase/database.module";
import { DocumentoController } from "./documento.controller";
import { DocumentoService } from "./documento.service";

@Module({
  imports: [DatabaseModule],
  controllers: [DocumentoController],
  providers: [DocumentoService],
  exports: [DocumentoService],
})

export class DocumentoModule {}