<!-- pages/cart/confirm.vue -->
<template>
  <main class="cartPage">
    <!-- STEP 流程列 -->
    <section class="stepBar">
      <div class="step" @click="$router.push('/cart')">
        <div class="circle">01</div>
        <div class="label">MY CART<br />購物車清單</div>
      </div>
      <div class="step active">
        <div class="circle">02</div>
        <div class="label">SHIPPING & PAYMENT<br />結帳資料與付款方式</div>
      </div>
      <div class="step">
        <div class="circle">03</div>
        <div class="label">COMPLETED<br />訂單完成</div>
      </div>
    </section>

    <!-- 付款/運送方式 -->
    <n-card class="block-card" title="Payment 付款與寄送方式" size="small">
      <div class="row">
        <n-select
          v-model:value="form.country"
          :options="countryOptions"
          style="max-width: 220px"
        />
        <n-select
          v-model:value="form.paymentMethod"
          :options="paymentOptions"
          style="max-width: 260px"
        />
        <n-select
          v-model:value="form.shippingMethod"
          :options="shippingOptionsForCurrentMethod"
          style="max-width: 260px"
        />
      </div>

      <!-- 信用卡才顯示提示 -->
      <p v-if="form.paymentMethod === 'credit_card'" class="hint">
        ※ 信用卡一次付清：VISA / MASTER / JCB
      </p>
      <p v-else-if="form.paymentMethod === 'line_pay'" class="hint">
        ※ 使用 LINE Pay 結帳，可累積 LINE POINTS（依合作規則為準）
      </p>
      <p v-else-if="form.paymentMethod === 'cvs'" class="hint">
        ※ 7-11 店到店取貨付款，請確實填寫收件人與門市資料。
      </p>
    </n-card>

    <!-- Coupon / 點數 + 金額摘要 -->
    <n-card class="block-card" size="small">
      <div class="coupon-row">
        <div class="coupon-col">
          <div class="coupon-title">使用折價券 Coupon</div>
          <div class="coupon-input">
            <n-input
              v-model:value="form.couponCode"
              placeholder="輸入一組折扣碼"
              size="small"
              style="max-width: 220px"
            />
            <n-button size="small" @click="applyCoupon">使用</n-button>
          </div>
        </div>

        <div class="coupon-col points">
          <div class="coupon-title">使用點數 Point</div>
          <n-input-number
            v-model:value="form.usePoints"
            :max="availablePoints"
            :min="0"
            size="small"
            style="max-width: 120px"
          />
          <span class="note"
            >可用點數 {{ availablePoints }} 點（1 點折抵 1 元）</span
          >
        </div>
      </div>

      <div class="summary-table">
        <div class="summary-row">
          <span>商品金額 Price</span>
          <span>NT. {{ summary.price }}</span>
        </div>
        <div class="summary-row">
          <span>折扣 Discount</span>
          <span>- NT. {{ summary.discount }}</span>
        </div>
        <div class="summary-row">
          <span>折抵 Coupon</span>
          <span>- NT. {{ summary.coupon }}</span>
        </div>
        <div class="summary-row">
          <span>點數 Point</span>
          <span>- NT. {{ summary.point }}</span>
        </div>
        <div class="summary-row">
          <span>運費 Shipping Fee</span>
          <span>NT. {{ summary.shipping }}</span>
        </div>
      </div>

      <div class="total-row">
        <span>TOTAL</span>
        <span>NT. {{ totalAmount }}</span>
      </div>

      <p class="remark">
        寄送商品前，將會為您進行檢查及包裝。出貨與配送時間依各物流業者實際狀況為準。
      </p>
    </n-card>

    <!-- 信用卡表單（如果選信用卡） -->
    <n-card
      v-if="form.paymentMethod === 'credit_card'"
      class="block-card"
      title="Credit Card 信用卡付款（VISA / MASTER / JCB）"
      size="small"
    >
      <div class="card-form">
        <div class="card-panel">
          <div class="card-label">卡號 Card number</div>
          <n-input
            v-model:value="cardForm.number"
            placeholder="XXXX XXXX XXXX XXXX"
          />
          <div class="card-inline">
            <div>
              <div class="card-label">有效期限 Expiration date</div>
              <n-input v-model:value="cardForm.expiry" placeholder="MM / YY" />
            </div>
          </div>
        </div>

        <div class="card-panel">
          <div class="card-label">安全碼 Security code</div>
          <n-input
            v-model:value="cardForm.cvv"
            placeholder="CVV"
            style="max-width: 160px"
          />
          <div class="card-label" style="margin-top: 24px">
            持卡人簽名 AUTHORIZED SIGNATURE
          </div>
          <div class="sign-box"></div>
        </div>
      </div>
      <p class="remark">
        您的信用卡資料將透過第三方金流安全加密處理，本網站不會儲存完整卡號及安全碼。
      </p>
    </n-card>

    <!-- 收件人資訊 -->
    <n-card class="block-card" title="Information 收貨人資訊" size="small">
      <n-form
        :model="receiverForm"
        label-placement="top"
        label-width="auto"
        :show-require-mark="false"
      >
        <div class="two-cols">
          <n-form-item label="收件人姓名 Name">
            <n-input v-model:value="receiverForm.name" />
          </n-form-item>
          <n-form-item label="收件人手機 Mobile">
            <n-input v-model:value="receiverForm.mobile" />
          </n-form-item>
        </div>

        <n-form-item label="收件人地址 Address">
          <div class="address-row">
            <n-input v-model:value="receiverForm.zip" placeholder="郵遞區號" />
            <n-input v-model:value="receiverForm.city" placeholder="縣市" />
            <n-input v-model:value="receiverForm.district" placeholder="區" />
          </div>
          <n-input
            v-model:value="receiverForm.address"
            placeholder="路名、門牌、樓層..."
            style="margin-top: 8px"
          />
        </n-form-item>

        <n-form-item label="備註 / 指定時間（選填）">
          <n-input
            v-model:value="receiverForm.note"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 6 }"
          />
        </n-form-item>

        <n-form-item label="發票資訊">
          <n-radio-group v-model:value="receiverForm.invoiceType">
            <n-space vertical>
              <n-radio value="personal">電子發票（個人載具）</n-radio>
              <n-radio value="company">公司發票（請填寫統編與抬頭）</n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>

        <n-form-item>
          <n-checkbox v-model:checked="receiverForm.agree">
            我已詳細閱讀並同意本站購物相關規範與隱私權政策。
          </n-checkbox>
        </n-form-item>
      </n-form>
    </n-card>

    <!-- 送出訂單 -->
    <section class="submitRow">
      <n-button
        round
        tertiary
        size="large"
        style="margin-right: 16px"
        @click="$router.push('/cart')"
      >
        回到購物車
      </n-button>

      <n-button
        round
        type="primary"
        size="large"
        :disabled="!receiverForm.agree"
        @click="handleSubmit"
      >
        ORDER 下訂
      </n-button>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, reactive, watchEffect } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 付款 / 運送
