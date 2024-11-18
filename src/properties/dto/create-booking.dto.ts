import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookingDto {
    @IsDateString()
    @IsNotEmpty()
    start_date: string; 

    @IsDateString()
    @IsNotEmpty()
    end_date: string; 

    @IsString()
    user_id:string;

}
