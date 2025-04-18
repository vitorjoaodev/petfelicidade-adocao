<template>
  <div class="pet-details">
    <div class="pet-detail-header">
      <div class="pet-actions">
        <button @click="goBack" class="btn-back" aria-label="Voltar">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <button 
          @click="toggleFavorite" 
          class="btn-favorite" 
          :class="{ 'is-favorite': isFavorite }"
          :aria-label="isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
        >
          <i :class="['fa-heart', {'fa-solid': isFavorite, 'fa-regular': !isFavorite}]"></i>
          {{ isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos' }}
        </button>
      </div>
      
      <div class="pet-badges">
        <span v-if="pet.status === 'available'" class="badge badge-success">Disponível</span>
        <span v-else-if="pet.status === 'pending'" class="badge badge-warning">Pendente</span>
        <span v-else class="badge badge-danger">Adotado</span>
      </div>
    </div>
    
    <div class="pet-detail-grid">
      <div class="pet-detail-images">
        <img :src="pet.image" :alt="pet.name" class="main-image" />
        
        <div v-if="pet.galleryImages && pet.galleryImages.length" class="gallery-images">
          <img 
            v-for="(image, index) in pet.galleryImages" 
            :key="index" 
            :src="image" 
            :alt="`${pet.name} photo ${index + 1}`"
            loading="lazy"
          />
        </div>
      </div>
      
      <div class="pet-detail-info">
        <h1 class="pet-name">{{ pet.name }}</h1>
        
        <div class="pet-info-grid">
          <div class="pet-info-item">
            <div class="info-label">
              <i class="fa-solid fa-paw"></i>
              <span>Raça</span>
            </div>
            <div class="info-value">{{ pet.breed }}</div>
          </div>
          
          <div class="pet-info-item">
            <div class="info-label">
              <i class="fa-solid fa-calendar-alt"></i>
              <span>Idade</span>
            </div>
            <div class="info-value">{{ pet.age }} {{ pet.age === 1 ? 'ano' : 'anos' }}</div>
          </div>
          
          <div class="pet-info-item">
            <div class="info-label">
              <i class="fa-solid fa-venus-mars"></i>
              <span>Gênero</span>
            </div>
            <div class="info-value">{{ pet.gender }}</div>
          </div>
          
          <div class="pet-info-item">
            <div class="info-label">
              <i class="fa-solid fa-weight-scale"></i>
              <span>Porte</span>
            </div>
            <div class="info-value">{{ pet.size }}</div>
          </div>
          
          <div class="pet-info-item">
            <div class="info-label">
              <i class="fa-solid fa-palette"></i>
              <span>Cor</span>
            </div>
            <div class="info-value">{{ pet.color }}</div>
          </div>
          
          <div class="pet-info-item">
            <div class="info-label">
              <i class="fa-solid fa-location-dot"></i>
              <span>Localização</span>
            </div>
            <div class="info-value">{{ pet.location }}</div>
          </div>
        </div>
        
        <div class="pet-about">
          <h2>Sobre {{ pet.name }}</h2>
          <p>{{ pet.description }}</p>
        </div>
        
        <div v-if="pet.characteristics && pet.characteristics.length" class="pet-characteristics">
          <h2>Características</h2>
          <div class="characteristics-tags">
            <span 
              v-for="(characteristic, index) in pet.characteristics" 
              :key="`char-${index}`"
              class="characteristic-tag"
            >
              {{ characteristic }}
            </span>
          </div>
        </div>
        
        <div class="pet-contact">
          <h2>Interessado em {{ pet.name }}?</h2>
          <p>Preencha nosso formulário para agendar uma visita ou fazer perguntas sobre {{ pet.name }}.</p>
          <router-link :to="`/contact?pet=${pet.id}`" class="btn btn-primary">
            <i class="fa-solid fa-envelope"></i> Entrar em contato sobre {{ pet.name }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useFavoritesStore } from '@/store/modules/favorites';

const props = defineProps({
  pet: {
    type: Object,
    required: true
  }
});

const router = useRouter();
const favoritesStore = useFavoritesStore();

const isFavorite = computed(() => {
  return favoritesStore.isFavorite(props.pet.id);
});

const toggleFavorite = () => {
  if (isFavorite.value) {
    favoritesStore.removeFavorite(props.pet.id);
  } else {
    favoritesStore.addFavorite(props.pet);
  }
};

const goBack = () => {
  router.back();
};
</script>

<style lang="scss" scoped>
.pet-details {
  background-color: var(--card-bg);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.pet-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  
  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}

.pet-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: $breakpoint-sm) {
    width: 100%;
    justify-content: space-between;
  }
}

.btn-back {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: var(--bg-color);
  border: none;
  color: var(--text-color);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(var(--primary-color-rgb), 0.1);
    color: var(--primary-color);
  }
}

.btn-favorite {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  background-color: var(--bg-color);
  border: none;
  color: var(--text-color);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  i {
    margin-right: 0.5rem;
    color: var(--primary-color);
  }
  
  &:hover {
    background-color: rgba(var(--primary-color-rgb), 0.1);
  }
  
  &.is-favorite {
    background-color: rgba(var(--primary-color-rgb), 0.15);
    color: var(--primary-color);
  }
}

.pet-badges {
  display: flex;
  gap: 0.5rem;
  
  .badge {
    font-size: 0.85rem;
    padding: 0.35rem 0.75rem;
  }
}

.pet-detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 1.5rem;
  
  @media (max-width: $breakpoint-lg) {
    grid-template-columns: 1fr;
  }
}

.pet-detail-images {
  .main-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 0.75rem;
    margin-bottom: 1rem;
    
    @media (max-width: $breakpoint-md) {
      height: 300px;
    }
  }
  
  .gallery-images {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
    
    img {
      width: 100%;
      height: 80px;
      object-fit: cover;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: transform 0.3s ease;
      
      &:hover {
        transform: scale(1.05);
      }
      
      @media (max-width: $breakpoint-md) {
        height: 60px;
      }
    }
  }
}

.pet-name {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--heading-color);
}

.pet-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-bottom: 2rem;
  
  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
  }
}

.pet-info-item {
  .info-label {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    color: var(--text-muted);
    font-size: 0.9rem;
    
    i {
      margin-right: 0.5rem;
      width: 16px;
      color: var(--primary-color);
    }
  }
  
  .info-value {
    font-weight: 600;
    color: var(--text-color);
  }
}

.pet-about {
  margin-bottom: 2rem;
  
  h2 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
  
  p {
    line-height: 1.7;
    color: var(--text-color);
  }
}

.pet-characteristics {
  margin-bottom: 2rem;
  
  h2 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
  
  .characteristics-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    
    .characteristic-tag {
      display: inline-block;
      padding: 0.5rem 1rem;
      border-radius: 2rem;
      background-color: rgba(var(--primary-color-rgb), 0.1);
      color: var(--primary-color);
      font-size: 0.9rem;
      font-weight: 500;
    }
  }
}

.pet-contact {
  background-color: rgba(var(--primary-color-rgb), 0.05);
  padding: 1.5rem;
  border-radius: 0.75rem;
  
  h2 {
    font-size: 1.4rem;
    margin-bottom: 0.75rem;
  }
  
  p {
    margin-bottom: 1.25rem;
    color: var(--text-color);
  }
  
  .btn {
    i {
      margin-right: 0.5rem;
    }
  }
}
</style>
