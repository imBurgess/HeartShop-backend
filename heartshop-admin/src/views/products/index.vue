<template>
  <div class="products-page">
    <n-card title="商品管理" :bordered="false">
      <!-- 工具列 -->
      <template #header-extra>
        <n-button type="primary" @click="handleCreate">
          <template #icon>
            <n-icon
              ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                /></svg
            ></n-icon>
          </template>
          新增商品
        </n-button>
      </template>

      <!-- 篩選區 -->
      <n-space vertical :size="16">
        <n-space :size="12">
          <n-input
            v-model:value="filters.keyword"
            placeholder="搜尋商品名稱或編號"
            clearable
            style="width: 240px"
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <n-icon
                ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
                  /></svg
              ></n-icon>
            </template>
          </n-input>

          <n-select
            v-model:value="filters.categoryId"
            placeholder="選擇分類"
            clearable
            style="width: 180px"
            :options="categoryOptions"
            @update:value="handleSearch"
          />

          <n-select
            v-model:value="filters.isActive"
            placeholder="上架狀態"
            clearable
            style="width: 140px"
            :options="statusOptions"
            @update:value="handleSearch"
          />

          <n-select
            v-model:value="filters.isNew"
            placeholder="新品狀態"
            clearable
            style="width: 140px"
            :options="newOptions"
            @update:value="handleSearch"
          />

          <n-button @click="handleSearch" type="primary">搜尋</n-button>
          <n-button @click="handleReset">重置</n-button>
        </n-space>

        <!-- 批次操作 -->
        <n-space v-if="checkedRowKeys.length > 0">
          <n-tag type="info">已選擇 {{ checkedRowKeys.length }} 項</n-tag>
          <n-button size="small" @click="handleBatchActive(true)"
            >批次上架</n-button
          >
          <n-button size="small" @click="handleBatchActive(false)"
            >批次下架</n-button
          >
          <n-button size="small" type="error" @click="handleBatchDelete"
            >批次刪除</n-button
          >
        </n-space>
      </n-space>

      <!-- 表格 -->
      <n-data-table
        :columns="columns"
        :data="productStore.products"
        :loading="productStore.loading"
        :row-key="(row: Product) => row.productId"
        :checked-row-keys="checkedRowKeys"
        @update:checked-row-keys="handleCheck"
        :pagination="pagination"
        :single-line="false"
        style="margin-top: 16px"
      />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, h } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/product";
import { getActiveCategories } from "@/api/category";
import type { Category } from "@/api/category";
import type { Product } from "@/api/product";
import {
  NButton,
  NTag,
  NSpace,
  useDialog,
  useMessage,
  type DataTableColumns,
} from "naive-ui";

const router = useRouter();
const productStore = useProductStore();
const dialog = useDialog();
const message = useMessage();

// 篩選條件
const filters = reactive({
  keyword: "",
  categoryId: undefined as number | undefined,
  isActive: undefined as boolean | undefined,
  isNew: undefined as boolean | undefined,
});

// 勾選的行
const checkedRowKeys = ref<number[]>([]);

// 分類選項
const categoryOptions = ref<{ label: string; value: number }[]>([]);

const statusOptions = [
  { label: "已上架", value: true },
  { label: "已下架", value: false },
];

const newOptions = [
  { label: "新品", value: true },
  { label: "非新品", value: false },
];

