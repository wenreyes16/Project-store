import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMarcaDto } from '../dto/marca.dto';
import { Modelo } from '../entities/modelo.entity';
import { CreateModeloDto } from '../dto/modelo.dto';

@Injectable()
export class ModeloService{
    constructor(
        @InjectRepository(Modelo)
        private modeloRepo: Repository<Modelo>
    ){}

    async create(createModeloDto:CreateModeloDto){
        const modelo = this.modeloRepo.create(createModeloDto);
        await  this.modeloRepo.save(modelo);
        return modelo;
    }


    findOne(id: number){
        return this.modeloRepo.findOne({
            where: {id},
            relations: {
               marca: true,
               autor: true
            }
       
        });
   }
  
    findAll(){
        return   this.modeloRepo.find({
            order: {id: 'ASC'},
            relations: {
                marca: true,
                autor: true
             }
        });
    }


    async remove(id:number){
        const modelo =await this.findOne(id);
        await this.modeloRepo.remove(modelo);
    }


    async update(id: number, cambios: CreateModeloDto){
        const oldModelo = await this.findOne(id);
        const updateModelo = await this.modeloRepo.merge(oldModelo, cambios);
        return this.modeloRepo.save(updateModelo);
    }
}