<script setup>
import { useFileStore } from '../stores/files'
const { getSingleFile, updateDocFile } = useFileStore()
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import chatComponent from '../components/ChatComponent.vue'
const file = ref({})
const route = useRoute()

onMounted(async () => {
  let res = await getSingleFile(route.query.id)
  file.value = res[0]
})

function saveData() {
  updateDocFile({ ...file.value })
}

function handleImport(e) {
  file.value.content += `\n${e}`
}
</script>

<template>
  <div class="document-container">
    <embed
      :src="file.file"
      :class="{ pdf: file.type === 'aplication/pdf', img: file.type === 'image/jpeg' }"
      v-if="file.type != 'doc'"
    />
    <div class="editor-container">
      <TinyEditor
        api-key="229tbl1echk2xkfmrk0brqszsiq67qrll6jr3hbxhmpj8xj3"
        v-model="file.content"
        :init="{
          language: 'pt_BR',
          toolbar_mode: 'sliding',
          plugins:
            'save preview anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
          toolbar:
            'save | undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          menubar: 'file edit insert view format table tools help',
          menu: {
            file: { title: 'File', items: 'restoredraft | preview | print | save' }
          },
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          height: '80vh',
          save_onsavecallback: () => {
            saveData()
          }
        }"
      />
      <chatComponent @import="(e) => handleImport(e)"></chatComponent>
    </div>
  </div>
</template>

<style scoped>
.document-container {
  width: 100%;
  min-height: 80vh;
  max-width: 1320px;
  display: flex;
  flex-direction: column;
}

embed {
  width: 100%;
  max-width: 1320px;
  min-height: 80vh;
  max-height: 90vh;
  margin: 0 auto;
}

.img {
  max-width: 500px;
}

.editor-container {
  display: flex;
  justify-content: space-between;
}
</style>
