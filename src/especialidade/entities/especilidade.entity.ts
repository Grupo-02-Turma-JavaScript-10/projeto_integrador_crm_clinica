import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Consulta } from '../../consulta/entities/consulta.entity';

@Entity({ name: 'tb_especialidades' })
export class Especialidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  descricao: string;

  @OneToMany(() => Consulta, (consulta) => consulta.especialidade)
  consulta: Consulta[];
}
