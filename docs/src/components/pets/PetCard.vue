<template>
  <div class="pet-card" :class="{ 'list-view': listView }">
    <div class="pet-card-image">
      <img 
        :src="pet.image" 
        :alt="pet.name"
        loading="lazy"
      />
      <button 
        class="favorite-button"
        @click.stop="toggleFavorite"
        :aria-label="isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
      >
        <i :class="['fa-heart', {'fa-solid': isFavorite, 'fa-regular': !isFavorite}, {'active': isFavorite}]"></i>
      </button>
      <div class="pet-badges">
        <span v-if="pet.status === 'disponível'" class="badge badge-success">Disponível</span>
        <span v-else-if="pet.status === 'pendente'" class="badge badge-warning">Pendente</span>
        <span v-else class="badge badge-danger">Adotado</span>
      </div>
    </div>
    
    <div class="pet-card-content">
      <h3 class="pet-name">
        <router-link :to="`/pet/${pet.id}`">{{ pet.name }}</router-link>
      </h3>
      
      <div class="pet-info">
        <div class="pet-info-item">
          <i class="fa-solid fa-paw"></i>
          <span>{{ pet.breed }}</span>
        </div>
        
        <div class="pet-info-item">
          <i class="fa-solid fa-calendar-alt"></i>
          <span>{{ pet.age }} {{ pet.age === 1 ? 'ano' : 'anos' }}</span>
        </div>
        
        <div class="pet-info-item">
          <i class="fa-solid fa-location-dot"></i>
          <span>{{ pet.location }}</span>
        </div>
        
        <div v-if="listView" class="pet-info-item pet-description">
          <i class="fa-solid fa-comment"></i>
          <span>{{ truncateDescription }}</span>
        </div>
      </div>
      
      <div class="pet-card-footer">
        <router-link :to="`/pet/${pet.id}`" class="btn btn-primary">Ver Detalhes</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useFavoritesStore } from '@/store/modules/favorites';

const props = defineProps({
  pet: {
    type: Object,
    required: true
  },
  listView: {
    type: Boolean,
    default: false
  }
});

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

const truncateDescription = computed(() => {
  if (!props.pet.description) return '';
  return props.pet.description.length > 140 
    ? props.pet.description.substring(0, 140) + '...' 
    : props.pet.description;
});
</script>

<style lang="scss" scoped>
.pet-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 1rem;
  overflow: hidden;
  background-color: var(--card-bg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }
  
  &.list-view {
    flex-direction: row;
    
    .pet-card-image {
      flex: 0 0 300px;
      height: auto;
      max-height: 250px;
      
      @media (max-width: $breakpoint-md) {
        flex: 0 0 150px;
      }
    }
    
    .pet-card-content {
      flex: 1;
      padding: 1.5rem;
    }
  }
}

.pet-card-image {
  position: relative;
  height: 220px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
  
  .favorite-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.3s ease, background-color 0.3s ease;
    z-index: 1;
    
    i {
      font-size: 1.2rem;
      color: var(--primary-color);
      transition: color 0.3s ease, transform 0.5s ease;
      
      &.active {
        animation: heartBeat 0.8s;
      }
    }
    
    &:hover {
      transform: scale(1.1);
      background-color: white;
      
      i {
        color: var(--primary-color-dark);
      }
    }
  }
  
  .pet-badges {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    display: flex;
    gap: 0.5rem;
    
    .badge {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }
}

.pet-card-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 1.25rem;
}

.pet-name {
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
  
  a {
    color: var(--heading-color);
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--primary-color);
    }
  }
}

.pet-info {
  margin-bottom: 1rem;
  flex-grow: 1;
}

.pet-info-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: var(--text-muted);
  
  i {
    width: 20px;
    margin-right: 0.5rem;
    color: var(--primary-color);
  }
  
  &.pet-description {
    margin-top: 0.5rem;
    align-items: flex-start;
    
    i {
      margin-top: 0.2rem;
    }
  }
}

.pet-card-footer {
  margin-top: auto;
  text-align: center;
  
  .list-view & {
    text-align: left;
  }
}
</style>
