import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Property } from './entities/property.entity';
import { Photo } from './entities/Photos.entity';
import { Booking } from './entities/bookings-entity';
import { Review } from './entities/review-entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
        User,
        Property,
        Photo,
        Booking,
        Review
      ]),
],
  controllers: [PropertiesController],
  providers: [PropertiesService],
})
export class PropertiesModule {}
