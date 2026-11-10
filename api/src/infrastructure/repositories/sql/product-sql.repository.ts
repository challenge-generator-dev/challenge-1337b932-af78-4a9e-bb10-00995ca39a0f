import { Injectable, Logger, NotFoundException, ConflictException } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';
import { ConfigService } from '@nestjs/config';
import { ProductEntity } from '../../../domain/entities/product.entity';
import { ProductRepository } from '../../../domain/repositories/product.repository';

@Injectable()
export class ProductSqlRepository implements ProductRepository {
  private readonly logger = new Logger(ProductSqlRepository.name);
  private readonly pool: Pool;

  constructor(private readonly configService: ConfigService) {
    const host = this.configService.get<string>('DATABASE_HOST', 'localhost');
    const port = this.configService.get<number>('DATABASE_PORT', 5432);
    const database = this.configService.get<string>('DATABASE_NAME', 'inventory');
    const user = this.configService.get<string>('DATABASE_USER', 'postgres');
    const password = this.configService.get<string>('DATABASE_PASSWORD', 'postgres');

    this.pool = new Pool({
      host,
      port,
      database,
      user,
      password,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    this.pool.on('error', (err) => {
      this.logger.error('Unexpected error on idle client', err);
    });
  }

  async create(product: ProductEntity): Promise<ProductEntity> {
    const client = await this.pool.connect();
    try {
      const query = `
        INSERT INTO products (id, name, description, price, stock, sku, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id, name, description, price, stock, sku, created_at, updated_at
      `;
      const values = [
        product.id,
        product.name,
        product.description,
        product.price,
        product.stock,
        product.sku,
        product.createdAt,
        product.updatedAt,
      ];

      const result = await client.query(query, values);
      const row = result.rows[0];

      this.logger.log(`Product created with id: ${row.id}`);
      return this.mapRowToEntity(row);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(`Product with SKU ${product.sku} already exists`);
      }
      this.logger.error(`Failed to create product: ${error.message}`);
      throw error;
    } finally {
      client.release();
    }
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const client = await this.pool.connect();
    try {
      const query = `
        SELECT id, name, description, price, stock, sku, created_at, updated_at
        FROM products
        WHERE id = $1
      `;
      const result = await client.query(query, [id]);

      if (result.rows.length === 0) {
        this.logger.warn(`Product not found with id: ${id}`);
        return null;
      }

      return this.mapRowToEntity(result.rows[0]);
    } catch (error) {
      this.logger.error(`Failed to find product: ${error.message}`);
      throw error;
    } finally {
      client.release();
    }
  }

  async update(id: string, product: ProductEntity): Promise<ProductEntity> {
    const client = await this.pool.connect();
    try {
      const query = `
        UPDATE products
        SET name = $1, description = $2, price = $3, stock = $4, sku = $5, updated_at = $6
        WHERE id = $7
        RETURNING id, name, description, price, stock, sku, created_at, updated_at
      `;
      const values = [
        product.name,
        product.description,
        product.price,
        product.stock,
        product.sku,
        product.updatedAt,
        id,
      ];

      const result = await client.query(query, values);

      if (result.rows.length === 0) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      this.logger.log(`Product updated with id: ${id}`);
      return this.mapRowToEntity(result.rows[0]);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error.code === '23505') {
        throw new ConflictException(`Product with SKU ${product.sku} already exists`);
      }
      this.logger.error(`Failed to update product: ${error.message}`);
      throw error;
    } finally {
      client.release();
    }
  }

  async delete(id: string): Promise<void> {
    const client = await this.pool.connect();
    try {
      const query = 'DELETE FROM products WHERE id = $1 RETURNING id';
      const result = await client.query(query, [id]);

      if (result.rows.length === 0) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      this.logger.log(`Product deleted with id: ${id}`);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to delete product: ${error.message}`);
      throw error;
    } finally {
      client.release();
    }
  }

  private mapRowToEntity(row: any): ProductEntity {
    return new ProductEntity({
      id: row.id,
      name: row.name,
      description: row.description,
      price: parseFloat(row.price),
      stock: parseInt(row.stock, 10),
      sku: row.sku,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
    this.logger.log('Database pool closed');
  }
}