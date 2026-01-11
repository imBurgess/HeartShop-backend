<template>
  <div class="members-page">
    <n-card title="會員管理" :bordered="false">
      <!-- 篩選區 -->
      <n-space :size="12" style="margin-bottom: 16px">
        <n-input
          v-model:value="filters.keyword"
          placeholder="搜尋會員姓名、Email 或電話"
          clearable
          style="width: 300px"
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
          placeholder="會員狀態"
          clearable
          style="width: 140px"
          :options="statusOptions"
        />

        <n-button type="primary">搜尋</n-button>
        <n-button>匯出</n-button>
      </n-space>

      <!-- 表格 -->
      <n-data-table
        :columns="columns"
        :data="mockMembers"
        :row-key="(row) => row.memberId"
        :pagination="{ pageSize: 20 }"
      />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from "vue";
import {
  NButton,
  NTag,
  NSpace,
  NAvatar,
  type DataTableColumns,
} from "naive-ui";

const filters = ref({
  keyword: "",
  status: undefined,
});

const statusOptions = [
  { label: "一般會員", value: "normal" },
  { label: "VIP 會員", value: "vip" },
  { label: "已停用", value: "inactive" },
];

// Mock 會員資料
const mockMembers = ref([
  {
    memberId: 1,
    name: "王小明",
    email: "wang@example.com",
    phone: "0912-345-678",
    orderCount: 15,
    totalSpent: 28500,
    status: "vip",
    joinDate: "2025-03-15",
  },
  {
    memberId: 2,
    name: "李小華",
    email: "li@example.com",
    phone: "0923-456-789",
    orderCount: 5,
    totalSpent: 6800,
    status: "normal",
    joinDate: "2025-08-20",
  },
  {
    memberId: 3,
    name: "張美麗",
    email: "zhang@example.com",
    phone: "0934-567-890",
    orderCount: 22,
    totalSpent: 45600,
    status: "vip",
    joinDate: "2024-11-10",
  },
  {
    memberId: 4,
    name: "陳先生",
    email: "chen@example.com",
    phone: "0945-678-901",
    orderCount: 3,
    totalSpent: 2100,
    status: "normal",
    joinDate: "2025-12-05",
  },
  {
    memberId: 5,
    name: "林小姐",
    email: "lin@example.com",
    phone: "0956-789-012",
    orderCount: 0,
    totalSpent: 0,
    status: "inactive",
    joinDate: "2025-01-10",
  },
]);

const statusTagType: Record<string, any> = {
  normal: { type: "default", label: "一般會員" },
  vip: { type: "warning", label: "VIP" },
  inactive: { type: "error", label: "已停用" },
};

// 表格欄位
const columns: DataTableColumns<any> = [
  {
    title: "會員",
    key: "member",
    width: 200,
    render: (row) => {
      return h(
        "div",
        { style: "display: flex; align-items: center; gap: 12px" },
        [
          h(
            NAvatar,
            {
              round: true,
              size: 36,
              style:
                "background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%); color: white",
            },
            () => row.name[0]
          ),
          h("div", [
            h(
              "div",
              { style: "font-weight: 600; margin-bottom: 2px" },
              row.name
            ),
            h(
              "div",
              { style: "font-size: 0.8125rem; color: var(--color-gray-600)" },
              row.email
            ),
          ]),
        ]
      );
    },
  },
  {
    title: "電話",
    key: "phone",
    width: 130,
  },
  {
    title: "訂單數",
    key: "orderCount",
    width: 100,
  },
  {
    title: "消費金額",
    key: "totalSpent",
    width: 120,
    render: (row) => `NT$ ${row.totalSpent.toLocaleString()}`,
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
    title: "加入日期",
    key: "joinDate",
    width: 120,
  },
  {
    title: "操作",
    key: "actions",
    width: 180,
    fixed: "right",
    render: () => {
      return h(NSpace, { size: 8 }, () => [
        h(NButton, { size: "small" }, () => "查看"),
        h(NButton, { size: "small" }, () => "編輯"),
      ]);
    },
  },
];
</script>

<style scoped lang="scss">
.members-page {
  animation: slideInUp var(--transition-base);

  :deep(.n-card) {
    border: none !important;
    box-shadow: var(--shadow) !important;
  }
}
</style>
