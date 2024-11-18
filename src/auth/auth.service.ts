import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs'
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(User) 
    private readonly UserRepository:Repository<User>,
    private jwtService: JwtService
  ){}
  
  
  async create(createUserDto: CreateUserDto) {
    
    try{
      
      const newUser = this.UserRepository.create({
        ...createUserDto,
        password: bcryptjs.hashSync(createUserDto.password)
        
      })
      
      const user = await this.UserRepository.save(newUser)
      
      return {
        username:user.username,
        token:this.getToken(user)
        }
    }
    catch(error){
      if(error.code='23505'){
        throw new BadRequestException(`no se puede realizar el registro , verifique los datos `)
      }
      throw new InternalServerErrorException('Algo salió mal!!')
    }
  }
  

  //hacer el try
  async login(LoginUserDto: LoginUserDto) {
  
    const {password, username} = LoginUserDto
    const user = await this.UserRepository.findOne({
      where:{username}
    })
    if(user && bcryptjs.compareSync(password,user.password))
      {
      return {
        username:user.username,
        token:this.getToken(user)
        }
      }
    throw new NotFoundException(`usuario o contraseña incorrecto`)
  
    
  }



  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(updateUserDto: UpdateUserDto) {
    console.log(updateUserDto)
    const { user_id, ...user }= updateUserDto;
    return this.UserRepository.update(
      { user_id },
      user);
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }




  private getToken(user:User):string{

    const {password, ...data_jwt} = user
    return this.jwtService.sign(data_jwt);
  }
}
