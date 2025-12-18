import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { PacienteService } from '../services/paciente.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('pacientes')
export class PacienteController {
  constructor(private pacienteService: PacienteService) {}

  // 🔓 rota pública (exemplo)
  @Post('publico')
  create(@Body() paciente: any) {
    return this.pacienteService.create(paciente);
  }

  // 🔐 rota protegida
  @UseGuards(JwtAuthGuard)
  @Get('perfil')
  perfil(@Req() req: any) {
    return {
      message: 'Acesso autorizado',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      usuario: req.user,
    };
  }

  // 🔐 listar pacientes
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return this.pacienteService.findAll();
  }
}