// 表格欄位
const columns: DataTableColumns<Product> = [
  { type: "selection" },
  {
    title: "編號",
    key: "code",
    width: 120,
  },
  {
    title: "商品名稱",
    key: "name",
    ellipsis: { tooltip: true },
  },
  {
    title: "分類",
    key: "categoryId",
    width: 120,
    render: (row: Product) => {
      const category = categoryOptions.value.find(
        (c) => c.value === row.categoryId
      );
      return category?.label || "-";
    },
  },
  {
    title: "售價",
    key: "price",
    width: 100,
    render: (row: Product) => `NT$ ${row.price}`,
  },
  {
    title: "折扣價",
    key: "discountPrice",
    width: 100,
    render: (row: Product) =>
      row.discountPrice ? `NT$ ${row.discountPrice}` : "-",
  },
  {
    title: "狀態",
    key: "status",
    width: 180,
    render: (row: Product) => {
      return h(NSpace, { size: 4 }, () =>
        [
          row.isActive
            ? h(NTag, { type: "success", size: "small" }, () => "上架")
            : h(NTag, { type: "default", size: "small" }, () => "下架"),
          row.isNew
            ? h(NTag, { type: "warning", size: "small" }, () => "新品")
            : null,
          row.isSoldOut
            ? h(NTag, { type: "error", size: "small" }, () => "售完")
            : null,
        ].filter(Boolean)
      );
    },
  },
  {
    title: "瀏覽次數",
    key: "viewCount",
    width: 100,
  },
  {
    title: "操作",
    key: "actions",
    width: 180,
    fixed: "right",
    render: (row: Product) => {
      return h(NSpace, { size: 8 }, () => [
        h(
          NButton,
          { size: "small", onClick: () => handleEdit(row.productId) },
          () => "編輯"
        ),
        h(
          NButton,
          {
            size: "small",
            type: "error",
            onClick: () => handleDelete(row.productId),
          },
          () => "刪除"
        ),
      ]);
    },
  },
];

// 分頁
const pagination = reactive({
  page: 1,
  pageSize: 20,
  pageCount: 1,
  itemCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100],
  onChange: (page: number) => {
    pagination.page = page;
    loadProducts();
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
    loadProducts();
  },
});

// 載入商品列表
const loadProducts = async () => {
  try {
    await productStore.fetchProducts({
      ...filters,
      page: pagination.page,
      pageSize: pagination.pageSize,
    });
    pagination.itemCount = productStore.total;
    pagination.pageCount = productStore.totalPages;
  } catch (error: any) {
    message.error(error.message || "載入商品列表失敗");
  }
};

// 載入分類
const loadCategories = async () => {
  try {
    const response = await getActiveCategories();
    const categories = response.data || [];
    categoryOptions.value = categories.map((c: Category) => ({
      label: c.nameZh,
      value: c.categoryId,
    }));
  } catch (error) {
    console.error("載入分類失敗:", error);
  }
};

// 搜尋
const handleSearch = () => {
  pagination.page = 1;
  loadProducts();
};

// 重置
const handleReset = () => {
  filters.keyword = "";
  filters.categoryId = undefined;
  filters.isActive = undefined;
  filters.isNew = undefined;
  pagination.page = 1;
  loadProducts();
};

// 勾選
const handleCheck = (keys: number[]) => {
  checkedRowKeys.value = keys;
};

// 新增
const handleCreate = () => {
  router.push("/products/create");
};

// 編輯
const handleEdit = (id: number) => {
  router.push(`/products/${id}/edit`);
};

// 刪除
const handleDelete = (id: number) => {
  dialog.warning({
    title: "確認刪除",
    content: "確定要刪除此商品嗎？此操作無法復原。",
    positiveText: "確定",
    negativeText: "取消",
    onPositiveClick: async () => {
      try {
        await productStore.deleteProduct(id);
        message.success("刪除成功");
        loadProducts();
      } catch (error: any) {
        message.error(error.message || "刪除失敗");
      }
    },
  });
};

// 批次上架/下架
const handleBatchActive = (isActive: boolean) => {
  dialog.info({
    title: `確認批次${isActive ? "上架" : "下架"}`,
    content: `確定要${isActive ? "上架" : "下架"}所選的 ${
      checkedRowKeys.value.length
    } 個商品嗎？`,
    positiveText: "確定",
    negativeText: "取消",
    onPositiveClick: async () => {
      try {
        await productStore.batchUpdateStatus(checkedRowKeys.value, {
          isActive,
        });
        message.success(`批次${isActive ? "上架" : "下架"}成功`);
        checkedRowKeys.value = [];
        loadProducts();
      } catch (error: any) {
        message.error(error.message || "操作失敗");
      }
    },
  });
};

