import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ConsultaService} from '../services/consulta.service';
import{Consulta} from '../entities/consulta.entity';


@Controller('/consulta')
export class ConsultaController{
 constructor(private readonly consultaService: ConsultaService){}



@Put (':id')

@HttpCode (HttpStatus.OK)
update
 (@Param('id', ParseIntPipe) id:number, 
@Body() body:any,
) {
    return this.consultaService.update(id, body);
}
@Delete (':id')

@HttpCode (HttpStatus.NO_CONTENT)
delete
 (@Param('id', ParseIntPipe) id:number,
): Promise<void> {
    return this.consultaService.delete(id);
}
}

