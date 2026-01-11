<template>
  <main class="member-page">
    <n-layout class="member-layout">
      <n-layout has-sider>
        <!-- 左側：會員選單 -->
        <n-layout-sider width="220" bordered class="member-sider">
          <n-menu
            v-model:value="activeKey"
            :options="menuOptions"
            @update:value="handleMenuSelect"
          />
        </n-layout-sider>

        <!-- 右側：Q&A 內容 -->
        <n-layout-content content-style="padding: 24px 32px 40px;">
          <!-- 標題 -->
          <header class="qa-header">
            <p class="qa-zh">商品問答紀錄</p>
          </header>

          <!-- Q&A 列表卡片 -->
          <section class="qa-section">
            <!-- 灰色表頭 -->
            <div class="qa-table-header">
              <span class="col-question">提問紀錄</span>
            </div>

            <!-- 內容區 -->
            <div class="qa-table-body">
              <!-- 載入中 -->
              <div v-if="loading" class="qa-loading">資料載入中…</div>

              <!-- 沒有任何提問 -->
              <div v-else-if="qnaList.length === 0" class="qa-empty">
                尚未提問
              </div>

              <!-- 有提問紀錄 -->
              <div v-else>
                <div v-for="item in qnaList" :key="item.id" class="qa-row">
                  <div class="qa-question">
                    <p class="q-text">{{ item.question }}</p>
                    <p class="q-meta">
                      商品：{{ item.productName }} ｜ 提問時間：{{
                        item.createdAt
                      }}
                    </p>
                  </div>

                  <!-- 如果有回覆 -->
                  <div v-if="item.answer" class="qa-answer">
                    <span class="a-label">回覆：</span>
                    <p class="a-text">{{ item.answer }}</p>
                  </div>

                  <!-- 如果尚未回覆 -->
                  <div v-else class="qa-answer pending">尚未回覆</div>
                </div>
              </div>
            </div>
          </section>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFetch } from "#app";
import { useRouter } from "vue-router";
import type { MenuOption } from "naive-ui";

const activeKey = ref<string | null>("qa");

const menuOptions: MenuOption[] = [
  { key: "dashboard", label: "會員中心" },
  { key: "favorite", label: "我的收藏" },
  { key: "orders", label: "訂單紀錄" },
  { key: "qa", label: "商品問答紀錄" },
  { key: "profile", label: "修改會員資料與密碼" },
];

const router = useRouter();

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

interface QnaItem {
  id: number | string;
  productName: string;
  question: string;
  answer?: string | null;
  createdAt: string;
}

const qnaList = ref<QnaItem[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const { data, error } = await useFetch<QnaItem[]>("/api/member/qna");

    if (error.value) {
      console.error("取得 Q&A 失敗", error.value);
      qnaList.value = [];
    } else {
      qnaList.value = data.value ?? [];
    }
  } catch (err) {
    console.error(err);
    qnaList.value = [];
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped lang="scss">
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

:deep(.n-layout-content) {
  padding: 32px 48px 48px;
}

/* 標題區 */
.qa-header {
  text-align: center;
  margin-bottom: 24px;
}
.qa-zh {
  font-size: 25px;
  font-weight: bold;
}

/* 灰色表頭列 */
.qa-section {
  margin-top: 8px;
}

.qa-table-header {
  background-color: #b3b3b3;
  color: #ffffff;
  padding: 8px 16px;
  font-size: 13px;
}

.col-question {
  display: inline-block;
  width: 100%;
  text-align: center;
}

/* 內容區 */
.qa-table-body {
  border: 1px solid #e5e5e5;
  border-top: none;
  padding: 16px 24px 24px;
  min-height: 200px;
}

.qa-loading,
.qa-empty {
  font-size: 14px;
  color: #666666;
}

/* 一筆紀錄 */
.qa-row {
  padding: 12px 0;
  border-bottom: 1px solid #eeeeee;
}

.qa-row:last-child {
  border-bottom: none;
}

.qa-question .q-text {
  font-size: 14px;
  margin-bottom: 4px;
}

.qa-question .q-meta {
  font-size: 12px;
  color: #999999;
}

.qa-answer {
  margin-top: 4px;
  font-size: 13px;
}

.qa-answer.pending {
  color: #c0a000;
}

.a-label {
  font-weight: 600;
  margin-right: 4px;
  display: inline-block;
}
</style>
