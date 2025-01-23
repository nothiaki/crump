import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { QueryIdUserDto } from './dto/query-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async find() {
    const users = await this.usersService.find();

    const usersFiltered = users.map((user) => {
      return new ResponseUserDto(user);
    });

    return usersFiltered;
  }

  @Get(':id')
  async findOne(@Param() queryIdUserDto: QueryIdUserDto) {
    const user = await this.usersService.findOne(queryIdUserDto);
    return new ResponseUserDto(user);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return new ResponseUserDto(user);
  }
}
