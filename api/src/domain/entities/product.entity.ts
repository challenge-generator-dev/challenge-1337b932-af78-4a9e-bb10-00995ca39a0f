import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID, IsPositive } from 'class-validator';

/**
 * Entidad de dominio que representa un producto en el inventario.
 * Contiene los atributos básicos de un producto y se utiliza tanto en SQL como en NoSQL.
 */
export class ProductEntity {
  @ApiProperty({
    description: 'Identificador único del producto',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Laptop Gamer'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Descripción del producto',
    example: 'Laptop con tarjeta gráfica dedicada'
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 1299.99
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'Cantidad en stock del producto',
    example: 50
  })
  @IsNumber()
  @IsPositive()
  stock: number;

  @ApiProperty({
    description: 'SKU del producto',
    example: 'LAP-GAM-001'
  })
  @IsString()
  sku: string;

  constructor(
    id: string,
    name: string,
    description: string,
    price: number,
    stock: number,
    sku: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.sku = sku;
  }
}