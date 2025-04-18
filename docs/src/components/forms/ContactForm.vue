<template>
  <div class="contact-form">
    <form @submit.prevent="submitForm" ref="form" novalidate>
      <div 
        class="form-group" 
        :class="{ 'has-error': errors.name }"
      >
        <label for="name">Seu Nome *</label>
        <input 
          type="text" 
          id="name" 
          v-model="formData.name"
          placeholder="Digite seu nome completo"
          @blur="validateField('name')"
          required
        />
        <p v-if="errors.name" class="error-message">{{ errors.name }}</p>
      </div>
      
      <div 
        class="form-group" 
        :class="{ 'has-error': errors.email }"
      >
        <label for="email">Endereço de Email *</label>
        <input 
          type="email" 
          id="email" 
          v-model="formData.email"
          placeholder="Digite seu endereço de email"
          @blur="validateField('email')"
          required
        />
        <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
      </div>
      
      <div 
        class="form-group" 
        :class="{ 'has-error': errors.phone }"
      >
        <label for="phone">Número de Telefone</label>
        <input 
          type="tel" 
          id="phone" 
          v-model="formData.phone"
          placeholder="Digite seu número de telefone (opcional)"
          @blur="validateField('phone')"
        />
        <p v-if="errors.phone" class="error-message">{{ errors.phone }}</p>
      </div>
      
      <div class="form-group" v-if="selectedPet">
        <label for="pet">Interessado no Pet</label>
        <input 
          type="text" 
          id="pet" 
          v-model="formData.petName"
          readonly
          class="readonly-field"
        />
      </div>
      
      <div 
        class="form-group" 
        :class="{ 'has-error': errors.subject }"
      >
        <label for="subject">Assunto *</label>
        <input 
          type="text" 
          id="subject" 
          v-model="formData.subject"
          placeholder="Digite o assunto da mensagem"
          @blur="validateField('subject')"
          required
        />
        <p v-if="errors.subject" class="error-message">{{ errors.subject }}</p>
      </div>
      
      <div 
        class="form-group" 
        :class="{ 'has-error': errors.message }"
      >
        <label for="message">Mensagem *</label>
        <textarea 
          id="message" 
          v-model="formData.message"
          placeholder="Digite sua mensagem"
          @blur="validateField('message')"
          required
        ></textarea>
        <p v-if="errors.message" class="error-message">{{ errors.message }}</p>
      </div>
      
      <div class="form-actions">
        <button 
          type="submit" 
          class="btn btn-primary"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">
            <i class="fa-solid fa-circle-notch fa-spin"></i> Enviando...
          </span>
          <span v-else>
            <i class="fa-solid fa-paper-plane"></i> Enviar Mensagem
          </span>
        </button>
      </div>
    </form>
    
    <div v-if="formSubmitted" class="form-success">
      <div class="success-icon">
        <i class="fa-solid fa-circle-check"></i>
      </div>
      <h3>Mensagem Enviada com Sucesso!</h3>
      <p>Obrigado por entrar em contato conosco. Retornaremos em breve.</p>
      <button @click="resetForm" class="btn btn-outline">Enviar Outra Mensagem</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { usePetsStore } from '@/store/modules/pets';

const props = defineProps({
  petId: {
    type: String,
    default: null
  }
});

const route = useRoute();
const petsStore = usePetsStore();

const form = ref(null);
const isSubmitting = ref(false);
const formSubmitted = ref(false);

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  petId: null,
  petName: '',
  subject: '',
  message: ''
});

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
});

const selectedPet = computed(() => {
  if (formData.petId) {
    return petsStore.getPetById(formData.petId);
  }
  return null;
});

