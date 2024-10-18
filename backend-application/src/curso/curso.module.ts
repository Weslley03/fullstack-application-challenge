import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/dbase/database.module";
import { CursoController } from "./curso.controller";
import { CursoService } from "./curso.service";

@Module({
  imports: [DatabaseModule],
  controllers: [CursoController],
  providers: [CursoService],
  exports: [CursoService],
})

export class CursoModule {}