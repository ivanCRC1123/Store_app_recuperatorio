import apiClient from "../../../shared/services/apiClient";
import type { ProductoRead } from "../types";

export const fetchProducts = async (): Promise<ProductoRead[]> => {
  const { data } = await apiClient.get("/api/v1/productos/", {
    params: { limit: 100, offset: 0 },
  });
  return data;
};

export const fetchProductById = async (id: string): Promise<ProductoRead> => {
  const { data } = await apiClient.get(`/api/v1/productos/${id}`);
  return data;
};
