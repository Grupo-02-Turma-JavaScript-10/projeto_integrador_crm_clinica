import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ConsultaService} from '../services/consulta.service';
import{Consulta} from '../entities/consulta.entity';


@Controller('/consulta')
export class ConsultaController{
 constructor(private readonly consultaService: ConsultaService){}

 @Post()
 create(@Body() consulta: Consulta): Promise<Consulta> {
    return this.consultaService.create(consulta);
 }
}