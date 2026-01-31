import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultaModule } from './consulta/consulta.module';
import { EspecialidadeModule } from './especialidade/especialidade.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { MedicoModule } from './medico/medico.module';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';
import { DevService } from './data/services/dev.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: DevService,
      imports: [ConfigModule],
    }),
    ConsultaModule,
    EspecialidadeModule,
    AuthModule,
    MedicoModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
