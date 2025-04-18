import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useFavoritesStore = defineStore('favorites', () => {
  // State
  const favorites = ref([]);
  
  // Initialize favorites from localStorage
  const initFavorites = () => {
    const savedFavorites = localStorage.getItem('petFavorites');
    if (savedFavorites) {
      try {
        favorites.value = JSON.parse(savedFavorites);
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
        favorites.value = [];
      }
    }
  };
  
  // Save favorites to localStorage whenever they change
  watch(favorites, (newFavorites) => {
    localStorage.setItem('petFavorites', JSON.stringify(newFavorites));
  }, { deep: true });
  
  // Actions
  const addFavorite = (pet) => {
    if (!isFavorite(pet.id)) {
      favorites.value.push(pet);
    }
  };
  
  const removeFavorite = (petId) => {
    const index = favorites.value.findIndex(pet => pet.id === petId);
    if (index !== -1) {
      favorites.value.splice(index, 1);
    }
  };
  
  const clearFavorites = () => {
    favorites.value = [];
  };
  
  // Getters
  const isFavorite = (petId) => {
    return favorites.value.some(pet => pet.id === petId);
  };
  
  const favoritesCount = computed(() => {
    return favorites.value.length;
  });
  
  // Initialize on creation
  initFavorites();
  
  return {
    favorites,
    addFavorite,
    removeFavorite,
    clearFavorites,
    isFavorite,
    favoritesCount
  };
});
