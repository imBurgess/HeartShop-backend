<!-- pages/member/wishlist.vue -->
<template>
  <main class="member-page">
    <n-layout class="member-layout">
      <n-layout has-sider>
        <!-- 左側：會員選單（沿用你貼的版本） -->
        <n-layout-sider width="220" bordered class="member-sider">
          <n-menu
            v-model:value="activeKey"
            :options="menuOptions"
            @update:value="handleMenuSelect"
          />
        </n-layout-sider>

        <!-- 右側：Wishlist 內容區 -->
        <n-layout-content content-style="padding: 24px 32px 40px;">
          <!-- 頁面標題 -->
          <header class="wishlist-header">
            <p class="wishlist-zh">我的收藏</p>
          </header>

          <!-- Wishlist 表格區 -->
          <section class="wishlist">
            <div class="wishlist-table">
              <!-- 表頭 -->
              <div class="wishlist-header-row">
                <span class="col-product">商品名稱</span>
                <span class="col-price">單價</span>
                <span class="col-discount">折扣價</span>
                <span class="col-action">刪除</span>
              </div>

              <!-- 沒有商品 -->
              <div v-if="wishlistItems.length === 0" class="empty-state">
                目前沒有任何收藏商品
              </div>

              <!-- 商品列 -->
              <div
                v-else
                v-for="item in wishlistItems"
                :key="item.id"
                class="wishlist-row"
              >
                <!-- 商品名稱＋圖片 -->
                <div class="col-product">
                  <NuxtLink :to="`/product/${item.id}`" class="product-block">
                    <n-image
                      :src="item.image"
                      :alt="item.nameZh"
                      width="140"
                      height="180"
                      object-fit="cover"
                      preview-disabled
                    />
                    <div class="product-info">
                      <p class="name-zh">{{ item.nameZh }}</p>
                      <p class="name-en">{{ item.nameEn }}</p>
                    </div>
                  </NuxtLink>
                </div>

                <!-- 單價 -->
                <div class="col-price">
                  <span class="price">NT {{ item.price }}</span>
                </div>

                <!-- 折扣價 -->
                <div class="col-discount">
                  <span class="discount">NT {{ item.discountPrice }}</span>
                </div>

                <!-- 刪除 -->
                <div class="col-action">
                  <button
                    class="btn-delete"
                    type="button"
                    @click="removeItem(item.id)"
                  >
                    X
                  </button>
                </div>
              </div>
            </div>

            <!-- 底部：總件數＋繼續購物 -->
            <footer class="wishlist-footer">
              <span class="count">
                【 共 {{ wishlistItems.length }} 件 】
              </span>
              <n-button type="primary" class="continue-btn" @click="goShopping">
                繼續購物 &gt;
              </n-button>
            </footer>
          </section>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { MenuOption } from "naive-ui";
import { useRouter } from "vue-router";

const router = useRouter();

// 左側選單目前所在頁：我的收藏
const activeKey = ref<string | null>("favorite");

const menuOptions: MenuOption[] = [
  { key: "dashboard", label: "會員中心" },
  { key: "favorite", label: "我的收藏" },
  { key: "orders", label: "訂單紀錄" },
  { key: "qa", label: "商品問答紀錄" },
  { key: "profile", label: "修改會員資料與密碼" },
];

// 切換左側選單時順便導頁（路徑你可以照實際專案調整）
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

// 假資料：之後改成 API 或 Pinia
const wishlistItems = ref([
  {
    id: 1,
    nameZh: "『日本居住企畫款』老呢刷喇叭褲",
    nameEn: "WatabeSop Tweed Wide Flare Pants",
    price: 0,
    discountPrice: 0,
    image: "/images/sample/wish-1.jpg",
  },
  {
    id: 2,
    nameZh: "尼龍斜背包",
    nameEn: "Nylon Body Bag",
    price: 0,
    discountPrice: 0,
    image: "/images/sample/wish-2.jpg",
  },
  {
    id: 3,
    nameZh: "2WAY尼龍雙肩包",
    nameEn: "2-Way Nylon Backpack",
    price: 0,
    discountPrice: 0,
    image: "/images/sample/wish-3.jpg",
  },
]);

// 移除收藏
const removeItem = (id: number) => {
  wishlistItems.value = wishlistItems.value.filter((item) => item.id !== id);
};

// 繼續購物
const goShopping = () => {
  // 依照你的商品列表實際路徑調整
  router.push("/shop/all");
};
</script>

<style scoped lang="scss">
/* 沿用你原本會員中心的基本框架 */
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
}

/* Wishlist 標題 */
.wishlist-header {
  text-align: center;
  margin-bottom: 24px;

  .wishlist-zh {
    font-size: 25px;
    font-weight: bold;
  }
}

/* 表格框線 */
.wishlist-table {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #eee;
}

/* 表頭列 */
.wishlist-header-row {
  display: grid;
  grid-template-columns: minmax(0, 3fr) 1fr 1fr 80px;
  padding: 8px 16px;
  background-color: #f3f3f3;
  font-size: 13px;
}

/* 資料列 */
.wishlist-row {
  display: grid;
  grid-template-columns: minmax(0, 3fr) 1fr 1fr 80px;
  padding: 16px;
  column-gap: 24px;
  align-items: center;
  border-top: 1px solid #eee;
}

/* 商品區塊 */
.product-block {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  text-decoration: none;
  color: inherit;
}

.product-info {
  padding-top: 4px;

  .name-zh {
    font-size: 13px;
    line-height: 1.4;
    margin-bottom: 4px;
  }

  .name-en {
    font-size: 12px;
    color: #d33;
    line-height: 1.4;
  }
}

/* 價格欄位 */
.col-price,
.col-discount {
  font-size: 13px;
}

.price,
.discount {
  white-space: nowrap;
}

/* 刪除按鈕 */
.btn-delete {
  width: 28px;
  height: 24px;
  border: 1px solid #999;
  background: #f5f5f5;
  font-size: 12px;
  cursor: pointer;
}

/* 空狀態 */
.empty-state {
  padding: 40px 16px;
  text-align: center;
  font-size: 14px;
}

/* 底部區塊 */
.wishlist-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px 0;
  font-size: 13px;

  .continue-btn {
    min-width: 180px;
  }
}

/* RWD */
@media (max-width: 768px) {
  .member-page {
    padding: 16px 0;
  }

  .member-layout {
    margin: 0 8px;
  }

  .wishlist-header-row {
    display: none;
  }

  .wishlist-row {
    grid-template-columns: 1fr;
    row-gap: 8px;
  }

  .col-price,
  .col-discount,
  .col-action {
    text-align: right;
  }
}
</style>
