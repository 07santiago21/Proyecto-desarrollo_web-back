import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,CreateDateColumn,JoinColumn,} from 'typeorm';
import { Property } from './property.entity';
import { User } from 'src/auth/entities/user.entity';
  
  @Entity('reviews')
  export class Review {
    @PrimaryGeneratedColumn('uuid')
    review_id: string; // ID único, clave primaria
  
    @ManyToOne(() => Property, (property) => property.reviews, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'listing_id' }) // Relación con la propiedad
    property: Property;
  
    @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' }) // Relación con el usuario
    user: User;
  
    @Column({ type: 'int', width: 1 })
    rating: number; // Calificación del 1 al 5
  
    @Column({ type: 'text', nullable: true })
    comment: string; // Comentario de la valoración
  
    @CreateDateColumn()
    created_at: Date; // Fecha y hora de la valoración
  }
  