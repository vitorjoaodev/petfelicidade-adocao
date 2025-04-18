<template>
  <div class="view-toggle">
    <button 
      class="view-toggle-btn" 
      :class="{ active: view === 'grid' }"
      @click="setView('grid')"
      aria-label="Visualização em grade"
    >
      <i class="fa-solid fa-th-large"></i>
    </button>
    <button 
      class="view-toggle-btn" 
      :class="{ active: view === 'list' }"
      @click="setView('list')"
      aria-label="Visualização em lista"
    >
      <i class="fa-solid fa-list"></i>
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  view: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:view']);

const setView = (view) => {
  emit('update:view', view);
};
</script>

<style lang="scss" scoped>
.view-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--card-bg);
  border-radius: 0.5rem;
  padding: 0.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.view-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--text-muted);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.3rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
    background-color: rgba(var(--primary-color-rgb), 0.1);
  }
  
  &.active {
    background-color: var(--primary-color);
    color: white;
  }
}
</style>
