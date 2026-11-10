-- ============================================================
-- Schema DDL para el sistema de gestión de inventarios
-- Motor: PostgreSQL
-- ============================================================

-- Tabla principal de productos
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    sku VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índice para búsquedas por SKU (búsqueda exacta)
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);

-- Índice para búsquedas por nombre (búsqueda parcial)
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);

-- Índice para ordenamiento por fecha de creación
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

-- Función para actualizar automáticamente updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar timestamp en cada modificación
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Comentario para documentación
COMMENT ON TABLE products IS 'Tabla principal para gestión de productos del inventario';
COMMENT ON COLUMN products.id IS 'Identificador único UUID del producto';
COMMENT ON COLUMN products.name IS 'Nombre del producto';
COMMENT ON COLUMN products.description IS 'Descripción detallada del producto';
COMMENT ON COLUMN products.price IS 'Precio del producto en formato decimal';
COMMENT ON COLUMN products.stock IS 'Cantidad disponible en inventario';
COMMENT ON COLUMN products.sku IS 'Código SKU único para identificación del producto';
COMMENT ON COLUMN products.created_at IS 'Fecha y hora de creación del registro';
COMMENT ON COLUMN products.updated_at IS 'Fecha y hora de última modificación';

-- ============================================================
-- Datos de prueba iniciales (opcional)
-- ============================================================
-- INSERT INTO products (name, description, price, stock, sku)
-- VALUES 
--     ('Producto de Ejemplo', 'Descripción del producto de ejemplo', 99.99, 100, 'SKU-001');