import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Consulta } from "../entities/consulta.entity";
import { EspecialidadeService } from "../../especialidade/services/especialidade.service";

@Injectable()
export class ConsultaService {
  constructor(
    @InjectRepository(Consulta)
    private readonly consultaRepository: Repository<Consulta>,
    private readonly especialidadeService: EspecialidadeService,
  ) {}

  async update(id: number, body: any): Promise<Consulta> {

    const consulta = await this.consultaRepository.findOne({
      where: { id },
      relations: ['especialidade', 'paciente'], // forma mais segura
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
      throw new HttpException('Erro ao atualizar consulta', HttpStatus.INTERNAL_SERVER_ERROR);
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
