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
  UseGuards,
} from '@nestjs/common';
import { Especialidade } from '../entities/especialidade.entity';
import { DeleteResult } from 'typeorm';
import { EspecialidadeService } from '../services/especialidade.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';


@ApiTags('Especialidade')
@Controller('especialidade')
export class EspecialidadeController {
  constructor(private especialidadeService: EspecialidadeService) {}

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Especialidade[]> {
    return this.especialidadeService.findAll();
  }

  @Get('/id/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Especialidade> {
    return this.especialidadeService.findById(id);
  }
  
  @ApiBearerAuth()
  @Post('/new')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() especialidade: Especialidade): Promise<Especialidade> {
    return this.especialidadeService.create(especialidade);
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/update')
  @HttpCode(HttpStatus.OK)
  update(@Body() especialidade: Especialidade): Promise<Especialidade> {
    return this.especialidadeService.update(especialidade);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.especialidadeService.delete(id);
  }
}
