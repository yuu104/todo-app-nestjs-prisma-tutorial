import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Task, User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@GetUser() user: User): Promise<Task[]> {
    return this.todoService.findAll(user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findById(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) taskId: number,
  ): Promise<Task> {
    return this.todoService.findById(user.id, taskId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createTask(
    @GetUser() user: User,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<number> {
    return this.todoService.createTask(user.id, createTaskDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  updateTaskById(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) taskId: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<number> {
    return this.todoService.updateTaskById(user.id, taskId, updateTaskDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteTaskById(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) taskId: number,
  ): Promise<number> {
    return this.todoService.deleteTaskById(user.id, taskId);
  }
}
