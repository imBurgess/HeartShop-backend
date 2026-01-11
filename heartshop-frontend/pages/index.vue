<template>
  <div>
    <Particles />
    <main>
      <!--廣告區-->
      <div class="banner-carousel">
        <n-carousel show-arrow autoplay v-if="carouselBlocks.length > 0">
          <div
            v-for="block in carouselBlocks"
            :key="block.blockId"
            class="carousel-item"
            @click="handleCarouselClick(block)"
          >
            <img
              class="carousel-img"
              :src="getFullImageUrl(block.imageUrl)"
              :alt="block.title || 'Banner'"
            />
          </div>

          <template #arrow="{ prev, next }">
            <div class="custom-arrow">
              <button type="button" class="custom-arrow--left" @click="prev">
                <n-icon><ArrowBack /></n-icon>
              </button>
              <button type="button" class="custom-arrow--right" @click="next">
                <n-icon><ArrowForward /></n-icon>
              </button>
            </div>
          </template>

          <template #dots="{ total, currentIndex, to }">
            <ul class="custom-dots">
              <li
                v-for="index of total"
                :key="index"
                :class="{ ['is-active']: currentIndex === index - 1 }"
                @click="to(index - 1)"
              />
            </ul>
          </template>
        </n-carousel>

        <!-- 如果沒有輪播圖資料,顯示佔位符 -->
        <div v-else class="carousel-placeholder">
          <p>暫無輪播圖資料</p>
        </div>
      </div>

      <!--goods-->
      <div class="goods_header">
        <h1 class="main-head watch inview">
          <span class="split-w"><span>G</span></span>
          <span class="split-w"><span>O</span></span>
          <span class="split-w"><span>O</span></span>
          <span class="split-w"><span>D</span></span>
          <span class="split-w"><span>S</span></span>
        </h1>

        <div class="lines watch inview">
          <span class="hori hori-1"></span>
          <span class="hori hori-2"></span>
          <span class="hori hori-3"></span>
          <span class="hori hori-4"></span>
          <span class="hori hori-5"></span>

          <span class="ver ver-1"></span>
          <span class="ver ver-2"></span>
          <span class="ver ver-3"></span>
          <span class="ver ver-4"></span>
          <span class="ver ver-5"></span>
        </div>
      </div>
      <!--商品欄位-->
      <section class="product-grid">
        <div class="product-card" v-for="(item, i) in products" :key="i">
          <img :src="item.image" :alt="item.name" class="product-image" />

          <div class="product-info">
            <h3 class="product-name">{{ item.name }}</h3>
            <p class="product-price">{{ item.price }}</p>
            <p v-if="item.soldOut" class="sold-out">- SOLD OUT -</p>
          </div>
        </div>
      </section>

      <!-- 所有商品按鈕 -->
      <div class="view-all-button-container">
        <a href="/shop/recommend" class="view-all-button">
          <span>ALL ITEMS</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <!-- 會員 -->
      <a href="/member" class="join-member-banner">
        <p>加入會員禮送 <span class="highlight">XX</span> 點</p>
      </a>

      <!--商品推薦-->
      <section class="featured-products">
        <div class="main-banner">
          <a :href="mainBanner.href" target="_blank">
            <img :src="mainBanner.image" alt="廣告 or 商品介紹圖" />
          </a>
        </div>

        <div class="sub-products">
          <a
            v-for="(item, i) in subProducts"
            :key="i"
            :href="item.href"
            target="_blank"
            class="product"
          >
            <img :src="item.image" :alt="item.name" />
            <p>{{ item.name }}</p>
          </a>
        </div>
      </section>

      <!--消息-->
      <section class="announcements">
        <!-- 上方大公告 -->
        <a class="hero" :href="hero.href" target="_blank" rel="noopener">
          <span>{{ hero.title }}</span>
        </a>

        <!-- 下方兩張 -->
        <div class="tiles">
          <a
            v-for="(t, i) in tiles"
            :key="i"
            class="tile"
            :href="t.href"
            target="_blank"
            rel="noopener"
          >
            <span>{{ t.title }}</span>
          </a>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Particles from "@/components/Particles.vue";
import { ArrowBack, ArrowForward } from "@vicons/ionicons5";
import { homeBlockService, type HomeBlockDTO } from "@/services/homeBlock";
import { productService } from "@/services/product";

// 輪播廣告
const carouselBlocks = ref<HomeBlockDTO[]>([]);

// 會員橫幅
const memberBanner = ref<HomeBlockDTO | null>(null);

// 商品推薦區
const productRecommendBlocks = ref<HomeBlockDTO[]>([]);
const mainBanner = ref({
  image: "",
  href: "#",
});
const subProducts = ref([
  {
    name: "商品名稱 A",
    image: "",
    href: "#",
  },
  {
    name: "商品名稱 B",
    image: "",
    href: "#",
  },
]);

