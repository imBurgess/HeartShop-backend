// services/order.ts
import { apiFetch } from "./http/client";

export interface Order {
  orderNo: string;
  date: string;
  status: string;
  amount: number;
}

export interface OrderItem {
  id: number;
  image: string;
  code: string;
  name: string;
  color: string;
  size: string;
  qty: number;
  price: number;
  subtotal: number;
}

export interface OrderDetail {
  orderNo: string;
  orderDate: string;
  shipDate: string;
  status: string;
  payment: string;
  shipping: string;
  receiver: string;
  address: string;
  items: OrderItem[];
  amounts: {
    merch: number;
    shipping: number;
    discount: number;
    bonus: number;
    total: number;
  };
}

export const orderService = {
  list() {
    return apiFetch<Order[]>("/api/member/orders");
  },

  detail(orderNo: string) {
    return apiFetch<OrderDetail>(`/api/member/orders/${orderNo}`);
  },
};
