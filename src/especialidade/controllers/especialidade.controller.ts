import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Especialidade } from '../entities/especilidade.entity';
import { DeleteResult } from 'typeorm';
import { EspecialidadeService } from '../services/especialidade.service';

@Controller('especialidade')
export class EspecialidadeController {
  constructor(private especialidadeService: EspecialidadeService) {}

  @Get()
  findAll(): Promise<Especialidade[]> {
    return this.especialidadeService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<Especialidade> {
    return this.especialidadeService.findById(id);
  }

  @Post()
  create(@Body() especialidade: Especialidade): Promise<Especialidade> {
    return this.especialidadeService.create(especialidade);
  }

  @Put()
  update(@Body() especialidade: Especialidade): Promise<Especialidade> {
    return this.especialidadeService.update(especialidade);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.especialidadeService.delete(id);
  }
}
