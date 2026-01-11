import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Product, ProductQueryParams } from "@/api/product";
import * as productApi from "@/api/product";

export const useProductStore = defineStore("product", () => {
  // State
  const products = ref<Product[]>([]);
  const currentProduct = ref<Product | null>(null);
  const loading = ref(false);
  const total = ref(0);

  // 查詢參數
  const queryParams = ref<ProductQueryParams>({
    page: 1,
    pageSize: 20,
    sortBy: "sort_order",
    sortOrder: "ASC",
  });

  // Getters
  const totalPages = computed(() =>
    Math.ceil(total.value / (queryParams.value.pageSize || 20))
  );

  // Actions

  /**
   * 取得商品列表
   */
  const fetchProducts = async (params?: ProductQueryParams) => {
    loading.value = true;
    try {
      // 合併查詢參數
      const mergedParams = { ...queryParams.value, ...params };
      queryParams.value = mergedParams;

      const response = await productApi.getProducts(mergedParams);

      // 處理回應資料結構
      if (response.data) {
        const data = response.data as any;
        products.value = data.items || data.products || [];
        total.value = data.pagination?.total || data.total || 0;
      }
    } catch (error: any) {
      console.error("取得商品列表失敗:", error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  /**
   * 根據 ID 取得商品
   */
  const fetchProductById = async (id: number) => {
    loading.value = true;
    try {
      const response = await productApi.getProductById(id);
      currentProduct.value = response.data;
      return response.data;
    } catch (error: any) {
      console.error("取得商品失敗:", error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  /**
   * 建立商品
   */
  const createProduct = async (data: productApi.CreateProductRequest) => {
    loading.value = true;
    try {
      const response = await productApi.createProduct(data);
      // 重新載入列表
      await fetchProducts();
      return response.data;
    } catch (error: any) {
      console.error("建立商品失敗:", error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  /**
   * 更新商品
   */
  const updateProduct = async (
    id: number,
    data: productApi.UpdateProductRequest
  ) => {
    loading.value = true;
    try {
      const response = await productApi.updateProduct(id, data);
      // 更新列表中的商品資料
      const index = products.value.findIndex((p) => p.productId === id);
      if (index !== -1) {
        products.value[index] = response.data;
      }
      return response.data;
    } catch (error: any) {
      console.error("更新商品失敗:", error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  /**
   * 刪除商品
   */
  const deleteProduct = async (id: number) => {
    loading.value = true;
    try {
      await productApi.deleteProduct(id);
      // 從列表中移除
      products.value = products.value.filter((p) => p.productId !== id);
      total.value--;
    } catch (error: any) {
      console.error("刪除商品失敗:", error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  /**
   * 批次更新狀態
   */
  const batchUpdateStatus = async (
    ids: number[],
    status: { isActive?: boolean; isNew?: boolean; isSoldOut?: boolean }
  ) => {
    loading.value = true;
    try {
      await productApi.batchUpdateProductStatus(ids, status);
      // 重新載入列表
      await fetchProducts();
    } catch (error: any) {
      console.error("批次更新失敗:", error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  /**
   * 重置查詢參數
   */
  const resetQueryParams = () => {
    queryParams.value = {
      page: 1,
      pageSize: 20,
      sortBy: "sort_order",
      sortOrder: "ASC",
    };
  };

  return {
    // State
    products,
    currentProduct,
    loading,
    total,
    queryParams,

    // Getters
    totalPages,

    // Actions
    fetchProducts,
    fetchProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    batchUpdateStatus,
    resetQueryParams,
  };
});
