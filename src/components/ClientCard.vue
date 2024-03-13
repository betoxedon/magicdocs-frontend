<script setup>
const props = defineProps({
  client: {
    type: Object
  }
})
function getFirstLetters(name) {
  let arr = name.split(' ')
  if (arr.length === 2) {
    return `${arr[0][0]}${arr[1][0]}`.toUpperCase()
  } else {
    return `${arr[0][0]}${arr[0][1]}`.toUpperCase()
  }
}
</script>

<template>
  <div class="client-card">
    <div class="header">
      <div class="name-label">{{ getFirstLetters(client.name) }}</div>
      <div>{{ client.name }}</div>
    </div>
    <div class="body">
      <div class="item">
        <font-awesome-icon icon="at" />
        <div>{{ client.email }}</div>
      </div>
      <div class="item">
        <font-awesome-icon icon="phone" />
        <div>{{ client.phone_number }}</div>
      </div>
      <div class="item">
        <font-awesome-icon icon="handshake" />
        <div>{{ client.causa }}</div>
      </div>
      <div class="status status-active" v-if="client.is_active"><span class="tag tag-active"></span>Ativo</div>
      <div class="status status-inactive" v-else><span class="tag tag-inactive"></span>Inativo</div>
    </div>
  </div>
</template>

<style scoped>
.client-card {
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 18px 4px rgba(0, 0, 0, 0.1);
  height: fit-content;
  flex-basis: 250px;
  min-width: 250px;
  padding: 1rem;
  border-radius: 8px;
  flex-grow: 1;
  cursor: pointer;
  position: relative;
  background-color: var(--color-primary-background);
  transition: all 0.5s ease-in-out;
}

.client-card:hover {
  transform: scale(1.05);
}

.header {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.item {
  display: flex;
  gap: 1rem;
}

.item div {
  font-weight: 300;
  font-size: 14px;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.name-label {
  height: 25px;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  background-color: var(--color-dark-background);
  color: var(--color-white-fonts);
}

.status {
  position: absolute;
  bottom: 1rem;
  right: -8px;
  width: 40px;
  color: white;
  padding: 1px 10px;
  padding-right: 1rem;
  font-size: 14px;
  font-weight: 400;
  z-index: 2;
}

.status-active {
  background-color: rgb(44, 187, 8);
}

.status-inactive {
  background-color: rgb(147, 147, 147);
}

.tag {
  position: absolute;
  top: -9px;
  right: 0px;
  width: 0;
  height: 0;
  border-left: 0px solid transparent;
  border-right: 8px solid transparent;
}
.tag-active {
  border-bottom: 10px solid rgb(7, 114, 6);
}
.tag-inactive {
  border-bottom: 10px solid rgb(122, 122, 122);
}
</style>
