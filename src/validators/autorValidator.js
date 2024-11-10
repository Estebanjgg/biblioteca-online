// src/validators/autorValidator.js

export const validarAutor = (autor) => {
  const erros = {};

  if (!autor.nome || autor.nome.trim() === '') {
    erros.nome = 'O nome é obrigatório.';
  }

  if (!autor.nacionalidade || autor.nacionalidade.trim() === '') {
    erros.nacionalidade = 'A nacionalidade é obrigatória.';
  }

  return erros;
};
