import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

export interface UpdateProductDto extends CreateProductDto {}

export interface ProductEntity extends CreateProductDto {
  id: string;
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL = 'http://localhost:3000';

interface ProductFormProps {
  isEdit?: boolean;
}

async function fetchProduct(id: string): Promise<ProductEntity> {
  const response = await axios.get<ProductEntity>(`${API_BASE_URL}/products/${id}`);
  return response.data;
}

async function createProduct(data: CreateProductDto): Promise<ProductEntity> {
  const response = await axios.post<ProductEntity>(`${API_BASE_URL}/products`, data);
  return response.data;
}

async function updateProduct(id: string, data: UpdateProductDto): Promise<ProductEntity> {
  const response = await axios.put<ProductEntity>(`${API_BASE_URL}/products/${id}`, data);
  return response.data;
}

export function ProductForm({ isEdit = false }: ProductFormProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [formData, setFormData] = useState<CreateProductDto>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof CreateProductDto, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { data: product, isLoading: isFetching } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id!),
    enabled: isEdit && !!id,
    staleTime: 0,
  });

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      navigate('/products');
    },
    onError: (err: Error) => {
      setSubmitError(err.message || 'Error al crear el producto');
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateProductDto) => updateProduct(id!, data),
    onSuccess: () => {
      navigate('/products');
    },
    onError: (err: Error) => {
      setSubmitError(err.message || 'Error al actualizar el producto');
    },
  });

  useEffect(() => {
    if (product && isEdit) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
      });
    }
  }, [product, isEdit]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreateProductDto, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (formData.name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    }
    
    if (formData.price <= 0) {
      newErrors.price = 'El precio debe ser mayor que 0';
    }
    
    if (formData.stock < 0) {
      newErrors.stock = 'El stock no puede ser negativo';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'La categoría es obligatoria';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    
    if (!validateForm()) {
      return;
    }
    
    if (isEdit) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleChange = (field: keyof CreateProductDto, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCancel = () => {
    navigate('/products');
  };

  if (isFetching) {
    return (
      <div className="product-form-loading" role="status">
        <p>Cargando producto...</p>
      </div>
    );
  }

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="product-form-container">
      <header className="product-form-header">
        <h1>{isEdit ? 'Editar Producto' : 'Nuevo Producto'}</h1>
      </header>

      {submitError && (
        <div className="error-banner" role="alert">
          <p>{submitError}</p>
          <button onClick={() => setSubmitError(null)} aria-label="Cerrar">×</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="product-form" aria-label="Formulario de producto">
        <div className="form-group">
          <label htmlFor="name">Nombre del producto *</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            disabled={isPending}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span id="name-error" className="error-message" role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción *</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            disabled={isPending}
            rows={4}
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? 'description-error' : undefined}
          />
          {errors.description && (
            <span id="description-error" className="error-message" role="alert">
              {errors.description}
            </span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Precio *</label>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
              disabled={isPending}
              aria-invalid={!!errors.price}
              aria-describedby={errors.price ? 'price-error' : undefined}
            />
            {errors.price && (
              <span id="price-error" className="error-message" role="alert">
                {errors.price}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock *</label>
            <input
              id="stock"
              type="number"
              min="0"
              step="1"
              value={formData.stock}
              onChange={(e) => handleChange('stock', parseInt(e.target.value) || 0)}
              disabled={isPending}
              aria-invalid={!!errors.stock}
              aria-describedby={errors.stock ? 'stock-error' : undefined}
            />
            {errors.stock && (
              <span id="stock-error" className="error-message" role="alert">
                {errors.stock}
              </span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría *</label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            disabled={isPending}
            aria-invalid={!!errors.category}
            aria-describedby={errors.category ? 'category-error' : undefined}
          >
            <option value="">Seleccionar categoría</option>
            <option value="electronics">Electrónica</option>
            <option value="clothing">Ropa</option>
            <option value="food">Alimentos</option>
            <option value="books">Libros</option>
            <option value="other">Otros</option>
          </select>
          {errors.category && (
            <span id="category-error" className="error-message" role="alert">
              {errors.category}
            </span>
          )}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn-primary"
            disabled={isPending}
          >
            {isPending ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear'}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={handleCancel}
            disabled={isPending}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}