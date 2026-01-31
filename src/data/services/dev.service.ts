import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Consulta } from '../../consulta/entities/consulta.entity';
import { Especialidade } from '../../especialidade/entities/especialidade.entity';
import { Medico } from '../../medico/entities/medico.entity';

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
      entities: [Consulta, Especialidade, Medico],
      synchronize: true,
    };
  }
}
