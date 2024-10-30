// src/components/FormularioCategoria.js

import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { validarCategoria } from '../validators/categoriaValidator';

function FormularioCategoria({ salvarCategoria, categoriaEdit }) {
  const [categoria, setCategoria] = useState({
    nome: '',
    descricao: '',
  });

  const [erros, setErros] = useState({});

  useEffect(() => {
    if (categoriaEdit) {
      setCategoria(categoriaEdit);
    }
  }, [categoriaEdit]);

  const handleChange = (e) => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErros = validarCategoria(categoria);
    setErros(tempErros);
    if (Object.values(tempErros).every((x) => x === '')) {
      salvarCategoria(categoria);
      setCategoria({
        nome: '',
        descricao: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="nome"
        label="Nome"
        value={categoria.nome}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!erros.nome}
        helperText={erros.nome}
      />
      <TextField
        name="descricao"
        label="Descrição"
        value={categoria.descricao}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Salvar
      </Button>
    </form>
  );
}

export default FormularioCategoria;
