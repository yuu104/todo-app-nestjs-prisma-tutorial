import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { CreateUserDto } from './dto/createUser.dto';
import { EditNickNameDto } from './dto/editNickName.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findById(@Param('id') id: string): Promise<User[]> {
    return this.userService.findById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<number> {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  editNickName(
    @GetUser() user: User,
    @Body() editNickNameDto: EditNickNameDto,
  ): Promise<number> {
    const { id } = user;
    return this.userService.editNickName(id, editNickNameDto);
  }
}
