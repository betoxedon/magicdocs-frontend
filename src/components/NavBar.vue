<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import UserAvatar from './UserAvatar.vue'
import DropDownMenu from './DropDownMenu.vue'
const { getUserData, logout } = useUserStore()
const { user, loggedIn } = storeToRefs(useUserStore())

const router = useRouter()
function handleRouter(name) {
  router.push({ name: name })
}

function handleLogout() {
  logout()
  router.push({ name: 'Home' })
}

onMounted(() => {
  try {
    if (user) {
      getUserData()
    }
  } catch (error) {
    console.log(error)
  }
})

const itemsArray = [
  {
    name: 'Perfil',
    function: null
  },
  {
    name: 'Clientes',
    function: null
  },
  {
    name: 'Documentos',
    function: null
  },
  {
    name: 'Modelos',
    function: null
  },
  // {
  //   name: 'Financeiro',
  //   function: null
  // },
  {
    name: 'Divisor',
    function: null
  },
  {
    name: 'Logout',
    function: handleLogout
  }
]
</script>

<template>
  <header>
    <nav>
      <a class="start logo" @click="() => handleRouter('Home')" id="logo">
        <font-awesome-icon icon="wand-sparkles" />
        MAGICDOCS
      </a>
      <div class="center"></div>
      <div class="end">
        <a @click="() => handleRouter('Login')" v-if="!loggedIn">Login</a>
        <div v-else class="logged-user-area">
          <span class="credits" :class="{ 'no-credits': user.credits === 0 }" v-if="user.credits === 1">
            $ {{ user.credits }} <span>Crédito</span>
          </span>
          <span class="credits" :class="{ 'no-credits': user.credits <= 0 }" v-else-if="user.credits <= 0">
            <span>Você não possui créditos</span>
          </span>
          <span
            class="credits"
            :class="{ 'low-credits': user.credits <= 10 && user.credits > 0 }"
            v-else-if="user.credits <= 10"
          >
            $ {{ user.credits }} <span>Créditos</span>
          </span>
          <span class="credits" :class="{ 'no-credits': user.credits === 0 }" v-else-if="user.credits > 10">
            $ {{ user.credits }} <span>Créditos</span>
          </span>
          <span class="username">Olá, {{ user.first_name }}</span>
          <DropDownMenu :list="itemsArray">
            <UserAvatar :img="user.profile_picture"></UserAvatar>
          </DropDownMenu>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
header {
  height: 60px;
  background-color: var(--color-primary-background);
  color: var(--color-primary-font);
  display: flex;
  align-items: center;
  font-family: 'Titillium Web', sans-serif;
  box-shadow: 0px 17px 24px -9px rgba(0, 0, 0, 0.1);
  position: absolute;
  width: 100%;
  z-index: 10;
}
nav {
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 2rem;
  max-width: 1320px;
}

.credits {
  background-color: var(--color-success);
  color: var(--color-white-fonts);
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.5s ease-in-out;
}

.no-credits {
  background-color: var(--color-error);
}

.low-credits {
  background-color: var(--color-warn);
}

.logo {
  font-size: 22px;
}

a {
  cursor: pointer;
}

.logged-user-area {
  display: flex;
  gap: 1rem;
  align-items: center;
}

@media screen and (min-width: 1320px) {
  nav {
    max-width: 1320px;
    margin: auto;
  }
}
@media screen and (max-width: 767px) {
  .credits span {
    display: none;
  }
  .credits {
    padding: 0.1rem;
  }

  .username {
    display: none;
  }
}
</style>
