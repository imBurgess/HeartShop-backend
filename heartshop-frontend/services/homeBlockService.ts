import type { ApiResponse } from "./types";

export interface CarouselBlock {
  blockId: number;
  type: string;
  title?: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl?: string;
  sortOrder: number;
  isActive: boolean;
  startTime?: string;
  endTime?: string;
}

/**
 * 取得啟用中的輪播圖
 */
export const getCarouselBlocks = async (): Promise<CarouselBlock[]> => {
  try {
    const response = await fetch("/api/home-blocks/active?type=CAROUSEL");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<CarouselBlock[]> = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Failed to fetch carousel blocks:", error);
    return [];
  }
};
