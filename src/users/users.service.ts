import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UpdateRoleDto } from './dto/update-user-role.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const {firstName, lastName, email, password} = createUserDto;

      const checkUserEmail = await this.userRepo.findOneBy({email});
      if(checkUserEmail){
        throw new UnprocessableEntityException('User with email already exists')
      }

      const hashPassword = await bcrypt.hash(password, 10)

      const userData = await this.userRepo.create(createUserDto);
      userData.password = hashPassword;
      await this.userRepo.save(userData);

      return {
        status: 201,
        message: 'User created Successfully',
        data: userData
      };
    } catch (error) {
      if (error instanceof UnprocessableEntityException) {
        throw error;
      }
      throw new InternalServerErrorException('An error occurred while creating a user')
    }
  }

  async findByEmail(email: string) {
    return await this.userRepo.findOneBy({email});
  }

  async findAll() {
    try {
      const users = await this.userRepo.find({
        relations: ['product']
      });
      if(users.length === 0) {
        throw new NotFoundException('Users have not been created')
      }
      return {
        status: 200,
        message: 'Users Retrieved Successfully',
        message2: `${users.length}, available`,
        data: users
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('An error occurred while retrieving users')
    }
  }

  async findOneWithRelations(id: string) {
    try {
      const user = await this.userRepo.findOne({
        where: {id},
        relations: ['product']
      });
      if(!user) {
        throw new NotFoundException('User not found');
      }
      return {
        status: 200,
        message: 'User Retrieved Successfully',
        data: user
      }
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error;
      }
    }
  }

  async findById(id: string) {
    try {
      const user = await this.userRepo.findOneBy({id});
      if(!user) {
        throw new NotFoundException('User not found');
      }
      return {
        status: 200,
        message: 'User Retrieved Successfully',
        data: user
      }
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error;
      }
    }
  }

  async updateRole(id : string, updateRoleDto: UpdateRoleDto) {
    try {
      const user = await this.userRepo.findOneBy({id});
      if(!user) {
        throw new NotFoundException('User not found');
      }
      if(updateRoleDto.role !== 'admin' && updateRoleDto.role !== 'user') {
        throw new BadRequestException('Invalid role');
      }

      user.role = updateRoleDto.role;
      const updatedRole = await this.userRepo.save(user);

      return {
        status: 200,
        message: 'Role updated Successfully',
        message2: `You are now ${updatedRole.role}`,
        data: updatedRole
      }
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error;
      }
      if(error instanceof BadRequestException){
        throw error;
      }
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findById(id);
      const updatedUser = await this.userRepo.merge(user.data, updateUserDto)
      await this.userRepo.save(updatedUser);
      return {
        status: 200,
        message: 'User Updated Successfully',
        data: updatedUser
      };
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error;
      }
      throw new InternalServerErrorException('Error occured during update')
    }
  }

  async remove(id: string) {
    try {
      const user = await this.findById(id);
      await this.userRepo.remove(user.data)
      return {
        status: 200,
        message: 'User Deleted Successfully'
      }
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error;
      }
      throw new InternalServerErrorException('Error occured during update')
    }
  }
}
