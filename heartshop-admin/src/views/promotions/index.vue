<template>
  <div class="promotions-page">
    <n-card title="優惠活動" :bordered="false">
      <template #header-extra>
        <n-button type="primary" @click="showModal = true">
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 4v16m8-8H4"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </template>
          新增活動
        </n-button>
      </template>

      <!-- 活動卡片列表 -->
      <n-grid :cols="3" :x-gap="16" :y-gap="16">
        <n-gi v-for="promotion in mockPromotions" :key="promotion.id">
          <div class="promotion-card">
            <div class="promotion-header">
              <n-tag
                :type="promotion.isActive ? 'success' : 'default'"
                size="small"
              >
                {{ promotion.isActive ? "進行中" : "已結束" }}
              </n-tag>
              <div class="promotion-type">{{ promotion.type }}</div>
            </div>
            <h3 class="promotion-title">{{ promotion.title }}</h3>
            <p class="promotion-desc">{{ promotion.description }}</p>
            <div class="promotion-info">
              <div class="info-item">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                <span>{{ promotion.period }}</span>
              </div>
              <div class="info-item">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
                <span>{{ promotion.discount }}</span>
              </div>
            </div>
            <div class="promotion-actions">
              <n-button size="small">編輯</n-button>
              <n-button size="small" type="error">刪除</n-button>
            </div>
          </div>
        </n-gi>
      </n-grid>
    </n-card>

    <!-- 新增彈窗 -->
    <n-modal
      v-model:show="showModal"
      preset="card"
      title="新增優惠活動"
      style="width: 600px"
    >
      <n-form label-placement="left" label-width="100">
        <n-form-item label="活動名稱" required>
          <n-input placeholder="例如：新春特惠" />
        </n-form-item>
        <n-form-item label="活動類型" required>
          <n-select :options="typeOptions" placeholder="選擇活動類型" />
        </n-form-item>
        <n-form-item label="優惠內容" required>
          <n-input placeholder="例如：全館 8 折" />
        </n-form-item>
        <n-form-item label="活動期間" required>
          <n-date-picker type="daterange" style="width: 100%" />
        </n-form-item>
        <n-form-item label="活動描述">
          <n-input type="textarea" :rows="3" placeholder="活動詳細說明" />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button @click="showModal = false">取消</n-button>
          <n-button type="primary">建立</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const showModal = ref(false);

const typeOptions = [
  { label: "全館折扣", value: "sitewide" },
  { label: "分類折扣", value: "category" },
  { label: "單品折扣", value: "product" },
  { label: "滿額折扣", value: "threshold" },
];

const mockPromotions = ref([
  {
    id: 1,
    title: "新春特惠",
    description: "全館商品享 85 折優惠",
    type: "全館折扣",
    discount: "85 折",
    period: "2026/01/01 - 2026/01/31",
    isActive: true,
  },
  {
    id: 2,
    title: "冬季出清",
    description: "冬季商品最低 5 折起",
    type: "分類折扣",
    discount: "5 折起",
    period: "2026/01/10 - 2026/02/10",
    isActive: true,
  },
  {
    id: 3,
    title: "滿千送百",
    description: "消費滿 1000 元折抵 100 元",
    type: "滿額折扣",
    discount: "折 100",
    period: "2025/12/01 - 2025/12/31",
    isActive: false,
  },
]);
</script>

<style scoped lang="scss">
.promotions-page {
  animation: slideInUp var(--transition-base);

  :deep(.n-card) {
    border: none !important;
    box-shadow: var(--shadow) !important;
  }
}

.promotion-card {
  padding: var(--spacing);
  background: var(--color-white);
  border-radius: var(--radius-md);
  border: 2px solid var(--color-gray-200);
  transition: all var(--transition-base);

  &:hover {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-lg);
    transform: translateY(-4px);
  }
}

.promotion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
}

.promotion-type {
  font-size: 0.75rem;
  color: var(--color-gray-600);
  padding: 4px 8px;
  background: var(--color-gray-100);
  border-radius: var(--radius-sm);
}

.promotion-title {
  font-size: 1.125rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin: 0 0 var(--spacing-xs);
}

.promotion-desc {
  font-size: 0.875rem;
  color: var(--color-gray-600);
  margin: 0 0 var(--spacing);
}

.promotion-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing);
  padding-top: var(--spacing);
  border-top: 1px solid var(--color-gray-200);
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8125rem;
  color: var(--color-gray-700);

  svg {
    width: 16px;
    height: 16px;
    color: var(--color-primary);
  }
}

.promotion-actions {
  display: flex;
  gap: var(--spacing-sm);
}
</style>
