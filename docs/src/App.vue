<template>
  <div class="app" :class="{ 'dark-theme': isDarkTheme }">
    <AppHeader />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { computed, watchEffect } from 'vue';
import AppHeader from '@/components/common/AppHeader.vue';
import AppFooter from '@/components/common/AppFooter.vue';
import { useThemeStore } from '@/store/modules/theme';

const themeStore = useThemeStore();
const isDarkTheme = computed(() => themeStore.isDarkTheme);

// Set or remove dark-theme class on body
watchEffect(() => {
  if (isDarkTheme.value) {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
});

// Initialize theme from localStorage
themeStore.initTheme();
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.main-content {
  min-height: calc(100vh - 140px);
  padding: 2rem 0;
}
</style>
