import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    
    @Column({default:false})
    is_owner:boolean// (Indica si el usuario es propietario de propiedades: TRUE o FALSE)
    //created_at// (Fecha y hora de creación)
    //updated_at //(Fecha y hora de la última actualización) 

}
