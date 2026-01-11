export const apiFetch = async <T>(url: string, opts: any = {}) => {
  const response = await $fetch<{ code: string; data: T }>(url, {
    method: opts.method ?? "GET",
    query: opts.query,
    body: opts.body,
    headers: opts.headers,
  });

  // 提取 ApiResponse 的 data 欄位
  return response.data;
};
