<template>
  <div class="dashboard-page">
    <!-- 歡迎區塊 -->
    <div class="welcome-card">
      <div class="welcome-content">
        <h1 class="welcome-title">
          歡迎回來，{{ auth.user?.name ?? "管理員" }} 👋
        </h1>
        <p class="welcome-subtitle">這是您的商店管理儀表板，一覽商店營運狀況</p>
      </div>
      <div class="welcome-time">
        <p class="current-date">{{ currentDate }}</p>
        <p class="current-time">{{ currentTime }}</p>
      </div>
    </div>

    <!-- 統計卡片 -->
    <div class="stats-grid">
      <div class="stat-card stat-card-primary">
        <div class="stat-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="stat-info">
          <p class="stat-label">總商品數</p>
          <p class="stat-value">125</p>
          <p class="stat-change stat-change-up">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            12% 較上月
          </p>
        </div>
      </div>

      <div class="stat-card stat-card-success">
        <div class="stat-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="stat-info">
          <p class="stat-label">本月訂單</p>
          <p class="stat-value">87</p>
          <p class="stat-change stat-change-up">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            8% 較上月
          </p>
        </div>
      </div>

      <div class="stat-card stat-card-warning">
        <div class="stat-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="stat-info">
          <p class="stat-label">會員總數</p>
          <p class="stat-value">1,234</p>
          <p class="stat-change stat-change-up">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            15% 較上月
          </p>
        </div>
      </div>

      <div class="stat-card stat-card-info">
        <div class="stat-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="stat-info">
          <p class="stat-label">本月營收</p>
          <p class="stat-value">NT$ 45.6K</p>
          <p class="stat-change stat-change-down">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            3% 較上月
          </p>
        </div>
      </div>
    </div>

    <!-- 快速操作 -->
    <div class="quick-actions-section">
      <h2 class="section-title">快速操作</h2>
      <div class="quick-actions">
        <router-link to="/products/create" class="action-card">
          <div class="action-icon action-icon-primary">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 4v16m8-8H4"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <div class="action-info">
            <p class="action-title">新增商品</p>
            <p class="action-desc">快速建立新商品</p>
          </div>
        </router-link>

        <router-link to="/products" class="action-card">
          <div class="action-icon action-icon-success">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="action-info">
            <p class="action-title">商品管理</p>
            <p class="action-desc">管理所有商品庫存</p>
          </div>
        </router-link>

        <router-link to="/orders" class="action-card">
          <div class="action-icon action-icon-warning">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <div class="action-info">
            <p class="action-title">訂單管理</p>
            <p class="action-desc">處理待處理訂單</p>
          </div>
        </router-link>

        <router-link to="/members" class="action-card">
          <div class="action-icon action-icon-info">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="action-info">
            <p class="action-title">會員管理</p>
            <p class="action-desc">查看會員資料</p>
          </div>
        </router-link>
      </div>
    </div>

    <!-- 最近活動 -->
    <div class="recent-activity-section">
      <h2 class="section-title">最近活動</h2>
      <div class="activity-card">
        <div class="activity-list">
          <div class="activity-item">
            <div class="activity-icon activity-icon-success">✓</div>
            <div class="activity-content">
              <p class="activity-title">新訂單 #1234</p>
              <p class="activity-time">5 分鐘前</p>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-icon activity-icon-primary">+</div>
            <div class="activity-content">
              <p class="activity-title">新增商品「蕾絲洋裝」</p>
              <p class="activity-time">1 小時前</p>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-icon activity-icon-warning">!</div>
            <div class="activity-content">
              <p class="activity-title">商品庫存不足警告</p>
              <p class="activity-time">2 小時前</p>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-icon activity-icon-info">i</div>
            <div class="activity-content">
              <p class="activity-title">新會員註冊</p>
              <p class="activity-time">3 小時前</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();

const currentDate = ref("");
const currentTime = ref("");

