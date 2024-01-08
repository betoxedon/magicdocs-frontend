<script setup>
import { useDocumentStore } from '../../stores/documents';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import newPadForm from '../components/newPadForm.vue'
import { openModal } from 'jenesius-vue-modal'
import htmlEntities from '../../scripts/specialCharParse.js'
const { getPadToDoc, createPad } = useDocumentStore()
import { storeToRefs } from 'pinia';

const {padFromModel} =storeToRefs(useDocumentStore())

const route = useRoute()
const loaded = ref(false)
const model_builder = ref(null)
const field_array = ref([])
const input_array = ref([])
const newDoc = ref(null)

onBeforeMount(async ()=>{
    newDoc.value = await getPadToDoc(route.query.pad_id)
    parseText()
})

onMounted(async () => {

    setTimeout(() => {
        loaded.value = true
    }, 1500);
})

function handleInput(e){
    let id = e.target.id
    let value = e.target.value
    let string = String(newDoc.value.content)
    string = String(string).replaceAll(`[[${id}]]`, value)
    newDoc.value.content = String(string)
}

function createEventListener(elements){
    elements.value.forEach(element => {
        let id = element
        let input = document.getElementById(id)
        input.addEventListener("focusout", (e)=>{handleInput(e)})
    })
}


function parseText(){
    let arrayInput = [...newDoc.value.content.matchAll(/(?<=\[\[).*?(?=\]\])/gm)]
    let formated = String(newDoc.value.content)
    arrayInput.forEach((item) => {
        let id = item[0].replaceAll(' ', '_')
        field_array.value.push(id)
        formated = String(formated).replaceAll(`[[${item[0]}]]`, `[[${id}]]`)
    });
    newDoc.value.content = String(formated)
    field_array.value.forEach((item) => {
        let input = `<input type="text" placeholder="${item}"  id="${item}">`
        input_array.value.push(input)
        formated = String(formated).replaceAll(`[[${item}]]`, input)
    });
    // let arrayTitle = [...formated.matchAll(/(?<=\{\{).*?(?=\}\})/gm)]
    // arrayTitle.forEach((item) => {
    //     formated = String(formated).replaceAll(`{{${item[0]}}}`, `<div style="font-size: 20px; font-weight: 700; width: 100%; text-align: center; margin: 0 auto">${item[0]}</div><br/>`)
    // });
    model_builder.value.innerHTML = ''
    model_builder.value.innerHTML = formated
    createEventListener(field_array)
}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    

async function saveModel(){
    let payload = newDoc.value
    payload.type = 'doc'
    padFromModel.value={...payload}
    openModal(newPadForm, {value: newDoc.value, action: 'criar'})
}

</script>

<template>
    <div id="padDetail">
        <div class="sidemenu">
            <div class="menuItem" @click.capture="saveModel" style="display: flex; flex-direction: column; font-size: 1.5rem;">
                <span>Salvar</span>
                <font-awesome-icon icon="floppy-disk" />
            </div>
        </div>
        <transition name="fade">
            <div v-if="!loaded" class="loading">
                <font-awesome-icon icon="spinner" spin size="2xl" style="color: #050505;" class="icon"/>
            </div>
        </transition>
        <div :contenteditable="true" style="height: fit-content; width: 100%; max-width: 1024px; margin-bottom: 5rem;" ref="model_builder" id="model-editor"></div>
        <!-- <button @click="saveModel" >Salvar Modelo</button> -->
    </div>
</template>

<style scoped>

#model-editor {
    overflow: auto;
    height: 100%;
    padding: 1rem;
    outline: none;
}
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
        position: absolute;
    }

    .sidemenu {
        position: fixed;
        left: 8rem;
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