import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { EditNickNameDto } from './dto/editNickName.dto';

export class UserRepository extends PrismaService {
  async findById(userId: string): Promise<User[]> {
    const user = await this.$queryRaw<
      User[]
    >`SELECT * FROM User WHERE id=${userId}`;

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<number> {
    const { id } = createUserDto;
    const result = await this.$executeRaw`INSERT INTO User (id) VALUES (${id})`;

    return result;
  }

  async editNickName(
    userId: string,
    editNickNameDto: EditNickNameDto,
  ): Promise<number> {
    const { nickName } = editNickNameDto;
    const result = await this
      .$executeRaw`UPDATE User SET nickName=${nickName}, updatedAt=${new Date()} WHERE id=${userId}`;

    return result;
  }
}