const updateTime = () => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  currentDate.value = now.toLocaleDateString("zh-TW", options);
  currentTime.value = now.toLocaleTimeString("zh-TW", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

let timer: number;

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped lang="scss">
.dashboard-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  animation: slideInUp var(--transition-base);
}

.welcome-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg);
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-primary-dark) 100%
  );
  color: var(--color-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
}

.welcome-content {
  position: relative;
  z-index: 1;
}

.welcome-title {
  font-size: 1.75rem;
  font-weight: var(--font-weight-bold);
  margin: 0 0 var(--spacing-xs);
}

.welcome-subtitle {
  font-size: 1rem;
  opacity: 0.9;
  margin: 0;
}

.welcome-time {
  position: relative;
  z-index: 1;
  text-align: right;
}

.current-date,
.current-time {
  margin: 0;
  opacity: 0.95;
}

.current-date {
  font-size: 0.9375rem;
  margin-bottom: 4px;
}

.current-time {
  font-size: 2rem;
  font-weight: var(--font-weight-bold);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

.stat-card {
  display: flex;
  align-items: center;
  gap: var(--spacing);
  padding: var(--spacing-md);
  background: var(--color-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow);
  transition: all var(--transition-base);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
}

.stat-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);

  svg {
    width: 28px;
    height: 28px;
  }
}

.stat-card-primary .stat-icon {
  background: var(--color-primary-bg);
  color: var(--color-primary);
}

.stat-card-success .stat-icon {
  background: rgba(76, 175, 80, 0.1);
  color: var(--color-success);
}

.stat-card-warning .stat-icon {
  background: rgba(255, 152, 0, 0.1);
  color: var(--color-warning);
}

.stat-card-info .stat-icon {
  background: rgba(33, 150, 243, 0.1);
  color: var(--color-info);
}

.stat-info {
  flex: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--color-gray-600);
  margin: 0 0 4px;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin: 0 0 4px;
}

.stat-change {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8125rem;
  font-weight: var(--font-weight-medium);
  margin: 0;

  svg {
    width: 14px;
    height: 14px;
  }
}

.stat-change-up {
  color: var(--color-success);
}

.stat-change-down {
  color: var(--color-error);
}

.section-title {
  font-size: 1.25rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin: 0 0 var(--spacing);
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--spacing);
}

.action-card {
  display: flex;
  align-items: center;
  gap: var(--spacing);
  padding: var(--spacing);
  background: var(--color-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow);
  text-decoration: none;
  transition: all var(--transition-base);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);

    .action-icon {
      transform: scale(1.1);
    }
  }
}

.action-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  transition: transform var(--transition-base);

  svg {
    width: 24px;
    height: 24px;
  }
}

.action-icon-primary {
  background: var(--color-primary-bg);
  color: var(--color-primary);
}

.action-icon-success {
  background: rgba(76, 175, 80, 0.1);
  color: var(--color-success);
}

.action-icon-warning {
  background: rgba(255, 152, 0, 0.1);
  color: var(--color-warning);
}

.action-icon-info {
  background: rgba(33, 150, 243, 0.1);
  color: var(--color-info);
}

.action-title {
  font-size: 1rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin: 0 0 4px;
}

.action-desc {
  font-size: 0.875rem;
  color: var(--color-gray-600);
  margin: 0;
}

.activity-card {
  background: var(--color-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow);
  padding: var(--spacing-md);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing);
}

.activity-item {
  display: flex;
  align-items: center;
  gap: var(--spacing);
  padding: var(--spacing-sm);
  border-radius: var(--radius);
  transition: background var(--transition-base);

  &:hover {
    background: var(--color-gray-50);
  }
}

.activity-item .activity-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: var(--font-weight-bold);
  flex-shrink: 0;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: 0.9375rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-900);
  margin: 0 0 2px;
}

.activity-time {
  font-size: 0.8125rem;
  color: var(--color-gray-600);
  margin: 0;
}
</style>
