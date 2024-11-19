import { Booking } from "src/properties/entities/bookings-entity";
import { Property } from "src/properties/entities/property.entity";
import { Review } from "src/properties/entities/review-entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    user_id:string //(ID único, clave primaria)
    
    @Column({type:'varchar', unique:true})
    username:string //(Nombre de usuario único)
    
    @Column({type:'varchar', unique:true})
    email:string //(Correo electrónico único)
    
    @Column({type:'varchar'})
    password:string //(Hash de la contraseña)
    
    @Column({type:'varchar',default:''})
    profile_picture:string //(URL de la foto de perfil, opcional)
    
    @Column({type:'varchar',default:''})
    bio:string //(Biografía, opcional)
    
    @Column({type: 'boolean', default:false})
    is_owner:boolean// (Indica si el usuario es propietario de propiedades: TRUE o FALSE)
    
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date; //(Fecha y hora de creación)

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date; //(Fecha y hora de la última actualización)


    @OneToMany(() => Property, property => property.user,{cascade:true})
    properties: Property[]; // Lista de propiedades asociadas con el usuario

    @OneToMany(() => Booking, booking => booking.user)
    bookings: Booking[];

    @OneToMany(() => Review, review => review.user)
  reviews: Review[]; // Relación con las valoraciones

}
