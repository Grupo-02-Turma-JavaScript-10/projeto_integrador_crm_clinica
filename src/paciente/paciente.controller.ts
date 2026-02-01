import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { Paciente } from './entities/paciente.entity';
import { ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

@Controller('paciente')
@ApiTags('Pacientes')
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

    @Get('/:telefone')
    @HttpCode(HttpStatus.OK)
    findByTelefone(@Param('telefone') id: number): Promise<Paciente | null> {
        return this.pacienteService.findById(id);
    }    

    @Get('/:email')
    @HttpCode(HttpStatus.OK)
    findByEmail(@Param('email') id: number): Promise<Paciente | null> {
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
    
    @Delete('/delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.pacienteService.delete(id);
    }

}
