import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateInDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(14)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(24)
  password: string;
}
