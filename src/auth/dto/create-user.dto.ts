import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";


export class CreateUserDto {
    @IsString()
    username:string //(Nombre de usuario único)
    
    @IsEmail()
    email:string //(Correo electrónico único)
    
    @IsString()
    password:string //(Hash de la contraseña)
    
    @IsOptional()
    @IsString()
    profile_picture:string //(URL de la foto de perfil, opcional)
    
    @IsOptional()
    @IsString()
    bio:string //(Biografía, opcional)


}
