import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Consulta } from '../entities/consulta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EspecialidadeService } from '../../especialidade/services/especialidade.service';

@Injectable()
export class ConsultaService {
  constructor(
    @InjectRepository(Consulta)
    private readonly consultaRepository: Repository<Consulta>,
    private readonly especialidadeService: EspecialidadeService,
  ) {}

  async findAll(): Promise<Consulta[]> {
    return await this.consultaRepository.find({
      relations: {
        especialidade: true,
      },
    });
  }

  async findById(id: number): Promise<Consulta> {
    const consulta = await this.consultaRepository.findOne({
      where: {
        id,
      },
      relations: {
        especialidade: true,
      },
    });

    if (!consulta) {
      throw new HttpException('Consulta não encontrada', HttpStatus.NOT_FOUND);
    }

    return consulta;
  }

  async create(consulta: Consulta): Promise<Consulta> {
    return await this.consultaRepository.save(consulta);
  }

  async update(consulta: Consulta): Promise<Consulta> {
    const buscaConsulta = await this.findById(consulta.id);

    for (const [key, value] of Object.entries(consulta)) {
      if (value !== null && value !== undefined && value !== buscaConsulta[key]) {
        buscaConsulta[key] = value;
      }
    }

    return await this.consultaRepository.save(buscaConsulta);

  }

  async delete(id: number): Promise<void> {
    const consulta = await this.consultaRepository.findOne({
      where: { id },
    });

    if (!consulta) {
      throw new HttpException('Consulta não encontrada', HttpStatus.NOT_FOUND);
    }

    await this.consultaRepository.delete(id);
  }

  async toggleStatus(id: number): Promise<Consulta> {
    const buscaConsulta = await this.findById(id);

    if (buscaConsulta.realizado === false){
      buscaConsulta.realizado = true;
    }
    else {
      buscaConsulta.realizado = false;
    }

    return await this.consultaRepository.save(buscaConsulta);
  }
}
