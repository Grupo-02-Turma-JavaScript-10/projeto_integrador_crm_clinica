import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Especialidade } from '../../especialidade/entities/especialidade.entity';
import { Paciente } from '../../paciente/entities/paciente.entity';

@Entity({ name: 'tb_consultas' })
export class Consulta {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ type: 'date', nullable: false })
  data: Date;

  @IsNotEmpty()
  @Column({ type: 'time', nullable: false })
  hora: string;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  nomePaciente: string;

  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  descricaoSintomas: string;

  @ManyToOne(() => Especialidade, (especialidade) => especialidade.consulta, {
    onDelete: 'CASCADE',
  })
  especialidade: Especialidade;

  @ManyToOne(() => Paciente, (paciente) => paciente.consulta, {
    onDelete: 'CASCADE',
  })
  paciente: Paciente;
}
