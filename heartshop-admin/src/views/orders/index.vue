<template>
  <div class="orders-page">
    <n-card title="訂單管理" :bordered="false">
      <!-- 篩選區 -->
      <n-space :size="12" style="margin-bottom: 16px">
        <n-input
          v-model:value="filters.keyword"
          placeholder="搜尋訂單編號或客戶名稱"
          clearable
          style="width: 280px"
        >
          <template #prefix>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              style="width: 18px; height: 18px"
            >
              <path
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </template>
        </n-input>

        <n-select
          v-model:value="filters.status"
          placeholder="訂單狀態"
          clearable
          style="width: 160px"
          :options="statusOptions"
        />

        <n-date-picker
          v-model:value="filters.dateRange"
          type="daterange"
          clearable
          style="width: 300px"
        />

        <n-button type="primary">搜尋</n-button>
        <n-button>重置</n-button>
      </n-space>

      <!-- 統計卡片 -->
      <n-grid :cols="4" :x-gap="16" style="margin-bottom: 24px">
        <n-gi>
          <div class="stat-mini-card stat-pending">
            <div class="stat-label">待處理</div>
            <div class="stat-value">8</div>
          </div>
        </n-gi>
        <n-gi>
          <div class="stat-mini-card stat-processing">
            <div class="stat-label">處理中</div>
            <div class="stat-value">12</div>
          </div>
        </n-gi>
        <n-gi>
          <div class="stat-mini-card stat-completed">
            <div class="stat-label">已完成</div>
            <div class="stat-value">145</div>
          </div>
        </n-gi>
        <n-gi>
          <div class="stat-mini-card stat-cancelled">
            <div class="stat-label">已取消</div>
            <div class="stat-value">3</div>
          </div>
        </n-gi>
      </n-grid>

      <!-- 表格 -->
      <n-data-table
        :columns="columns"
        :data="mockOrders"
        :row-key="(row) => row.orderId"
        :pagination="{ pageSize: 20 }"
      />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from "vue";
import { NButton, NTag, NSpace, type DataTableColumns } from "naive-ui";

const filters = ref({
  keyword: "",
  status: undefined,
  dateRange: null,
});

const statusOptions = [
  { label: "待付款", value: "pending" },
  { label: "處理中", value: "processing" },
  { label: "已出貨", value: "shipped" },
  { label: "已完成", value: "completed" },
  { label: "已取消", value: "cancelled" },
];

// Mock 訂單資料
const mockOrders = ref([
  {
    orderId: 1001,
    orderNumber: "ORD-20260102-001",
    customerName: "王小明",
    totalAmount: 2580,
    status: "pending",
    orderDate: "2026-01-02 10:30",
    items: 3,
  },
  {
    orderId: 1002,
    orderNumber: "ORD-20260102-002",
    customerName: "李小華",
    totalAmount: 1280,
    status: "processing",
    orderDate: "2026-01-02 09:15",
    items: 2,
  },
  {
    orderId: 1003,
    orderNumber: "ORD-20260101-055",
    customerName: "張美麗",
    totalAmount: 3450,
    status: "shipped",
    orderDate: "2026-01-01 16:20",
    items: 4,
  },
  {
    orderId: 1004,
    orderNumber: "ORD-20260101-054",
    customerName: "陳先生",
    totalAmount: 890,
    status: "completed",
    orderDate: "2026-01-01 14:05",
    items: 1,
  },
  {
    orderId: 1005,
    orderNumber: "ORD-20260101-053",
    customerName: "林小姐",
    totalAmount: 5200,
    status: "cancelled",
    orderDate: "2026-01-01 11:30",
    items: 6,
  },
]);

const statusTagType: Record<string, any> = {
  pending: { type: "warning", label: "待付款" },
  processing: { type: "info", label: "處理中" },
  shipped: { type: "success", label: "已出貨" },
  completed: { type: "success", label: "已完成" },
  cancelled: { type: "error", label: "已取消" },
};

// 表格欄位
const columns: DataTableColumns<any> = [
  {
    title: "訂單編號",
    key: "orderNumber",
    width: 180,
  },
  {
    title: "客戶名稱",
    key: "customerName",
    width: 120,
  },
  {
    title: "品項數",
    key: "items",
    width: 80,
  },
  {
    title: "訂單金額",
    key: "totalAmount",
    width: 120,
    render: (row: any) => `NT$ ${row.totalAmount.toLocaleString()}`,
  },
  {
    title: "狀態",
    key: "status",
    width: 100,
    render: (row) => {
      const config = statusTagType[row.status];
      return h(NTag, { type: config.type, size: "small" }, () => config.label);
    },
  },
  {
    title: "訂單時間",
    key: "orderDate",
    width: 160,
  },
  {
    title: "操作",
    key: "actions",
    width: 200,
    fixed: "right",
    render: () => {
      return h(NSpace, { size: 8 }, () => [
        h(NButton, { size: "small" }, () => "查看"),
        h(NButton, { size: "small", type: "primary" }, () => "處理"),
      ]);
    },
  },
];
</script>

<style scoped lang="scss">
.orders-page {
  animation: slideInUp var(--transition-base);

  :deep(.n-card) {
    border: none !important;
    box-shadow: var(--shadow) !important;
  }
}

.stat-mini-card {
  padding: var(--spacing);
  background: var(--color-white);
  border-radius: var(--radius);
  border-left: 4px solid;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow);
  }

  .stat-label {
    font-size: 0.875rem;
    color: var(--color-gray-600);
    margin-bottom: 8px;
  }

  .stat-value {
    font-size: 1.75rem;
    font-weight: var(--font-weight-bold);
    color: var(--color-gray-900);
  }

  &.stat-pending {
    border-color: var(--color-warning);
  }

  &.stat-processing {
    border-color: var(--color-info);
  }

  &.stat-completed {
    border-color: var(--color-success);
  }

  &.stat-cancelled {
    border-color: var(--color-gray-400);
  }
}
</style>
