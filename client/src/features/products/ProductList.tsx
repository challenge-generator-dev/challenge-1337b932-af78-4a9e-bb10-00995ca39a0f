import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export interface ProductEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL = 'http://localhost:3000';

async function fetchProducts(): Promise<ProductEntity[]> {
  const response = await axios.get<ProductEntity[]>(`${API_BASE_URL}/products`);
  return response.data;
}

async function deleteProduct(id: string): Promise<void> {
  await axios.delete(`${API_BASE_URL}/products/${id}`);
}

export function ProductList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5000,
    retry: 2,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setErrorMessage(null);
    },
    onError: (err: Error) => {
      setErrorMessage(err.message || 'Error al eliminar el producto');
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm('¿Está seguro de que desea eliminar este producto?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/products/${id}/edit`);
  };

  const handleCreate = () => {
    navigate('/products/new');
  };

  if (isLoading) {
    return (
      <div className="product-list-loading" role="status" aria-label="Cargando productos">
        <div className="spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="product-list-error" role="alert">
        <h2>Error al cargar productos</h2>
        <p>{error instanceof Error ? error.message : 'Error desconocido'}</p>
        <button onClick={() => queryClient.invalidateQueries({ queryKey: ['products'] })}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <header className="product-list-header">
        <h1>Gestión de Inventario</h1>
        <button 
          onClick={handleCreate} 
          className="btn-primary"
          aria-label="Crear nuevo producto"
        >
          Nuevo Producto
        </button>
      </header>

      {errorMessage && (
        <div className="error-banner" role="alert">
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage(null)} aria-label="Cerrar mensaje de error">
            ×
          </button>
        </div>
      )}

      {products && products.length === 0 ? (
        <div className="empty-state">
          <p>No hay productos en el inventario.</p>
          <button onClick={handleCreate} className="btn-secondary">
            Agregar primer producto
          </button>
        </div>
      ) : (
        <table className="product-table" aria-label="Lista de productos">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.id} data-product-id={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td className={product.stock === 0 ? 'stock-out' : product.stock < 10 ? 'stock-low' : ''}>
                  {product.stock}
                </td>
                <td className="actions">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="btn-edit"
                    aria-label={`Editar ${product.name}`}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn-delete"
                    disabled={deleteMutation.isPending}
                    aria-label={`Eliminar ${product.name}`}
                  >
                    {deleteMutation.isPending ? 'Eliminando...' : 'Eliminar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}