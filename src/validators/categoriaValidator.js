// src/validators/categoriaValidator.js

export const validarCategoria = (categoria) => {
  let temp = {};
  temp.nome = categoria.nome ? '' : 'O nome é obrigatório.';
  return temp;
};
