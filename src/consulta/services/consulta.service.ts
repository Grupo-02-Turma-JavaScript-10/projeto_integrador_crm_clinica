import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Consulta } from "../entities/consulta.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EspecialidadeService } from "../../especialidade/services/especialidade.service";
 
@Injectable()
export class ConsultaService{
    constructor(
        @InjectRepository(Consulta)
        private readonly consultaRepository: Repository<Consulta>,
        private readonly especialidadeService: EspecialidadeService,
    ) {}

    async findAll(): Promise<Consulta[]>{
        return await this.consultaRepository.find({
            relations: {
                especialidade: true
            }
        })
    }

    async create(consulta: Consulta): Promise<Consulta> {
        return await this.consultaRepository.save(consulta);
    }
    
}