<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-left">
        <p class="copyright">© 2026 拾心市集. All rights reserved.</p>
      </div>
      <div class="footer-right">
        <a href="#" class="footer-link">關於我們</a>
        <span class="footer-divider">•</span>
        <a href="#" class="footer-link">隱私政策</a>
        <span class="footer-divider">•</span>
        <a href="#" class="footer-link">使用條款</a>
        <span class="footer-divider">•</span>
        <a href="#" class="footer-link">幫助中心</a>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  padding: var(--spacing) var(--spacing-md);
  background: var(--color-white);
  border-top: 1px solid var(--color-gray-200);
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--spacing);
}

.footer-left {
  display: flex;
  align-items: center;
}

.copyright {
  font-size: 0.875rem;
  color: var(--color-gray-600);
}

.footer-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.footer-link {
  font-size: 0.875rem;
  color: var(--color-gray-600);
  text-decoration: none;
  transition: color var(--transition-base);

  &:hover {
    color: var(--color-primary);
  }
}

.footer-divider {
  color: var(--color-gray-400);
}
</style>
