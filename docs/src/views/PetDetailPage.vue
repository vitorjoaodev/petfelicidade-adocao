<template>
  <div class="pet-detail-page">
    <div class="container">
      <div v-if="loading">
        <LoadingSpinner message="Carregando detalhes do pet..." />
      </div>
      
      <div v-else-if="error" class="error-container">
        <i class="fa-solid fa-exclamation-circle"></i>
        <h2>Ops! Algo deu errado</h2>
        <p>{{ error }}</p>
        <div class="error-actions">
          <button @click="fetchPet" class="btn btn-primary">Tentar Novamente</button>
          <router-link to="/" class="btn btn-outline">Voltar para Todos os Pets</router-link>
        </div>
      </div>
      
      <div v-else-if="pet" class="pet-container">
        <PetDetails :pet="pet" />
        
        <div class="similar-pets" v-if="similarPets.length > 0">
          <h2>Pets Similares Que Você Pode Gostar</h2>
          <div class="row">
            <div 
              v-for="similarPet in similarPets" 
              :key="`similar-${similarPet.id}`" 
              class="col col-12 col-md-6 col-lg-4 mb-4"
            >
              <PetCard :pet="similarPet" />
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="not-found-container">
        <i class="fa-solid fa-search"></i>
        <h2>Pet Não Encontrado</h2>
        <p>Não conseguimos encontrar o pet que você está procurando.</p>
        <router-link to="/" class="btn btn-primary">Ver Todos os Pets</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { usePetsStore } from '@/store/modules/pets';
import PetDetails from '@/components/pets/PetDetails.vue';
import PetCard from '@/components/pets/PetCard.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';

const route = useRoute();
const petsStore = usePetsStore();

// State
const pet = ref(null);
const loading = ref(true);
const error = ref(null);

// Computed
const petId = computed(() => route.params.id);

const similarPets = computed(() => {
  if (!pet.value) return [];
  
  return petsStore.pets
    .filter(p => 
      p.id !== pet.value.id && 
      (p.type === pet.value.type || p.breed === pet.value.breed)
    )
    .slice(0, 3);
});

// Methods
const fetchPet = async () => {
  if (!petId.value) return;
  
  loading.value = true;
  error.value = null;
  
  try {
    // First check if the pet is in the store
    const existingPet = petsStore.getPetById(petId.value);
    
    if (existingPet) {
      pet.value = existingPet;
    } else {
      // If not in store, fetch it
      const fetchedPet = await petsStore.fetchPetById(petId.value);
      pet.value = fetchedPet;
      
      // If we don't have similar pets in the store, fetch some
      if (petsStore.pets.length < 4) {
        await petsStore.fetchPets({ type: fetchedPet.type });
      }
    }
  } catch (err) {
    console.error('Error fetching pet:', err);
    error.value = err.message || 'Falha ao carregar detalhes do pet. Por favor, tente novamente mais tarde.';
    pet.value = null;
  } finally {
    loading.value = false;
  }
};

// Watchers
watch(petId, () => {
  fetchPet();
});

// Lifecycle hooks
onMounted(() => {
  // Scroll to top when navigating to pet details
  window.scrollTo(0, 0);
  fetchPet();
});
</script>

<style lang="scss" scoped>
.pet-detail-page {
  padding: 1rem 0;
}

.error-container,
.not-found-container {
  text-align: center;
  padding: 4rem 2rem;
  background-color: var(--card-bg);
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  
  i {
    font-size: 3rem;
    color: var(--primary-color);
    margin-bottom: 1.5rem;
    opacity: 0.7;
  }
  
  h2 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }
  
  p {
    color: var(--text-muted);
    margin-bottom: 2rem;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
}

.error-container {
  i {
    color: var(--danger);
  }
  
  .error-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    
    @media (max-width: $breakpoint-sm) {
      flex-direction: column;
      max-width: 250px;
      margin: 0 auto;
    }
  }
}

.similar-pets {
  margin-top: 3rem;
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--heading-color);
    text-align: center;
  }
}
</style>
