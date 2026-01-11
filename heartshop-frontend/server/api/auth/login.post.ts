// server/api/auth/login.post.ts
export default defineEventHandler(async (event) => {
  // 讀取前端傳來的帳密
  const body = await readBody(event);
  const account = body?.account;
  const password = body?.password;

  // ✅ 假登入規則：你可以先寫死
  // 例如：帳號 user / 密碼 1234 才算成功
  if (account !== "user" || password !== "1234") {
    throw createError({
      statusCode: 401,
      statusMessage: "帳號或密碼錯誤",
    });
  }

  // ✅ 模擬登入成功：用 cookie 記錄 session（之後可換成 JWT/DB）
  setCookie(event, "session", "mock-session-123", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  // 回傳「登入後會用到的基本資料」
  return {
    ok: true,
    member: {
      name: "黃風睿",
      account: "user",
    },
  };
});
