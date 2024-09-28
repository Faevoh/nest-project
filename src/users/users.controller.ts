import { Controller, Get, Post, Body, Param, Delete, Put, Query, ValidationPipe, Patch, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateRoleDto } from './dto/update-user-role.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UserEntity } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({type: CreateUserDto})
  @ApiCreatedResponse({description: 'User created', type: UserEntity})
  @ApiUnprocessableEntityResponse({description: 'Email already exists'})
  @ApiInternalServerErrorResponse({description: 'Server error'})
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({description: 'users retrieved successfully'})
  @ApiNotFoundResponse({description: 'No user found'})
  @ApiInternalServerErrorResponse({description: 'Server error'})
  @ApiUnauthorizedResponse({description: 'Invalid access token or unauthorized route'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({description: 'user retrieved successfully'})
  @ApiNotFoundResponse({description: 'No user found'})
  @ApiInternalServerErrorResponse({description: 'Server error'})
  @ApiUnauthorizedResponse({description: 'Invalid access token or unauthorized route'})
  @ApiParam({name: 'id', type: String, description: 'user uuid'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOneWithRelations(id);
  }

  @Patch(':id/role')
  @ApiOkResponse({description: 'user role updated successfully'})
  @ApiNotFoundResponse({description: 'No user found'})
  @ApiInternalServerErrorResponse({description: 'Server error'})
  @ApiBadRequestResponse({description: 'invalid role'})
  @ApiUnauthorizedResponse({description: 'Invalid access token or unauthorized route'})
  @ApiParam({name: 'id', type: String, description: 'user uuid'})
  @ApiBody({type: UpdateRoleDto})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  updateRole(@Param('id') id: string, @Body(ValidationPipe) updateRoleDto: UpdateRoleDto) {
    return this.usersService.updateRole(id, updateRoleDto)
  }

  @Put(':id')
  @ApiBody({type: UpdateUserDto})
  @ApiOkResponse({description: 'user updated successfully'})
  @ApiNotFoundResponse({description: 'No user found'})
  @ApiInternalServerErrorResponse({description: 'Server error'})
  @ApiUnauthorizedResponse({description: 'Invalid access token or unauthorized route'})
  @ApiParam({name: 'id', type: String, description: 'user uuid'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({description: 'user deleted successfully'})
  @ApiNotFoundResponse({description: 'No user found'})
  @ApiInternalServerErrorResponse({description: 'Server error'})
  @ApiUnauthorizedResponse({description: 'Invalid access token or unauthorized route'})
  @ApiParam({name: 'id', type: String, description: 'user uuid'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
