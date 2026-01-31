import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consulta } from './entities/consulta.entity';
import { ConsultaService } from './services/consulta.service';
import { ConsultaController } from './controllers/consulta.controller';
import { EspecialidadeModule } from '../especialidade/especialidade.module';
import { MedicoService } from '../medico/services/medico.service';
import { MedicoModule } from '../medico/medico.module';

@Module({
  imports: [TypeOrmModule.forFeature([Consulta]), EspecialidadeModule, MedicoModule],
  providers: [ConsultaService],
  controllers: [ConsultaController],
  exports: [],
})
export class ConsultaModule {}
