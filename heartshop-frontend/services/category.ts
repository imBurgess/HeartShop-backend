// services/category.ts
import { apiFetch } from "./http/client";

export interface Category {
  categoryId: number;
  slug: string;
  nameZh: string;
  nameEn?: string;
  parentId?: number;
  sortOrder: number;
  isActive: boolean;
  bannerUrl?: string;
}

export const categoryService = {
  /**
   * 取得所有啟用中的分類
   */
  getActiveCategories() {
    return apiFetch<any>("/api/categories?isActive=true", {
      method: "GET",
    });
  },

  /**
   * 取得所有分類（後台管理用）
   */
  getAllCategories() {
    return apiFetch<any>("/api/categories", {
      method: "GET",
    });
  },
};
