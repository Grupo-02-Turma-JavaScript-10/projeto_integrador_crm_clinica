import { Body, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { PacienteService } from "../services/paciente.service";
import { Paciente } from "../entities/paciente.entity";

export class PacienteController {

  constructor(private readonly pacienteService: PacienteService) {}

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Paciente[]> {
    return this.pacienteService.findAll();
  }

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

  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  async update(@Body() paciente: Paciente): Promise<Paciente> {
    return this.pacienteService.update(paciente);
  }

}