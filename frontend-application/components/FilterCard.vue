<template>
    <div class="curso-card" @click="toggleOptions">
    <p>{{ propData.title }}</p>

    <div v-if="showOptions" class="options">
      <button class="buttonSelect" @click="selectOption('1')">{{ propData.option1 }}</button>
      <button class="buttonSelect" @click="selectOption('2')"> {{ propData.option2 }} </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    propData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showOptions: false,
    };
  },
  methods: {
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
    async selectOption(selectionValue) {
      this.showOptions = false;

      try {
        const response = await fetch(`http://localhost:3001/${this.propData.req}/${selectionValue}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        this.$emit('responseChildComponent', {    
          result: data, 
        });
      } catch (error) {
        console.error('error making request:', error);
      }
    },
  },
};
</script>

<style>
  .curso-card {
    margin-top: 20px;
    width: 400px;
    height: 60px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s ease;
    position: relative;

    @media (max-width: 768px) {
      width: 300px;
    }
  }

  .curso-card:hover {
    background-color: #e0e0e0;
  }

  .options {
    display: flex;
    justify-content: center; 
    gap: 10px; 
    position: absolute;
    top: 100%; 
    left: 50%; 
    transform: translateX(-50%);
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }

  .buttonSelect {
    size: 20px;
    background-color: #28a745;
    color: #fff;
    border: none;
    padding: 5px 15px;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .buttonSelect:hover {
    background-color: #218838;
  }

</style>