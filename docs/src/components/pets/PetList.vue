<template>
  <div class="pet-list">
    <div v-if="pets.length === 0 && !loading" class="no-pets-found">
      <i class="fa-solid fa-paw"></i>
      <h3>No pets found</h3>
      <p>Try changing your filters or check back later for new arrivals</p>
    </div>
    
    <div v-else class="pet-list-container">
      <template v-if="loading">
        <div v-for="n in 4" :key="`skeleton-${n}`" class="pet-list-skeleton mb-4"></div>
      </template>
      
      <template v-else>
        <div 
          v-for="pet in pets" 
          :key="`pet-${pet.id}`" 
          class="mb-4"
        >
          <PetCard :pet="pet" :list-view="true" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import PetCard from '@/components/pets/PetCard.vue';

defineProps({
  pets: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="scss" scoped>
.pet-list {
  width: 100%;
}

.no-pets-found {
  text-align: center;
  padding: 4rem 2rem;
  background-color: var(--card-bg);
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  
  i {
    font-size: 3rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
    opacity: 0.7;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: var(--text-muted);
  }
}

.pet-list-skeleton {
  height: 180px;
  background-color: var(--card-bg);
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 220px;
    bottom: 0;
    background-color: var(--border-color);
    
    @media (max-width: $breakpoint-md) {
      width: 150px;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 1.5rem;
    left: 240px;
    right: 1.5rem;
    height: 120px;
    background: linear-gradient(
      to bottom,
      var(--border-color) 0%,
      var(--border-color) 15%,
      transparent 15%,
      transparent 30%,
      var(--border-color) 30%,
      var(--border-color) 40%,
      transparent 40%,
      transparent 50%,
      var(--border-color) 50%,
      var(--border-color) 60%,
      transparent 60%,
      transparent 80%,
      var(--border-color) 80%,
      var(--border-color) 90%
    );
    background-size: 100% 100%;
    
    @media (max-width: $breakpoint-md) {
      left: 170px;
    }
  }
  
  &::before, &::after {
    animation: pulse-skeleton 1.5s infinite;
  }
}

@keyframes pulse-skeleton {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.6;
  }
}
</style>
