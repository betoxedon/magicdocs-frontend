<script setup>
import TransitionComponentSlide from './TransitionComponentSlide.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const dropdrownOpen = ref(false)
function toggleDropdown() {
  dropdrownOpen.value = !dropdrownOpen.value
}
const props = defineProps({
  list: {
    type: Array,
    default: []
  }
})

function handleRouter(name) {
  router.push({ name: name })
  dropdrownOpen.value = false
}
</script>

<template>
  <div class="dropdown">
    <div class="drodown-button" @click.capture="toggleDropdown">
      <slot></slot>
    </div>
    <TransitionComponentSlide>
      <div class="dropdown-content" v-if="dropdrownOpen">
        <ul>
          <li
            v-for="(item, index) in props.list"
            :key="index"
            @click="
              () => {
                if (item.function) {
                  item.function()
                } else {
                  handleRouter(item.name)
                }
              }
            "
            :class="{ 'menu-item': item.name != 'Divisor', divisor: item.name === 'Divisor' }"
          >
            <span v-if="item.name != 'Divisor'">{{ item.name }}</span>
          </li>
        </ul>
      </div>
    </TransitionComponentSlide>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown-content {
  background-color: white;
  padding: 1.5rem;
  position: absolute;
  top: 40px;
  right: 0px;
  z-index: 100;
  color: var(--color-primary);
  border-radius: 4px;
  margin-top: 0.5rem;
  width: fit-content;
  min-width: 180px;
  box-shadow: 20px 25px 40px 17px rgba(0, 0, 0, 0.1);
}
.dropdown-content ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-sizing: border-box;
}
.menu-item {
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  width: 100%;
  border-radius: 8px;
  padding: 8px;
  box-sizing: border-box;
}

.menu-item:hover {
  text-decoration: underline;
  background-color: var(--color-primary);
  color: white;
}
.divisor {
  border: 1px solid var(--color-secondary);
  width: 100%;
}
</style>
