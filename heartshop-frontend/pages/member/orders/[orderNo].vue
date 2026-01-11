<template>
  <main class="member-page">
    <n-layout class="member-layout">
      <n-layout has-sider>
        <n-layout-sider width="220" bordered class="member-sider">
          <n-menu
            v-model:value="activeKey"
            :options="menuOptions"
            @update:value="handleMenuSelect"
          />
        </n-layout-sider>

        <n-layout-content content-style="padding: 24px 32px 40px;">
          <div v-if="loading" class="empty-state">資料載入中…</div>
          <div v-else-if="error" class="empty-state">{{ error }}</div>
          <div v-else-if="order">
            <header class="detail-header">
              <h1 class="detail-en">ORDER DETAIL</h1>
              <p class="detail-zh">訂單明細</p>
            </header>

            <p class="greeting">Hi {{ memberName }}。</p>

            <section class="order-info">
              <div class="info-row">
                <span class="label">訂單編號：</span>
                <span class="value">{{ order.orderNo }}</span>
              </div>
              <div class="info-row">
                <span class="label">訂購日期：</span>
                <span class="value">{{ order.orderDate }}</span>
              </div>
              <div class="info-row">
                <span class="label">出貨日期：</span>
                <span class="value">{{ order.shipDate }}</span>
              </div>
              <div class="info-row">
                <span class="label">訂單狀態：</span>
                <span class="value">{{ order.status }}</span>
              </div>
              <div class="info-row">
                <span class="label">付款方式：</span>
                <span class="value">{{ order.payment }}</span>
              </div>
              <div class="info-row">
                <span class="label">運送方式：</span>
                <span class="value">{{ order.shipping }}</span>
              </div>
              <div class="info-row">
                <span class="label">收件人：</span>
                <span class="value">{{ order.receiver }}</span>
              </div>
              <div class="info-row">
                <span class="label">收件地址：</span>
                <span class="value">{{ order.address }}</span>
              </div>
            </section>

            <p class="note">
              ※如需辦理退貨，請於七日鑑賞期內與客服聯繫，相關規定請參考售後服務說明。
            </p>

            <section class="item-section">
              <div class="item-header">
                <span class="col-thumb">商品</span>
                <span class="col-name">商品名稱</span>
                <span class="col-qty">數量</span>
                <span class="col-price">單價</span>
                <span class="col-subtotal">小計</span>
              </div>

              <div v-for="item in order.items" :key="item.id" class="item-row">
                <div class="col-thumb">
                  <n-image
                    :src="item.image"
                    :alt="item.name"
                    width="80"
                    height="100"
                    object-fit="cover"
                    preview-disabled
                  />
                </div>
                <div class="col-name">
                  <p class="item-code">{{ item.code }}</p>
                  <p class="item-name">{{ item.name }}</p>
                  <p class="item-meta">
                    顏色：{{ item.color }}　尺寸：{{ item.size }}
                  </p>
                </div>
                <div class="col-qty">{{ item.qty }}</div>
                <div class="col-price">NT {{ formatMoney(item.price) }}</div>
                <div class="col-subtotal">
                  NT {{ formatMoney(item.subtotal) }}
                </div>
              </div>
            </section>

            <section class="amount-section">
              <div class="amount-list">
                <div class="row">
                  <span>商品金額</span>
                  <span>NT {{ formatMoney(order.amounts.merch) }}</span>
                </div>
                <div class="row">
                  <span>運費</span>
                  <span>NT {{ formatMoney(order.amounts.shipping) }}</span>
                </div>
                <div class="row">
                  <span>折扣</span>
                  <span>NT {{ formatMoney(order.amounts.discount) }}</span>
                </div>
                <div class="row">
                  <span>紅利折抵</span>
                  <span>NT {{ formatMoney(order.amounts.bonus) }}</span>
                </div>
                <div class="row total-row">
                  <span>TOTAL</span>
                  <span class="total"
                    >NT {{ formatMoney(order.amounts.total) }}</span
                  >
                </div>
              </div>
            </section>

            <footer class="detail-footer">
              <button type="button" class="btn" @click="goQuestion">
                訂單詢問
              </button>
              <button type="button" class="btn" @click="goOrders">
                返回訂單列表
              </button>
            </footer>
          </div>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { MenuOption } from "naive-ui";
import { useRouter, useRoute } from "vue-router";
import { orderService, type OrderDetail } from "~/services/order";

const router = useRouter();
const route = useRoute();

const memberName = ref("黃風睿");

