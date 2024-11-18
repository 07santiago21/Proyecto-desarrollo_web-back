import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './entities/Photos.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/bookings-entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review-entity';

@Injectable()
export class PropertiesService {

  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    
  

  ) {}

  async create(createPropertyDto: CreatePropertyDto) {
    const { user_id, ...propertyData } = createPropertyDto;

    // Verificar si el usuario existe y si es propietario
    const user = await this.userRepository.findOne({ where: { user_id } });

    if (!user) {
      throw new BadRequestException('El usuario no existe');
    }

    if (!user.is_owner) {
      throw new BadRequestException('El usuario no tiene permisos para crear propiedades');
    }

    // Crear la propiedad asociada al usuario
    const newProperty = this.propertyRepository.create({
      ...propertyData,
      user,
    });

    const {user:User,...property} = await this.propertyRepository.save(newProperty);

    return  property
  }

  async findAll() {
      const properties = await this.propertyRepository.find({
        relations: ['user'], // Cargar la relación con el usuario
      });
    
      // Transformar para incluir solo `user_id`
      return properties.map((property) => {
        const { user, ...propertyData } = property;
        return { ...propertyData, user_id: user.user_id };
        })}


  async findOne(id: string) {
    const property = await this.propertyRepository.findOne({
      where: { listing_id: id },
      relations: ['user'], 
    });

    if (!property) {
      throw new Error(`La propiedad con ID ${id} no fue encontrada`);
    }

    const { user, ...propertyData } = property;
    return { ...propertyData, user_id: user.user_id }; 
    }




    async findByUser(userId: string) {
      try {
        const properties = await this.propertyRepository.find({
          where: { user: { user_id: userId } },
          relations: ['user'],
        });
    
        if (properties.length === 0) {
          throw new NotFoundException(`No se encontraron propiedades para el usuario con ID ${userId}`);
        }
    
        return properties.map((property) => {
          const { user, ...propertyData } = property;
          return { ...propertyData, user_id: user.user_id };
        });
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new Error(
          `Ocurrió un error al intentar obtener las propiedades del usuario con ID ${userId}: ${error.message}`,
        );
      }}
    
    


  async update(propertyId: string, updatePropertyDto: UpdatePropertyDto) {

    const { user_id, ...propertyData } = updatePropertyDto;
    const property = await this.propertyRepository.findOne({
      where: { listing_id: propertyId },
      relations: ['user'],
    });
  
    if (!property) {
      throw new NotFoundException(`La propiedad con ID ${propertyId} no fue encontrada`);
    }
  
    if (property.user.user_id !== user_id) {
      throw new ForbiddenException(`No tienes permiso para editar esta propiedad`);
    }
  
    const updatedProperty = Object.assign(property, propertyData);
    const {user,...data} =await this.propertyRepository.save(updatedProperty);
    return {user_id:user.user_id, ...data}
  }
  

  async remove(propertyId: string,userId:string) {
    try{
    const property = await this.propertyRepository.findOne({
      where: { listing_id: propertyId },
      relations: ['user'],
    });

    if (!property) {
      throw new NotFoundException(`La propiedad con ID ${propertyId} no fue encontrada`);
    }

    if (property.user.user_id !== userId) {
      throw new ForbiddenException(`No tienes permiso para eliminar esta propiedad`);
    }

    await this.propertyRepository.remove(property);
    return { message: `Propiedad con ID ${propertyId} eliminada correctamente` };
  
    }catch{
      throw new NotFoundException(`La propiedad con ID ${propertyId} no se pudo eliminar`);
    }
  }

  async createPhoto(idProperty:string,createPhotoDto:CreatePhotoDto){

    const {user_id,...data} = createPhotoDto

    const property = await this.propertyRepository.findOne({
      where: { listing_id: idProperty },
      relations: ['user'], 
    });

    if (!property) {
      throw new NotFoundException(`La propiedad con ID ${idProperty} no fue encontrada`);
    }

    if (property.user.user_id !== user_id) {
      throw new ForbiddenException(`No tienes permiso para agregar fotos a esta propiedad`);
    }

    const photo = this.photoRepository.create({
      property,
      photo_url: data.photo_url,
    });

    return await this.photoRepository.save(photo);
  }

  

  async createBooking(propertyId: string, createBookingDto: CreateBookingDto) {
    const {user_id,start_date, end_date } = createBookingDto;

    // Verificar si la propiedad existe
    const property = await this.propertyRepository.findOne({
      where: { listing_id: propertyId },
    });

    if (!property) {
      throw new NotFoundException(`La propiedad con ID ${propertyId} no fue encontrada`);
    }

    // Validar que las fechas sean válidas
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    if (startDate >= endDate) {
      throw new BadRequestException('La fecha de inicio debe ser anterior a la fecha de fin');
    }

    // Calcular el precio total
    const days = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    const totalPrice = days * property.price_per_night;

    // Crear la reserva
    const booking = this.bookingRepository.create({
      property,
      user: { user_id: user_id }, // Relación con el usuario autenticado
      start_date: startDate,
      end_date: endDate,
      total_price: totalPrice,
    });

    // Guardar la reserva en la base de datos
     const {user, ...data} = await this.bookingRepository.save(booking);
    return data
  }



  async getUserBookings(userId: string) {

    const bookings = await this.bookingRepository.find({
      where: { user: { user_id: userId } },
      relations: ['property'],
    });

    if (bookings.length === 0) {
      throw new NotFoundException(`No se encontraron reservas para el usuario con ID ${userId}`);
    }

    return bookings.map(({ user, ...booking }) => booking);
  }


  async cancelBooking(bookingId: string, userId: string) {
 

    const booking = await this.bookingRepository.findOne({
      where: { booking_id: bookingId },
      relations: ['user'], 
    });

    if (!booking) {
      throw new NotFoundException(`La reserva con ID ${bookingId} no fue encontrada`);
    }

   
    if (booking.user.user_id !== userId) {
      throw new ForbiddenException('No tienes permiso para cancelar esta reserva');
    }

     const currentDate = new Date();
    const startDate = new Date(booking.start_date);
    const timeDifference = startDate.getTime() - currentDate.getTime();
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference < 24) {
      throw new BadRequestException('La reserva no puede ser cancelada con menos de 24 horas de antelación');
    }

    // Eliminar la reserva
    await this.bookingRepository.remove(booking);

    return { message: `La reserva con ID ${bookingId} ha sido cancelada correctamente` };
  }



  async leaveReview(propertyId: string, userId: string, createReviewDto: CreateReviewDto) {
    const { rating, comment } = createReviewDto;

    // Verificar si la propiedad existe
    const property = await this.propertyRepository.findOne({
      where: { listing_id: propertyId },
    });

    if (!property) {
      throw new NotFoundException(`La propiedad con ID ${propertyId} no fue encontrada`);
    }

    // Verificar si el usuario ha reservado esta propiedad
    const booking = await this.bookingRepository.findOne({
      where: { property: { listing_id: propertyId }, user: { user_id: userId } },
    });

    if (!booking) {
      throw new ForbiddenException('No puedes dejar una valoración para una propiedad que no has reservado');
    }

    // Verificar si el usuario ya dejó una valoración para esta propiedad
    const existingReview = await this.reviewRepository.findOne({
      where: { property: { listing_id: propertyId }, user: { user_id: userId } },
    });

    if (existingReview) {
      throw new BadRequestException('Ya has dejado una valoración para esta propiedad');
    }

    // Crear y guardar la valoración
    const review = this.reviewRepository.create({
      property,
      user: { user_id: userId }, // Relación con el usuario autenticado
      rating,
      comment,
    });

    return await this.reviewRepository.save(review);
  }


  async getReviewsByProperty(propertyId: string) {
    
    const property = await this.propertyRepository.findOne({
      where: { listing_id: propertyId },
    });

    if (!property) {
      throw new NotFoundException(`La propiedad con ID ${propertyId} no fue encontrada`);
    }

    
    const reviews = await this.reviewRepository.find({
      where: { property: { listing_id: propertyId } },
      relations: ['user'], 
    });

    return reviews.map(({ user, ...review }) => ({
      ...review,
      user: {
        username: user.username, 
      },
    }));
  }

  
}
