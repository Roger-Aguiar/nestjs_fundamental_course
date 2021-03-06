import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { query } from 'express';
import { CreateCoffeeDto } from 'src/dto/coffees/create-coffee.dto';
import { UpdateCoffeeDto } from 'src/dto/coffees/update-coffee.dto';
import { PaginationQueryDto } from 'src/dto/common/pagination-query';
import { Coffee } from 'src/entities/coffee/coffee.entity';
import { Flavor } from 'src/entities/coffee/flavor.entity';
import { Event } from 'src/entities/events/event.entity';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class CoffeeService {
    constructor(@InjectRepository(Coffee) private readonly coffeeRepository: Repository<Coffee>,
                @InjectRepository(Flavor) private readonly flavorRepository: Repository<Flavor>,
                private readonly connection: Connection){}

    async create(createCoffeeDto: CreateCoffeeDto){
        const flavors = await Promise.all(createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),);
        const coffee = this.coffeeRepository.create({...createCoffeeDto, flavors,});
        return this.coffeeRepository.save(coffee);
    }
    
    private async preloadFlavorByName(name: string): Promise<Flavor> {
        const existingFlavor = await this.flavorRepository.findOne({name});
        if(existingFlavor){
            return existingFlavor;
        }
        return this.flavorRepository.create({name})
    }

    read(paginationQuery: PaginationQueryDto){
        const { limit, offset } = paginationQuery; 
        return this.coffeeRepository.find({relations: ['flavors'], skip: offset, take: limit});
    }

    async readById(id: number){
        const coffee = await this.coffeeRepository.findOne(id, {relations: ['flavors'],});
        if(!coffee)
        {
            throw new NotFoundException(`Coffee with id ${id} not found`);
        }       
        return coffee;
    }

    async update(id: number, updateCoffeeDto: UpdateCoffeeDto){
        const flavors = updateCoffeeDto.flavors && (await Promise.all(updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),));
        const coffee = await this.coffeeRepository.preload({id: +id, ...updateCoffeeDto, flavors});
        if(!coffee){
            throw new NotFoundException(`Coffee ${id} not found`);
        }
        return this.coffeeRepository.save(coffee);
    }

    async delete(id: number){
        const coffee = await this.readById(id);
        return this.coffeeRepository.remove(coffee);        
    }

    async recommendCoffee(coffee: Coffee){
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            coffee.recommendations++;
            const recommendEvent = new Event();
            recommendEvent.name = 'recommend_coffee';
            recommendEvent.type = 'coffee';
            recommendEvent.payload = { coffeeId: coffee.id };

            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);
            await queryRunner.commitTransaction();
        }catch(err){
            await queryRunner.rollbackTransaction();            
        }finally{
            await queryRunner.release();
        }
    }

}
