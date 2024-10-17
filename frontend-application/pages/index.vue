<template>
  <div class="d-flex flex-column align-items-center mt-2">
    <div class="text-center">
      <h2>Seu caminho para o sucesso começa aqui. Escolha seu curso!</h2>
    </div>

    <div id="carousel" class="mt-3">
      <div :style="{ display: 'flex', transition: 'transform 0.5s ease', transform: `translateX(-{${currentIndex * 100}}%)` }">
        <div 
          class="carousel-item" 
          v-for="(slide, index) in slides" 
          :key="index" 
          :class="{ active: index === currentIndex }"
        >
          <img :src="slide.src" :alt="slide.alt" />
          <div class="carousel-caption">
            <h3>{{ slide.nameCurso }}</h3>
          </div>
        </div>
      </div>
      
      <button @click="prevSlide" class="carousel-control" id="prev"> ❮ </button>
      <button @click="nextSlide" class="carousel-control" id="next"> ❯ </button>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      slides: [
        { src: '/med.png', nameCurso: 'MEDICINA', alt: 'imagem 01' },
        { src: '/adm.png', nameCurso: 'ADM', alt: 'imagem 02' },
        { src: '/ads.png', nameCurso: 'ADS', alt: 'imagem 03' },
      ],
    };
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    },
  },
};
</script>

<style scoped>
.mt-5 {
  margin-top: 3rem;
}

#carousel {
  position: relative;
  width: 40%;
  height: 60%;
  overflow: hidden;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 90%;
  }
}

.carousel-item {
  display: flex;
  min-width: 100%;
  height: 40vh;
  transition: transform 0.5s ease, opacity 0.5s ease;
  opacity: 0;
}

.active {
  opacity: 1;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
}

#prev {
  left: 10px;
}

#next {
  right: 10px;
}

/* Adicione isso para centralizar a imagem */
img {
  width: 100%; /* Ajusta a imagem para ocupar toda a largura do carrossel */
  height: auto; /* Mantém a proporção da imagem */
}

.carousel-caption {
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  width: 50%;
}

</style>
