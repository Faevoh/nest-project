import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post(':userId')
  @ApiBody({type: CreateProductDto})
  @ApiCreatedResponse({description: 'Product created', type: ProductEntity})
  @ApiNotFoundResponse({description: 'No user found'})
  @ApiInternalServerErrorResponse({description: 'Server error'})
  @ApiUnauthorizedResponse({description: 'Invalid access token or unauthorized route'})
  @ApiParam({name: 'userId', type: String, description: 'user uuid'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Param('userId') userId: string, @Body() createProductDto: CreateProductDto) {
    return this.productsService.create(userId, createProductDto);
  }

  @Get()
  @ApiOkResponse({description: 'products retrieved successfully'})
  @ApiNotFoundResponse({description: 'No product found'})
  @ApiInternalServerErrorResponse({description: 'Server error'})
  @ApiUnauthorizedResponse({description: 'Invalid access token or unauthorized route'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({description: 'product retrieved successfully'})
  @ApiNotFoundResponse({description: 'product not found'})
  @ApiInternalServerErrorResponse({description: 'Server error'})
  @ApiUnauthorizedResponse({description: 'Invalid access token or unauthorized route'})
  @ApiParam({name: 'id', type: String, description: 'product uuid'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':productId')
  @ApiBody({type: UpdateProductDto})
  @ApiOkResponse({description: 'product updated successfully'})
  @ApiNotFoundResponse({description: 'product not found'})
  @ApiInternalServerErrorResponse({description: 'Server error'})
  @ApiUnauthorizedResponse({description: 'Invalid access token or unauthorized route'})
  @ApiParam({name: 'id', type: String, description: 'product uuid'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOkResponse({description: 'product deleted successfully'})
  @ApiNotFoundResponse({description: 'product not found'})
  @ApiInternalServerErrorResponse({description: 'Server error'})
  @ApiUnauthorizedResponse({description: 'Invalid access token or unauthorized route'})
  @ApiParam({name: 'id', type: String, description: 'product uuid'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
