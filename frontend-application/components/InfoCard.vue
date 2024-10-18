<template>
  <div class="curso-info-card" @click="navigateToMatricula">
    <p class="curso-nome">{{ cursoData.curso_name }}</p>
    <p class="tipo-curso">
      {{ getTipoCurso(cursoData.tipo_curso_id) }}, 
      {{ getModalidadeCurso(cursoData.modalidade_id) }}
    </p>
    <p class="valor-curso">{{ formatCurrency(cursoData.curso_valor) }}</p>
    <p class="mensalidades">
      {{ cursoData.curso_mensalidade }} mensalidades
    </p>
  </div>
</template>

<script>
export default {
  props: {
    cursoData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    
    getTipoCurso(tipoId) {
      const tipos = {
        1: 'Graduação',
        2: 'Pós-graduação',
      };
      return tipos[tipoId];
    },
    
    getModalidadeCurso(modalidadeId) {
      const modalidades = {
        1: 'Presencial',
        2: 'EAD',
      };
      return modalidades[modalidadeId];
    },
    
    formatCurrency(value) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value);
    },

    navigateToMatricula() {
      localStorage.setItem('cursoSelecionado', JSON.stringify(this.cursoData));
      this.$router.push({ path: '/matricula' });
    }

  },
};
</script>

<style>
.curso-info-card {
  width: 400px;
  padding: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer; 
  transition: box-shadow 0.3s; 

  @media (max-width: 768px) {
    width: 90%;
  }

  .info-card:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); 
}
}

.curso-nome {
  font-size: 24px;
  font-weight: bold;  
  color: #1e1e1e;
}

.tipo-curso {
  font-size: 18px;
  color: #333;
}

.valor-curso {
  font-size: 22px;
  color: #28a745;
  font-weight: bold;
}

.mensalidades {
  font-size: 16px;
  color: #555;
}
</style>
