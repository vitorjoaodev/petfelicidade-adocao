import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '@/services/api';

export const usePetsStore = defineStore('pets', () => {
  // State
  const pets = ref([]);
  const loading = ref(false);
  const error = ref(null);
  
  // Actions
  const fetchPets = async (filters = {}) => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await api.getPets(filters);
      pets.value = response;
    } catch (err) {
      console.error('Error fetching pets:', err);
      error.value = 'Failed to load pets. Please try again later.';
    } finally {
      loading.value = false;
    }
  };
  
  const getPetById = (id) => {
    const pet = pets.value.find(pet => pet.id === id);
    
    if (pet) {
      return pet;
    }
    
    // If pet not found in state, we can fetch it individually
    return null;
  };
  
  const fetchPetById = async (id) => {
    loading.value = true;
    error.value = null;
    
    try {
      const pet = await api.getPetById(id);
      
      // Update in existing array if it exists
      const index = pets.value.findIndex(p => p.id === id);
      if (index !== -1) {
        pets.value[index] = pet;
      } else {
        pets.value.push(pet);
      }
      
      return pet;
    } catch (err) {
      console.error(`Error fetching pet with id ${id}:`, err);
      error.value = 'Failed to load pet details. Please try again later.';
      return null;
    } finally {
      loading.value = false;
    }
  };
  
  // Getters
  const filteredPets = computed(() => {
    return pets.value;
  });
  
  return {
    pets,
    loading,
    error,
    fetchPets,
    getPetById,
    fetchPetById,
    filteredPets
  };
});
