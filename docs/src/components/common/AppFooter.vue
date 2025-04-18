<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <h2>
            <i class="fa-solid fa-paw"></i>
            Pet Felicidade
          </h2>
          <p>Finding forever homes for our furry friends</p>
        </div>
        
        <div class="footer-links">
          <div class="footer-links-column">
            <h3>Navigation</h3>
            <ul>
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/favorites">Favorites</router-link></li>
              <li><router-link to="/contact">Contact</router-link></li>
            </ul>
          </div>
          
          <div class="footer-links-column">
            <h3>Pet Types</h3>
            <ul>
              <li><router-link to="/?type=dog">Dogs</router-link></li>
              <li><router-link to="/?type=cat">Cats</router-link></li>
              <li><router-link to="/?type=bird">Birds</router-link></li>
              <li><router-link to="/?type=rabbit">Rabbits</router-link></li>
            </ul>
          </div>
          
          <div class="footer-links-column">
            <h3>Connect</h3>
            <div class="social-links">
              <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a>
              <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
              <a href="#" aria-label="Twitter"><i class="fa-brands fa-twitter"></i></a>
              <a href="#" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Pet Felicidade. All rights reserved.</p>
        <p>Made with <i class="fa-solid fa-heart" style="color: var(--primary-color);"></i> for pets everywhere</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style lang="scss" scoped>
.footer {
  background-color: var(--card-bg);
  color: var(--text-color);
  padding: 3rem 0 1.5rem;
  margin-top: 2rem;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.footer-logo {
  flex: 0 0 100%;
  margin-bottom: 2rem;
  
  @media (min-width: $breakpoint-md) {
    flex: 0 0 30%;
    margin-bottom: 0;
  }
  
  h2 {
    color: var(--primary-color);
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    
    i {
      margin-right: 0.5rem;
    }
  }
  
  p {
    color: var(--text-muted);
    font-size: 0.95rem;
  }
}

.footer-links {
  flex: 0 0 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  
  @media (min-width: $breakpoint-md) {
    flex: 0 0 65%;
  }
}

.footer-links-column {
  flex: 0 0 48%;
  margin-bottom: 1.5rem;
  
  @media (min-width: $breakpoint-md) {
    flex: 0 0 30%;
    margin-bottom: 0;
  }
  
  h3 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: var(--heading-color);
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      margin-bottom: 0.5rem;
      
      a {
        color: var(--text-muted);
        font-size: 0.95rem;
        text-decoration: none;
        transition: color 0.3s ease;
        
        &:hover {
          color: var(--primary-color);
        }
      }
    }
  }
}

.social-links {
  display: flex;
  gap: 1rem;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    color: var(--text-muted);
    background-color: rgba(var(--primary-color-rgb), 0.1);
    transition: all 0.3s ease;
    
    i {
      font-size: 1.1rem;
    }
    
    &:hover {
      color: white;
      background-color: var(--primary-color);
      transform: translateY(-3px);
    }
  }
}

.footer-bottom {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
  
  p {
    color: var(--text-muted);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    
    i {
      animation: heartBeat 1.5s infinite;
    }
  }
}
</style>
