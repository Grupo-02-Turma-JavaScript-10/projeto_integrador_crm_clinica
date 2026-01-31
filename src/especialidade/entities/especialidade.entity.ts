import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Consulta } from '../../consulta/entities/consulta.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Medico } from '../../medico/entities/medico.entity';
import { IsNotEmpty } from 'class-validator';

@Entity({ name: 'tb_especialidades' })
export class Especialidade {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 255, nullable: false })
  @ApiProperty()
  nome: string;

  @OneToMany(() => Medico, (medico) => medico.especialidade)
  medico: Medico[]

  @ApiProperty()
  @OneToMany(() => Consulta, (consulta) => consulta.especialidade)
  consulta: Consulta[];
}
