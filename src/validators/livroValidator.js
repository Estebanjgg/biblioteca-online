// src/validators/livroValidator.js

export const validarLivro = (livro) => {
  const erros = {};

  if (!livro.titulo || livro.titulo.trim() === '') {
    erros.titulo = 'O título é obrigatório.';
  }

  if (!livro.autor || livro.autor.trim() === '') {
    erros.autor = 'O autor é obrigatório.';
  }

  if (!livro.categoria || livro.categoria.trim() === '') {
    erros.categoria = 'A categoria é obrigatória.';
  }

  if (!livro.dataPublicacao) {
    erros.dataPublicacao = 'A data de publicação é obrigatória.';
  }

  if (!livro.quantidade || livro.quantidade < 1) {
    erros.quantidade = 'A quantidade deve ser pelo menos 1.';
  }

  if (!livro.purchasePrice || livro.purchasePrice < 0) {
    erros.purchasePrice = 'O preço de compra deve ser igual ou superior a 0.';
  }

  if (!livro.rentalPrice || livro.rentalPrice < 0) {
    erros.rentalPrice = 'O preço de aluguel deve ser igual ou superior a 0.';
  }

  return erros;
};
