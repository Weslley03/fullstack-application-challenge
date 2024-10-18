import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/dbase/database.module";
import { MatriculaController } from "./matricula.controller";
import { MatriculaService } from "./matricula.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [MatriculaController],
  providers: [MatriculaService],
  exports: [MatriculaService]
})

export class MatriculaModule {}