import apiClient from "./index";
import type { ApiResponse } from "./category";

/**
 * 商品 API
 */

export interface Product {
  productId: number;
  categoryId: number;
  code: string;
  name: string;
  nameEn: string;
  price: number;
  discountPrice?: number;
  description?: string;
  sizeInfo?: string;
  tags?: string;
  isNew: boolean;
  isSoldOut: boolean;
  isActive: boolean;
  viewCount: number;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  images?: string[]; // 圖片 URL 列表
}

// 移除 ProductImage interface 如果不再使用，或者保留但目前後端只回傳字串列表
export interface ProductImage {
  imageId: number;
  productId: number;
  imageUrl: string;
  altText?: string;
  sortOrder: number;
  isMain: boolean;
  createdAt: string;
}

export interface ProductQueryParams {
  categoryId?: number;
  isActive?: boolean;
  isNew?: boolean;
  keyword?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface ProductListResponse {
  items: Product[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface CreateProductRequest {
  categoryId: number;
  code: string;
  name: string;
  nameEn: string;
  price: number;
  discountPrice?: number;
  description?: string;
  sizeInfo?: string;
  tags?: string;
  isNew?: boolean;
  isSoldOut?: boolean;
  isActive?: boolean;
  sortOrder?: number;
  images?: string[]; // 新增：圖片 URL 列表
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {}

/**
 * 取得商品列表
 */
export const getProducts = (params?: ProductQueryParams) => {
  return apiClient.get<any, ApiResponse<ProductListResponse>>("/api/products", {
    params,
  });
};

/**
 * 根據 ID 取得商品
 */
export const getProductById = (id: number) => {
  return apiClient.get<any, ApiResponse<Product>>(`/api/products/${id}`);
};

/**
 * 根據商品編號取得商品
 */
export const getProductByCode = (code: string) => {
  return apiClient.get<any, ApiResponse<Product>>(`/api/products/code/${code}`);
};

/**
 * 建立商品
 */
export const createProduct = (data: CreateProductRequest) => {
  return apiClient.post<any, ApiResponse<Product>>("/api/products", data);
};

/**
 * 更新商品
 */
export const updateProduct = (id: number, data: UpdateProductRequest) => {
  return apiClient.put<any, ApiResponse<Product>>(`/api/products/${id}`, data);
};

/**
 * 刪除商品
 */
export const deleteProduct = (id: number) => {
  return apiClient.delete<any, ApiResponse<void>>(`/api/products/${id}`);
};

/**
 * 批次更新商品狀態
 */
export const batchUpdateProductStatus = (
  ids: number[],
  status: { isActive?: boolean; isNew?: boolean; isSoldOut?: boolean }
) => {
  return apiClient.patch<any, ApiResponse<void>>("/api/products/batch", {
    ids,
    ...status,
  });
};
