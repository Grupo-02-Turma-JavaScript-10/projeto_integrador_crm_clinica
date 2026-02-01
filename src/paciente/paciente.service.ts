import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm/browser';
import { IsPhoneNumber } from 'class-validator';

@Injectable()
export class PacienteService {

    constructor(
        @InjectRepository(Paciente)
        private pacienteRepository: Repository<Paciente>,
    ){}

    async findAll(): Promise<Paciente[]> {
        return await this.pacienteRepository.find();        
    }

    async findById(id: number): Promise<Paciente> {
        const paciente = await this.pacienteRepository.findOne({
            where: {
                id: id,
            }
        });

        if (!paciente) {
            throw new HttpException('Paciente não encontrado!', HttpStatus.NOT_FOUND);
        }

        return paciente;
    }

    async findByTelefone(telefone: string): Promise<Paciente | null> {
        const buscaPaciente = await this.pacienteRepository.findOne({
            where: {
                telefone: telefone,
            },
            relations: {
                consulta: true
            }
        });

        return buscaPaciente
    }

    async findByEmail(email: string): Promise<Paciente | null> {
        const buscaPaciente = await this.pacienteRepository.findOne({
            where: {
                email: email,
            },
            relations: {
                consulta: true
            }
        });

        return buscaPaciente
    }

    async create(paciente: Paciente): Promise<Paciente> {
        return await this.pacienteRepository.save(paciente);
    } 

    async update(paciente: Paciente): Promise<Paciente> {
        await this.findById(paciente.id);

        return await this.pacienteRepository.save(paciente);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.pacienteRepository.delete(id);
    }
}
