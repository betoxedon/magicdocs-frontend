<script setup>
import { useDocumentStore } from '../../stores/documents';
import { storeToRefs } from 'pinia';
import { onBeforeMount, onMounted, onBeforeUnmount, ref, onUpdated } from 'vue';
import { useRoute } from 'vue-router';
import newPadForm from '../components/newPadForm.vue'
import { openModal } from 'jenesius-vue-modal'

const { getPadToDoc } = useDocumentStore()
const pad = ref(null)
const route = useRoute()
const loaded = ref(false)

onBeforeMount(async () => {
    pad.value = await getPadToDoc(route.query.pad_id)
    pad.value.type = 'model'
    pad.value.action = 'criar'
    delete pad.value.pad_id
})

onMounted(async () => {
    setTimeout(() => {
        loaded.value = true
    }, 1500);
})

async function createModel() {
    pad.value.content = tinymce.activeEditor.getContent()
    openModal(newPadForm, {value: pad.value, action: 'criar'})
}



</script>

<template>
    <div id="padDetail">
        <div class="sidemenu">
            <div class="menuItem" @click.capture="createModel">
                <font-awesome-icon icon="floppy-disk" />
            </div>
        </div>

        <TinyEditor api-key="229tbl1echk2xkfmrk0brqszsiq67qrll6jr3hbxhmpj8xj3" v-model="pad.content" :init="{
            language: 'pt_BR',
            toolbar_mode: 'sliding',
            plugins: 'save preview tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            menubar: 'file edit insert view format table tools help',
            menu: {
                file: { title: 'File', items: 'restoredraft | preview | print | save' },
            },
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            height: '100%',
            save_onsavecallback: () => {
                createModel();
            }
        }" />
        <transition name="fade">
            <div v-if="!loaded" class="loading">
                <font-awesome-icon icon="spinner" spin size="2xl" style="color: #050505;" class="icon"/>
            </div>
        </transition>
    </div>
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

    
    #padDetail {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
    }

    .sidemenu {
        width: 5rem;
        background-color: var(--color-primary);
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        margin-right: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .menuItem {
        color: white;
        font-size: 2.5rem;
        width: 100%;
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .menuItem:hover {
        cursor: pointer;
    }
</style>