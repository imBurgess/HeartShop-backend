<template>
  <teleport to="body">
    <div ref="L" class="bg-dust left" aria-hidden="true"></div>
    <div ref="R" class="bg-dust right" aria-hidden="true"></div>
  </teleport>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const L = ref(null);
const R = ref(null);
const N = 240;

const r = (n) => Math.random() * n;

// 左邊 sign=+1、右邊 sign=-1，點會落在左右 gutter 內
const gen = (n, w, h, sign = 1) =>
  Array.from({ length: n }, () => {
    const x = r(w) * sign; // 右邊用負值往左偏
    const y = r(h);
    const blur = (Math.random() * 1.2).toFixed(2);
    const spread = (Math.random() * 1.2).toFixed(2); // 控制點大小
    const a = (0.15 + Math.random() * 0.35).toFixed(2);
    return `${x}px ${y}px ${blur}px ${spread}px rgba(0,0,0,${a})`;
  }).join(", ");

function paint() {
  const vh = window.innerHeight + 1000;
  const pageW = Math.min(1200, window.innerWidth * 0.9);
  const side = Math.max(16, (window.innerWidth - pageW) / 2); // 左右 gutter

  if (L.value) {
    L.value.style.boxShadow = gen(N / 2, side, vh, +1);
    L.value.style.setProperty("--move", `${vh}px`);
  }
  if (R.value) {
    R.value.style.boxShadow = gen(N / 2, side, vh, -1);
    R.value.style.setProperty("--move", `${vh}px`);
  }
}

onMounted(() => {
  paint();
  window.addEventListener("resize", paint);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", paint);
});
</script>

<style>
/* 讓站內內容永遠在粒子層上面 */
html,
body {
  height: 100%;
}
#__nuxt {
  position: relative;
  z-index: 1;
  isolation: isolate;
}

.bg-dust {
  position: fixed;
  top: 0;
  /* 不要 bottom:0，避免元素被拉成整塊導致陰影成“線” */
  width: 2px; /* 想更細就 1px */
  height: 2px;
  border-radius: 50%; /* 陰影複製圓形 → 變成點 */
  pointer-events: none;
  background: transparent;
  z-index: 0;
  animation: rise 120s linear infinite;
  will-change: transform;
}
.bg-dust.left {
  left: 0;
}
.bg-dust.right {
  right: 0;
}

@keyframes rise {
  to {
    transform: translateY(calc(var(--move) * -1));
  }
}
</style>
