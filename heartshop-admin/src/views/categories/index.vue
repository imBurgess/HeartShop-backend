<template>
  <div class="categories-page">
    <n-card title="商品分類頁面管理" :bordered="false">
      <template #header-extra>
        <n-button type="primary" @click="handleCreate">
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 4v16m8-8H4"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </template>
          新增分類
        </n-button>
      </template>

      <!-- 表格 -->
      <n-spin :show="loading">
        <n-data-table
          :columns="columns"
          :data="categories"
          :row-key="(row: any) => row.categoryId"
          :pagination="{ pageSize: 20 }"
          style="margin-top: 16px"
        />
      </n-spin>
    </n-card>

    <!-- 新增/編輯彈窗 -->
    <n-modal
      v-model:show="showModal"
      preset="card"
      :title="isEdit ? '編輯分類' : '新增分類'"
      style="width: 600px"
    >
      <n-form :model="formData" label-placement="left" label-width="100">
        <n-form-item label="中文名稱" required>
          <n-input
            v-model:value="formData.nameZh"
            placeholder="請輸入中文名稱"
          />
        </n-form-item>
        <n-form-item label="英文名稱" required>
          <n-input
            v-model:value="formData.nameEn"
            placeholder="請輸入英文名稱"
          />
        </n-form-item>
        <n-form-item label="URL Slug" required>
          <n-input v-model:value="formData.slug" placeholder="例如：tops" />
        </n-form-item>
        <n-form-item label="父分類">
          <n-select
            v-model:value="formData.parentId"
            :options="parentOptions"
            clearable
            placeholder="選擇父分類（可選）"
          />
        </n-form-item>
        <n-form-item label="排序">
          <n-input-number
            v-model:value="formData.sortOrder"
            :min="0"
            style="width: 100%"
          />
        </n-form-item>
        <n-form-item label="狀態">
          <n-checkbox v-model:checked="formData.isActive">啟用</n-checkbox>
        </n-form-item>

        <!-- Banner 圖片上傳 -->
        <n-form-item label="Banner 圖片">
          <n-upload
            :action="uploadUrl"
            v-model:file-list="bannerFileList"
            list-type="image-card"
            name="file"
            :headers="uploadHeaders"
            :max="1"
            @finish="handleUploadFinish"
            @remove="handleRemoveBanner"
            @error="handleUploadError"
          >
            <span v-if="bannerFileList.length === 0">點擊上傳 Banner</span>
          </n-upload>
          <div style="color: #999; font-size: 12px; margin-top: 4px">
            建議尺寸：1200x300 px，將顯示在前台分類頁面頂部
          </div>
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button @click="showModal = false">取消</n-button>
          <n-button type="primary" :loading="submitting" @click="handleSubmit"
            >儲存</n-button
          >
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, h, onMounted, computed } from "vue";
import {
  NButton,
  NTag,
  NSpace,
  useDialog,
  useMessage,
  type DataTableColumns,
  type UploadFileInfo,
} from "naive-ui";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  type Category,
} from "@/api/category";
import { useAuthStore } from "@/stores/auth";

const dialog = useDialog();
const message = useMessage();
const authStore = useAuthStore();

const categories = ref<Category[]>([]);
const loading = ref(false);
const submitting = ref(false);

const showModal = ref(false);
const isEdit = ref(false);

// Banner 圖片上傳相關
const bannerFileList = ref<UploadFileInfo[]>([]);
const uploadUrl = computed(() => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
  return `${baseUrl}/api/upload/image`;
});
const uploadHeaders = computed(() => ({
  Authorization: `Bearer ${authStore.token}`,
}));

const formData = ref({
  categoryId: undefined as number | undefined,
  nameZh: "",
  nameEn: "",
  slug: "",
  parentId: undefined as number | undefined,
  sortOrder: 0,
  isActive: true,
  bannerUrl: "",
});

// 父分類選項 (過濾掉自己與自己的子分類，這裡簡單過濾掉自己)
const parentOptions = computed(() => {
  return categories.value
    .filter((c) => c.categoryId !== formData.value.categoryId)
    .map((c) => ({
      label: c.nameZh,
      value: c.categoryId,
    }));
});

// Banner 圖片上傳處理
const handleUploadFinish = ({
  file,
  event,
}: {
  file: UploadFileInfo;
  event?: ProgressEvent;
}) => {
  try {
    const res = JSON.parse((event?.target as XMLHttpRequest).response);
    if (res.code === "0000") {
      file.url = res.data.url;
      file.status = "finished";
      formData.value.bannerUrl = res.data.url;
      message.success("上傳成功");
    } else {
      message.error(res.message || "上傳失敗");
      file.status = "error";
    }
  } catch (e) {
    message.error("上傳回應解析失敗");
    file.status = "error";
  }
  return file;
};

