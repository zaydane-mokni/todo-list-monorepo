import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { TaskStatus } from '../types/task-status.enum';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50, { message: 'title must be between 3 and 50 characters' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 255, { message: 'description must be between 5 and 255 characters' })
  description: string;

  @IsEnum(TaskStatus, { message: 'status must be one of: TODO, IN_PROGRESS, DONE' })
  status: TaskStatus;
}
