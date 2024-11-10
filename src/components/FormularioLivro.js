// src/components/FormularioLivro.js

import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Alert } from '@mui/material';
import { getAutores } from '../services/autorService';
import { getCategorias } from '../services/categoriaService';
import { validarLivro } from '../validators/livroValidator';

function FormularioLivro({ salvarLivro, livroEdit }) {
  const [livro, setLivro] = useState({
    titulo: '',
    autor: '',
    categoria: '',
    dataPublicacao: '',
    quantidade: '',
    purchasePrice: '',
    rentalPrice: '',
  });

  const [erros, setErros] = useState({});
  const [alerta, setAlerta] = useState('');
  const [autores, setAutores] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Carregar autores e categorias ao montar o componente
    const autoresData = getAutores();
    setAutores(autoresData);

    const categoriasData = getCategorias();
    setCategorias(categoriasData);

    // Se for edição, preencher o formulário com os dados do livro
    if (livroEdit) {
      setLivro({
        titulo: livroEdit.titulo || '',
        autor: livroEdit.autor || '',
        categoria: livroEdit.categoria || '',
        dataPublicacao: livroEdit.dataPublicacao || '',
        quantidade: livroEdit.quantidade || '',
        purchasePrice: livroEdit.purchasePrice || '',
        rentalPrice: livroEdit.rentalPrice || '',
      });
    } else {
      setLivro({
        titulo: '',
        autor: '',
        categoria: '',
        dataPublicacao: '',
        quantidade: '',
        purchasePrice: '',
        rentalPrice: '',
      });
    }
  }, [livroEdit]);

  const handleChange = (e) => {
    setLivro({ ...livro, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErros = validarLivro(livro);
    setErros(tempErros);
    if (Object.values(tempErros).every((x) => x === '')) {
      // Converter campos numéricos
      const livroParaSalvar = {
        ...livro,
        quantidade: parseInt(livro.quantidade),
        purchasePrice: parseFloat(livro.purchasePrice),
        rentalPrice: parseFloat(livro.rentalPrice),
      };
      salvarLivro(livroEdit ? { ...livroEdit, ...livroParaSalvar } : livroParaSalvar);
      setLivro({
        titulo: '',
        autor: '',
        categoria: '',
        dataPublicacao: '',
        quantidade: '',
        purchasePrice: '',
        rentalPrice: '',
      });
      setAlerta('');
    } else {
      setAlerta('Por favor, corrija os erros acima.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {alerta && <Alert severity="error" sx={{ mb: 2 }}>{alerta}</Alert>}
      <TextField
        name="titulo"
        label="Título"
        value={livro.titulo}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!erros.titulo}
        helperText={erros.titulo}
      />
      <TextField
        select
        name="autor"
        label="Autor"
        value={livro.autor}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!erros.autor}
        helperText={erros.autor}
      >
        {autores.map((autor) => (
          <MenuItem key={autor.id} value={autor.nome}>
            {autor.nome}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        name="categoria"
        label="Categoria"
        value={livro.categoria}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!erros.categoria}
        helperText={erros.categoria}
      >
        {categorias.map((categoria) => (
          <MenuItem key={categoria.id} value={categoria.nome}>
            {categoria.nome}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        name="dataPublicacao"
        label="Data de Publicação"
        type="date"
        value={livro.dataPublicacao}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        error={!!erros.dataPublicacao}
        helperText={erros.dataPublicacao}
      />
      <TextField
        name="quantidade"
        label="Quantidade"
        type="number"
        value={livro.quantidade}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!erros.quantidade}
        helperText={erros.quantidade}
        InputProps={{ inputProps: { min: 1 } }}
      />
      <TextField
        name="purchasePrice"
        label="Preço de Compra"
        type="number"
        value={livro.purchasePrice}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!erros.purchasePrice}
        helperText={erros.purchasePrice}
        InputProps={{ inputProps: { min: 0, step: 0.01 } }}
      />
      <TextField
        name="rentalPrice"
        label="Preço de Aluguel"
        type="number"
        value={livro.rentalPrice}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!erros.rentalPrice}
        helperText={erros.rentalPrice}
        InputProps={{ inputProps: { min: 0, step: 0.01 } }}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Salvar
      </Button>
    </form>
  );
}

export default FormularioLivro;
