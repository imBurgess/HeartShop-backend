<!-- pages/cart/payment.vue -->
<template>
  <main class="cartPage">
    <!-- STEP bar：第三步亮起 -->
    <section class="stepBar">
      <div class="step" @click="$router.push('/cart')">
        <div class="circle">01</div>
        <div class="label">MY CART<br />購物車清單</div>
      </div>
      <div class="step" @click="$router.push('/cart/confirm')">
        <div class="circle">02</div>
        <div class="label">SHIPPING & PAYMENT<br />結帳資料與付款方式</div>
      </div>
      <div class="step active">
        <div class="circle">03</div>
        <div class="label">COMPLETED<br />訂單完成</div>
      </div>
    </section>

    <n-card class="block-card" size="small">
      <h2 class="done-title">訂單已成立，謝謝您的購買！</h2>
      <p class="done-text">
        已將訂單明細寄送至您的電子郵件，若未收到，請確認垃圾信件匣或聯絡客服協助。
      </p>

      <div class="order-info">
        <div class="row">
          <span>訂單編號</span>
          <span>{{ order.orderNo }}</span>
        </div>
        <div class="row">
          <span>下單時間</span>
          <span>{{ order.date }}</span>
        </div>
        <div class="row">
          <span>付款方式</span>
          <span>{{ order.paymentText }}</span>
        </div>
        <div class="row">
          <span>訂單金額</span>
          <span>NT. {{ order.total }}</span>
        </div>
        <div class="row">
          <span>收件人</span>
          <span>{{ order.receiverName }}</span>
        </div>
      </div>

      <p class="done-text small">
        若選擇超商取貨付款，請留意簡訊與 Email 通知；若為信用卡 / LINE
        Pay，金流授權成功後將儘速為您出貨。
      </p>

      <div class="btn-row">
        <n-button round tertiary @click="$router.push('/')">
          回到首頁
        </n-button>
        <n-button round type="primary" @click="$router.push('/member/orders')">
          查看訂單紀錄
        </n-button>
      </div>
    </n-card>
  </main>
</template>

<script setup lang="ts">
const order = {
  orderNo: "HSP202412010001",
  date: new Date().toLocaleString(),
  paymentText: "信用卡一次付清",
  total: 1018,
  receiverName: "王小明",
};
</script>

<style scoped>
.cartPage {
  max-width: 960px;
  margin: 40px auto 80px;
  padding: 0 16px;
}

.stepBar {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 24px;
}
.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  opacity: 0.6;
}
.step.active {
  opacity: 1;
}
.circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #555;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 6px;
}
.step.active .circle {
  background: #555;
  color: #fff;
}
.label {
  text-align: center;
  font-size: 11px;
  line-height: 1.4;
}

.block-card {
  padding: 24px 24px 32px;
}

.done-title {
  text-align: center;
  margin-bottom: 8px;
}
.done-text {
  text-align: center;
  font-size: 13px;
  color: #666;
  margin-bottom: 16px;
}
.done-text.small {
  font-size: 12px;
  margin-top: 16px;
}

.order-info {
  max-width: 420px;
  margin: 0 auto;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 12px 0;
}
.order-info .row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding: 4px 0;
}

.btn-row {
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 16px;
}

@media (max-width: 768px) {
  .stepBar {
    gap: 16px;
  }
  .btn-row {
    flex-direction: column;
  }
}
</style>
