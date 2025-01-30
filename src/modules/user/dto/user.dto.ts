import { IsString, IsEmail, IsOptional, IsArray } from 'class-validator';

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;
}

//TODO: Update User DTO
// export class UpdateUserDto {
//     @IsOptional()
//     @IsString()
//     name?: string;

//     @IsOptional()
//     @IsEmail()
//     email?: string;
// }


export class UserResponseDto {
    id: number;
    name: string;
    email: string;
    wallet?: { id: number; balance: number };
    products?: { id: number; productName: string; productAmount: number }[];
    plans?: { id: number }[];
}
