import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consulta } from './entities/consulta.entity';
import { ConsultaService } from './services/consulta.service';
import { ConsultaController } from './controllers/consulta.controller';
import { EspecialidadeModule } from '../especialidade/especialidade.module';
import { PacienteService } from '../paciente/services/paciente.service';
import { PacienteModule } from '../paciente/paciente.module';

@Module({
  imports: [TypeOrmModule.forFeature([Consulta]), EspecialidadeModule, PacienteModule],
  providers: [ConsultaService],
  controllers: [ConsultaController],
  exports: [],
})
export class ConsultaModule {}
