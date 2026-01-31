import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Especialidade } from '../entities/especialidade.entity';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class EspecialidadeService {
  constructor(
    @InjectRepository(Especialidade)
    private especialidadeRepository: Repository<Especialidade>,
  ) {}

  async findAll(): Promise<Especialidade[]> {
    return await this.especialidadeRepository.find({
      relations: {
        consulta: true,
        medico: true,
      },
    });
  }

  async findById(id: number): Promise<Especialidade> {
    const especialidade = await this.especialidadeRepository.findOne({
      where: {
        id,
      },
    });

    if (!especialidade) {
      throw new HttpException(
        `Especialidade de id ${id} não encontrada!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return especialidade;
  }

  async findByNome(nome: string): Promise<Especialidade | null> {
    const especialidade = this.especialidadeRepository.findOne({
      where: {
        nome: this.capitalizeFirstLetter(nome),
      }
    })
    
    return especialidade;

  }

  async create(especialidade: Especialidade): Promise<Especialidade> {
    const buscaEspecialidade = await this.findByNome(especialidade.nome);

    if (buscaEspecialidade !== null) {
      return buscaEspecialidade;
    }

    especialidade.nome = this.capitalizeFirstLetter(especialidade.nome)

    return await this.especialidadeRepository.save(especialidade);
  }

  async update(especialidade: Especialidade): Promise<Especialidade> {
    return await this.especialidadeRepository.save(especialidade);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.especialidadeRepository.delete(id);
  }

  private capitalizeFirstLetter(text: string) {
    if (text.length === 0) {
      return text;
    }
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}
