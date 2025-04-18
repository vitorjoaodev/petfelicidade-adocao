<template>
  <div class="favorites-page">
    <div class="container">
      <div class="page-header">
        <h1>
          <i class="fa-solid fa-heart"></i>
          Seus Pets Favoritos
        </h1>
        <p v-if="favoriteCount > 0">Aqui estão os pets que você salvou para ver mais tarde.</p>
      </div>
      
      <div v-if="favoriteCount > 0" class="favorites-actions">
        <div class="view-controls">
          <ViewToggle v-model:view="currentView" />
        </div>
        
        <button @click="confirmClearFavorites" class="btn btn-outline clear-favorites">
          <i class="fa-solid fa-trash-alt"></i>
          Limpar Todos os Favoritos
        </button>
      </div>
      
      <div v-if="favoriteCount > 0" class="favorites-content">
        <PetGrid 
          v-if="currentView === 'grid'" 
          :pets="favorites" 
          :loading="false"
        />
        <PetList 
          v-else 
          :pets="favorites" 
          :loading="false"
        />
      </div>
      
      <div v-else class="empty-favorites">
        <div class="empty-icon">
          <i class="fa-regular fa-heart-broken"></i>
        </div>
        <h2>Nenhum Favorito Ainda</h2>
        <p>Você ainda não adicionou nenhum pet à sua lista de favoritos. Navegue pelos nossos pets disponíveis e clique no ícone de coração para salvá-los aqui.</p>
        <router-link to="/" class="btn btn-primary">Encontrar um Pet para Amar</router-link>
      </div>
    </div>
    
    <!-- Confirmation Modal -->
    <div v-if="showClearModal" class="modal-overlay" @click="showClearModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Limpar Todos os Favoritos?</h3>
          <button class="modal-close" @click="showClearModal = false">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <p>Tem certeza de que deseja remover todos os pets dos seus favoritos? Esta ação não pode ser desfeita.</p>
        </div>
        <div class="modal-footer">
          <button @click="showClearModal = false" class="btn btn-outline">Cancelar</button>
          <button @click="clearAllFavorites" class="btn btn-danger">Sim, Limpar Todos</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useFavoritesStore } from '@/store/modules/favorites';
import PetGrid from '@/components/pets/PetGrid.vue';
import PetList from '@/components/pets/PetList.vue';
import ViewToggle from '@/components/pets/ViewToggle.vue';

const favoritesStore = useFavoritesStore();

// State
const currentView = ref(localStorage.getItem('petViewPreference') || 'grid');
const showClearModal = ref(false);

// Computed
const favorites = computed(() => favoritesStore.favorites);
const favoriteCount = computed(() => favorites.value.length);

// Methods
const confirmClearFavorites = () => {
  showClearModal.value = true;
};

const clearAllFavorites = () => {
  favoritesStore.clearFavorites();
  showClearModal.value = false;
};

// Lifecycle hooks
onMounted(() => {
  // Scroll to top
  window.scrollTo(0, 0);
});
</script>

<style lang="scss" scoped>
.favorites-page {
  padding: 1rem 0 3rem;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    color: var(--heading-color);
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    
    i {
      color: var(--primary-color);
      margin-right: 0.75rem;
      animation: heartBeat 2s infinite;
    }
    
    @media (max-width: $breakpoint-sm) {
      font-size: 2rem;
    }
  }
  
  p {
    color: var(--text-muted);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
}

.favorites-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .clear-favorites {
    color: var(--danger);
    border-color: var(--danger);
    
    &:hover {
      background-color: rgba(var(--danger), 0.1);
    }
    
    i {
      margin-right: 0.5rem;
    }
    
    @media (max-width: $breakpoint-sm) {
      width: 100%;
    }
  }
}

.favorites-content {
  min-height: 400px;
}

.empty-favorites {
  text-align: center;
  padding: 4rem 2rem;
  background-color: var(--card-bg);
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  
  .empty-icon {
    font-size: 4rem;
    color: var(--primary-color-light);
    margin-bottom: 1.5rem;
    opacity: 0.7;
  }
  
  h2 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    color: var(--heading-color);
  }
  
  p {
    color: var(--text-muted);
    margin-bottom: 2rem;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .btn {
    padding: 0.75rem 2rem;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background-color: var(--card-bg);
  border-radius: 1rem;
  width: 100%;
  max-width: 450px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.3s ease;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h3 {
    font-size: 1.25rem;
    margin: 0;
    color: var(--heading-color);
  }
  
  .modal-close {
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-size: 1.25rem;
    cursor: pointer;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--primary-color);
    }
  }
}

.modal-body {
  padding: 1.5rem;
  
  p {
    color: var(--text-color);
  }
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  
  .btn-danger {
    background-color: var(--danger);
    color: white;
    
    &:hover {
      background-color: var(--danger);
      opacity: 0.9;
    }
  }
}
</style>
