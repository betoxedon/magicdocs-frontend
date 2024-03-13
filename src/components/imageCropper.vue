<script setup>
import { ref, onMounted, onUpdated, computed } from 'vue'
import { promptModal } from 'jenesius-vue-modal'
import imageCropperModal from './imageCropperModal.vue'
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  fileValue: {}
})

const value = computed(() => {
  if (typeof props.modelValue === 'object') {
    return URL.createObjectURL(props.modelValue)
  } else {
    return props.modelValue
  }
})

const emits = defineEmits(['update:modelValue', 'file'])

const uploadInput = ref(null)
const imgSrc = ref(null)

function selectFile(e) {
  const { files } = e.target
  if (!files || !files.length) return
  const file = files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = async () => {
    imgSrc.value = String(reader.result)
    imgSrc.value = await promptModal(imageCropperModal, { img: imgSrc.value, imgDefault: props.modelValue })
    if (!uploadInput.value) return
    uploadInput.value.value = ''
    emits('update:modelValue', imgSrc.value.blobURL)
    emits('file', imgSrc.value.file)
  }
}
const profile = ref(null)
</script>

<template>
  <div class="profile-image-container" ref="profile" @click="uploadInput.click()">
    <img :src="value" alt="" />
    <input ref="uploadInput" type="file" accept="image/jpg, image/jpeg, image/png, image/gif" @change="selectFile" />
    <button @click="uploadInput.click()" type="button">Atualizar Foto de Perfil</button>
  </div>
</template>

<style scoped>
.profile-image-container {
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  height: fit-content;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.profile-image-container img {
  height: 100px;
  width: 100px;
  aspect-ratio: 1;
  border-radius: 50%;
}

.profile-image-container .label {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  height: 100%;
  width: 100%;
  background-color: rgb(224, 224, 224);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-image-container input {
  display: none;
}
</style>
