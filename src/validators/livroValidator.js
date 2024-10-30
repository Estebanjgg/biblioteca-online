export const validarLivro = (livro) => {
  let temp = {};
  temp.titulo = livro.titulo ? '' : 'O título é obrigatório.';
  temp.autor = livro.autor ? '' : 'O autor é obrigatório.';
  temp.categoria = livro.categoria ? '' : 'A categoria é obrigatória.';
  temp.dataPublicacao = livro.dataPublicacao ? '' : 'A data de publicação é obrigatória.';
  temp.quantidade =
    livro.quantidade && parseInt(livro.quantidade) > 0 ? '' : 'A quantidade deve ser maior que 0.';
  temp.purchasePrice =
    livro.purchasePrice && parseFloat(livro.purchasePrice) >= 0
      ? ''
      : 'O preço de compra deve ser maior ou igual a 0.';
  temp.rentalPrice =
    livro.rentalPrice && parseFloat(livro.rentalPrice) >= 0
      ? ''
      : 'O preço de aluguel deve ser maior ou igual a 0.';
  return temp;
};
