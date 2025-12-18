import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Consulta } from '../../consulta/entities/consulta.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_especialidades' })
export class Especialidade {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @ApiProperty()
  nome: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @ApiProperty()
  descricao: string;

  @ApiProperty()
  @OneToMany(() => Consulta, (consulta) => consulta.especialidade)
  consulta: Consulta[];
}