const handleRemoveBanner = () => {
  formData.value.bannerUrl = "";
  bannerFileList.value = [];
};

const handleUploadError = () => {
  message.error("上傳發生錯誤");
};

// 載入分類
const loadCategories = async () => {
  loading.value = true;
  try {
    const res = await getCategories();
    categories.value = res.data || [];
  } catch (err: any) {
    message.error(err.message || "載入失敗");
  } finally {
    loading.value = false;
  }
};

// 表格欄位
const columns: DataTableColumns<any> = [
  {
    title: "ID",
    key: "categoryId",
    width: 60,
  },
  {
    title: "中文名稱",
    key: "nameZh",
    width: 120,
  },
  {
    title: "英文名稱",
    key: "nameEn",
    width: 120,
  },
  {
    title: "Slug",
    key: "slug",
    width: 120,
  },
  {
    title: "父分類",
    key: "parentId",
    width: 120,
    render: (row) => {
      if (!row.parentId) return "-";
      const parent = categories.value.find(
        (c) => c.categoryId === row.parentId
      );
      return parent ? parent.nameZh : row.parentId;
    },
  },
  {
    title: "排序",
    key: "sortOrder",
    width: 80,
  },
  {
    title: "狀態",
    key: "isActive",
    width: 100,
    render: (row) => {
      return h(
        NTag,
        { type: row.isActive ? "success" : "default", size: "small" },
        () => (row.isActive ? "啟用" : "停用")
      );
    },
  },
  {
    title: "操作",
    key: "actions",
    width: 180,
    fixed: "right",
    render: (row) => {
      return h(NSpace, { size: 8 }, () => [
        h(
          NButton,
          { size: "small", onClick: () => handleEdit(row) },
          () => "編輯"
        ),
        h(
          NButton,
          {
            size: "small",
            type: "error",
            onClick: () => handleDelete(row.categoryId),
          },
          () => "刪除"
        ),
      ]);
    },
  },
];

const handleCreate = () => {
  isEdit.value = false;
  formData.value = {
    categoryId: undefined,
    nameZh: "",
    nameEn: "",
    slug: "",
    parentId: undefined,
    sortOrder: 0,
    isActive: true,
    bannerUrl: "",
  };
  bannerFileList.value = [];
  showModal.value = true;
};

const handleEdit = (row: any) => {
  isEdit.value = true;
  formData.value = { ...row };

  // 還原 banner 圖片
  if (row.bannerUrl) {
    const baseUrl =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
    bannerFileList.value = [
      {
        id: "banner",
        name: "banner.jpg",
        status: "finished",
        url: row.bannerUrl.startsWith("http")
          ? row.bannerUrl
          : `${baseUrl}${row.bannerUrl}`,
      },
    ];
  } else {
    bannerFileList.value = [];
  }

  showModal.value = true;
};

const handleSubmit = async () => {
  if (!formData.value.nameZh || !formData.value.slug) {
    message.warning("請填寫必要欄位");
    return;
  }

  submitting.value = true;
  try {
    if (isEdit.value && formData.value.categoryId) {
      // 確保將 parentId 為 null/undefined 的情況處理好，有些後端可能不接受空字串或 null
      const submitData = { ...formData.value };
      if (!submitData.parentId) {
        submitData.parentId = undefined; // 確保不是 null
      }

      await updateCategory(formData.value.categoryId, submitData as any);
      message.success("更新成功");
    } else {
      const submitData = { ...formData.value };
      if (!submitData.parentId) {
        submitData.parentId = undefined;
      }

      await createCategory(submitData as any);
      message.success("新增成功");
    }
    showModal.value = false;
    loadCategories(); // 重新載入列表
  } catch (err: any) {
    message.error(err.message || "操作失敗");
  } finally {
    submitting.value = false;
  }
};

const handleDelete = (id: number) => {
  dialog.warning({
    title: "確認刪除",
    content: "確定要刪除此分類嗎？若有子分類需先刪除子分類。",
    positiveText: "確定",
    negativeText: "取消",
    onPositiveClick: async () => {
      try {
        await deleteCategory(id);
        message.success("刪除成功");
        loadCategories();
      } catch (err: any) {
        message.error(err.message || "刪除失敗");
      }
    },
  });
};

onMounted(() => {
  loadCategories();
});
</script>

<style scoped lang="scss">
.categories-page {
  animation: slideInUp var(--transition-base);

  :deep(.n-card) {
    border: none !important;
    box-shadow: var(--shadow) !important;
  }

  :deep(.n-data-table) {
    border-radius: var(--radius-md) !important;
  }
}
</style>
