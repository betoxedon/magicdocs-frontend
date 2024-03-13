<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Object
  },
  index: {
    type: Number,
    default: 0
  },
  primary: {
    type: Boolean,
    default: true
  }
})

const isPrimary = computed(() => {
  return props.index % 2 == 0
})
</script>

<template>
  <div class="hero" :class="{ primary: !isPrimary, secondary: isPrimary }">
    <div class="hero-container" v-if="isPrimary">
      <div class="content">
        <div class="title">
          {{ data.title }}
          <div class="hero-footer">
            <span></span>
            <font-awesome-icon icon="wand-sparkles" />
            <span></span>
          </div>
        </div>
        <div class="body">
          <p>{{ data.text }}</p>
        </div>
      </div>
      <div class="side">
        <img :src="data.img" :alt="data.imgAlt" />
      </div>
    </div>
    <div class="hero-container" v-else>
      <div class="side">
        <img :src="data.img" :alt="data.imgAlt" />
      </div>
      <div class="content">
        <div class="title">
          {{ data.title }}
          <div class="hero-footer">
            <span></span>
            <font-awesome-icon icon="wand-sparkles" />
            <span></span>
          </div>
        </div>
        <div class="body">
          <p>{{ data.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  width: 100vw;
  display: flex;
  justify-content: center;
  padding: 6rem;
  box-sizing: border-box;
}

.primary {
  background-color: var(--color-primary-background);
  color: var(--color-primary-fonts);
}

.secondary {
  background-color: var(--color-dark-background);
  color: var(--color-white-fonts);
}

.hero-container {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  max-width: 1320px;
  margin: 0 auto;
  box-sizing: border-box;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  font-family: 'Bebas Neue', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 2.5rem;
}

.body {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 2rem;
}

.body p {
  font-family: 'EB Garamond', serif;
  font-optical-sizing: auto;
  font-style: normal;
}

img {
  height: 350px;
  border-radius: 5px;
  aspect-ratio: 1.5;
}

.hero-footer {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
  font-size: 1.5rem;
}
.hero-footer span {
  width: 100%;
  border: 2px solid;
  height: 0px;
}

@media screen and (max-width: 767px) {
  .hero {
    padding: 2rem;
    box-sizing: border-box;
  }
  .hero-container {
    flex-direction: column;
    padding: 1rem;
  }
  .hero-container img {
    height: 150px;
    margin: 0 auto;
  }
  .side {
    display: flex;
  }
  .content {
    gap: 1rem;
  }
  .title {
    font-size: 1.5rem;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .body p {
    font-size: 1.2rem;
  }
  .hero-footer {
    font-size: 1rem;
  }
  .hero-footer span {
    border: 1px solid;
  }
}
</style>
