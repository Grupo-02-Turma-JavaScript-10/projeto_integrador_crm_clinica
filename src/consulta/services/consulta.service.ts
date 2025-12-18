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
    let consulta = await this.consultaRepository.findOne({
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

  async update(id: number, body: any): Promise<Consulta> {
    const consulta = await this.consultaRepository.findOne({
      where: { id },
      relations: ['especialidade', 'paciente'],
    });

    if (!consulta) {
      throw new HttpException('Consulta não encontrada', HttpStatus.NOT_FOUND);
    }

    if (body.especialidadeId) {
      await this.especialidadeService.findById(body.especialidadeId);
    }

    await this.consultaRepository.update(id, body);

    const consultaAtualizada = await this.consultaRepository.findOne({
      where: { id },
      relations: ['especialidade', 'paciente'],
    });

    if (!consultaAtualizada) {
      throw new HttpException(
        'Erro ao atualizar consulta',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return consultaAtualizada;
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
}
