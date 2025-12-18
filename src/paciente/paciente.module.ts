import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity';
import { PacienteService } from './services/paciente.service';
import { PacienteController } from './controllers/paciente.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Paciente])],
  providers: [PacienteService],
  controllers: [PacienteController],
  exports: [PacienteService],
})
export class PacienteModule {}
