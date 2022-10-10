import { ForbiddenException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

export class TodoRepository extends PrismaService {
  async findAll(userId: string): Promise<Task[]> {
    const tasks = await this.$queryRaw<
      Task[]
    >`SELECT * FROM Task WHERE userId=${userId} ORDER BY createdAt desc`;

    return tasks;
  }

  async findById(userId: string, taskId: number): Promise<Task> {
    const task = await this.$queryRaw<
      Task[]
    >`SELECT * FROM Task WHERE userId=${userId} AND id=${taskId}`;

    return task[0];
  }

  async createTask(
    userId: string,
    createTaskDto: CreateTaskDto,
  ): Promise<number> {
    const { title, description } = createTaskDto;
    const result = await this
      .$executeRaw`INSERT INTO Task (title, description, userId) VALUES (${title}, ${description}, ${userId})`;

    return result;
  }

  async updateTaskById(
    userId: string,
    taskId: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<number> {
    const task = await this.findById(userId, taskId);

    if (!task) throw new ForbiddenException('No permision to update');

    const { title, description } = updateTaskDto;
    const result = await this
      .$executeRaw`UPDATE Task SET title=${title}, description=${description}, updatedAt=${new Date()} WHERE id=${taskId}`;

    return result;
  }

  async deleteTaskById(userId: string, taskId: number): Promise<number> {
    const task = await this.findById(userId, taskId);

    if (!task) throw new ForbiddenException('No permision to update');

    const result = await this.$executeRaw`DELETE FROM Task WHERE id=${taskId}`;

    return result;
  }
}
