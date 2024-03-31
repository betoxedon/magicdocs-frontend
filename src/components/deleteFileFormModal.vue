<script setup>
import { closeModal } from 'jenesius-vue-modal';
import { useFileStore } from '../stores/files';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const { deleteFile, getFiles } = useFileStore()
const toast = useToast()
const router = useRouter()
const props = defineProps({
    file: {
        type: Object
    }
})

async function  handleDelete(id){
    let res = await deleteFile(id)
    console.log(res)
    if (res.status === 204) {
        toast.success('Documento apagado com sucesso!')
        router.push({ name: 'ClientPage', query: { id: props.file.client } })
        closeModal()
        getFiles()
    } else {
        toast.warning("Houve um erro ao concluir a solicitação! Tente novamente.")
    }
}
</script>

<template>
    <div class="form-delete-modal">
        Tem certeza que deseja apagar o documento "{{file.name}}"? 
        <div>
            <button class="btn-danger" @click="handleDelete(file.id)">Apagar documento</button>
            <button>Cancelar</button>
        </div>
    </div>
</template>

<style scoped>
.form-delete-modal {
    background-color: var(--color-white);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form-delete-modal div {
    display: flex;
    justify-content: center;
    gap: 2rem;
}
</style>