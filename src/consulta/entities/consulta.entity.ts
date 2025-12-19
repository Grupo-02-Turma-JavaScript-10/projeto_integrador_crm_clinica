import { Especialidade } from './../../especialidade/entities/especilidade.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Paciente } from '../../paciente/entities/paciente.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_consultas' })
export class Consulta {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ type: 'date', nullable: false })
  @ApiProperty()
  data: Date;

  @Column({ type: 'time', nullable: false })
  @ApiProperty()
  hora: string;

  @Column({ length: 1000, nullable: false })
  @ApiProperty()
  descricaoSintomas: string;

  @Column({ type: 'boolean', default: false })
  @ApiProperty()
  realizado: boolean;

  @ApiProperty()
  @ManyToOne(() => Especialidade, (especialidade) => especialidade.consulta, {
    onDelete: 'CASCADE',
  })
  especialidade: Especialidade;

  @ApiProperty()
  @ManyToOne(() => Paciente, (paciente) => paciente.consulta, {
    onDelete: 'CASCADE',
  })
  paciente: Paciente;
}
