<template>
  <div class="home-page">
    <div class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Encontre Seu Amigo Peludo Perfeito</h1>
          <p class="hero-subtitle">Adote, não compre. Dê um lar amoroso para um animal necessitado.</p>
        </div>
      </div>
    </div>
    
    <div class="container">
      <div class="pets-section">
        <div class="filter-controls">
          <div class="mobile-filter-toggle" @click="toggleMobileFilter">
            <i class="fa-solid fa-filter"></i>
            <span>Filtros</span>
          </div>
          
          <div class="view-controls">
            <span class="results-count">{{ petsCount }} pets encontrados</span>
            <ViewToggle v-model:view="currentView" />
          </div>
        </div>
        
        <div class="content-layout">
          <div class="filter-column" :class="{ 'mobile-active': isMobileFilterOpen }">
            <FilterSidebar 
              :isMobileFilterOpen="isMobileFilterOpen"
              @update:filters="updateFilters"
              @closeMobileFilter="closeMobileFilter"
            />
          </div>
          
          <div class="main-column">
            <PetGrid 
              v-if="currentView === 'grid'" 
              :pets="filteredPets" 
              :loading="loading"
            />
            <PetList 
              v-else 
              :pets="filteredPets" 
              :loading="loading"
            />
            
            <div v-if="error" class="error-message">
              <i class="fa-solid fa-exclamation-circle"></i>
              <p>{{ error }}</p>
              <button @click="fetchPets" class="btn btn-primary">Tentar Novamente</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="overlay" v-if="isMobileFilterOpen" @click="closeMobileFilter"></div>
    
    <div class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Pronto para Receber um Novo Amigo?</h2>
          <p>Entre em contato hoje para agendar uma visita ou saber mais sobre nosso processo de adoção.</p>
          <router-link to="/contact" class="btn btn-primary">Entre em Contato</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePetsStore } from '@/store/modules/pets';
import PetGrid from '@/components/pets/PetGrid.vue';
import PetList from '@/components/pets/PetList.vue';
import FilterSidebar from '@/components/pets/FilterSidebar.vue';
import ViewToggle from '@/components/pets/ViewToggle.vue';

const route = useRoute();
const router = useRouter();
const petsStore = usePetsStore();

// State
const currentView = ref(localStorage.getItem('petViewPreference') || 'grid');
const isMobileFilterOpen = ref(false);
const filters = ref({
  type: '',
  ageMin: 0,
  ageMax: 15,
  sizes: [],
  location: '',
  statuses: []
});

// Computed
const filteredPets = computed(() => petsStore.pets);
const loading = computed(() => petsStore.loading);
const error = computed(() => petsStore.error);
const petsCount = computed(() => filteredPets.value.length);

// Methods
const fetchPets = async () => {
  await petsStore.fetchPets(filters.value);
};

const updateFilters = (newFilters) => {
  filters.value = { ...newFilters };
  
  // Update URL query params
  router.push({
    query: {
      ...(newFilters.type ? { type: newFilters.type } : {}),
      ...(newFilters.ageMin > 0 ? { ageMin: newFilters.ageMin } : {}),
      ...(newFilters.ageMax < 15 ? { ageMax: newFilters.ageMax } : {}),
      ...(newFilters.sizes.length > 0 ? { sizes: newFilters.sizes.join(',') } : {}),
      ...(newFilters.location ? { location: newFilters.location } : {}),
      ...(newFilters.statuses.length > 0 ? { statuses: newFilters.statuses.join(',') } : {})
    }
  });
  
  fetchPets();
};

const toggleMobileFilter = () => {
  isMobileFilterOpen.value = !isMobileFilterOpen.value;
  
  if (isMobileFilterOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const closeMobileFilter = () => {
  isMobileFilterOpen.value = false;
  document.body.style.overflow = '';
};

// Save view preference to localStorage when it changes
watch(currentView, (newView) => {
  localStorage.setItem('petViewPreference', newView);
});

// Parse query params from URL for initial filtering
const parseQueryFilters = () => {
  const query = route.query;
  
  if (Object.keys(query).length > 0) {
    const newFilters = { ...filters.value };
    
    if (query.type) newFilters.type = query.type;
    if (query.ageMin) newFilters.ageMin = parseInt(query.ageMin);
    if (query.ageMax) newFilters.ageMax = parseInt(query.ageMax);
    if (query.sizes) newFilters.sizes = query.sizes.split(',');
    if (query.location) newFilters.location = query.location;
    if (query.statuses) newFilters.statuses = query.statuses.split(',');
    
    filters.value = newFilters;
  }
};

// Lifecycle hooks
onMounted(() => {
  parseQueryFilters();
  fetchPets();
  
  // Close mobile filter on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && isMobileFilterOpen.value) {
      closeMobileFilter();
    }
  });
});
</script>

<style lang="scss" scoped>
.home-page {
  margin-top: -2rem; // Offset the padding from main-content
}

.hero-section {
  background: linear-gradient(135deg, var(--primary-color-dark) 0%, var(--primary-color) 100%);
  padding: 4rem 0;
  color: white;
  text-align: center;
  
  @media (max-width: $breakpoint-md) {
    padding: 3rem 0;
  }
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: white;
  animation: fadeIn 0.8s ease;
  
  @media (max-width: $breakpoint-md) {
    font-size: 2.5rem;
  }
  
  @media (max-width: $breakpoint-sm) {
    font-size: 2rem;
  }
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  animation: slideUp 1s ease;
  
  @media (max-width: $breakpoint-sm) {
    font-size: 1.1rem;
  }
}

.pets-section {
  padding: 2rem 0;
}

.filter-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}

.mobile-filter-toggle {
  display: none;
  align-items: center;
  padding: 0.6rem 1rem;
  background-color: var(--card-bg);
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  i {
    margin-right: 0.5rem;
    color: var(--primary-color);
  }
  
  @media (max-width: $breakpoint-md) {
    display: flex;
  }
}

.view-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  
  .results-count {
    color: var(--text-muted);
    font-size: 0.95rem;
  }
  
  @media (max-width: $breakpoint-sm) {
    width: 100%;
    justify-content: space-between;
  }
}

.content-layout {
  display: flex;
  gap: 2rem;
  
  @media (max-width: $breakpoint-md) {
    gap: 1.5rem;
  }
}

.filter-column {
  flex: 0 0 280px;
  
  @media (max-width: $breakpoint-md) {
    display: none;
    
    &.mobile-active {
      display: block;
    }
  }
}

.main-column {
  flex: 1;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.error-message {
  text-align: center;
  padding: 2rem;
  background-color: rgba(var(--danger), 0.1);
  border-radius: 0.75rem;
  margin-top: 2rem;
  
  i {
    font-size: 2rem;
    color: var(--danger);
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 1.5rem;
    color: var(--text-color);
  }
}

.cta-section {
  background-color: rgba(var(--primary-color-rgb), 0.1);
  padding: 4rem 0;
  margin-top: 3rem;
  text-align: center;
}

.cta-content {
  max-width: 700px;
  margin: 0 auto;
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
    
    @media (max-width: $breakpoint-sm) {
      font-size: 1.75rem;
    }
  }
  
  p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    color: var(--text-color);
    
    @media (max-width: $breakpoint-sm) {
      font-size: 1rem;
    }
  }
  
  .btn {
    padding: 0.75rem 2rem;
  }
}
</style>
