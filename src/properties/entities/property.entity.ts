import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,ManyToOne,JoinColumn,} from 'typeorm';
import { User } from 'src/auth/entities/user.entity'; 
  
  @Entity('properties') // Nombre de la tabla
  export class Property {
    @PrimaryGeneratedColumn('uuid')
    listing_id: string; // ID único, clave primaria
  
    @ManyToOne(() => User, user => user.properties, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' }) 
    user: User; // Relación con la tabla de usuarios, clave foránea referenciada a Users
  
    @Column({ type: 'varchar', length: 255 })
    title: string; // Título de la propiedad
  
    @Column({ type: 'text' })
    description: string; // Descripción de la propiedad
  
    @Column({ type: 'varchar', length: 255 })
    address: string; // Dirección de la propiedad
  
    @Column({ type: 'decimal', precision: 10, scale: 7 })
    latitude: number; // Latitud de la propiedad
  
    @Column({ type: 'decimal', precision: 10, scale: 7 })
    longitude: number; // Longitud de la propiedad
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price_per_night: number; // Precio por noche
  
    @Column({ type: 'int' })
    num_bedrooms: number; // Número de habitaciones
  
    @Column({ type: 'int' })
    num_bathrooms: number; // Número de baños
  
    @Column({ type: 'int' })
    max_guests: number; // Capacidad máxima de huéspedes
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date; // Fecha y hora de creación
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date; // Fecha y hora de la última actualización
  }
  