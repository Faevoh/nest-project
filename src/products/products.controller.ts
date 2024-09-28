import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  
  @ApiOperation({summary: 'Create new product with user id'})
  @ApiBody({type: CreateProductDto})
  @ApiCreatedResponse({description: 'Product created', type: ProductEntity})
  @ApiNotFoundResponse({description: 'No user found'})
  @ApiInternalServerErrorResponse({description: 'Server error'})
  @ApiUnauthorizedResponse({description: 'Invalid access token or unauthorized route'})
  @ApiParam({name: 'userId', type: String, description: 'user uuid'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':userId')
  create(@Param('userId') userId: string, @Body() createProductDto: CreateProductDto) {
    return this.productsService.create(userId, createProductDto);
  }

  
  @ApiOperation({summary: 'Get all products'})
  @ApiOkResponse({description: 'products retrieved successfully'})
  @ApiNotFoundResponse({description: 'No product found'})
  @ApiInternalServerErrorResponse({description: 'Server error'})
  @ApiUnauthorizedResponse({description: 'Invalid access token or unauthorized route'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  
  @ApiOperation({summary: 'Get one product'})
  @ApiOkResponse({description: 'product retrieved successfully'})
  @ApiNotFoundResponse({description: 'product not found'})
  @ApiInternalServerErrorResponse({description: 'Server error'})
  @ApiUnauthorizedResponse({description: 'Invalid access token or unauthorized route'})
  @ApiParam({name: 'id', type: String, description: 'product uuid'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  
  @ApiOperation({summary: 'Update an existing product'})
  @ApiBody({type: UpdateProductDto})
  @ApiOkResponse({description: 'product updated successfully'})
  @ApiNotFoundResponse({description: 'product not found'})
  @ApiInternalServerErrorResponse({description: 'Server error'})
  @ApiUnauthorizedResponse({description: 'Invalid access token or unauthorized route'})
  @ApiParam({name: 'id', type: String, description: 'product uuid'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':productId')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  
  @ApiOperation({summary: 'Delete a product'})
  @ApiOkResponse({description: 'product deleted successfully'})
  @ApiNotFoundResponse({description: 'product not found'})
  @ApiInternalServerErrorResponse({description: 'Server error'})
  @ApiUnauthorizedResponse({description: 'Invalid access token or unauthorized route'})
  @ApiParam({name: 'id', type: String, description: 'product uuid'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
