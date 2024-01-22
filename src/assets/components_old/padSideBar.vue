<script setup>

</script>

<template>
    <div class="sidemenu">
        <div class="menuItem" @click.capture="saveData">
            <font-awesome-icon icon="floppy-disk" />
        </div>
        <div class="menuItem" @click.capture="createTextFragment">
            <font-awesome-icon icon="file-signature" />
        </div>
        <div class="menuItem" @click.capture="createModel" v-if="pad.pad_id">s
            <font-awesome-icon icon="bookmark" />
        </div>
        <div class="menuItem" @click.capture="createDocument">
            <font-awesome-icon icon="wand-magic-sparkles" />
        </div>
    </div>
</template>

<style scoped>
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