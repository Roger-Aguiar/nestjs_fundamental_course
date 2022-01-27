import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from 'src/controllers/coffees/coffees.controller';
import { Coffee } from 'src/entities/coffee/coffee.entity';
import { CoffeeService } from 'src/services/coffee/coffee.service';

@Module({
    imports: [TypeOrmModule.forFeature([Coffee])],
    controllers: [CoffeesController], 
    providers: [CoffeeService]})

export class CoffeesModule {}
