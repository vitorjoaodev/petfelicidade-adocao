<template>
  <div class="not-found-page">
    <div class="container">
      <div class="not-found-content">
        <div class="not-found-illustration">
          <div class="paw-icon">
            <i class="fa-solid fa-paw"></i>
          </div>
          <div class="error-code">404</div>
          <div class="paw-icon">
            <i class="fa-solid fa-paw"></i>
          </div>
        </div>
        
        <h1>Ops! Página Não Encontrada</h1>
        <p>Parece que a página que você está procurando saiu para passear.</p>
        
        <div class="not-found-actions">
          <router-link to="/" class="btn btn-primary">
            <i class="fa-solid fa-home"></i>
            Voltar para o Início
          </router-link>
          
          <button @click="goBack" class="btn btn-outline">
            <i class="fa-solid fa-arrow-left"></i>
            Voltar
          </button>
        </div>
      </div>
    </div>
    
    <div class="paw-prints">
      <div v-for="n in 5" :key="`paw-${n}`" class="paw" :style="{ left: `${(n-1) * 20}%`, animationDelay: `${n * 0.2}s` }">
        <i class="fa-solid fa-paw"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// Methods
const goBack = () => {
  router.go(-1);
};
</script>

<style lang="scss" scoped>
.not-found-page {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.not-found-content {
  text-align: center;
  padding: 3rem 2rem;
  background-color: var(--card-bg);
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.not-found-illustration {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  
  .paw-icon {
    font-size: 3rem;
    color: var(--primary-color);
    animation: float 3s infinite ease-in-out;
    
    &:first-child {
      animation-delay: 0.5s;
      transform: rotate(-20deg);
    }
    
    &:last-child {
      animation-delay: 1s;
      transform: rotate(20deg);
    }
  }
  
  .error-code {
    font-size: 5rem;
    font-weight: 800;
    color: var(--primary-color);
    margin: 0 1rem;
    position: relative;
    text-shadow: 3px 3px 0 rgba(var(--primary-color-rgb), 0.3);
    
    @media (max-width: $breakpoint-sm) {
      font-size: 4rem;
    }
  }
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--heading-color);
  
  @media (max-width: $breakpoint-sm) {
    font-size: 2rem;
  }
}

p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: var(--text-muted);
}

.not-found-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  
  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    max-width: 250px;
    margin: 0 auto;
  }
  
  .btn {
    i {
      margin-right: 0.5rem;
    }
  }
}

.paw-prints {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  overflow: hidden;
  
  .paw {
    position: absolute;
    bottom: -100px;
    font-size: 2rem;
    color: rgba(var(--primary-color-rgb), 0.2);
    animation: pawUp 5s infinite linear;
    transform: rotate(40deg);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(var(--rotation, 0deg));
  }
  50% {
    transform: translateY(-10px) rotate(var(--rotation, 0deg));
  }
}

@keyframes pawUp {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 120%;
  }
}
</style>
