import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { PacienteService } from "../services/paciente.service";
import { Paciente } from "../entities/paciente.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('Paciente')
@Controller('Pacientes')
export class PacienteController {

  constructor(private readonly pacienteService: PacienteService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Paciente[]> {
    return this.pacienteService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Paciente> {
    return this.pacienteService.findById(id);
  }

  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() paciente: Paciente): Promise<Paciente> {
    return this.pacienteService.create(paciente);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  async update(@Body() paciente: Paciente): Promise<Paciente> {
    return this.pacienteService.update(paciente);
  }

}