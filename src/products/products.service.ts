import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(ProductEntity) private productRepo: Repository<ProductEntity>, private userService: UsersService) {}

  async create(userId: string, createProductDto: CreateProductDto) {
    try {
      const user = await this.userService.findById(userId);
      const productData = await this.productRepo.create({
        ...createProductDto,
        userId: user.data.id
      });
      await this.productRepo.save(productData);
      return {
        status: 201,
        message: 'Product created successfully',
        data: productData
      }
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error;
      }
      throw new InternalServerErrorException('Error occured during update')
    }
  }

  async findAll() {
    try {
      const products = await this.productRepo.find();
      if(products.length === 0) {
        throw new NotFoundException('Products have not been added')
      }
      return {
        status: 200,
        message: 'Products retrieved successfully',
        message2: `${products.length}, available`,
        data: products
      }
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error;
      }
      throw new InternalServerErrorException('Error occured while retrieving products')
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productRepo.findOneBy({id})
      if(!product){
        throw new NotFoundException('Product not found')
      }
      return {
        status: 200,
        message: 'Product retrieved successfully',
        data: product
      }
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error;
      }
      throw new InternalServerErrorException;
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productRepo.findOne({
        where: {
          id: id
        }
      });
      if(!product){
        throw new NotFoundException('Product not found')
      }
      const updatedProduct = await this.productRepo.merge(product, updateProductDto);
      await this.productRepo.save(updatedProduct);
      return {
        status: 200,
        message: 'Product updated successfully',
        data: updatedProduct
      }
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error;
      }
      throw new InternalServerErrorException('Error occurred, Could not update product')
    }
  }

  async remove(id: string) {
    try {
      const product = await this.findOne(id);
      await this.productRepo.remove(product.data)
      return {
        status: 200,
        message: 'Product deleted successfully'
      }
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error;
      }
      throw new InternalServerErrorException('Error occured during update')
    }
  }
}
