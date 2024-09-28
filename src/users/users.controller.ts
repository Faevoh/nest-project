import { Controller, Get, Post, Body, Param, Delete, Put, Query, ValidationPipe, Patch, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateRoleDto } from './dto/update-user-role.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UserEntity } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  @ApiBody({type: CreateUserDto})
  @ApiOperation({summary: 'Create a new user'})
  @ApiCreatedResponse({description: 'User created', type: UserEntity})
  @ApiUnprocessableEntityResponse({description: 'Email already exists'})
  @ApiInternalServerErrorResponse({description: 'Server error'})
  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  
  @ApiOperation({summary: 'Get all users'})
  @ApiOkResponse({description: 'users retrieved successfully'})
  @ApiNotFoundResponse({description: 'No user found'})
  @ApiInternalServerErrorResponse({description: 'Server error'})
  @ApiUnauthorizedResponse({description: 'Invalid access token or unauthorized route'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  
  @ApiOperation({summary: 'Get a user by ID'})
  @ApiOkResponse({description: 'user retrieved successfully'})
  @ApiNotFoundResponse({description: 'No user found'})
  @ApiInternalServerErrorResponse({description: 'Server error'})
  @ApiUnauthorizedResponse({description: 'Invalid access token or unauthorized route'})
  @ApiParam({name: 'id', type: String, description: 'user uuid'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneWithRelations(id);
  }

  
  @ApiOperation({summary: 'Update a user role'})
  @ApiOkResponse({description: 'user role updated successfully'})
  @ApiNotFoundResponse({description: 'No user found'})
  @ApiInternalServerErrorResponse({description: 'Server error'})
  @ApiBadRequestResponse({description: 'invalid role'})
  @ApiUnauthorizedResponse({description: 'Invalid access token or unauthorized route'})
  @ApiParam({name: 'id', type: String, description: 'user uuid'})
  @ApiBody({type: UpdateRoleDto})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id/role')
  updateRole(@Param('id') id: string, @Body(ValidationPipe) updateRoleDto: UpdateRoleDto) {
    return this.usersService.updateRole(id, updateRoleDto)
  }

  
  @ApiOperation({summary: 'update an existing user'})
  @ApiBody({type: UpdateUserDto})
  @ApiOkResponse({description: 'user updated successfully'})
  @ApiNotFoundResponse({description: 'No user found'})
  @ApiInternalServerErrorResponse({description: 'Server error'})
  @ApiUnauthorizedResponse({description: 'Invalid access token or unauthorized route'})
  @ApiParam({name: 'id', type: String, description: 'user uuid'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  
  @ApiOperation({summary: 'delete a user'})
  @ApiOkResponse({description: 'user deleted successfully'})
  @ApiNotFoundResponse({description: 'No user found'})
  @ApiInternalServerErrorResponse({description: 'Server error'})
  @ApiUnauthorizedResponse({description: 'Invalid access token or unauthorized route'})
  @ApiParam({name: 'id', type: String, description: 'user uuid'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
