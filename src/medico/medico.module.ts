import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './entities/medico.entity';
import { AuthModule } from '../auth/auth.module';
import { MedicoService } from './services/medico.service';
import { MedicoController } from './controllers/medico.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Medico]),
    forwardRef(()=> AuthModule)
  ], 
  providers: [MedicoService],
  controllers: [MedicoController],
  exports: [MedicoService],
})
export class MedicoModule {}