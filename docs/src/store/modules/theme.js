import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  // State
  const isDarkTheme = ref(false);
  
  // Actions
  const toggleTheme = () => {
    isDarkTheme.value = !isDarkTheme.value;
    localStorage.setItem('darkTheme', isDarkTheme.value);
  };
  
  const initTheme = () => {
    // Check if theme preference exists in localStorage
    const savedTheme = localStorage.getItem('darkTheme');
    
    if (savedTheme !== null) {
      isDarkTheme.value = savedTheme === 'true';
    } else {
      // If no preference exists, check for system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      isDarkTheme.value = prefersDark;
      localStorage.setItem('darkTheme', isDarkTheme.value);
    }
  };
  
  return {
    isDarkTheme,
    toggleTheme,
    initTheme
  };
});
