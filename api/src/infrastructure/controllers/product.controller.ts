import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProductService } from '../../application/services/product.service';
import { CreateProductDto } from '../../application/dtos/create-product.dto';
import { UpdateProductDto } from '../../application/dtos/update-product.dto';
import { ProductEntity } from '../../domain/entities/product.entity';

@ApiTags('products')
@Controller('products')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new product', description: 'Creates a new product in the inventory' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: 'Product successfully created',
    type: ProductEntity,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 409, description: 'Product with SKU already exists' })
  async create(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
    this.logger.log(`Creating product with SKU: ${createProductDto.sku}`);
    return this.productService.create(createProductDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID', description: 'Retrieves a product by its unique identifier' })
  @ApiParam({
    name: 'id',
    description: 'Product UUID',
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Product found',
    type: ProductEntity,
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async getProduct(@Param('id', ParseUUIDPipe) id: string): Promise<ProductEntity | null> {
    this.logger.log(`Fetching product with id: ${id}`);
    return this.productService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product', description: 'Updates an existing product by its ID' })
  @ApiParam({
    name: 'id',
    description: 'Product UUID',
    type: String,
    format: 'uuid',
  })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    status: 200,
    description: 'Product successfully updated',
    type: ProductEntity,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 409, description: 'Product with SKU already exists' })
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    this.logger.log(`Updating product with id: ${id}`);
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a product', description: 'Deletes a product by its ID' })
  @ApiParam({
    name: 'id',
    description: 'Product UUID',
    type: String,
    format: 'uuid',
  })
  @ApiResponse({ status: 204, description: 'Product successfully deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    this.logger.log(`Deleting product with id: ${id}`);
    return this.productService.delete(id);
  }
}