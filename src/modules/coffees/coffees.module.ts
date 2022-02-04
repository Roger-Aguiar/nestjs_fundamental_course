import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from 'src/controllers/coffees/coffees.controller';
import { Coffee } from 'src/entities/coffee/coffee.entity';
import { Flavor } from 'src/entities/coffee/flavor.entity';
import { Event } from 'src/entities/events/event.entity';
import { CoffeeService } from 'src/services/coffee/coffee.service';

class MockCoffeesService{}

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
    controllers: [CoffeesController], 
    providers: [{provide: CoffeeService, useValue: new MockCoffeesService()}],
    exports: [CoffeeService]
})

export class CoffeesModule {}
