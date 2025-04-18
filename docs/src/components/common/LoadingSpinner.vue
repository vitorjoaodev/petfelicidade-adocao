<template>
  <div class="spinner-container">
    <div class="spinner">
      <div class="paw-print-1">
        <i class="fa-solid fa-paw"></i>
      </div>
      <div class="paw-print-2">
        <i class="fa-solid fa-paw"></i>
      </div>
      <div class="paw-print-3">
        <i class="fa-solid fa-paw"></i>
      </div>
    </div>
    <p v-if="message" class="spinner-message">{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: 'Carregando...'
  }
});
</script>

<style lang="scss" scoped>
.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.spinner {
  position: relative;
  width: 80px;
  height: 80px;
}

.paw-print-1,
.paw-print-2,
.paw-print-3 {
  position: absolute;
  color: var(--primary-color);
  opacity: 0;
  font-size: 2rem;
  animation: paw-animation 1.5s infinite;
}

.paw-print-1 {
  animation-delay: 0s;
  transform: rotate(-30deg);
}

.paw-print-2 {
  animation-delay: 0.5s;
  transform: rotate(0deg);
}

.paw-print-3 {
  animation-delay: 1s;
  transform: rotate(30deg);
}

@keyframes paw-animation {
  0% {
    transform: translate(0, 0) scale(1) rotate(var(--rotation, 0deg));
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  50% {
    transform: translate(0, -20px) scale(1.1) rotate(var(--rotation, 0deg));
    opacity: 0.8;
  }
  100% {
    transform: translate(0, -40px) scale(1) rotate(var(--rotation, 0deg));
    opacity: 0;
  }
}

.spinner-message {
  margin-top: 1.5rem;
  color: var(--text-muted);
  font-size: 1rem;
  font-weight: 500;
}
</style>
