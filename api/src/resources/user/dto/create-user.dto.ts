import { IsEmail, IsNotEmpty, IsPositive, IsString, Length, Max, Min } from 'class-validator';

export class CreateUserDto {
  @IsString() @IsNotEmpty() @Length(2, 100) firstName: string;
  @IsString() @IsNotEmpty() @Length(2, 100) lastName: string;
  @IsString() @IsNotEmpty() @Length(5, 150) @IsEmail() email: string;
  @IsNotEmpty() @IsPositive() @Min(0) @Max(150) age: number;
}

