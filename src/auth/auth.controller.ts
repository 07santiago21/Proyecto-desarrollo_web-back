import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './guards/auth/auth.guard';

@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.create(createUserDto);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      return await this.authService.login(loginUserDto);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Body() body: any) {
    try {
      console.log(body);
      return await this.authService.findAll();
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.authService.findOne(+id);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.authService.update(updateUserDto);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.authService.remove(+id);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }
}
