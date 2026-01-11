<template>
  <div class="inventory-page">
    <n-card title="庫存管理" :bordered="false">
      <!-- 警告提示 -->
      <n-alert
        type="warning"
        style="margin-bottom: 16px"
        v-if="lowStockCount > 0"
      >
        <template #icon>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            style="width: 20px; height: 20px"
          >
            <path
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </template>
        有 {{ lowStockCount }} 項商品庫存不足，請盡快補貨！
      </n-alert>

      <!-- 篩選區 -->
      <n-space :size="12" style="margin-bottom: 16px">
        <n-input
          v-model:value="filters.keyword"
          placeholder="搜尋商品名稱或編號"
          clearable
          style="width: 240px"
        />

        <n-select
          v-model:value="filters.stockStatus"
          placeholder="庫存狀態"
          clearable
          style="width: 140px"
          :options="stockStatusOptions"
        />

        <n-button type="primary">搜尋</n-button>
        <n-button>匯出庫存表</n-button>
      </n-space>

      <!-- 表格 -->
      <n-data-table
        :columns="columns"
        :data="mockInventory"
        :row-key="(row: any) => row.productId"
        :pagination="{ pageSize: 20 }"
      />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, h, computed } from "vue";
import {
  NButton,
  NTag,
  NSpace,
  NProgress,
  type DataTableColumns,
} from "naive-ui";

const filters = ref({
  keyword: "",
  stockStatus: undefined,
});

const stockStatusOptions = [
  { label: "充足", value: "sufficient" },
  { label: "偏低", value: "low" },
  { label: "缺貨", value: "outOfStock" },
];

// Mock 庫存資料
const mockInventory = ref([
  {
    productId: 1,
    code: "TOP-001",
    name: "蕾絲上衣",
    currentStock: 45,
    minStock: 10,
    maxStock: 100,
    status: "sufficient",
  },
  {
    productId: 2,
    code: "DRS-001",
    name: "碎花洋裝",
    currentStock: 8,
    minStock: 10,
    maxStock: 80,
    status: "low",
  },
  {
    productId: 3,
    code: "BOT-001",
    name: "牛仔褲",
    currentStock: 0,
    minStock: 15,
    maxStock: 100,
    status: "outOfStock",
  },
  {
    productId: 4,
    code: "OUT-001",
    name: "針織外套",
    currentStock: 32,
    minStock: 10,
    maxStock: 60,
    status: "sufficient",
  },
  {
    productId: 5,
    code: "ACC-001",
    name: "絲巾",
    currentStock: 5,
    minStock: 20,
    maxStock: 150,
    status: "low",
  },
]);

const lowStockCount = computed(
  () =>
    mockInventory.value.filter(
      (item) => item.status === "low" || item.status === "outOfStock"
    ).length
);

const getStockStatus = (row: any) => {
  if (row.status === "outOfStock") {
    return { type: "error", label: "缺貨" };
  } else if (row.status === "low") {
    return { type: "warning", label: "偏低" };
  }
  return { type: "success", label: "充足" };
};

const getStockPercentage = (row: any) => {
  return Math.round((row.currentStock / row.maxStock) * 100);
};

// 表格欄位
const columns: DataTableColumns<any> = [
  {
    title: "商品編號",
    key: "code",
    width: 120,
  },
  {
    title: "商品名稱",
    key: "name",
    width: 180,
  },
  {
    title: "目前庫存",
    key: "currentStock",
    width: 120,
    render: (row: any) => {
      const status = getStockStatus(row);
      return h(
        "div",
        { style: "display: flex; align-items: center; gap: 8px" },
        [
          h(
            "span",
            { style: "font-weight: 600; font-size: 1.125rem" },
            row.currentStock
          ),
          h(
            NTag,
            { type: status.type as any, size: "small" },
            () => status.label
          ),
        ]
      );
    },
  },
  {
    title: "庫存率",
    key: "stockLevel",
    width: 200,
    render: (row) => {
      const percentage = getStockPercentage(row);
      const status: "error" | "warning" | "success" =
        row.status === "outOfStock"
          ? "error"
          : row.status === "low"
          ? "warning"
          : "success";
      return h("div", [
        h(NProgress, {
          type: "line",
          percentage,
          status,
          showIndicator: false,
        }),
        h(
          "div",
          {
            style:
              "font-size: 0.75rem; color: var(--color-gray-600); margin-top: 4px",
          },
          `${row.currentStock} / ${row.maxStock}`
        ),
      ]);
    },
  },
  {
    title: "最低庫存",
    key: "minStock",
    width: 100,
  },
  {
    title: "操作",
    key: "actions",
    width: 180,
    fixed: "right",
    render: () => {
      return h(NSpace, { size: 8 }, () => [
        h(NButton, { size: "small", type: "primary" }, () => "調整庫存"),
        h(NButton, { size: "small" }, () => "查看記錄"),
      ]);
    },
  },
];
</script>

<style scoped lang="scss">
.inventory-page {
  animation: slideInUp var(--transition-base);

  :deep(.n-card) {
    border: none !important;
    box-shadow: var(--shadow) !important;
  }
}
</style>
