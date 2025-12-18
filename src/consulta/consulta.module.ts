import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consulta } from './entities/consulta.entity';
import { ConsultaService } from './services/consulta.service';
import { ConsultaController } from './controllers/consulta.controller';
import { EspecialidadeModule } from '../especialidade/especialidade.module';

@Module({
  imports: [TypeOrmModule.forFeature([Consulta]), EspecialidadeModule],
  providers: [ConsultaService],
  controllers: [ConsultaController],
  exports: [],
})
export class ConsultaModule {}
