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

@ApiTags('User')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ 
    type: CreateUserDto,
    examples: {
      example1: {
        summary: 'Example User',
        value: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', age: 30 }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    schema: {
      example: { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', age: 30 }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({
    status: 200,
    description: 'A list of all users retrieved successfully.',
    schema: {
      example: [{ id: 1, firstName: 'John' }, { id: 2, firstName: 'Jane' }]
    }
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the user', type: Number })
  @ApiResponse({
    status: 200,
    description: 'The user details retrieved successfully.',
    schema: {
      example: { id: 1, firstName: 'John', lastName: 'Doe' }
    }
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the user to update' })
  @ApiBody({ 
    type: UpdateUserDto,
    examples: {
      example1: {
        summary: 'Partial Update Example',
        value: { firstName: 'Johnny', age: 31 }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    schema: {
      example: { id: 1, firstName: 'Johnny', lastName: 'Doe', age: 31 }
    }
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
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
    description: 'The user has been successfully deleted.',
    schema: {
      example: { message: 'User 1 deleted successfully' }
    }
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
