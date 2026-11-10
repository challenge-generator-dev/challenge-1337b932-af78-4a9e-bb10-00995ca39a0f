import { IsString, IsOptional, IsNumber, Min, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Laptop Pro 15',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  readonly name?: string;

  @ApiProperty({
    description: 'Descripción detallada del producto',
    example: 'Laptop de alta gama con procesador M3',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  readonly description?: string;

  @ApiProperty({
    description: 'Precio del producto en la moneda base',
    example: 1299.99,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  readonly price?: number;

  @ApiProperty({
    description: 'Cantidad disponible en inventario',
    example: 50,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El stock debe ser un número' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  readonly stock?: number;

  @ApiProperty({
    description: 'Código SKU único del producto',
    example: 'LAP-PRO-15-M3',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El SKU debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El SKU no puede estar vacío' })
  readonly sku?: string;
}