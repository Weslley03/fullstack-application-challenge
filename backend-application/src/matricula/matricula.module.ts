import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/dbase/database.module";
import { MatriculaController } from "./matricula.controller";
import { MatriculaService } from "./matricula.service";

@Module({
  imports: [DatabaseModule],
  controllers: [MatriculaController],
  providers: [MatriculaService],
  exports: [MatriculaService]
})

export class MatriculaModule {}