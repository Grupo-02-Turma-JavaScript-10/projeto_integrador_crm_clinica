import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medico } from '../entities/medico.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class MedicoService {
    constructor(
        @InjectRepository(Medico)
        private medicoRepository: Repository<Medico>,
        private bcrypt: Bcrypt
    ) { }

    async findByUsuario(usuario: string): Promise<Medico | null> {
        return await this.medicoRepository.findOne({
            where: {
                usuario: usuario 
            },
            relations: ['especialidade', 'consulta']
        })
    }

    async findAll(): Promise<Medico[]> {
        return await this.medicoRepository.find();

    }

    async findById(id: number): Promise<Medico> {

        const medico = await this.medicoRepository.findOne({
            where: {
                id
            }
        });

        if (!medico)
            throw new HttpException('Medico não encontrado!', HttpStatus.NOT_FOUND);

        return medico;

    }

    async create(medico: Medico): Promise<Medico> {
        
        const buscaMedico = await this.findByUsuario(medico.usuario);

        if (buscaMedico)
            throw new HttpException("O Medico já existe!", HttpStatus.BAD_REQUEST);

        medico.senha = await this.bcrypt.criptografarSenha(medico.senha)
        return await this.medicoRepository.save(medico);

    }

    async update(medico: Medico): Promise<Medico> {

        await this.findById(medico.id);

        const buscaMedico = await this.findByUsuario(medico.usuario);

        if (buscaMedico && buscaMedico.id !== medico.id)
            throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

        medico.senha = await this.bcrypt.criptografarSenha(medico.senha)
        return await this.medicoRepository.save(medico);

    }

}