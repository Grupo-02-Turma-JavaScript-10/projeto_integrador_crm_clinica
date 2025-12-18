import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especialidade } from './entities/especialidade.entity';
import { EspecialidadeService } from './services/especialidade.service';

@Module({
  imports: [TypeOrmModule.forFeature([Especialidade])],
  providers: [EspecialidadeService],
  exports: [EspecialidadeService], // ⚠️ IMPORTANTE
})
export class EspecialidadeModule {}
