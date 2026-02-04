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
import { ConsultaService } from '../services/consulta.service';
import { Consulta } from '../entities/consulta.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@ApiTags('Consulta')
@Controller('/consulta')
export class ConsultaController {
  constructor(private readonly consultaService: ConsultaService) {}
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Consulta[]> {
    return this.consultaService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/id/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Consulta> {
    return this.consultaService.findById(id);
  }

  @Post('/new')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() consulta: Consulta): Promise<Consulta> {
    return this.consultaService.create(consulta);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/update')
  @HttpCode(HttpStatus.OK)
  update(@Body() consulta: Consulta): Promise<Consulta> {
    return this.consultaService.update(consulta);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.consultaService.delete(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/toggle-status/:id')
  @HttpCode(HttpStatus.OK)
  toggleStatus(@Param('id', ParseIntPipe) id: number): Promise<Consulta> {
    return this.consultaService.toggleStatus(id);
  }
}
