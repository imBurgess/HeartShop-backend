<!-- pages/product/[id].vue -->
<template>
  <main class="pdPage" v-if="product">
    <!-- ===== 第一段：左圖 + 右側資訊 ===== -->
    <section class="pdMain">
      <!-- 左：圖片區 -->
      <div class="pdGallery">
        <!-- 小縮圖：直排 -->
        <div class="pdThumbList">
          <button
            v-for="(img, index) in product.images"
            :key="img"
            class="pdThumb"
            :class="{ active: index === mainImageIndex }"
            @click="mainImageIndex = index"
          >
            <img :src="img" :alt="product.name" />
          </button>
        </div>

        <!-- 大圖 -->
        <div class="pdMainPhoto">
          <img :src="currentImage" :alt="product.name" />
        </div>
      </div>

      <!-- 右：商品資訊 -->
      <div class="pdInfo">
        <p class="pdCode">{{ product.code }}</p>
        <h1 class="pdName">{{ product.name }}</h1>
        <p class="pdEnName">{{ product.enName }}</p>

        <p class="pdPrice">NT $ {{ product.price.toLocaleString() }}</p>

        <!-- （顏色區塊已移除） -->

        <!-- SIZE / QTY -->
        <div class="pdSelectRow">
          <label class="pdSelect">
            <span>SIZE</span>
            <select v-model="selectedSize">
              <option value="" disabled>請選擇尺寸</option>
              <option v-for="size in product.sizes" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
          </label>

          <label class="pdSelect">
            <span>QTY</span>
            <select v-model.number="selectedQty">
              <option v-for="n in 10" :key="n" :value="n">
                {{ n }}
              </option>
            </select>
          </label>
        </div>

        <!-- 加入購物車 -->
        <button class="pdAddBtn" @click="handleAddToBag">ADD TO BAG</button>

        <div class="pdSubLinks">
          <button class="linkBtn" type="button">WISH LIST</button>
          <button class="linkBtn" type="button">Q&amp;A +</button>
        </div>
      </div>
    </section>

    <!-- ===== 第二段：下方 Tabs（Detail / Size Info） ===== -->
    <section class="pdTabs">
      <div class="pdTabHeader">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="pdTabBtn"
          :class="{ active: currentTab === tab.key }"
          @click="currentTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="pdTabBody">
        <p v-if="currentTab === 'detail'">
          Polyester 100%（這裡之後可以改成從 product.detail 來）
        </p>
        <p v-else-if="currentTab === 'size'">
          SIZE INFO：之後可以放尺寸表、腰圍 / 褲長等等。
        </p>
      </div>
    </section>

    <!-- ===== 第三段：YOU MAY ALSO LIKE ===== -->
    <section class="pdSection">
      <h2 class="pdSectionTitle">YOU MAY ALSO LIKE</h2>

      <div class="pdRecommendList">
        <article
          v-for="item in alsoLike"
          :key="item.id"
          class="pdCard"
          @click="goProduct(item.id)"
        >
          <div class="thumb">
            <img :src="item.image" :alt="item.name" />
          </div>
          <p class="name">{{ item.name }}</p>
          <p class="price">NT {{ item.price.toLocaleString() }}</p>
        </article>
      </div>
    </section>
  </main>

  <main v-else class="pdPage">
    <p>找不到此商品。</p>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// 取得網址中的 id：/product/1
const id = computed(() => Number(route.params.id));

// ==== 假資料：之後改成 API / 資料庫 ====
const mockProducts = [
  {
    id: 1,
    code: "AAA7-14A115",
    name: "抽摺鬆緊版西裝褲",
    enName: "Pintuck Wide Slacks",
    price: 2190,
    images: [
      "/products/pants01-1.jpg",
      "/products/pants01-2.jpg",
      "/products/pants01-3.jpg",
      "/products/pants01-4.jpg",
    ],
    sizes: ["S", "M", "L"],
    image: "/products/pants01-1.jpg", // 給推薦區用的縮圖
  },
  {
    id: 2,
    code: "AAA7-14A200",
    name: "格紋寬版西裝褲",
    enName: "Check Wide Slacks",
    price: 1990,
    images: ["/products/pants02-1.jpg"],
    sizes: ["M", "L"],
    image: "/products/pants02-1.jpg",
  },
  {
    id: 3,
    code: "AAA7-14A300",
    name: "素面寬版西裝褲",
    enName: "Plain Wide Slacks",
    price: 2190,
    images: ["/products/pants03-1.jpg"],
    sizes: ["S", "M", "L"],
    image: "/products/pants03-1.jpg",
  },
];

const product = computed(() => mockProducts.find((p) => p.id === id.value));

