import { faker } from '@faker-js/faker';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsPositive, IsString, Length, Max, Min } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 100})
  @IsString()   
  @IsNotEmpty()
  @Length(2, 100)
  firstName: string;

@Column({type: 'varchar', length: 100})
  @IsString()   
  @IsNotEmpty()
  @Length(2, 100)
  lastName: string;

  @Column({ unique: true, type: 'varchar', length: 150 })
  @IsString()
  @IsNotEmpty()
  @Length(5, 150)
  @IsEmail()
  email: string;

  @Column({type: 'int'})
  @IsNotEmpty()
  @IsPositive()
  @Min(0)
  @Max(150)
  age: number;

      // Virtual Property
  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
   }

   @Column()
    @IsString()
    ssn: string;

    @BeforeInsert()
    generateSSN() {
        // Generates format: 000-00-0000
        // Faker ensures it is randomized [1.3]
        this.ssn = faker.string.numeric('###-##-####');
    }
}
