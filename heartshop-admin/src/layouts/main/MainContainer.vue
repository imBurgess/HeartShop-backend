<template>
  <main class="main">
    <div class="main-container">
      <slot />
    </div>
  </main>
</template>

<style scoped lang="scss">
.main {
  flex: 1;
  min-width: 0;
  overflow: auto;
  background: var(--color-gray-50);
}

.main-container {
  padding: var(--spacing-md);
  min-height: 100%;
  animation: fadeIn var(--transition-base);
}
</style>
