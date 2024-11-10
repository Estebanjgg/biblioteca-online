// src/validators/categoriaValidator.js

export const validarCategoria = (categoria) => {
  const erros = {};

  if (!categoria.nome || categoria.nome.trim() === '') {
    erros.nome = 'O nome é obrigatório.';
  }

  if (!categoria.descricao || categoria.descricao.trim() === '') {
    erros.descricao = 'A descrição é obrigatória.';
  }

  return erros;
};
