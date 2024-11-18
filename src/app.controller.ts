import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { request } from 'http';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  
  @Post()
  create( @Req() request){
    console.log(request);
  }
}
