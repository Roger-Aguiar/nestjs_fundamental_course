import { IsInt, IsString } from "class-validator";

export class CreateCoffeeDto {
    @IsInt()
    readonly id: number;
    
    @IsString()
    readonly name: string;

    @IsString()
    readonly brand: string;

    @IsString({each: true})
    readonly flavors: string[];
}
