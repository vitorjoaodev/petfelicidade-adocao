<template>
  <div class="contact-page">
    <div class="container">
      <div class="page-header">
        <h1>Entre em Contato</h1>
        <p>Tem dúvidas sobre adoção ou quer saber mais sobre um pet específico? Estamos aqui para ajudar!</p>
      </div>
      
      <div class="contact-content">
        <div class="contact-form-container">
          <h2>Envie-nos uma Mensagem</h2>
          <p>Preencha o formulário abaixo e entraremos em contato o mais breve possível.</p>
          <ContactForm />
        </div>
        
        <div class="contact-info-container">
          <div class="contact-info-card">
            <h3>Nossas Informações</h3>
            
            <div class="info-item">
              <i class="fa-solid fa-location-dot"></i>
              <div>
                <h4>Visite-nos</h4>
                <p>Av. Dra. Ruth Cardoso, 4777<br />Jardim Universidade Pinheiros<br />São Paulo - SP, 05477-000</p>
              </div>
            </div>
            
            <div class="info-item">
              <i class="fa-solid fa-phone"></i>
              <div>
                <h4>Ligue para nós</h4>
                <p>(11) 3918-0239</p>
              </div>
            </div>
            
            <div class="info-item">
              <i class="fa-solid fa-envelope"></i>
              <div>
                <h4>Email</h4>
                <p>contato@petfelicidade.com.br</p>
              </div>
            </div>
            
            <div class="info-item">
              <i class="fa-solid fa-clock"></i>
              <div>
                <h4>Horário de Funcionamento</h4>
                <p>
                  Segunda a Sexta: 9h - 19h<br />
                  Sábado: 10h - 17h<br />
                  Domingo: 12h - 16h
                </p>
              </div>
            </div>
          </div>
          
          <div class="social-connect">
            <h3>Conecte-se Conosco</h3>
            <div class="social-icons">
              <a href="#" aria-label="Facebook">
                <i class="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i class="fa-brands fa-instagram"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i class="fa-brands fa-twitter"></i>
              </a>
              <a href="#" aria-label="YouTube">
                <i class="fa-brands fa-youtube"></i>
              </a>
            </div>
            <p>Siga-nos nas redes sociais para atualizações sobre novos pets, histórias de sucesso e eventos de adoção!</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="adoption-process">
      <div class="container">
        <h2>Nosso Processo de Adoção</h2>
        <div class="process-steps">
          <div class="process-step">
            <div class="step-number">1</div>
            <h3>Navegue e Escolha</h3>
            <p>Veja nossos pets disponíveis e selecione um (ou mais!) que você gostaria de conhecer.</p>
          </div>
          
          <div class="process-step">
            <div class="step-number">2</div>
            <h3>Aplique</h3>
            <p>Preencha nosso formulário de aplicação online ou presencialmente em nosso centro.</p>
          </div>
          
          <div class="process-step">
            <div class="step-number">3</div>
            <h3>Conheça</h3>
            <p>Agende um horário para vir conhecer seu potencial novo membro da família.</p>
          </div>
          
          <div class="process-step">
            <div class="step-number">4</div>
            <h3>Finalize</h3>
            <p>Complete o processo de adoção, pague as taxas e dê as boas-vindas ao seu novo pet!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import ContactForm from '@/components/forms/ContactForm.vue';

// Lifecycle hooks
onMounted(() => {
  // Scroll to top
  window.scrollTo(0, 0);
});
</script>

<style lang="scss" scoped>
.contact-page {
  padding: 1rem 0 0;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    color: var(--heading-color);
    font-size: 2.5rem;
    margin-bottom: 1rem;
    
    @media (max-width: $breakpoint-sm) {
      font-size: 2rem;
    }
  }
  
  p {
    color: var(--text-muted);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    font-size: 1.1rem;
  }
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: $breakpoint-lg) {
    grid-template-columns: 1fr;
  }
}

.contact-form-container {
  background-color: var(--card-bg);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  
  h2 {
    color: var(--heading-color);
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: var(--text-muted);
    margin-bottom: 1.5rem;
  }
}

.contact-info-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-info-card {
  background-color: var(--card-bg);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  
  h3 {
    color: var(--heading-color);
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .info-item {
    display: flex;
    margin-bottom: 1.5rem;
    
    i {
      font-size: 1.5rem;
      color: var(--primary-color);
      margin-right: 1rem;
      flex-shrink: 0;
      width: 2rem;
      text-align: center;
    }
    
    h4 {
      font-size: 1.1rem;
      margin-bottom: 0.25rem;
      color: var(--heading-color);
    }
    
    p {
      color: var(--text-color);
      line-height: 1.6;
    }
  }
}

.social-connect {
  background-color: var(--card-bg);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  
  h3 {
    color: var(--heading-color);
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .social-icons {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background-color: rgba(var(--primary-color-rgb), 0.1);
      color: var(--primary-color);
      font-size: 1.25rem;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: var(--primary-color);
        color: white;
        transform: translateY(-3px);
      }
    }
  }
  
  p {
    color: var(--text-muted);
    line-height: 1.6;
  }
}

.adoption-process {
  background-color: rgba(var(--primary-color-rgb), 0.05);
  padding: 4rem 0;
  text-align: center;
  
  h2 {
    color: var(--heading-color);
    font-size: 2rem;
    margin-bottom: 2.5rem;
    
    @media (max-width: $breakpoint-sm) {
      font-size: 1.75rem;
    }
  }
  
  .process-steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    
    @media (max-width: $breakpoint-lg) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (max-width: $breakpoint-sm) {
      grid-template-columns: 1fr;
    }
  }
  
  .process-step {
    padding: 2rem 1rem;
    background-color: var(--card-bg);
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    position: relative;
    
    .step-number {
      width: 2.5rem;
      height: 2.5rem;
      background-color: var(--primary-color);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.25rem;
      margin: 0 auto 1rem;
      box-shadow: 0 4px 8px rgba(var(--primary-color-rgb), 0.3);
    }
    
    h3 {
      color: var(--heading-color);
      font-size: 1.25rem;
      margin-bottom: 0.75rem;
    }
    
    p {
      color: var(--text-muted);
      font-size: 0.95rem;
      line-height: 1.6;
    }
    
    &:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 2.5rem;
      right: -0.75rem;
      width: 0;
      height: 0;
      border-top: 0.75rem solid transparent;
      border-bottom: 0.75rem solid transparent;
      border-left: 0.75rem solid var(--card-bg);
      z-index: 10;
      
      @media (max-width: $breakpoint-lg) {
        // Hide the arrow on smaller screens where the grid changes
        display: none;
      }
    }
  }
}
</style>
