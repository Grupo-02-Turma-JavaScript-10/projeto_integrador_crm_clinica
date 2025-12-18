import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consulta } from './consulta/entities/consulta.entity';
import { ConsultaModule } from './consulta/consulta.module';
import { EspecialidadeModule } from './especialidade/especialidade.module';
import { EspecialidadeModule } from './especialidade/especialidade.module';
import { Especialidade } from './especialidade/entities/especialidade.entity';
import { EspecialidadeModule } from './especialidade/especialidade.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_clinica',
      entities: [Consulta, Especialidade],
      synchronize: true,
    }),
    ConsultaModule,
    EspecialidadeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
