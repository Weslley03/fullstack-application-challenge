<template>
  <div class="matricula-page">
    <h2 style="color: #28a745">detalhes do seu curso</h2>
    <div v-if="curso" class="text-center" style="background-color: #f0f0f0; padding: 5px; border-radius: 10px;">
      <h3>Curso: {{ curso.curso_name }}</h3>
      <p>valor: {{ curso.curso_valor }}</p>
      <p>mensalidade: {{ curso.curso_mensalidade }}</p>
    </div>
    <div v-else>
      <p>nenhum curso selecionado.</p>
    </div>

    <h3>antes de concluir, cadastre-se</h3>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="aluno_nome">nome do aluno:</label>
        <input type="text" v-model="formData.aluno_nome" required />
      </div>

      <div class="form-group">
        <label for="aluno_email">email do aluno:</label>
        <input type="email" v-model="formData.aluno_email" required />
      </div>

      <div class="form-group">
        <label for="aluno_telefone">telefone do aluno:</label>
        <input type="text" v-model="formData.aluno_telefone" required />
      </div>

      <div class="form-group">
        <label for="aluno_CPF">CPF do aluno:</label>
        <input type="text" v-model="formData.aluno_CPF" required />
      </div>

      <div class="form-group">
        <label for="aluno_nascimento">data de nascimento:</label>
        <input type="date" v-model="formData.aluno_nascimento" required />
      </div>

      <div class="form-group">
        <label for="aluno_CEP">CEP:</label>
        <input 
        type="text" 
        v-model="formData.aluno_CEP" 
        @change="handleCepChange" 
        required />
        <p v-if="cepError" style="color: red;">{{ this.cepError }}</p>
      </div>

      <div class="form-group">
        <label for="documento_number">número do documento:</label>
        <input type="text" v-model="formData.documento_number" required />
      </div>

      <div class="form-group">
        <label for="documento_desc">descrição do documento:</label>
        <select id="documentoInput" v-model="formData.documento_desc" required> 
          <option disabled value="">Selecione</option>
          <option value="CNH">CNH</option>
          <option value="RG">RG</option>
        </select>
      </div>

      <div class="form-group">
        <label for="documento_image">imagem do documento:</label>
        <input type="file" @change="handleFileUpload" required />
      </div>

      <button id="buttonSubmit"type="submit">enviar</button>
    </form>
  </div>
</template>

<script>
import { cepValidate } from '~/composables/useMatricula.js';

export default {
  data() {
    return {
      curso: null,
      cepError: null,
      formData: {
        aluno_nome: '',
        aluno_email: '',
        aluno_telefone: '',
        aluno_CPF: '',
        aluno_nascimento: '',
        aluno_CEP: '',
        documento_number: '',
        documento_desc: '',
        documento_image: '',
      },
    };
  },
  mounted() {
    const cursoSelecionado = localStorage.getItem('cursoSelecionado');
    if (cursoSelecionado) {
      this.curso = JSON.parse(cursoSelecionado);
    }
  },
  methods: {
    
    async handleCepChange() {
      const formattedCep = this.formData.aluno_CEP.replace(/\D/g, '');

      if (formattedCep.length !== 8) {
        this.cepError = 'O CEP deve ter 8 dígitos.';
        return;
      }

      const isValid = await cepValidate(formattedCep);

      if (!isValid) {
        this.cepError = 'CEP inválido. Verifique e tente novamente.';
      } else {
        this.cepError = '';
      }
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.formData.documento_image = e.target.result; 
      };
      reader.readAsDataURL(file);
    },

    async handleSubmit() {
      const userData = {
        aluno_nome: this.formData.aluno_nome,
        aluno_email: this.formData.aluno_email,
        aluno_telefone: this.formData.aluno_telefone,
        aluno_CPF: this.formData.aluno_CPF,
        aluno_nascimento: this.formData.aluno_nascimento,
        aluno_CEP: this.formData.aluno_CEP,
        documento_number: this.formData.documento_number,
      }; 
      try{
      const response = await fetch('http://localhost:3001/alunos', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        const documentoData = {
          documento_desc: this.formData.documento_desc,
          documento_image: this.formData.documento_image,
        }

        const responseDocument = await fetch("http://localhost:3001/documento", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}` 
          },
        body: JSON.stringify(documentoData) 
        })

        if(responseDocument.ok) {
          const curso_id = this.curso.id
          
          const dataMatricula = {
            curso_id: curso_id
          };
          
          await fetch("http://localhost:3001/matricula", {
          method: "POST",
          headers: {
          "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}` 
          },
          body: JSON.stringify(dataMatricula)
        })
        alert('matricula OK, pode conferir');
        }
      }
    }catch(err){
      console.log(err)
    }
    },
  },
};
</script>

<style>
  .matricula-page {
    padding: 20px;
    max-width: 600px;
    margin: auto;
  }

  h2, h3 {
    text-align: center;
  }

  .form-group {
    margin-bottom: 15px;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
  }

  .form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  #buttonSubmit {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .buttonSubmit:hover {
    background-color: #218838;
  }

</style>
