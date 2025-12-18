import { Module } from '@nestjs/common';
import { EspecialidadeService } from './services/especialidade.service';
import { EspecialidadeController } from './controllers/especialidade.controller';

@Module({
    

  providers: [EspecialidadeService],
    

  controllers: [EspecialidadeController]
})
export class EspecialidadeModule {}
