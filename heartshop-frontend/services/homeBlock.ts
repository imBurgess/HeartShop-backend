// services/homeBlock.ts
import { apiFetch } from "./http/client";

export interface HomeBlockDTO {
  blockId: number;
  type: string;
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  linkUrl?: string;
  sortOrder: number;
  isActive: boolean;
  startTime?: string;
  endTime?: string;
  products?: ProductDTO[];
}

export interface ProductDTO {
  productId: number;
  categoryId?: number;
  code: string;
  name: string;
  nameEn?: string;
  price?: number;
  discountPrice?: number;
  description?: string;
  isNew?: boolean;
  isSoldOut?: boolean;
  isActive?: boolean;
}

export const homeBlockService = {
  /**
   * 依類型取得啟用中的區塊（首頁使用）
   * @param type 類型: CAROUSEL, MEMBER_BANNER, PRODUCT_RECOMMEND, GENERAL_ANNOUNCEMENT
   */
  getBlocksByType(type: string) {
    return apiFetch<HomeBlockDTO[]>(`/api/home-blocks/type/${type}`, {
      method: "GET",
    });
  },

  /**
   * 取得區塊詳情
   */
  getBlockById(id: number) {
    return apiFetch<HomeBlockDTO>(`/api/home-blocks/${id}`, {
      method: "GET",
    });
  },

  /**
   * 取得所有區塊（後台管理用）
   */
  getAllBlocks() {
    return apiFetch<HomeBlockDTO[]>("/api/home-blocks", {
      method: "GET",
    });
  },
};
