import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCoffeeDto } from 'src/dto/coffees/create-coffee.dto';
import { UpdateCoffeeDto } from 'src/dto/coffees/update-coffee.dto';
import { Coffee } from 'src/entities/coffee/coffee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoffeeService {
    constructor(@InjectRepository(Coffee) private readonly coffeeRepository: Repository<Coffee>,){}

    create(createCoffeeDto: CreateCoffeeDto){
        const coffee = this.coffeeRepository.create(createCoffeeDto);
        return this.coffeeRepository.save(coffee);
    }

    read(){
        return this.coffeeRepository.find();
    }

    async readById(id: number){
        const coffee = await this.coffeeRepository.findOne(id);
        if(!coffee)
        {
            throw new NotFoundException(`Coffee with id ${id} not found`);
        }       
        return coffee;
    }

    async update(id: number, updateCoffeeDto: UpdateCoffeeDto){
        const coffee = await this.coffeeRepository.preload({id: +id, ...updateCoffeeDto,});
        if(!coffee){
            throw new NotFoundException(`Coffee ${id} not found`);
        }
        return this.coffeeRepository.save(coffee);
    }

    async delete(id: number){
        const coffee = await this.readById(id);
        return this.coffeeRepository.remove(coffee);        
    }


}
