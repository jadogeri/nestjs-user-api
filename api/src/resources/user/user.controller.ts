import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody
} from '@nestjs/swagger';
import { instanceToPlain } from 'class-transformer';


@ApiTags('User')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor) // Enables @Expose() for virtual fields
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' }) // Describes the operation
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.'
  }) // Describes the success response
  @ApiResponse({ status: 400, description: 'Bad Request.' }) // Describes potential errors
  @ApiBody({ type: CreateUserDto }) // Explicitly defines the request body type
  create(@Body() createUserDto: CreateUserDto) {
    const savedUser = this.userService.create(createUserDto);

    const plainUser = instanceToPlain(savedUser);// Transforms entity to plain object, applying @Expose()
    return plainUser;
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({
    status: 200,
    description: 'A list of all users retrieved successfully.'
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to retrieve',
    type: Number
  }) // Describes the URL parameter
  @ApiResponse({
    status: 200,
    description: 'The user details retrieved successfully.'
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the user to update' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.'
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiBody({ type: UpdateUserDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the user to delete' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.'
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
