import { IsString, IsNumber, IsUUID } from 'class-validator';

export class CreatePropertyDto {
  @IsUUID()
  user_id: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  address: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsNumber()
  price_per_night: number;

  @IsNumber()
  num_bedrooms: number;

  @IsNumber()
  num_bathrooms: number;

  @IsNumber()
  max_guests: number;
}
