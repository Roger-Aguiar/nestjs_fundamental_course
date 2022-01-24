import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateCoffeeDto } from 'src/dto/coffees/create-coffee.dto';
import { UpdateCoffeeDto } from 'src/dto/coffees/update-coffee.dto';
import { CoffeeService } from 'src/services/coffee/coffee.service';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeeService: CoffeeService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createCoffeeDto: CreateCoffeeDto){
        return this.coffeeService.create(createCoffeeDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    read(){
        return this.coffeeService.read();
    }

    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto){       
        return this.coffeeService.update(updateCoffeeDto, id);
    }

    @Delete(':id')    
    delete(@Param('id') id: number){
        return this.coffeeService.delete(id);
    }

    @Get(':id')
    readOne(@Param('id') id: number){
        return this.coffeeService.readById(id);
    }
        
}
