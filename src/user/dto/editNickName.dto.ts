import { IsOptional, IsString } from 'class-validator';

export class EditNickNameDto {
  @IsString()
  @IsOptional()
  nickName: string;
}
