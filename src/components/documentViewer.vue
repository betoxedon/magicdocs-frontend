<script setup>
import PSPDFKit from 'pspdfkit';
import { onMounted, onUnmounted, watch } from 'vue'

const emits = defineEmits(['loaded'])

const props = defineProps({
    file: {
        type: String,
        required: true
    }
})

onMounted(()=>{
    loadPSPDFKit().then((instance)=>{
        emits('loaded', instance)
    })
})

onUnmounted(()=>{
    PSPDFKit.unload(".pdf-container");
})

watch(props.pdfFile, async (file) => {
    if (file) {
        return loadPSPDFKit();
    }
})

async function loadPSPDFKit() {
      PSPDFKit.unload(".pdf-container");
      return PSPDFKit.load({
        // access the pdfFile from props
        document: props.pdfFile,
        container: ".pdf-container",
      });
    }
</script>

<template>
    <div class="pdf-container"></div>
</template>

<style scoped>
.pdf-container {
  height: 100vh;
}
</style>