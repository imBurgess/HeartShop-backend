// server/api/member/orders/[orderNo].get.ts
export default defineEventHandler((event) => {
  const { orderNo } = event.context.params!;

  return {
    orderNo,
    orderDate: "2025-08-08",
    shipDate: "2025-08-08",
    status: "已出貨",
    payment: "信用卡一次付清",
    shipping: "7-11 取貨",
    receiver: "黃風睿",
    address: "台中市西屯區某某路 123 號",
    items: [
      {
        id: 1,
        image: "https://via.placeholder.com/200x260.png?text=TOP",
        code: "AAAS-11C01",
        name: "UNISEX 刺繡 LOGO 短袖 T-shirt",
        color: "CHARCOAL GRAY",
        size: "L",
        qty: 1,
        price: 788,
        subtotal: 788,
      },
      {
        id: 2,
        image: "https://via.placeholder.com/200x260.png?text=PANTS",
        code: "AAAS-148111",
        name: "修身墊肩寬褲 Shadow Slub Flare Pants",
        color: "KHAKI",
        size: "L",
        qty: 1,
        price: 988,
        subtotal: 988,
      },
    ],
    amounts: {
      merch: 1776,
      shipping: 80,
      discount: -293,
      bonus: -10,
      total: 1553,
    },
  };
});
