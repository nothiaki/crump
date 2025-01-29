import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCrumpDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(14)
  from: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  content: string;
}
