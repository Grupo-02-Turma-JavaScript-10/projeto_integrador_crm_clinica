import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ConsultaService } from '../services/consulta.service';
import { Consulta } from '../entities/consulta.entity';

@Controller('/consulta')
export class ConsultaController {
  constructor(private readonly consultaService: ConsultaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Consulta[]> {
    return this.consultaService.findAll();
  }
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Consulta> {
    return this.consultaService.findById(id);
  }

  @Post()
  create(@Body() consulta: Consulta): Promise<Consulta> {
    return this.consultaService.create(consulta);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id', ParseIntPipe) id: number) {
    return this.consultaService.update(id, Body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.consultaService.delete(id);
  }
}
