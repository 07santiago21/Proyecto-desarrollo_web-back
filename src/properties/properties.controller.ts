import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {

    return this.propertiesService.create(createPropertyDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.propertiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
  return this.propertiesService.findByUser(userId);
  }


  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesService.update(id, updatePropertyDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string,@Body() body) {

    const user_id = body.user_id
    return this.propertiesService.remove(id,user_id);
  }
}
