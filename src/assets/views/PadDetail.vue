<script setup>
import { useDocumentStore } from '../../stores/documents';
import { storeToRefs } from 'pinia';
import { onBeforeMount, onMounted, onBeforeUnmount, ref, onUpdated } from 'vue';
import { useRoute } from 'vue-router';

const { getPadToDoc, updatePad } = useDocumentStore()
const { pad } = storeToRefs(useDocumentStore())
const route = useRoute()
const loaded = ref(false)

onBeforeMount(async () => {
    await getPadToDoc(route.query.pad_id)
})

onMounted(async () => {
    setInterval(() => {
        saveData()
    }, 5 * 60 * 1000);
    setTimeout(() => {
        loaded.value = true
    }, 1500);
})

async function saveData() {
    pad.value.content = tinymce.activeEditor.getContent()
    await updatePad(pad.value)
}
onBeforeUnmount(async () => {
    saveData()
})


</script>

<template>
    <TinyEditor api-key="229tbl1echk2xkfmrk0brqszsiq67qrll6jr3hbxhmpj8xj3" v-model="pad.content" :init="{
        language: 'pt_BR',
        toolbar_mode: 'sliding',
        plugins: 'save preview tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
        toolbar: 'save undo redo | inserttemplate addtemplate | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        menubar: 'file edit insert view format table tools help',
        menu: {
            file: { title: 'File', items: 'restoredraft | preview | print | save' },
        },
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        height: '100%',
        save_onsavecallback: () => {
            saveData();
        }
    }" />
    <transition name="fade">
        <div v-if="!loaded" class="loading">
            <font-awesome-icon icon="spinner" spin size="2xl" style="color: #050505;" class="icon"/>
        </div>
    </transition>
</template>

<style scoped>
    .loading {
        position: fixed;
        background-color: var(--color-neutral);
        height: 100vw;
        width: 100vw;
        top: 0px;
        z-index: 999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: black;
        }
    
    .icon {
        position: fixed;
        top: 50%;
        left: 50%;
        color: black;
        z-index: 10000;
        height: 40px;
        width: 40px;
    }

    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }
    /* .fade-enter-to, .fade-leave-from {
        opacity: 1;
    } */
    .fade-enter-active, .fade-leave-active {
        transform: opacity 1.5s ease;
    }
</style>