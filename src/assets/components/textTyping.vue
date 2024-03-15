<script setup>
const props = defineProps(['title', 'subtitle'])
import { onMounted } from 'vue'
onMounted(() => {
  const typer = document.getElementById('typer')
  const typersub = document.getElementById('typersub')
  typersub.style.animationPlayState = 'paused'
  setTimeout(() => {
    typer.style.animationPlayState = 'paused'
    typersub.style.visibility = 'visible !important'
  }, 3500)
})
</script>

<template>
  <div class="typewriter">
    <p class="title" id="typer">
      {{ props.title }}
    </p>
    <p class="subtitle" id="typersub">
      {{ props.subtitle }}
    </p>
  </div>
</template>

<style scoped>
.title {
  font-size: 2.5rem;
}

.subtitle {
  font-size: 1.5rem;
  text-align: left;
  width: 248px;
}

.typewriter p {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: fit-content;
  color: var(--color-primary);
  font-family: 'Rubik';
  overflow: hidden;
  /* Ensures the content is not revealed until the animation */
  border-right: 0.15em solid var(--color-primary);
  /* The typwriter cursor */
  white-space: nowrap;
  /* Keeps the content on a single line */
  margin: 0 auto;
  /* Gives that scrolling effect as the typing happens */
  margin-left: 0;
  letter-spacing: 0.1em;
  /* Adjust as needed */
  animation:
    typing 3.5s steps(30, end),
    blink-caret 0.5s step-end infinite;
}

@keyframes turn-visible {
  from {
    visibility: 'hidden';
  }
  to {
    visibility: 'visible';
  }
}

.typewriter .subtitle {
  animation:
    typing_sub 3.5s steps(30, end),
    blink-caret 0.5s step-end infinite;
  animation-delay: 3.5s;
  /* visibility: 'hidden'; */
}

/* The typing effect */
@keyframes typing {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}

@keyframes typing_sub {
  from {
    width: 0;
  }

  to {
    width: 248px;
  }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }

  50% {
    border-color: var(--color-primary);
  }
}
</style>
