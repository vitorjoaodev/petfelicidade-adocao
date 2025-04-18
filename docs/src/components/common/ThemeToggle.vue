<template>
  <button 
    class="theme-toggle" 
    @click="toggleTheme" 
    :aria-label="isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'"
  >
    <i :class="['fa-solid', isDarkTheme ? 'fa-sun' : 'fa-moon']"></i>
  </button>
</template>

<script setup>
import { computed } from 'vue';
import { useThemeStore } from '@/store/modules/theme';

const themeStore = useThemeStore();
const isDarkTheme = computed(() => themeStore.isDarkTheme);

const toggleTheme = () => {
  themeStore.toggleTheme();
};
</script>

<style lang="scss" scoped>
.theme-toggle {
  background: transparent;
  border: none;
  color: var(--text-color);
  font-size: 1.2rem;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
  
  &:hover {
    background-color: rgba(var(--primary-color-rgb), 0.1);
    transform: rotate(15deg);
  }
  
  &:focus {
    outline: none;
    background-color: rgba(var(--primary-color-rgb), 0.15);
  }
}
</style>
