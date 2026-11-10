import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive } from 'class-validator';

/**
 * DTO para la creación de productos.
 * Valida los datos de entrada al crear un producto.
 */
export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Laptop Gamer'
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Descripción del producto',
    example: 'Laptop con tarjeta gráfica dedicada'
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 1299.99
  })
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @ApiProperty({
    description: 'Cantidad en stock del producto',
    example: 50
  })
  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @ApiProperty({
    description: 'SKU del producto',
    example: 'LAP-GAM-001'
  })
  @IsString()
  readonly sku: string;
}