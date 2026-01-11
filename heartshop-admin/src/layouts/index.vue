<template>
  <div class="admin-layout">
    <HeaderBar />

    <div class="admin-body">
      <AsideMenu />

      <MainContainer>
        <RouterView />
      </MainContainer>
    </div>

    <FooterBar />
  </div>
</template>

<script setup lang="ts">
import HeaderBar from "./header/HeaderBar.vue";
import AsideMenu from "./aside/AsideMenu.vue";
import MainContainer from "./main/MainContainer.vue";
import FooterBar from "./footer/FooterBar.vue";
</script>

<style scoped lang="scss">
.admin-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.admin-body {
  flex: 1;
  display: flex;
  min-height: 0; // 防止內容撐爆，搭配 overflow 很重要
}
</style>
