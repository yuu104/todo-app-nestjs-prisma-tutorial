import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/createUser.dto';
import { EditNickNameDto } from './dto/editNickName.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findById(userId: string): Promise<User[]> {
    return this.userRepository.findById(userId);
  }

  createUser(createUserDto: CreateUserDto): Promise<number> {
    return this.userRepository.createUser(createUserDto);
  }

  editNickName(
    userId: string,
    editNickNameDto: EditNickNameDto,
  ): Promise<number> {
    return this.userRepository.editNickName(userId, editNickNameDto);
  }
}
