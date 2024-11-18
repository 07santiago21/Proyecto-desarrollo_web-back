import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class PropertiesService {

  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    @InjectRepository(User)
    private userRepository: Repository<User>
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
  
}
