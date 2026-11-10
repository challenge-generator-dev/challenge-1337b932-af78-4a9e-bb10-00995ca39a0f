import { ProductEntity } from '../entities/product.entity';

/**
 * Interfaz del repositorio de productos.
 * Define los contratos que las implementaciones (SQL, NoSQL) deben cumplir.
 */
export interface ProductRepository {
  /**
   * Crea un nuevo producto en la base de datos.
   * @param product Producto a crear.
   * @returns Producto creado con su ID generado.
   */
  create(product: ProductEntity): Promise<ProductEntity>;

  /**
   * Obtiene un producto por su ID.
   * @param id Identificador del producto.
   * @returns Producto encontrado o null si no existe.
   */
  findById(id: string): Promise<ProductEntity | null>;

  /**
   * Actualiza un producto existente.
   * @param id Identificador del producto.
   * @param product Datos actualizados del producto.
   * @returns Producto actualizado.
   */
  update(id: string, product: ProductEntity): Promise<ProductEntity>;

  /**
   * Elimina un producto por su ID.
   * @param id Identificador del producto.
   */
  delete(id: string): Promise<void>;
}