import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto {
    @Type(() => Number)
    @IsOptional()
    @IsPositive()
    limit: number;

    @Type()
    @IsOptional()
    @IsPositive()
    offset: number;
}
