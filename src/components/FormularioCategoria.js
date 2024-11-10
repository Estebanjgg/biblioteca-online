// src/components/FormularioCategoria.js

import React, { useState, useEffect } from 'react';
import { TextField, Button, Alert } from '@mui/material';
import { validarCategoria } from '../validators/categoriaValidator'; // Certifique-se de ter este arquivo

function FormularioCategoria({ salvarCategoria, categoriaEdit }) {
  const [categoria, setCategoria] = useState({
    nome: '',
    descricao: '',
  });

  const [erros, setErros] = useState({});
  const [alerta, setAlerta] = useState('');

  useEffect(() => {
    if (categoriaEdit) {
      setCategoria({
        nome: categoriaEdit.nome || '',
        descricao: categoriaEdit.descricao || '',
      });
    } else {
      setCategoria({
        nome: '',
        descricao: '',
      });
    }
  }, [categoriaEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErros = validarCategoria(categoria);
    setErros(tempErros);
    if (Object.values(tempErros).every((x) => x === '')) {
      salvarCategoria(categoriaEdit ? { ...categoriaEdit, ...categoria } : categoria);
      setCategoria({
        nome: '',
        descricao: '',
      });
      setAlerta('');
    } else {
      setAlerta('Por favor, corrija os erros acima.');
    }
  };

  const handleChange = (e) => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
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
        error={!!erros.descricao}
        helperText={erros.descricao}
      />
      {alerta && <Alert severity="error">{alerta}</Alert>}
      <Button type="submit" variant="contained" color="primary">
        Salvar
      </Button>
    </form>
  );
}

export default FormularioCategoria;
