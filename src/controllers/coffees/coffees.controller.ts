import { Controller, Get, Param } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
    @Get()
    findAll(){
        return "Hello! This is the list of our coffees!";
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return `This action returns ${id} coffee!`;
    }
}
