import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsPositive, IsString, Length, Max, Min } from 'class-validator';



export class UpdateUserDto extends PartialType(CreateUserDto){
  @IsString() @Length(2, 100) firstName?: string;
  @IsString() @Length(2, 100) lastName?: string;
  @IsEmail() email?: string;
  @IsPositive() @Min(0) @Max(150) age?: number;
}
