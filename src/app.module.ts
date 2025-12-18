import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Consulta } from './consulta/entities/consulta.entity';
import { Especialidade } from './especialidade/entities/especilidade.entity';
import { Paciente } from './paciente/entities/paciente.entity';

import { ConsultaModule } from './consulta/consulta.module';
import { EspecialidadeModule } from './especialidade/especialidade.module';
import { PacienteModule } from './paciente/paciente.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_clinica',
      entities: [
        Consulta,
        Especialidade,
        Paciente, // 👈 agora é a entidade principal de autenticação
      ],
      synchronize: true,
    }),
    ConsultaModule,
    EspecialidadeModule,
    PacienteModule, // 👈 entra no lugar do UsuarioModule
    AuthModule,
  ],
})
export class AppModule {}
