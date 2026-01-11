import apiClient from "./index";

/**
 * 分類 API
 */

export interface Category {
  categoryId: number;
  slug: string;
  nameZh: string;
  nameEn: string;
  parentId?: number;
  sortOrder: number;
  isActive: boolean;
  bannerUrl?: string; // Banner 圖片 URL
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  meta?: any;
}

/**
 * 取得分類列表
 */
export const getCategories = () => {
  return apiClient.get<any, ApiResponse<Category[]>>("/api/categories");
};

/**
 * 取得啟用中的分類列表（用於下拉選單）
 */
export const getActiveCategories = () => {
  return apiClient.get<any, ApiResponse<Category[]>>(
    "/api/categories?isActive=true"
  );
};
/**
 * 建立分類
 */
export const createCategory = (data: Partial<Category>) => {
  return apiClient.post<any, ApiResponse<Category>>("/api/categories", data);
};

/**
 * 更新分類
 */
export const updateCategory = (id: number, data: Partial<Category>) => {
  return apiClient.put<any, ApiResponse<Category>>(
    `/api/categories/${id}`,
    data
  );
};

/**
 * 刪除分類
 */
export const deleteCategory = (id: number) => {
  return apiClient.delete<any, ApiResponse<void>>(`/api/categories/${id}`);
};
