import type { Categoria } from "../../categories/types/category.types";
import type { ProductoIngrediente } from "../../ingredients/types/ingredient.types";
import type { Ingrediente } from "../../ingredients/types/ingredient.types";

export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio_base: number;
  imagenes_url: string[];
  stock_cantidad: number;
  disponible: boolean;
  categorias: Categoria[];
  ingredientes: ProductoIngrediente[];
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface ProductoRead {
  id: number;
  nombre: string;
  descripcion?: string;
  precio_base: number;
  imagenes_url: string[];
  stock_cantidad: number;
  disponible: boolean;
  categorias: Categoria[];
  ingredientes: Ingrediente[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface ProductoCreate {
  nombre: string;
  descripcion?: string;
  precio_base: number;
  imagenes_url?: string[];
  stock_cantidad?: number;
  disponible?: boolean;
  categoria_ids?: number[];
  ingredientes?: { ingrediente_id: number; es_removible: boolean }[];
}

export interface ProductoUpdate {
  nombre?: string;
  descripcion?: string;
  precio_base?: number;
  imagenes_url?: string[];
  stock_cantidad?: number;
  disponible?: boolean;
  categoria_ids?: number[];
  ingredientes?: { ingrediente_id: number; es_removible: boolean }[];
}

export interface DisponibilidadUpdate {
  disponible: boolean;
}