// 商品欄位（從 API 取得，隨機 8 個）
const products = ref<any[]>([
  { name: "商品名稱1", price: "9,000", image: "", soldOut: true },
  { name: "商品名稱2", price: "9,000", image: "", soldOut: true },
  { name: "商品名稱3", price: "9,000", image: "", soldOut: true },
  { name: "商品名稱4", price: "9,000", image: "", soldOut: true },
  { name: "商品名稱5", price: "9,000", image: "", soldOut: true },
  { name: "商品名稱6", price: "9,000", image: "", soldOut: true },
  { name: "商品名稱7", price: "9,000", image: "", soldOut: true },
  { name: "商品名稱8", price: "9,000", image: "", soldOut: true },
]);

// 公告區
const hero = ref({
  title: "提醒防詐騙公告",
  href: "#",
});

const tiles = ref([
  { title: "精選", href: "#" },
  { title: "精選", href: "#" },
]);

// 圖片 URL 轉換函數
const getFullImageUrl = (imageUrl?: string): string => {
  if (!imageUrl) return "";
  // 如果已經是完整 URL,直接返回
  if (imageUrl.startsWith("http")) return imageUrl;
  // 否則加上後端 baseURL（注意：後端 context-path=/api）
  const baseUrl = "http://localhost:8080/api"; // 可從環境變數讀取
  return `${baseUrl}${imageUrl}`;
};

// 輪播圖點擊處理
const handleCarouselClick = (block: HomeBlockDTO) => {
  if (block.linkUrl) {
    // 如果有設定連結,導向該連結
    window.location.href = block.linkUrl;
  }
};

// 載入首頁資料
onMounted(async () => {
  try {
    // 並發呼叫 4 個 API
    const [carousel, member, productRecommend, announcement] =
      await Promise.all([
        homeBlockService.getBlocksByType("CAROUSEL").catch(() => []),
        homeBlockService.getBlocksByType("MEMBER_BANNER").catch(() => []),
        homeBlockService.getBlocksByType("PRODUCT_RECOMMEND").catch(() => []),
        homeBlockService
          .getBlocksByType("GENERAL_ANNOUNCEMENT")
          .catch(() => []),
      ]);

    // 輪播廣告
    if (carousel && carousel.length > 0) {
      carouselBlocks.value = carousel;
    }

    // 會員橫幅
    if (member && member.length > 0 && member[0]) {
      memberBanner.value = member[0];
    }

    // 商品推薦區
    if (productRecommend && productRecommend.length > 0) {
      productRecommendBlocks.value = productRecommend;

      // 設定主圖（第一個區塊）
      const mainBlock = productRecommend.find(
        (block) =>
          block.products && block.products.length > 0 && block.products[0]
      );
      if (mainBlock && mainBlock.products && mainBlock.products.length > 0) {
        mainBanner.value = {
          image: mainBlock.imageUrl || "",
          href: mainBlock.linkUrl || "#",
        };

        // 設定子商品（第二個開始）
        if (mainBlock.products.length > 1) {
          subProducts.value = mainBlock.products.slice(1).map((product) => ({
            name: product.name,
            image: "", // 如果 product 有圖片則填入
            href: `/product/${product.productId}`,
          }));
        }
      }
    }

    // 公告區
    if (announcement && announcement.length > 0) {
      // 第一個為大公告
      if (announcement[0]) {
        hero.value = {
          title: announcement[0].title || "提醒防詐騙公告",
          href: announcement[0].linkUrl || "#",
        };
      }

      // 後續為小公告
      if (announcement.length > 1) {
        tiles.value = announcement.slice(1, 3).map((block) => ({
          title: block.title || "精選",
          href: block.linkUrl || "#",
        }));
      }
    }

    // 載入隨機商品（8個）
    try {
      const productResponse = await productService.getProducts({
        isActive: true,
        pageSize: 20, // 取20個然後隨機選8個
      });

      // 後端回傳格式：{ code: "0000", data: { items: [...], total: ... } }
      if (
        productResponse &&
        productResponse.data &&
        productResponse.data.items
      ) {
        const allProducts = productResponse.data.items;

        // 隨機打亂並取前8個
        const shuffled = allProducts.sort(() => Math.random() - 0.5);
        const randomProducts = shuffled.slice(0, 8);

        products.value = randomProducts.map((product: any) => ({
          name: product.name,
          price: product.discountPrice
            ? `$${product.discountPrice.toLocaleString()}`
            : product.price
            ? `$${product.price.toLocaleString()}`
            : "9,000",
          image: product.imageUrl ? getFullImageUrl(product.imageUrl) : "",
          soldOut: product.isSoldOut || false,
        }));
      }
    } catch (error) {
      console.error("載入商品失敗:", error);
    }
  } catch (error) {
    console.error("載入首頁資料失敗:", error);
  }
});
</script>
<style lang="scss">
@use "@/assets/scss/home/banner" as *;
@use "@/assets/scss/home/joinmember" as *;
@use "@/assets/scss/home/news" as *;
@use "@/assets/scss/home/productlist1" as *;
@use "@/assets/scss/home/productlist2" as *;
@use "@/assets/scss/home/line" as *;
</style>
