import { IsInt, Min, Max, IsOptional, IsString, isString } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @Min(1) // Valor mínimo
  @Max(5) // Valor máximo
  rating: number; // Calificación del 1 al 5

  @IsString()
  @IsOptional()
  comment: string; // Comentario opcional

  @IsOptional()
  @IsString()
  user_id:string;
}