// 主要大圖 index
const mainImageIndex = ref(0);
const currentImage = computed(() => {
  const p = product.value;
  if (!p) return "";
  return p.images[mainImageIndex.value] || p.images[0];
});

// 尺寸 / 數量
const selectedSize = ref<string | "">("");
const selectedQty = ref(1);

// Tabs（DETAIL / SIZE INFO）
const tabs = [
  { key: "detail", label: "DETAIL" },
  { key: "size", label: "SIZE INFO" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const currentTab = ref<TabKey>("detail");

// YOU MAY ALSO LIKE（這裡先簡單取「不是自己的其它商品」）
const alsoLike = computed(() => mockProducts.filter((p) => p.id !== id.value));

// 加入購物車
const handleAddToBag = () => {
  const p = product.value;
  if (!p) return;
  if (!selectedSize.value) {
    window.alert("請先選擇尺寸");
    return;
  }

  console.log("加入購物車：", {
    id: p.id,
    name: p.name,
    size: selectedSize.value,
    qty: selectedQty.value,
  });

  // 之後可以在這裡呼叫後端 API 或丟到 Pinia
};

// 跳到其他商品
const goProduct = (pid: number) => {
  router.push(`/product/${pid}`);
};
</script>

<style scoped lang="scss">
.pdPage {
  width: min(1100px, 94%);
  margin: 32px auto 80px;
}

/* ===== 第一段：主區塊 ===== */
.pdMain {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

/* 左：圖片 */
.pdGallery {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 12px;
}

.pdThumbList {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pdThumb {
  padding: 0;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  background: #fff;
  width: 64px;
  height: 64px;

  &.active {
    border-color: #000;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.pdMainPhoto {
  border: 1px solid #ddd;
  background: #f7f7f7;
  min-height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    max-height: 520px;
    object-fit: contain;
  }
}

/* 右：商品資訊 */
.pdInfo {
  font-size: 14px;
}

.pdCode {
  letter-spacing: 0.06em;
  margin-bottom: 4px;
}

.pdName {
  font-size: 18px;
  margin: 0 0 4px;
}
.pdEnName {
  font-size: 15px;
  margin: 0 0 12px;
}

.pdPrice {
  color: #d60000;
  font-size: 18px;
  margin-bottom: 20px;
}

/* 尺寸 / 數量 */
.pdSelectRow {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.pdSelect {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  letter-spacing: 0.08em;

  select {
    height: 36px;
    border: 1px solid #ccc;
    padding: 0 8px;
    font-size: 13px;
  }
}

/* ADD TO BAG */
.pdAddBtn {
  width: 100%;
  height: 40px;
  margin-top: 4px;
  border: none;
  background: #000;
  color: #fff;
  letter-spacing: 0.12em;
  font-size: 13px;
  cursor: pointer;
}

/* WISH / Q&A / icon */
.pdSubLinks {
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 16px;

  .linkBtn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-size: 12px;
    letter-spacing: 0.12em;
  }

  .iconBtn {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 1px solid #000;
    background: none;
    cursor: pointer;
    font-size: 14px;
  }
}

/* ===== 第二段：Tabs ===== */
.pdTabs {
  border-top: 1px solid #ddd;
  padding-top: 20px;
  margin-bottom: 40px;
  font-size: 13px;
}

.pdTabHeader {
  display: flex;
  gap: 24px;
  margin-bottom: 12px;
}

.pdTabBtn {
  background: none;
  border: none;
  padding: 0 0 4px;
  cursor: pointer;
  letter-spacing: 0.12em;
  font-size: 12px;

  &.active {
    border-bottom: 1px solid #000;
  }
}

.pdTabBody {
  min-height: 60px;
}

/* ===== YOU MAY ALSO LIKE & RECENTLY VIEWED ===== */
.pdSection {
  margin-bottom: 40px;
}

.pdSectionTitle {
  font-size: 13px;
  letter-spacing: 0.14em;
  margin-bottom: 16px;
}

.pdRecommendList {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.pdRecentList {
  display: flex;
  gap: 18px;
}

.pdCard {
  cursor: pointer;
  font-size: 12px;

  .thumb {
    border: 1px solid #ddd;
    background: #f7f7f7;
    margin-bottom: 6px;

    img {
      width: 100%;
      display: block;
      object-fit: cover;
    }
  }

  .name {
    margin: 0 0 4px;
  }

  .price {
    margin: 0;
  }

  &.small .thumb img {
    height: 140px;
    object-fit: cover;
  }
}

/* RWD */
@media (max-width: 900px) {
  .pdMain {
    grid-template-columns: 1fr;
  }

  .pdGallery {
    grid-template-columns: 64px 1fr;
  }

  .pdRecommendList {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
