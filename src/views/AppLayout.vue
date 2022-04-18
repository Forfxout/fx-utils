<template>
  <div class="carousel w-full">
    <div class="carousel-item w-full">
      <WelcomePageView id="welcome" />
    </div>
    <div class="carousel-item w-full">
      <PayoneerPageView id="payoneer" />    
    </div>
  </div>
</template>

<script>
import PayoneerPageView from '@/views/Payoneer.vue' 
import WelcomePageView from '@/views/Welcome.vue'

export default {
  components: {
    PayoneerPageView,
    WelcomePageView
  }
}
</script>