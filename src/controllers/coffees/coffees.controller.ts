import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CoffeeService } from 'src/services/coffee/coffee.service';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeeService: CoffeeService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() body){
        return this.coffeeService.create(body);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    read(){
        return this.coffeeService.read();
    }

    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    update(@Param('id') param, @Body() body){
        return this.coffeeService.update(body, param.id);
    }

    @Delete(':id')    
    delete(@Param('id') id: string){
        return this.coffeeService.delete(id);
    }

    @Get(':id')
    readOne(@Param('id') id: string){
        return this.coffeeService.readById(id);
    }
        
}
