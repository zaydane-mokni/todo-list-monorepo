import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { TaskStatus } from '../types/task-status.enum';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @Length(3, 50, { message: 'title must be between 3 and 50 characters' })
  title?: string;

  @IsOptional()
  @IsString()
  @Length(5, 255, { message: 'description must be between 5 and 255 characters' })
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus, { message: 'status must be one of: TODO, IN_PROGRESS, DONE' })
  status?: TaskStatus;
}
