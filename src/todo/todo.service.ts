import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(private todoRepository: TodoRepository) {}

  findAll(userId: string): Promise<Task[]> {
    return this.todoRepository.findAll(userId);
  }

  findById(userId: string, taskId: number): Promise<Task> {
    return this.todoRepository.findById(userId, taskId);
  }

  createTask(userId: string, createTaskDto: CreateTaskDto): Promise<number> {
    return this.todoRepository.createTask(userId, createTaskDto);
  }

  updateTaskById(
    userId: string,
    taskId: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<number> {
    return this.todoRepository.updateTaskById(userId, taskId, updateTaskDto);
  }

  deleteTaskById(userId: string, taskId: number): Promise<number> {
    return this.todoRepository.deleteTaskById(userId, taskId);
  }
}
