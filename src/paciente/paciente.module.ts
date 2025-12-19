import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity';
import { AuthModule } from '../auth/auth.module';
import { PacienteService } from './services/paciente.service';
import { PacienteController } from './controllers/paciente.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Paciente]),
    forwardRef(()=> AuthModule)
  ], 
  providers: [PacienteService],
  controllers: [PacienteController],
  exports: [PacienteService],
})
export class PacienteModule {}