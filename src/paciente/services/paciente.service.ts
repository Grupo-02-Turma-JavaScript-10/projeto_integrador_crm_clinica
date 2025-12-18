import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from '../entities/paciente.entity';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private pacienteRepository: Repository<Paciente>,
  ) {}

  // 🔐 login
  findByUsuario(usuario: string) {
    return this.pacienteRepository.findOne({
      where: { usuario },
    });
  }

  // 📝 cadastro
  create(paciente: Paciente) {
    return this.pacienteRepository.save(paciente);
  }

  // 📋 listar pacientes (rota protegida)
  findAll() {
    return this.pacienteRepository.find();
  }
}
