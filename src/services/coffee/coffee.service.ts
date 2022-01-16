import { Injectable } from '@nestjs/common';
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

    readById(id: string){
        return this.coffees.find(item => item.id === +id);
    }

    update(coffeeDto: any, id: string){
        const existingCoffee = this.readById(id);
        if(existingCoffee){
            return 'Operation has been completed.';
        }
    }

    delete(id: string){
        const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
        if(coffeeIndex >= 0){
            this.coffees.splice(coffeeIndex, 1);
        }
    }


}