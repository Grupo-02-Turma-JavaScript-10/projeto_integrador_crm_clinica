import { Module } from '@nestjs/common';
import { EspecialidadeService } from './services/especialidade.service';
import { EspecialidadeController } from './controllers/especialidade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especialidade } from './entities/especilidade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Especialidade])],
  providers: [EspecialidadeService],
  controllers: [EspecialidadeController],
  exports: [EspecialidadeService],
})
export class EspecialidadeModule {}
