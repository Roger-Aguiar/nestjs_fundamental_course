import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from 'src/entities/coffee/coffee.entity';

@Injectable()
export class CoffeeService {
    private coffees: Coffee[] = [
        {
            id: 1,
            name: 'Shipwreck Roast',
            brand: 'Buddy Brew',
            flavors: ['chocolate', 'vanilla'],
        },
    ];

    create(coffeeDto: any){
        this.coffees.push(coffeeDto);
    }

    read(){
        return this.coffees;
    }

    readById(id: number){
        const coffee = this.coffees.find(item => item.id === id);
        if(!coffee)
        {
            throw new NotFoundException(`Coffee with id ${id} not found`);
        }       
        return coffee;
    }

    update(coffeeDto: any, id: number){
        const existingCoffee = this.readById(id);
        //const existingCoffee = this.readById(id);
        if(existingCoffee){
            return 'Operation has been completed.';
        }
    }

    delete(id: number){
        const coffee = this.coffees.find(item => item.id === +id);
        if(!coffee)
        {
            throw new NotFoundException(`Coffee with id number ${id} was not found.`);
        }
        else{
            const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
            if(coffeeIndex >= 0){
                this.coffees.splice(coffeeIndex, 1);
            }
        }
        
    }


}
