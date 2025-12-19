import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from '../entities/paciente.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class PacienteService {
    constructor(
        @InjectRepository(Paciente)
        private pacienteRepository: Repository<Paciente>,
        private bcrypt: Bcrypt
    ) { }

    async findByUsuario(usuario: string): Promise<Paciente | null> {
        return await this.pacienteRepository.findOne({
            where: {
                usuario: usuario 
            }
        })
    }

    async findAll(): Promise<Paciente[]> {
        return await this.pacienteRepository.find();

    }

    async findById(id: number): Promise<Paciente> {

        const paciente = await this.pacienteRepository.findOne({
            where: {
                id
            }
        });

        if (!paciente)
            throw new HttpException('Paciente não encontrado!', HttpStatus.NOT_FOUND);

        return paciente;

    }

    async create(paciente: Paciente): Promise<Paciente> {
        
        const buscaPaciente = await this.findByUsuario(paciente.usuario);

        if (buscaPaciente)
            throw new HttpException("O Paciente já existe!", HttpStatus.BAD_REQUEST);

        paciente.senha = await this.bcrypt.criptografarSenha(paciente.senha)
        return await this.pacienteRepository.save(paciente);

    }

    async update(paciente: Paciente): Promise<Paciente> {

        await this.findById(paciente.id);

        const buscaPaciente = await this.findByUsuario(paciente.usuario);

        if (buscaPaciente && buscaPaciente.id !== paciente.id)
            throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

        paciente.senha = await this.bcrypt.criptografarSenha(paciente.senha)
        return await this.pacienteRepository.save(paciente);

    }

}