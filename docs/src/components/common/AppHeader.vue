<template>
  <header class="header">
  
    <div class="container">
      <nav class="nav">
        <div class="logo">
          <router-link to="/">
            <h1>
              <i class="fa-solid fa-paw"></i>
              Pet Felicidade
            </h1>
          </router-link>
        </div>
        
        <div class="mobile-menu-toggle" @click="toggleMobileMenu" ref="mobileMenuToggle">
          <i :class="['fa-solid', isMobileMenuOpen ? 'fa-times' : 'fa-bars']"></i>
        </div>
        
        <div class="nav-links" :class="{ 'active': isMobileMenuOpen }">
          <ul>
            <li>
              <router-link to="/" @click="closeMobileMenu">Início</router-link>
            </li>
            <li>
              <router-link to="/favorites" @click="closeMobileMenu">
                Favoritos
                <span v-if="favoriteCount > 0" class="badge badge-primary">{{ favoriteCount }}</span>
              </router-link>
            </li>
            <li>
              <router-link to="/contact" @click="closeMobileMenu">Contato</router-link>
            </li>
            <li class="theme-toggle-item">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useFavoritesStore } from '@/store/modules/favorites';
import ThemeToggle from '@/components/common/ThemeToggle.vue';

const favoritesStore = useFavoritesStore();
const favoriteCount = computed(() => favoritesStore.favorites.length);

const isMobileMenuOpen = ref(false);
const mobileMenuToggle = ref(null);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = '';
};

const handleClickOutside = (event) => {
  if (
    isMobileMenuOpen.value && 
    mobileMenuToggle.value && 
    !mobileMenuToggle.value.contains(event.target) && 
    !event.target.closest('.nav-links')
  ) {
    closeMobileMenu();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && isMobileMenuOpen.value) {
      closeMobileMenu();
    }
  });
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', () => {});
});
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}



.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  background-color: var(--card-bg);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border-radius: 1rem;
}

.logo {
  a {
    text-decoration: none;
    
    h1 {
      font-size: 1.5rem;
      color: var(--primary-color);
      margin-bottom: 0;
      display: flex;
      align-items: center;
      transition: color 0.3s ease;
      
      i {
        margin-right: 0.5rem;
      }
    }
    
    &:hover h1 {
      color: var(--primary-color-dark);
    }
  }
}

.nav-links {
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    
    li {
      margin-left: 2rem;
      
      a {
        color: var(--text-color);
        font-weight: 600;
        font-size: 1rem;
        text-decoration: none;
        position: relative;
        transition: color 0.3s ease;
        display: flex;
        align-items: center;
        
        &::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--primary-color);
          transition: width 0.3s ease;
        }
        
        &:hover, &.router-link-active {
          color: var(--primary-color);
          
          &::after {
            width: 100%;
          }
        }
        
        .badge {
          margin-left: 0.5rem;
        }
      }
    }
  }
}

.mobile-menu-toggle {
  display: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-color);
}

@media (max-width: $breakpoint-md) {
  .mobile-menu-toggle {
    display: block;
  }
  
  .nav-links {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background-color: var(--card-bg);
    height: 0;
    overflow: hidden;
    transition: height 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    
    &.active {
      height: calc(100vh - 70px);
    }
    
    ul {
      flex-direction: column;
      padding: 2rem;
      
      li {
        margin: 0;
        margin-bottom: 1.5rem;
        
        a {
          font-size: 1.2rem;
          display: inline-block;
          
          &::after {
            bottom: -8px;
          }
        }
      }
      
      .theme-toggle-item {
        margin-top: 1rem;
        display: flex;
        justify-content: flex-start;
      }
    }
  }
}
</style>
