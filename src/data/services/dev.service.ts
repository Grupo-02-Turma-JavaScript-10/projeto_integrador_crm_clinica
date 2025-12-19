import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Consulta } from '../../consulta/entities/consulta.entity';
import { Especialidade } from '../../especialidade/entities/especilidade.entity';
import { Paciente } from '../../paciente/entities/paciente.entity';

@Injectable()
export class DevService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_clinica',
      entities: [Consulta, Especialidade, Paciente],
      synchronize: true,
    };
  }
}
