import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  user_id: string; 

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  profile_picture?: string; 

  @IsOptional()
  @IsString()
  bio?: string;
}
