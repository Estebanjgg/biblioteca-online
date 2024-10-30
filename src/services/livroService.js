
export const getLivros = () => {
  return JSON.parse(localStorage.getItem('livros')) || [];
};
