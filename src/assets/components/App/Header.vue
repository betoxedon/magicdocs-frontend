<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../../stores/user';
import buttonPrimary from '../form/buttonPrimary.vue';
const props = defineProps(['color'])
const dropdown_menu = ref(null)
const dropdown_menu_container = ref(null)

const { logout } = useUserStore()
const { user } = storeToRefs(useUserStore())
const router = useRouter()
const wd = ref(null)
const dropdownIsVisible = ref(false)

onMounted(() => {
  wd.value = window
  document.addEventListener('click', (e)=>{handleOutside(e)})
})

function getEventTarget(e){
  return e
}

function handleOutside(event){
  let e = getEventTarget(event)
  if (e.target.contains(dropdown_menu_container.value)) {
    closeMenu()
  }
}

function handleLogout() {
  logout()
  router.push({ name: 'Home' })
}

function openMenu() {
  dropdown_menu.value.style.visibility = 'visible'
  dropdownIsVisible.value = true
}

function closeMenu() {
  dropdown_menu.value.style.visibility = 'hidden'
  dropdownIsVisible.value = false
}

function handleMenu(){
  if (dropdownIsVisible.value) {
    closeMenu()
  } else {
    openMenu()
  }
}

function handleNavigation(route){
  closeMenu()
  router.push({name: route})
}
</script>

<template>
  <header class="header" :style="{ 'background-color': props.color }">
    <nav class="navigation-bar">
      <!-- LOGO / NAME -->
      <a class="link logo" href="#" @click="router.push({ name: 'Home' })">MagicDocs</a>
      <!-- NAVIGATION LINKS -->
      <div class="menu">
        <ul class="menu-links">
          <li><a class="link" href="#" @click="router.push({ name: 'Home' })">Home</a></li>
          <li v-if="user"><a class="link" href="#" @click="router.push({ name: 'Documents' })">Meus Documentos</a></li>
        </ul>

        <ul v-if="!user" class="menu-links">
          <li >
            <buttonPrimary label="Login" icon="right-to-bracket" @click="router.push({ name: 'Login' })"></buttonPrimary>
          </li>
        </ul>

        <ul v-else class="menu-links">
          <li>
            <span>Olá, {{ user.first_name }}</span>
          </li>
          <li  class="link">
            <img v-if="user.profile_picture" class="profile_picture" :src="user.profile_picture" alt="">
            <img v-else class="profile_picture" src="../../../images/avatar.jpg" alt="">
          </li>
          <li><a class="link" href="#" @click="handleLogout">
              Logout
              <font-awesome-icon icon="right-from-bracket" />
            </a></li>
        </ul>
      </div>


      <!-- DROPDOWN MENU -->
      <div class="dropdown_menu" id="#dropdown_menu" ref="dropdown_menu_container">
        <font-awesome-icon class="dropdown-icon" icon="bars" size="xl" @click="handleMenu" />
        <div ref="dropdown_menu" class="dropdown">
          <ul class="menu-links-dropdown">
            <li><a class="link" href="#" @click="handleNavigation('Home')">Home</a></li>
            <li><a class="link" href="#" @click="handleNavigation('Home')">Documents</a></li>
            <li v-if="!user"><a class="link" href="#" @click="handleNavigation('Login')">
                Login
                <font-awesome-icon icon="right-to-bracket" />
              </a></li>
            <li v-else><a class="link" href="#" @click="logout">
                Logout
                <font-awesome-icon icon="right-from-bracket" />
              </a></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>


<style scoped>
header {
  width: 100%;
  height: 5rem;
  margin-bottom: 3rem;
}

.logo {
  font-weight: 700;
  font-size: 2rem;
}

.link {
  text-decoration: none;
  font-size: 1.5rem;
  color: var(--color-ai-primary);
}

.menu {
  align-items: center;
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.navigation-bar {
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: relative;
}

.menu-links {
  display: flex;
  align-items: center;
}

.menu-links li {
  padding-left: 2rem;
  font-weight: 500;
}

.dropdown {
  position: absolute;
  right: 2rem;
  top: 7rem;
  padding: 2rem;
  visibility: hidden;
  background-color: var(--color-ai-terciary);
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
}

.dropdown-icon {
  display: none;
}

.menu-links-dropdown {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 15rem;
}

.menu-links-dropdown li {
  padding-left: 0;
  margin-bottom: 1.5rem;
}

.menu-links-dropdown ul:last-child {
  margin-bottom: 0;
}

.dropdown_menu {
  display: none;
}

.profile_picture {
  height: 4rem;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid var(--color-ai-primary);
}

@media screen and (min-width: 1024px) {}

@media screen and (min-width: 768px) and (max-width: 1023px) {}

@media screen and (max-width: 767px) {
  .dropdown_menu {
    display: block;
  }

  .dropdown {
    width: 100%;
    right: 0;
    z-index: 1000;
  }

  .menu-links {
    visibility: hidden;
  }

  .dropdown-icon {
    display: block;
  }
}
</style>