<script setup>
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
import { closeModal, Modal } from 'jenesius-vue-modal'
import { ref } from 'vue'
import makeid from '../utils/id'
const props = defineProps({
  img: {
    type: String,
    default: ''
  },
  imgDefault: {
    type: String,
    default: ''
  }
})
const emits = defineEmits('select')
const result = ref({})

function ready() {
  // console.log('Cropper is ready.')
}
function clear() {
  if (!cropper) return
  cropper.clear()
}

function reset() {
  if (!cropper) return
  cropper.reset()
}

function handleClose() {
  emits(Modal.EVENT_PROMPT, props.imgDefault)
  closeModal()
}

async function getResult() {
  if (!cropper) return
  const base64 = cropper.getDataURL()
  const blob = await cropper.getBlob()
  if (!blob) return

  const file = await cropper.getFile({
    fileName: makeid(12)
  })

  result.value.dataURL = base64
  result.value.blobURL = URL.createObjectURL(blob)
  result.value.file = file
  emits(Modal.EVENT_PROMPT, result.value)
  closeModal()
}
</script>

<template>
  <div class="img-cropper">
    <div class="navigation">
      <button type="button" @click="handleClose">Fechar</button>
      <button type="button" @click="clear">Limpar Seleção</button>
      <button type="button" @click="reset">Seleção Padrão</button>
      <button type="button" @click="getResult">Salvar</button>
    </div>
    <VuePictureCropper
      :boxStyle="{
        width: '500px',
        height: '500px',
        backgroundColor: '#f8f8f8',
        margin: 'auto'
      }"
      :img="img"
      :options="{
        viewMode: 1,
        dragMode: 'crop',
        aspectRatio: 1 / 1
      }"
      @ready="ready"
    />
  </div>
</template>

<style scoped>
.img-cropper {
  padding: 2rem;
  background-color: var(--color-primary);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
}

.navigation {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
</style>
