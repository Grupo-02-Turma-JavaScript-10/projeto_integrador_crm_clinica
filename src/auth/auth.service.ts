import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PacienteService } from '../paciente/services/paciente.service';
import { Paciente } from '../paciente/entities/paciente.entity';

@Injectable()
export class AuthService {
  constructor(
    private pacienteService: PacienteService,
    private jwtService: JwtService,
  ) {}

  // 📌 REGISTRO
  async registrar(usuario: string, senha: string, nome: string, foto: string) {
    const hash = await bcrypt.hash(senha, 10);

    const paciente: Paciente = {
      id: 0,
      nome: nome, // ✅ agora usa o nome recebido
      usuario: usuario, // ✅ correto
      senha: hash,
      foto: foto, // ✅ agora usa a foto recebida
      consulta: [],
    };

    return this.pacienteService.create(paciente);
  }

  // 🔐 LOGIN
  async login(usuario: string, senha: string) {
    const paciente = await this.pacienteService.findByUsuario(usuario);

    if (!paciente || !(await bcrypt.compare(senha, paciente.senha))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return {
      access_token: this.jwtService.sign({
        sub: paciente.id,
        usuario: paciente.usuario,
      }),
    };
  }
}
