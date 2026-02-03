import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Consulta } from '../../consulta/entities/consulta.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Especialidade } from '../../especialidade/entities/especialidade.entity';

@Entity({ name: 'tb_usuarios' })
export class Medico {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  nome: string;

  @IsNotEmpty()
  @Column({type: 'date', nullable: false})
  @ApiProperty()
  dataNasc: Date;

  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  usuario: string;

  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  senha: string;

  @Column({ length: 5000 })
  @ApiProperty()
  foto: string;

  @ApiProperty()
  @OneToMany(() => Consulta, (consulta) => consulta.medico)
  consulta: Consulta[];

  @ManyToOne(() => Especialidade, (especialidade) => especialidade.medico, {onDelete: 'CASCADE'})
  especialidade: Especialidade
}
