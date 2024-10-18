<template>
  <div class="d-flex flex-column align-items-center mt-2">
    <div class="text-center">
      <h2>Seu caminho para o sucesso começa aqui. Escolha seu curso!</h2>
    </div>
    <MyCarrossel />

    <div>
      <AllCursos
      :propData="{ title: 'todos os cursos', req: 'cursos' }"
      @responseChildComponent="handleSelected"
      />

      <Card 
      :propData="{ title: 'tipo do curso', option1: 'pressencial', option2: 'EAD', req: 'cursos/bytype' }" 
      @responseChildComponent="handleSelected"
      />

      <Card 
      :propData="{ title: 'modalidade do curso', option1: 'graduação', option2: 'pós graduação', req: 'cursos/bymodality' }" 
      @responseChildComponent="handleSelected"
      />
    </div>

    <div>
      <div v-if="cursos.length > 0">
        <h3 class="text-center" >resultado da seleção:</h3>
        <div class="cards-container">
          <InfoCard 
          v-for="(curso, index) in cursos"
          :key="index"
          :cursoData="curso"
          />
        </div>
      </div>
    </div>  

  </div>
</template>

<script>
import MyCarrossel from '../components/myCarrossel.vue';
import Card from '~/components/FilterCard.vue';
import AllCursos from '~/components/AllCursos.vue';
import InfoCard from '~/components/InfoCard.vue';

export default {
  
  components: {
    MyCarrossel,
    AllCursos,
    Card,
    InfoCard,
  },

  data() {
    return {
      cursos: [],
    }
  },

  methods: {
    handleSelected(data) {
      this.cursos = 'carregando..'
      this.cursos = data.result;
    }
  }

};
</script>

<style scoped>
  .mt-5 {
    margin-top: 3rem;
  }

  .cards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    padding: 20px;
  }
</style>