const countryOptions = [{ label: "台灣", value: "tw" }];

const paymentOptions = [
  { label: "信用卡一次付清 VISA / MASTER / JCB", value: "credit_card" },
  { label: "LINE Pay", value: "line_pay" },
  { label: "7-11 超商取貨付款", value: "cvs" },
];

const shippingByMethod: Record<string, { label: string; value: string }[]> = {
  credit_card: [
    { label: "宅配到府", value: "home" },
    { label: "超商取貨不付款", value: "cvs_no_pay" },
  ],
  line_pay: [
    { label: "宅配到府", value: "home" },
    { label: "超商取貨付款", value: "cvs_pay" },
  ],
  cvs: [{ label: "7-11 取貨付款", value: "711_pay" }],
};

const form = reactive({
  country: "tw",
  paymentMethod: "credit_card",
  shippingMethod: "home",
  couponCode: "",
  usePoints: 0,
});

const shippingOptionsForCurrentMethod = computed(
  () => shippingByMethod[form.paymentMethod] ?? []
);

// 金額假資料
const availablePoints = 500;

const summary = reactive({
  price: 1043,
  discount: 105,
  coupon: 0,
  point: 0,
  shipping: 80,
});

const totalAmount = computed(
  () =>
    summary.price -
    summary.discount -
    summary.coupon -
    summary.point +
    summary.shipping
);

// 信用卡表單（假資料）
const cardForm = reactive({
  number: "",
  expiry: "",
  cvv: "",
});

// 收貨人資訊
const receiverForm = reactive({
  name: "",
  mobile: "",
  zip: "",
  city: "",
  district: "",
  address: "",
  note: "",
  invoiceType: "personal",
  agree: false,
});

const applyCoupon = () => {
  if (!form.couponCode) return;
  // demo：隨便給個折扣
  summary.coupon = 50;
};

watchEffect(() => {
  summary.point = Math.min(form.usePoints, availablePoints);
});

const handleSubmit = () => {
  // 之後這裡可以送出到後端 / Pinia
  // 目前先直接導到訂單完成頁
  router.push("/cart/payment");
};
</script>

<style scoped>
.cartPage {
  max-width: 960px;
  margin: 40px auto 80px;
  padding: 0 16px;
}

/* STEP bar */
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
  margin-bottom: 20px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 8px;
}
.hint {
  font-size: 12px;
  color: #888;
}

/* Coupon + summary */
.coupon-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 12px;
}
.coupon-col {
  flex: 1 1 260px;
}
.coupon-title {
  font-size: 13px;
  margin-bottom: 6px;
}
.coupon-input {
  display: flex;
  gap: 8px;
  align-items: center;
}
.points {
  align-items: center;
}
.note {
  font-size: 12px;
  color: #888;
  margin-left: 8px;
}

.summary-table {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 8px 0;
  margin-top: 8px;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding: 2px 0;
}

.total-row {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  margin-top: 8px;
  color: #b12704;
}

.remark {
  margin-top: 8px;
  font-size: 11px;
  color: #777;
  line-height: 1.6;
}

/* 信用卡 */
.card-form {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
.card-panel {
  flex: 1 1 260px;
  padding: 16px;
  background: #333;
  color: #fff;
  border-radius: 4px;
}
.card-label {
  font-size: 12px;
  margin-bottom: 6px;
}
.card-inline {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}
.sign-box {
  margin-top: 6px;
  border-bottom: 1px solid #999;
  height: 30px;
}

/* 收件人資訊 */
.two-cols {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
.address-row {
  display: flex;
  gap: 8px;
}

.submitRow {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

/* RWD */
@media (max-width: 768px) {
  .stepBar {
    gap: 16px;
  }
  .two-cols {
    grid-template-columns: 1fr;
  }
  .card-form {
    flex-direction: column;
  }
}
</style>
