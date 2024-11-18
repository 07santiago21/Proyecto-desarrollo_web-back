export interface JwtPayload{

    email:string,
    user_id: string,
    profile_picture:string,
    bio: string,
    is_owner: boolean,
    iat?: number,
    exp?: number
}