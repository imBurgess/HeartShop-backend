// services/auth.ts
import { apiFetch } from "./http/client";

export interface LoginRequest {
  account: string;
  password: string;
}

export interface LoginResponse {
  ok: boolean;
  member: {
    name: string;
    account: string;
  };
}

export const authService = {
  login(body: LoginRequest) {
    return apiFetch<LoginResponse>("/api/auth/login", {
      method: "POST",
      body,
    });
  },
};