// 批次刪除
const handleBatchDelete = () => {
  dialog.warning({
    title: "確認批次刪除",
    content: `確定要刪除所選的 ${checkedRowKeys.value.length} 個商品嗎？此操作無法復原。`,
    positiveText: "確定",
    negativeText: "取消",
    onPositiveClick: async () => {
      try {
        await Promise.all(
          checkedRowKeys.value.map((id) => productStore.deleteProduct(id))
        );
        message.success("批次刪除成功");
        checkedRowKeys.value = [];
        loadProducts();
      } catch (error: any) {
        message.error(error.message || "批次刪除失敗");
      }
    },
  });
};

onMounted(() => {
  loadCategories();
  loadProducts();
});
</script>

<style scoped lang="scss">
.products-page {
  animation: slideInUp var(--transition-base);

  :deep(.n-card) {
    border: none !important;
    box-shadow: var(--shadow) !important;

    .n-card-header {
      padding: var(--spacing-md) var(--spacing-md) var(--spacing) !important;
      border-bottom: none !important;

      .n-card__header-main {
        font-size: 1.25rem;
        font-weight: var(--font-weight-bold);
        color: var(--color-gray-900);
      }
    }

    .n-card__content {
      padding: 0 var(--spacing-md) var(--spacing-md) !important;
    }
  }

  :deep(.n-space) {
    gap: var(--spacing-sm) !important;
  }

  :deep(.n-button) {
    border-radius: var(--radius) !important;
    font-weight: var(--font-weight-medium) !important;
    transition: all var(--transition-base) !important;

    &.n-button--primary-type {
      background: linear-gradient(
        135deg,
        var(--color-primary) 0%,
        var(--color-primary-dark) 100%
      ) !important;
      border: none !important;

      &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg) !important;
      }
    }

    &.n-button--default-type {
      &:hover {
        border-color: var(--color-primary) !important;
        color: var(--color-primary) !important;
      }
    }

    &.n-button--error-type {
      &:hover {
        transform: translateY(-1px);
      }
    }
  }

  :deep(.n-input) {
    .n-input__border,
    .n-input__state-border {
      border-radius: var(--radius) !important;
    }

    &:hover .n-input__state-border {
      border-color: var(--color-primary) !important;
    }
  }

  :deep(.n-select) {
    .n-base-selection {
      border-radius: var(--radius) !important;

      &:hover {
        border-color: var(--color-primary) !important;
      }
    }
  }

  :deep(.n-tag) {
    border-radius: var(--radius-sm) !important;
    font-weight: var(--font-weight-medium) !important;
    padding: 4px 10px !important;
  }

  :deep(.n-data-table) {
    border-radius: var(--radius-md) !important;
    overflow: hidden;
    box-shadow: var(--shadow-sm) !important;

    .n-data-table-th {
      background: var(--color-gray-100) !important;
      font-weight: var(--font-weight-semibold) !important;
      color: var(--color-gray-700) !important;
      border-bottom: 2px solid var(--color-gray-200) !important;
    }

    .n-data-table-td {
      border-bottom: 1px solid var(--color-gray-200) !important;
    }

    .n-data-table-tr {
      transition: all var(--transition-base) !important;

      &:hover {
        background: var(--color-gray-50) !important;
      }
    }

    .n-data-table-tr--checked {
      background: var(--color-primary-bg) !important;
    }
  }

  :deep(.n-pagination) {
    margin-top: var(--spacing) !important;
    justify-content: center !important;

    .n-pagination-item {
      border-radius: var(--radius) !important;

      &.n-pagination-item--active {
        background: linear-gradient(
          135deg,
          var(--color-primary) 0%,
          var(--color-primary-dark) 100%
        ) !important;
        color: var(--color-white) !important;
      }
    }
  }
}
</style>
