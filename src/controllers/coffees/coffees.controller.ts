import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() body){
        return body;
    }
    @Get()
    @HttpCode(HttpStatus.OK)
    read(){
        return "Hello! This is the list of our coffees!";
    }

    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    update(@Param('id') param, @Body() body){
        return `This operation updates the coffee ${param.id}.`;
    }

    @Delete(':id')    
    delete(@Param('id') id: string){
        return `This operation deletes the coffee ${id}.`;
    }

    @Get(':id')
    readOne(@Param('id') id: string){
        return `This action returns ${id} coffee!`;
    }
        
}
