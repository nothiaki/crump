import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  limit: number;

  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  offset: number;
}
