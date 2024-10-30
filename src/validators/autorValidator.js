// src/validators/autorValidator.js

export const validarAutor = (autor) => {
  let temp = {};
  temp.nome = autor.nome ? '' : 'O nome é obrigatório.';
  return temp;
};
