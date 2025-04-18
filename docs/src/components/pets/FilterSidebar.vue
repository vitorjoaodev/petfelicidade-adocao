<template>
  <div 
    class="filter-sidebar"
    :class="{ active: isMobileFilterOpen }"
  >
    <div class="filter-header">
      <h2>Filtrar Pets</h2>
      <button 
        class="close-filter-btn"
        @click="$emit('closeMobileFilter')"
        aria-label="Fechar filtro"
      >
        <i class="fa-solid fa-times"></i>
      </button>
    </div>
    
    <form @submit.prevent="applyFilters" class="filter-form">
      <!-- Animal Type -->
      <div class="filter-section">
        <h3>Tipo de Animal</h3>
        <div class="filter-options">
          <div 
            v-for="type in animalTypes" 
            :key="type.value" 
            class="filter-option"
            :class="{ active: filters.type === type.value }"
            @click="selectType(type.value)"
          >
            <i :class="['fa-solid', type.icon]"></i>
            <span>{{ type.label }}</span>
          </div>
        </div>
      </div>
      
      <!-- Age Range -->
      <div class="filter-section">
        <h3>Idade (anos)</h3>
        <div class="range-slider">
          <div class="range-values">
            <span>{{ filters.ageMin }}</span>
            <span>{{ filters.ageMax === 15 ? '15+' : filters.ageMax }}</span>
          </div>
          <div class="range-inputs">
            <input
              type="range"
              min="0"
              max="15"
              step="1"
              v-model.number="filters.ageMin"
              @input="ensureAgeRange"
              class="range-min"
            />
            <input
              type="range"
              min="0"
              max="15"
              step="1"
              v-model.number="filters.ageMax"
              @input="ensureAgeRange"
              class="range-max"
            />
          </div>
        </div>
      </div>
      
      <!-- Size -->
      <div class="filter-section">
        <h3>Porte</h3>
        <div class="checkbox-group">
          <label v-for="size in sizes" :key="size.value" class="checkbox-label">
            <input
              type="checkbox"
              :value="size.value"
              v-model="filters.sizes"
            />
            <span>{{ size.label }}</span>
          </label>
        </div>
      </div>
      
      <!-- Location -->
      <div class="filter-section">
        <h3>Localização</h3>
        <select v-model="filters.location" class="select-input">
          <option value="">Qualquer Localização</option>
          <option v-for="location in locations" :key="location" :value="location">
            {{ location }}
          </option>
        </select>
      </div>
      
      <!-- Status -->
      <div class="filter-section">
        <h3>Status</h3>
        <div class="checkbox-group">
          <label v-for="status in statuses" :key="status.value" class="checkbox-label">
            <input
              type="checkbox"
              :value="status.value"
              v-model="filters.statuses"
            />
            <span>{{ status.label }}</span>
          </label>
        </div>
      </div>
      
      <div class="filter-actions">
        <button type="button" class="btn btn-outline" @click="resetFilters">
          <i class="fa-solid fa-undo"></i> Limpar
        </button>
        <button type="submit" class="btn btn-primary">
          <i class="fa-solid fa-filter"></i> Aplicar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, defineEmits, defineProps, watch } from 'vue';

const props = defineProps({
  isMobileFilterOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:filters', 'closeMobileFilter']);

const animalTypes = [
  { value: '', label: 'Todos', icon: 'fa-paw' },
  { value: 'dog', label: 'Cachorros', icon: 'fa-dog' },
  { value: 'cat', label: 'Gatos', icon: 'fa-cat' }
];

const sizes = [
  { value: 'pequeno', label: 'Pequeno' },
  { value: 'médio', label: 'Médio' },
  { value: 'grande', label: 'Grande' }
];

const statuses = [
  { value: 'disponível', label: 'Disponível' },
  { value: 'pendente', label: 'Pendente' },
  { value: 'adotado', label: 'Adotado' }
];

// Localizações em São Paulo
const locations = [
  'São Paulo - Zona Sul',
  'São Paulo - Zona Norte',
  'São Paulo - Zona Leste',
  'São Paulo - Zona Oeste',
  'São Paulo - Centro',
  'Guarulhos, SP',
  'Campinas, SP',
  'Osasco, SP',
  'Santo André, SP'
];

const defaultFilters = {
  type: '',
  ageMin: 0,
  ageMax: 15,
  sizes: [],
  location: '',
  statuses: []
};

const filters = reactive({ ...defaultFilters });

const ensureAgeRange = () => {
  if (filters.ageMin > filters.ageMax) {
    filters.ageMax = filters.ageMin;
  }
};

const selectType = (type) => {
  filters.type = type;
};

const resetFilters = () => {
  Object.assign(filters, defaultFilters);
};

const applyFilters = () => {
  emit('update:filters', { ...filters });
  emit('closeMobileFilter');
};

// Watch for prop changes to sync state
watch(() => props.filters, (newFilters) => {
  if (newFilters) {
    Object.assign(filters, newFilters);
  }
}, { deep: true });
</script>

<style lang="scss" scoped>
.filter-sidebar {
  background-color: var(--card-bg);
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  height: 100%;
  position: sticky;
  top: 1rem;
  
  @media (max-width: $breakpoint-md) {
    position: fixed;
    top: 0;
    right: -100%;
    width: 85%;
    max-width: 350px;
    height: 100vh;
    z-index: 1001;
    transition: right 0.3s ease;
    overflow-y: auto;
    
    &.active {
      right: 0;
    }
  }
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  h2 {
    font-size: 1.3rem;
    margin-bottom: 0;
  }
  
  .close-filter-btn {
    display: none;
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-size: 1.5rem;
    cursor: pointer;
    
    @media (max-width: $breakpoint-md) {
      display: block;
    }
  }
}

.filter-section {
  margin-bottom: 1.5rem;
  
  h3 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: var(--heading-color);
  }
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 0.5rem;
  background-color: var(--bg-color);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  
  i {
    font-size: 1.5rem;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
    transition: color 0.3s ease;
  }
  
  span {
    font-size: 0.8rem;
    color: var(--text-muted);
    transition: color 0.3s ease;
  }
  
  &:hover {
    background-color: rgba(var(--primary-color-rgb), 0.1);
    border-color: var(--primary-color-light);
    
    i, span {
      color: var(--primary-color);
    }
  }
  
  &.active {
    background-color: rgba(var(--primary-color-rgb), 0.15);
    border-color: var(--primary-color);
    
    i, span {
      color: var(--primary-color);
    }
  }
}

.range-slider {
  .range-values {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    
    span {
      font-size: 0.9rem;
      color: var(--text-muted);
    }
  }
  
  .range-inputs {
    position: relative;
    height: 8px;
    
    input[type="range"] {
      position: absolute;
      width: 100%;
      height: 8px;
      background: none;
      pointer-events: none;
      -webkit-appearance: none;
      z-index: 2;
      
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: var(--primary-color);
        cursor: pointer;
        pointer-events: auto;
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      }
      
      &::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: var(--primary-color);
        cursor: pointer;
        pointer-events: auto;
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      }
    }
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      height: 8px;
      background-color: var(--border-color);
      border-radius: 4px;
      z-index: 1;
    }
  }
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  
  input[type="checkbox"] {
    margin-right: 0.75rem;
    width: 18px;
    height: 18px;
    accent-color: var(--primary-color);
  }
  
  span {
    font-size: 0.95rem;
    color: var(--text-color);
  }
}

.select-input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background-color: var(--input-bg);
  color: var(--text-color);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.2);
  }
}

.filter-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    
    i {
      margin-right: 0.5rem;
    }
  }
}
</style>
