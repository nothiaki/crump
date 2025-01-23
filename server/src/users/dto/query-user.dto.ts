import {
  IsUUID,
} from 'class-validator';

export class QueryIdUserDto {
  @IsUUID()
  id: string;
}
