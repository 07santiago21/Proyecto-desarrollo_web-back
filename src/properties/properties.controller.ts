import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createPropertyDto: CreatePropertyDto) {
    try {
      return await this.propertiesService.create(createPropertyDto);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    try {
      return await this.propertiesService.findAll();
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.propertiesService.findOne(id);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    try {
      return await this.propertiesService.findByUser(userId);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    try {
      return await this.propertiesService.update(id, updatePropertyDto);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Body() body) {
    try {
      const user_id = body.user_id;
      return await this.propertiesService.remove(id, user_id);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Post('photo/:propertyId')
  async createPhoto(@Param('propertyId') id: string, @Body() createPhotoDto: CreatePhotoDto) {
    try {
      return await this.propertiesService.createPhoto(id, createPhotoDto);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Post('booking/:propertyId')
  async createBooking(@Param('propertyId') propertyId: string, @Body() createBookingDto: CreateBookingDto) {
    try {
      return await this.propertiesService.createBooking(propertyId, createBookingDto);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Get('booking/:id')
  async getUserBookings(@Param('id') id: string, @Body() body) {
    try {
      const userId = body.user_id;
      return await this.propertiesService.getUserBookings(userId);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Delete('booking/:bookingId')
  async cancelBooking(@Param('bookingId') bookingId: string, @Body() body) {
    try {
      const userId = body.user_id;
      return await this.propertiesService.cancelBooking(bookingId, userId);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Post('review/:propertyId')
  async leaveReview(@Param('propertyId') propertyId: string, @Body() createReviewDto: CreateReviewDto) {
    try {
      const { user_id, ...data } = createReviewDto;
      return await this.propertiesService.leaveReview(propertyId, user_id, createReviewDto);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }

  @UseGuards(AuthGuard)
  @Get('propertyReviews/:propertyId')
  async getReviewsByProperty(@Param('propertyId') propertyId: string) {
    try {
      return await this.propertiesService.getReviewsByProperty(propertyId);
    } catch (error) {
      return { message: 'No se pudo realizar la operación', error: error.message };
    }
  }
}
