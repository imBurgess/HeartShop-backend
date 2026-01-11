<template>
  <NConfigProvider>
    <NMessageProvider>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider } from "naive-ui";
</script>

<style>
html,
body,
#__nuxt {
  height: 100%;
}

body {
  background-color: hsl(36, 34%, 73%);
  background-image: url("/assets/img/PaperTexture.png");
  background-size: cover;
  background-repeat: repeat;
  -webkit-transition: background-color 2s ease-in;
  transition: background-color 2s ease-in;
}
</style>
