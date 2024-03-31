<script setup>
import { closeModal, openModal } from 'jenesius-vue-modal';
import deleteFileFormModal from './deleteFileFormModal.vue';

const props = defineProps({
    file: {
        type: Object
    }
})
</script>

<template>
    <div class="image-modal">
        <div class="modal-navigation">
            <button class="btn" @click="closeModal">Fechar</button>
            <button class="btn-danger" @click="openModal(deleteFileFormModal, {file: file})">Apagar imagem</button>
        </div>
        <img :src="props.file.url" alt="" @click="closeModal">
    </div>
</template>

<style scoped>
.image-modal {
    position: relative;
    padding: 1rem;
    background-color: var(--color-white);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.image-modal img {
    max-height: 80vh;
    max-width: 80vw;
    cursor: zoom-out;
}

.modal-navigation {
    display: flex;
    justify-content: flex-end;
    gap: 2rem;
    margin-bottom: .5rem;
}

</style>