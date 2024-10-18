<template>
  <div class="curso-card" @click="selectOption">
    <p>{{ propData.title }}</p>
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

    async selectOption() {
      try {
        const response = await fetch(`http://localhost:3001/${this.propData.req}`, {
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
        console.error('Error making request:', error);
      }
    },
    
  },
};
</script>

<style>
  .curso-card {
  margin-top: 20px;
  width: 400px;
  height: 30px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease;
  }

  .curso-card:hover {
  background-color: #e0e0e0;
  }

  .options {
  display: flex;
  justify-content: space-between;
  text-align: center;
  }

</style>