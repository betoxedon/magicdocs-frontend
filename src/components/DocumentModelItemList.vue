<script setup>
import {computed} from 'vue'
import { useRouter } from 'vue-router';
const props = defineProps({
    model: {
        type: Object
    }
})
const fields = computed(()=>{
    return props.model.fields.split(',')
})

const router = useRouter()

function handle_draft(id){
    router.push({name: "EditarModelo", query: {id: id}})
}

function handle_newDoc(id){
    router.push({name: 'NovoDocumento', query: {id:id}})
}

</script>

<template>
    <div class="document-model">
        <font-awesome-icon icon="file-lines" class="icon" size="xl"/>
        <div class="header">
            <div>{{ model.name }}</div>
        </div>
        <div class="body">
            <p>{{ model.description }}</p>
        </div>
        <div class="footer">
            <button v-if="model.published===true" @click="handle_newDoc(model.id)">Abrir</button>
            <button type="button" @click.prevent="handle_draft(model.id)" v-else>Rascunho</button>
        </div>
    </div>
</template>

<style scoped>
.document-model {
    background-color: var(--color-primary-background);
    padding: 2rem;
    border-radius: 5px;
    transition: all .1s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    height: 250px;
    width: 280px;
    position: relative;
}

.icon {
    background-color: var(--color-primary);
    color: var(--color-white);
    padding: 1rem;
    border-radius: 50%;
    aspect-ratio: 1;
    width: 40px;
    height: 40px;

}

.body {
    text-overflow: ellipsis;
    text-align: center;
    overflow: hidden;
    width: 100%;
}

.header {
    display: flex;
    gap: .5rem;
}

.footer {

}


.document-model:hover {
    cursor: pointer;
    transform: scale(1.01);
}
</style>