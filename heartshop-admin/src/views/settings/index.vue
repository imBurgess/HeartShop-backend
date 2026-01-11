<template>
  <div class="settings-page">
    <n-grid :cols="1" :y-gap="24">
      <!-- 基本設定 -->
      <n-gi>
        <n-card title="基本設定" :bordered="false">
          <n-form label-placement="left" label-width="140">
            <n-form-item label="商店名稱">
              <n-input placeholder="拾心市集" />
            </n-form-item>
            <n-form-item label="商店 Email">
              <n-input placeholder="shop@heartshop.com" />
            </n-form-item>
            <n-form-item label="客服電話">
              <n-input placeholder="0800-123-456" />
            </n-form-item>
            <n-form-item label="商店地址">
              <n-input placeholder="台北市信義區..." />
            </n-form-item>
            <n-form-item label="營業時間">
              <n-input placeholder="週一至週五 09:00-18:00" />
            </n-form-item>
          </n-form>
        </n-card>
      </n-gi>

      <!-- 通知設定 -->
      <n-gi>
        <n-card title="通知設定" :bordered="false">
          <n-form label-placement="left" label-width="140">
            <n-form-item label="新訂單通知">
              <n-switch />
            </n-form-item>
            <n-form-item label="庫存警告通知">
              <n-switch />
            </n-form-item>
            <n-form-item label="會員註冊通知">
              <n-switch />
            </n-form-item>
            <n-form-item label="Email 通知">
              <n-switch />
            </n-form-item>
          </n-form>
        </n-card>
      </n-gi>

      <!-- 支付設定 -->
      <n-gi>
        <n-card title="支付設定" :bordered="false">
          <n-form label-placement="left" label-width="140">
            <n-form-item label="信用卡支付">
              <n-switch />
            </n-form-item>
            <n-form-item label="ATM 轉帳">
              <n-switch />
            </n-form-item>
            <n-form-item label="貨到付款">
              <n-switch />
            </n-form-item>
            <n-form-item label="LINE Pay">
              <n-switch />
            </n-form-item>
          </n-form>
        </n-card>
      </n-gi>

      <!-- 物流設定 -->
      <n-gi>
        <n-card title="物流設定" :bordered="false">
          <n-form label-placement="left" label-width="140">
            <n-form-item label="宅配">
              <n-switch />
            </n-form-item>
            <n-form-item label="超商取貨">
              <n-switch />
            </n-form-item>
            <n-form-item label="門市自取">
              <n-switch />
            </n-form-item>
            <n-form-item label="運費設定">
              <n-input-number placeholder="60" :min="0">
                <template #suffix>元</template>
              </n-input-number>
            </n-form-item>
            <n-form-item label="免運門檻">
              <n-input-number placeholder="1000" :min="0">
                <template #suffix>元</template>
              </n-input-number>
            </n-form-item>
          </n-form>
        </n-card>
      </n-gi>

      <!-- 操作按鈕 -->
      <n-gi>
        <n-space justify="end">
          <n-button>重置</n-button>
          <n-button type="primary" size="large">儲存設定</n-button>
        </n-space>
      </n-gi>
    </n-grid>
  </div>
</template>

<style scoped lang="scss">
.settings-page {
  animation: slideInUp var(--transition-base);

  :deep(.n-card) {
    border: none !important;
    box-shadow: var(--shadow) !important;

    .n-card-header {
      padding: var(--spacing-md) var(--spacing-md) var(--spacing) !important;
      border-bottom: 1px solid var(--color-gray-200) !important;

      .n-card__header-main {
        font-size: 1.125rem;
        font-weight: var(--font-weight-bold);
        color: var(--color-gray-900);
      }
    }
  }
}
</style>
