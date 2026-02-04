import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { MedicoService } from "../services/medico.service";
import { Medico } from "../entities/medico.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('Medicos')
@Controller('medicos')
export class MedicoController {

  constructor(private readonly medicoService: MedicoService) {}

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Medico[]> {
    return this.medicoService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Medico> {
    return this.medicoService.findById(id);
  }

  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() medico: Medico): Promise<Medico> {
    return this.medicoService.create(medico);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  async update(@Body() medico: Medico): Promise<Medico> {
    return this.medicoService.update(medico);
  }

}