const validateField = (field) => {
  errors[field] = '';
  
  switch (field) {
    case 'name':
      if (!formData.name.trim()) {
        errors.name = 'Nome é obrigatório';
      } else if (formData.name.trim().length < 2) {
        errors.name = 'Nome deve ter pelo menos 2 caracteres';
      }
      break;
      
    case 'email':
      if (!formData.email.trim()) {
        errors.email = 'Email é obrigatório';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        errors.email = 'Por favor, insira um endereço de email válido';
      }
      break;
      
    case 'phone':
      if (formData.phone.trim() && !/^[0-9\+\-\(\)\s]{7,20}$/.test(formData.phone)) {
        errors.phone = 'Por favor, insira um número de telefone válido';
      }
      break;
      
    case 'subject':
      if (!formData.subject.trim()) {
        errors.subject = 'Assunto é obrigatório';
      } else if (formData.subject.trim().length < 3) {
        errors.subject = 'Assunto deve ter pelo menos 3 caracteres';
      }
      break;
      
    case 'message':
      if (!formData.message.trim()) {
        errors.message = 'Mensagem é obrigatória';
      } else if (formData.message.trim().length < 10) {
        errors.message = 'Mensagem deve ter pelo menos 10 caracteres';
      }
      break;
  }
};

const validateForm = () => {
  validateField('name');
  validateField('email');
  validateField('phone');
  validateField('subject');
  validateField('message');
  
  return !Object.values(errors).some(error => error);
};

const submitForm = async () => {
  if (!validateForm()) {
    // Scroll to first error
    const firstErrorElement = form.value.querySelector('.has-error');
    if (firstErrorElement) {
      firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    // In a real app, this would be an API call
    // Simulating API call with a timeout
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    formSubmitted.value = true;
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  Object.keys(formData).forEach(key => {
    if (key !== 'petId' && key !== 'petName') {
      formData[key] = '';
    }
  });
  
  Object.keys(errors).forEach(key => {
    errors[key] = '';
  });
  
  formSubmitted.value = false;
};

onMounted(() => {
  // Check if there's a pet ID in the route query params
  const routePetId = route.query.pet;
  if (routePetId) {
    const pet = petsStore.getPetById(routePetId);
    if (pet) {
      formData.petId = pet.id;
      formData.petName = pet.name;
      formData.subject = `Interesse em adotar ${pet.name}`;
      formData.message = `Olá, estou interessado em adotar ${pet.name} e gostaria de agendar uma visita para conhecer ${pet.gender === 'Male' ? 'ele' : 'ela'}.`;
    }
  } else if (props.petId) {
    const pet = petsStore.getPetById(props.petId);
    if (pet) {
      formData.petId = pet.id;
      formData.petName = pet.name;
      formData.subject = `Interesse em adotar ${pet.name}`;
      formData.message = `Olá, estou interessado em adotar ${pet.name} e gostaria de agendar uma visita para conhecer ${pet.gender === 'Male' ? 'ele' : 'ela'}.`;
    }
  }
});

// Watch for props changes
watch(() => props.petId, (newPetId) => {
  if (newPetId) {
    const pet = petsStore.getPetById(newPetId);
    if (pet) {
      formData.petId = pet.id;
      formData.petName = pet.name;
      formData.subject = `Interesse em adotar ${pet.name}`;
      formData.message = `Olá, estou interessado em adotar ${pet.name} e gostaria de agendar uma visita para conhecer ${pet.gender === 'Male' ? 'ele' : 'ela'}.`;
    }
  }
});
</script>

<style lang="scss" scoped>
.contact-form {
  form {
    width: 100%;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: var(--text-color);
    }
    
    input, textarea {
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
    
    textarea {
      min-height: 120px;
      resize: vertical;
    }
    
    &.has-error {
      input, textarea {
        border-color: var(--danger);
      }
    }
    
    .error-message {
      color: var(--danger);
      font-size: 0.85rem;
      margin-top: 0.5rem;
    }
    
    .readonly-field {
      background-color: rgba(var(--primary-color-rgb), 0.05);
      border-color: rgba(var(--primary-color-rgb), 0.2);
      color: var(--primary-color);
      font-weight: 600;
    }
  }
  
  .form-actions {
    text-align: center;
    
    .btn {
      padding: 0.75rem 2rem;
      
      i {
        margin-right: 0.5rem;
      }
    }
  }
  
  .form-success {
    text-align: center;
    padding: 2rem;
    animation: fadeIn 0.6s ease;
    
    .success-icon {
      font-size: 4rem;
      color: var(--success);
      margin-bottom: 1.5rem;
    }
    
    h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: var(--heading-color);
    }
    
    p {
      color: var(--text-muted);
      margin-bottom: 2rem;
    }
    
    .btn {
      padding: 0.75rem 2rem;
    }
  }
}
</style>
