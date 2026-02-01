import { IsEmail, isNotEmpty, IsNotEmpty, IsPhoneNumber } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Consulta } from "../../consulta/entities/consulta.entity";

@Entity({name: 'tb_pacientes'})
export class Paciente {
    
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    nome: string;

    //data de nascimento
    @IsNotEmpty()
    @Column({type: 'date', nullable: false})
    dataNasc: Date

    @IsNotEmpty()
    @IsPhoneNumber('BR')
    @Column({nullable: false})
    telefone: string;

    @IsNotEmpty()
    @IsEmail()
    @Column({nullable: false})
    email: string;

    @OneToMany(() => Consulta, (consulta) => consulta.paciente)
    consulta: Consulta[]
}