// menu
const activeKey = ref<string | null>("orders");
const menuOptions: MenuOption[] = [
  { key: "dashboard", label: "會員中心" },
  { key: "favorite", label: "我的收藏" },
  { key: "orders", label: "訂單紀錄" },
  { key: "qa", label: "商品問答紀錄" },
  { key: "profile", label: "修改會員資料與密碼" },
];

const handleMenuSelect = (key: string) => {
  activeKey.value = key;
  switch (key) {
    case "dashboard":
      router.push("/member");
      break;
    case "favorite":
      router.push("/member/wishlist");
      break;
    case "orders":
      router.push("/member/orders");
      break;
    case "qa":
      router.push("/member/qa");
      break;
    case "profile":
      router.push("/member/profile");
      break;
  }
};

const formatMoney = (n: number) => new Intl.NumberFormat("zh-TW").format(n);

// data states
const loading = ref(true);
const error = ref<string | null>(null);
const order = ref<OrderDetail | null>(null);

const orderNo = route.params.orderNo as string;

const fetchDetail = async () => {
  loading.value = true;
  error.value = null;
  try {
    order.value = await orderService.detail(orderNo);
  } catch (e: any) {
    error.value = e?.message ?? "訂單載入失敗";
    order.value = null;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchDetail);

// buttons
const goQuestion = () => {
  router.push(`/member/qa/${orderNo}`);
};

const goOrders = () => {
  router.push("/member/orders");
};
</script>

<style scoped lang="scss">
.empty-state {
  padding: 40px 16px;
  text-align: center;
}
.member-page {
  padding: 40px 0 80px;
  display: flex;
  justify-content: center;
}
.member-layout {
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
}
.member-sider {
  padding: 16px 12px;
  background-color: #fff;
} /* 標題 */
.detail-header {
  text-align: center;
  margin-bottom: 16px;
  .detail-en {
    font-size: 18px;
    letter-spacing: 2px;
  }
  .detail-zh {
    font-size: 14px;
  }
}
.greeting {
  font-size: 13px;
  margin-bottom: 12px;
} /* 訂單基本資訊 */
.order-info {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #eee;
  padding: 12px 16px;
  font-size: 13px;
  margin-bottom: 8px;
  .info-row {
    display: flex;
    margin-bottom: 4px;
    .label {
      width: 90px;
      color: #555;
    }
    .value {
      flex: 1;
    }
  }
}
.note {
  font-size: 12px;
  color: #777;
  margin-bottom: 16px;
} /* 商品明細表 */
.item-section {
  margin-bottom: 24px;
  font-size: 13px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #eee;
  .item-header {
    display: grid;
    grid-template-columns: 120px 1fr 60px 80px 80px;
    background: #f3f3f3;
    padding: 8px 16px;
    border-bottom: 1px solid #ddd;
  }
  .item-row {
    display: grid;
    grid-template-columns: 120px 1fr 60px 80px 80px;
    padding: 10px 16px;
    border-top: 1px solid #eee;
    align-items: center;
  }
  .item-code {
    font-size: 11px;
    color: #666;
  }
  .item-name {
    margin-top: 2px;
  }
  .item-meta {
    margin-top: 2px;
    font-size: 11px;
    color: #777;
  }
  .col-qty,
  .col-price,
  .col-subtotal {
    text-align: right;
  }
} /* 金額區 */
.amount-section {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
  .amount-list {
    width: 220px;
    font-size: 13px;
    .row {
      display: flex;
      justify-content: space-between;
      padding: 4px 0;
    }
    .total-row {
      margin-top: 8px;
      border-top: 1px solid #ddd;
      padding-top: 8px;
      .total {
        font-size: 18px;
        color: #d00000;
      }
    }
  }
} /* 底部按鈕 */
.detail-footer {
  display: flex;
  justify-content: center;
  gap: 16px;
  .btn {
    min-width: 140px;
    padding: 8px 16px;
    border: 1px solid #333;
    background: #fff;
    font-size: 13px;
    cursor: pointer;
  }
} /* 簡單 RWD */
@media (max-width: 768px) {
  .member-page {
    padding: 16px 0;
  }
  .member-layout {
    margin: 0 8px;
  }
  .item-section {
    .item-header {
      display: none;
    }
    .item-row {
      grid-template-columns: 100px 1fr;
      grid-template-rows: auto auto auto;
      grid-template-areas: "thumb name" "thumb name" "thumb price";
      row-gap: 4px;
      .col-thumb {
        grid-area: thumb;
      }
      .col-name {
        grid-area: name;
      }
      .col-qty,
      .col-price,
      .col-subtotal {
        text-align: left;
      }
    }
  }
}
</style>
