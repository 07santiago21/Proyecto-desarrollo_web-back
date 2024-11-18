import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,CreateDateColumn,JoinColumn,} from 'typeorm';
import { Property } from './property.entity';
  
  @Entity('photos')
  export class Photo {
    @PrimaryGeneratedColumn('uuid')
    photo_id: string; // ID único, clave primaria
  
    @ManyToOne(() => Property, (property) => property.photos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'listing_id' }) 
    property: Property;
  
    @Column({ type: 'varchar', length: 255 })
    photo_url: string; 
  
    @CreateDateColumn()
    created_at: Date; 
  }
  