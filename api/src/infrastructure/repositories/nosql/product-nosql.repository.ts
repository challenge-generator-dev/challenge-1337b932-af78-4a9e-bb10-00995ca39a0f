import { Injectable, Logger, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductEntity } from '../../../domain/entities/product.entity';
import { ProductRepository } from '../../../domain/repositories/product.repository';

interface ProductDocument extends Document {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ProductNosqlRepository implements ProductRepository {
  private readonly logger = new Logger(ProductNosqlRepository.name);

  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(product: ProductEntity): Promise<ProductEntity> {
    try {
      const existingProduct = await this.productModel.findOne({ sku: product.sku }).exec();
      if (existingProduct) {
        throw new ConflictException(`Product with SKU ${product.sku} already exists`);
      }

      const createdProduct = new this.productModel({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        sku: product.sku,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      });

      const savedProduct = await createdProduct.save();
      this.logger.log(`Product created with id: ${savedProduct.id}`);
      return this.mapDocumentToEntity(savedProduct);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      this.logger.error(`Failed to create product: ${error.message}`);
      throw error;
    }
  }

  async findById(id: string): Promise<ProductEntity | null> {
    try {
      const product = await this.productModel.findOne({ id }).exec();

      if (!product) {
        this.logger.warn(`Product not found with id: ${id}`);
        return null;
      }

      return this.mapDocumentToEntity(product);
    } catch (error) {
      this.logger.error(`Failed to find product: ${error.message}`);
      throw error;
    }
  }

  async update(id: string, product: ProductEntity): Promise<ProductEntity> {
    try {
      const existingSku = await this.productModel.findOne({ sku: product.sku, id: { $ne: id } }).exec();
      if (existingSku) {
        throw new ConflictException(`Product with SKU ${product.sku} already exists`);
      }

      const updatedProduct = await this.productModel
        .findOneAndUpdate(
          { id },
          {
            $set: {
              name: product.name,
              description: product.description,
              price: product.price,
              stock: product.stock,
              sku: product.sku,
              updatedAt: product.updatedAt,
            },
          },
          { new: true },
        )
        .exec();

      if (!updatedProduct) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      this.logger.log(`Product updated with id: ${id}`);
      return this.mapDocumentToEntity(updatedProduct);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      this.logger.error(`Failed to update product: ${error.message}`);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await this.productModel.deleteOne({ id }).exec();

      if (result.deletedCount === 0) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      this.logger.log(`Product deleted with id: ${id}`);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to delete product: ${error.message}`);
      throw error;
    }
  }

  private mapDocumentToEntity(document: ProductDocument): ProductEntity {
    return new ProductEntity({
      id: document.id,
      name: document.name,
      description: document.description,
      price: document.price,
      stock: document.stock,
      sku: document.sku,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }
}