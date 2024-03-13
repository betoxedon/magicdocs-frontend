<script setup>
import HeroCard from '../../components/HeroCard.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { onMounted, ref } from 'vue'
import documentImg from '../../images/pexels-mohammad-danish-891059.jpg'
import clientImg from '../../images/pexels-fauxels-3184465.jpg'
import assistantImg from '../../images/pexels-cottonbro-studio-6153354.jpg'
import templateImg from '../../images/pexels-kelly-2928232.jpg'

const items = [
  {
    title: 'Documentos',
    text: 'Oferece uma solução eficiente para lidar com documentos digitais. Permite o upload, classificação, busca e controle de versões, promovendo colaboração segura através de permissões personalizadas. Simplifica o gerenciamento de documentos, otimizando o fluxo de trabalho de forma eficaz.',
    img: documentImg
  },
  {
    title: 'Clientes',
    text: 'Simplifica a gestão de relacionamentos legais. Permite organizar dados de clientes, detalhes de casos e prazos de maneira eficiente. Facilita a comunicação transparente e compartilhamento seguro de informações, aprimorando a eficiência e colaboração no ambiente jurídico.',
    img: clientImg
  },
  {
    title: 'Assistente',
    text: 'Uma inovadora ferramenta de suporte automatizado. Utilizando inteligência artificial, responde a perguntas, fornece orientações e executa tarefas específicas. Facilita a navegação, oferece informações instantâneas e se adapta continuamente às necessidades dos usuários, proporcionando uma experiência eficiente e personalizada.',
    img: assistantImg
  },
  {
    title: 'Templates',
    text: 'Simplifique a elaboração de documentos utilizando nossos modelos predefinidos ou os seus próprios, permitindo a inserção automática de dados dos clientes, agilizando a produção de contratos, relatórios e outros documentos com precisão e consistência. A flexibilidade dos templates adapta-se facilmente a diferentes necessidades, otimizando o processo de geração de documentos personalizados para cada cliente.',
    img: templateImg
  }
]
</script>
<template>
  <div class="home">
    <div class="intro">
      <h1>MAGICDOCS</h1>
      <font-awesome-icon :icon="['fas', 'wand-sparkles']" beat-fade />
      <span>Transforme sua experiência e a de seus clientes com a mágica da inteligência artificial!</span>
    </div>
    <HeroCard v-for="(item, index) in items" :key="index" :data="item" :index="index"></HeroCard>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  /* position: fixed; */
  background-color: var(--color-primary-background);
  color: var(--color-primary-font);
  font-family: 'Rubik';
  display: flex;
  flex-direction: column;
  align-items: center;
  letter-spacing: 2px;
  font-size: 1.5rem;
  padding-top: 10rem;
}

.intro {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  background-color: var(--color-primary-background);
  color: var(--color-primary-fonts);
  width: 100%;
  padding: 16rem;
}

.intro h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3rem;
}

.intro span {
  font-family: 'Rubik', sans-serif;
  font-size: 1.3rem;
}

@media screen and (max-width: 767px) {
  .intro {
    padding: 5rem 1rem;
  }
  .intro span {
    max-width: 300px;
    margin: 0 auto;
    text-align: center;
  }
}
</style>
