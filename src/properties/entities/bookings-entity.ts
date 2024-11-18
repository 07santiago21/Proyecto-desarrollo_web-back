import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,CreateDateColumn,JoinColumn,} from 'typeorm';
import { Property } from './property.entity';
import { User } from 'src/auth/entities/user.entity';
  
  @Entity('bookings')
  export class Booking {
    @PrimaryGeneratedColumn('uuid')
    booking_id: string;
  
    @ManyToOne(() => Property, property => property.bookings, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'listing_id' }) 
    property: Property;
  
    @ManyToOne(() => User, (user) => user.bookings, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @Column({ type: 'date' })
    start_date: Date;
  
    @Column({ type: 'date' })
    end_date: Date; 
  
    @Column({ type: 'decimal'})
    total_price: number; 
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date; 
  }
  