import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreatePhotoDto {
  
    @IsString()
    @IsNotEmpty()
    photo_url: string;


    @IsString()
    user_id:string;

}
