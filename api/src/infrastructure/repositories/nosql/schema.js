/**
 * Schema y configuración de índices para MongoDB
 * Este script debe ejecutarse al iniciar la aplicación o manualmente
 */

const mongoose = require('mongoose');

/**
 * Esquema de Producto para MongoDB
 * Define la estructura de documentos en la colección products
 */
const productSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    name: {
      type: String,
      required: [true, 'El nombre del producto es requerido'],
      trim: true,
      maxlength: [255, 'El nombre no puede exceder 255 caracteres'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'El precio del producto es requerido'],
      min: [0, 'El precio no puede ser negativo'],
    },
    stock: {
      type: Number,
      required: [true, 'El stock del producto es requerido'],
      min: [0, 'El stock no puede ser negativo'],
      default: 0,
    },
    sku: {
      type: String,
      required: [true, 'El SKU del producto es requerido'],
      unique: true,
      trim: true,
      maxlength: [100, 'El SKU no puede exceder 100 caracteres'],
      uppercase: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'products',
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
  }
);

/**
 * Middleware pre-save para actualizar timestamps
 */
productSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

/**
 * Middleware pre-update para actualizar timestamp en actualizaciones
 */
productSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

/**
 * Método de instancia para verificar disponibilidad
 */
productSchema.methods.isAvailable = function (quantity) {
  return this.stock >= quantity;
};

/**
 * Método de instancia para reducir stock
 */
productSchema.methods.reduceStock = async function (quantity) {
  if (this.stock < quantity) {
    throw new Error('Stock insuficiente');
  }
  this.stock -= quantity;
  return this.save();
};

/**
 * Función para crear índices en la colección
 * Debe llamarse durante la inicialización de la aplicación
 * @param {mongoose.Connection} connection - Conexión a MongoDB
 */
async function createIndexes(connection) {
  const collection = connection.collection('products');

  try {
    // Índice único para SKU
    await collection.createIndex(
      { sku: 1 },
      { unique: true, name: 'sku_unique_idx' }
    );

    // Índice para búsquedas por nombre
    await collection.createIndex(
      { name: 'text', description: 'text' },
      { name: 'name_description_text_idx' }
    );

    // Índice para ordenamiento por fecha
    await collection.createIndex(
      { createdAt: -1 },
      { name: 'created_at_idx' }
    );

    // Índice para búsquedas por stock
    await collection.createIndex(
      { stock: 1 },
      { name: 'stock_idx' }
    );

    console.log('Índices de MongoDB creados correctamente');
  } catch (error) {
    console.error('Error al crear índices de MongoDB:', error.message);
    throw error;
  }
}

/**
 * Función para verificar y crear la colección si no existe
 * @param {mongoose.Connection} connection - Conexión a MongoDB
 */
async function ensureCollection(connection) {
  const collections = await connection.db.listCollections().toArray();
  const collectionNames = collections.map((c) => c.name);

  if (!collectionNames.includes('products')) {
    await connection.db.createCollection('products');
    console.log('Colección products creada en MongoDB');
  }
}

module.exports = {
  productSchema,
  createIndexes,
  ensureCollection,
};