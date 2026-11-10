import { Injectable, Logger, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ProductEntity } from '../../domain/entities/product.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @Inject(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    this.logger.log(`Creating product with SKU: ${createProductDto.sku}`);

    const existingProduct = await this.productRepository.findBySku(createProductDto.sku);
    if (existingProduct) {
      throw new ConflictException(`Product with SKU ${createProductDto.sku} already exists`);
    }

    const product = new ProductEntity(
      createProductDto.name,
      createProductDto.description,
      createProductDto.price,
      createProductDto.stock,
      createProductDto.sku,
    );

    const created = await this.productRepository.create(product);
    this.logger.log(`Product created with ID: ${created.id}`);
    return created;
  }

  async findById(id: string): Promise<ProductEntity> {
    this.logger.log(`Finding product by ID: ${id}`);
    const product = await this.productRepository.findById(id);
    
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    return product;
  }

  async findBySku(sku: string): Promise<ProductEntity | null> {
    this.logger.log(`Finding product by SKU: ${sku}`);
    return this.productRepository.findBySku(sku);
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    this.logger.log(`Updating product with ID: ${id}`);

    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (updateProductDto.sku && updateProductDto.sku !== existingProduct.sku) {
      const productWithSku = await this.productRepository.findBySku(updateProductDto.sku);
      if (productWithSku && productWithSku.id !== id) {
        throw new ConflictException(`Product with SKU ${updateProductDto.sku} already exists`);
      }
    }

    const updatedProduct = new ProductEntity(
      updateProductDto.name ?? existingProduct.name,
      updateProductDto.description ?? existingProduct.description,
      updateProductDto.price ?? existingProduct.price,
      updateProductDto.stock ?? existingProduct.stock,
      updateProductDto.sku ?? existingProduct.sku,
      id,
    );

    const result = await this.productRepository.update(id, updatedProduct);
    this.logger.log(`Product updated: ${id}`);
    return result;
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Deleting product with ID: ${id}`);
    
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    await this.productRepository.delete(id);
    this.logger.log(`Product deleted: ${id}`);
  }

  async findAll(): Promise<ProductEntity[]> {
    this.logger.log('Finding all products');
    return this.productRepository.findAll();
  }
}