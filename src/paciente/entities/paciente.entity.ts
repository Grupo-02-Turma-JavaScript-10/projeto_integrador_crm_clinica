import { IsEmail, isNotEmpty, IsNotEmpty, IsPhoneNumber } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Consulta } from "../../consulta/entities/consulta.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'tb_pacientes'})
export class Paciente {
    
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    nome: string;

    //data de nascimento
    @ApiProperty()
    @IsNotEmpty()
    @Column({type: 'date', nullable: false})
    dataNasc: Date

    @ApiProperty()
    @IsNotEmpty()
    @IsPhoneNumber('BR')
    @Column({nullable: false})
    telefone: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @Column({nullable: false})
    email: string;

    @ApiProperty()
    @OneToMany(() => Consulta, (consulta) => consulta.paciente)
    consulta: Consulta[]
}