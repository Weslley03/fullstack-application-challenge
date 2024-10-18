/**
 * @param {string} cep
 * @return {boolean} searchResultOk
 */
export async function cepValidate(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    return !data.erro;
  }
  return false;
};

/**
 * @param {Object} formData
 * @param {string} formData.aluno_nome 
 * @param {string} formData.aluno_email
 * @param {string} formData.aluno_telefone 
 * @param {string} formData.aluno_CPF
 * @param {string} formData.aluno_nascimento 
 * @param {string} formData.aluno_CEP 
 * @param {string} formData.documento_number
 *
 * @returns {Promise<string>} JWT do usuário.
 */
export async function userCreate(formData) {
  const userData = {
    aluno_nome: formData.aluno_nome,
    aluno_email: formData.aluno_email,
    aluno_telefone: formData.aluno_telefone,
    aluno_CPF: formData.aluno_CPF,
    aluno_nascimento: formData.aluno_nascimento,
    aluno_CEP: formData.aluno_CEP,
    documento_number: formData.documento_number,
  }; 

  const response = await fetch('http://localhost:3001/alunos', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  if(response.ok) {
    const data = await response.json();
    const token = data.token;
    return token;
  } else {
    throw new Error('failed to create user or token not found');
  };
};

/**
 * @param {Object} formData
 * @param {string} formData.documento_desc 
 * @param {string} formData.documento_image
 * @param {string} user_token JWT do usuário.
 *
 */
export async function documentUserCreate(formData, user_token) {
  const documentoData = {
    documento_desc: formData.documento_desc,
    documento_image: formData.documento_image,
  }

  const response = await fetch("http://localhost:3001/documento", {
  method: "POST", 
  headers: {
    "Content-Type": "application/json", 
      "Authorization": `Bearer ${user_token}` 
    },
  body: JSON.stringify(documentoData) 
  });

  if(!response.ok) throw new Error('failed to register document student.');    
};

/**
 * 
 * @param {string} curso_id 
 * @param {string} userToken JWT do usuário.
 */
export async function matriculaCreate(curso_id, user_token) {
  const dataMatricula = {
    curso_id: curso_id,
  };

  const response = await fetch("http://localhost:3001/matricula", {
    method: "POST",
    headers: {
    "Content-Type": "application/json", 
      "Authorization": `Bearer ${user_token}` 
    },
    body: JSON.stringify(dataMatricula)
  });

  if(!response.ok) throw new Error('failed to enrolled in the course.');
};