<script setup>
import makeid from "../utils/id.js";
import TransitionComponent from './TransitionComponent.vue'
import { onMounted, ref } from "vue";
const id = ref('')
onMounted(()=>{
    id.value = makeid(8)
})
const props = defineProps({
    title: {
        type: String,
        default: "Title"
    }
})
const icon = ref(null)
const showContent = ref(false)
function openAccordionItem(){
    showContent.value = !showContent.value
}
</script>

<template>
    <div class="accordion-item" :id="id">
        <div class="item-header" @click="openAccordionItem">
            <span>{{ props.title }}</span>
            <font-awesome-icon icon="chevron-down" ref="icon" class="icon" :class="{open:showContent}"/>
        </div>
        <TransitionComponent v-if="showContent">
            <div class="item-content">
                <slot></slot>
            </div>
        </TransitionComponent>
    </div>
</template>

<style scoped>
    .item-header {
        display: flex;
        justify-content: space-between;
        padding: .5rem 1rem;
        align-items: center;
        border-bottom: 1px solid var(--color-primary);
        cursor: pointer;
        width: 100%;
    }
    .item-content {
        padding: 1rem 1rem 2rem 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow-x: hidden;
        overflow-y: auto;
        max-width: 250px;
    }

    .icon {
        transition: all .25s ease-in-out;
    }

    .open {
        transform: rotate(180deg);
    }
</style>