import apiClient from "./index";

/**
 * 首頁區塊 API
 */

export interface HomeBlock {
  blockId?: number;
  type: string;
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  linkUrl?: string;
  sortOrder: number;
  isActive: boolean;
  startTime?: string;
  endTime?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface HomeBlockWithProducts extends HomeBlock {
  products?: Product[];
}

export interface Product {
  productId: number;
  name: string;
  code: string;
  price?: number;
  discountPrice?: number;
}

export interface CreateHomeBlockRequest {
  type: string;
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  linkUrl?: string;
  sortOrder?: number;
  isActive?: boolean;
  startTime?: string;
  endTime?: string;
  productIds?: number[];
}

export interface UpdateHomeBlockRequest {
  type?: string;
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  linkUrl?: string;
  sortOrder?: number;
  isActive?: boolean;
  startTime?: string;
  endTime?: string;
  productIds?: number[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  meta?: any;
}

/**
 * 取得所有區塊
 */
export const getAllBlocks = () => {
  return apiClient.get<any, ApiResponse<HomeBlockWithProducts[]>>(
    "/api/home-blocks"
  );
};

/**
 * 依類型取得區塊
 */
export const getBlocksByType = (type: string) => {
  return apiClient.get<any, ApiResponse<HomeBlockWithProducts[]>>(
    `/api/home-blocks/type/${type}`
  );
};

/**
 * 依 ID 取得區塊
 */
export const getBlockById = (id: number) => {
  return apiClient.get<any, ApiResponse<HomeBlockWithProducts>>(
    `/api/home-blocks/${id}`
  );
};

/**
 * 新增區塊
 */
export const createBlock = (data: CreateHomeBlockRequest) => {
  return apiClient.post<any, ApiResponse<HomeBlock>>("/api/home-blocks", data);
};

/**
 * 更新區塊
 */
export const updateBlock = (id: number, data: UpdateHomeBlockRequest) => {
  return apiClient.put<any, ApiResponse<HomeBlock>>(
    `/api/home-blocks/${id}`,
    data
  );
};

/**
 * 刪除區塊
 */
export const deleteBlock = (id: number) => {
  return apiClient.delete<any, ApiResponse<void>>(`/api/home-blocks/${id}`);
};
