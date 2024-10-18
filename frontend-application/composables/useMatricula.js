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

