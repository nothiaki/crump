import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RequestUserDto } from './dto/request-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';

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
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return new ResponseUserDto(user);
  }

  @Post()
  async create(@Body() createUserDto: RequestUserDto) {
    const user = await this.usersService.create(createUserDto);
    return new ResponseUserDto(user);
  }
}
