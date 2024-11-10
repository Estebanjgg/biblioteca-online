// src/components/FormularioAutor.js

import React, { useState, useEffect } from 'react';
import { TextField, Button, Alert } from '@mui/material';
import { validarAutor } from '../validators/autorValidator'; // Certifique-se de ter este arquivo

function FormularioAutor({ salvarAutor, autorEdit }) {
  const [autor, setAutor] = useState({
    nome: '',
    nacionalidade: '',
  });

  const [erros, setErros] = useState({});
  const [alerta, setAlerta] = useState('');

  useEffect(() => {
    if (autorEdit) {
      setAutor({
        nome: autorEdit.nome || '',
        nacionalidade: autorEdit.nacionalidade || '',
      });
    } else {
      setAutor({
        nome: '',
        nacionalidade: '',
      });
    }
  }, [autorEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErros = validarAutor(autor);
    setErros(tempErros);
    if (Object.values(tempErros).every((x) => x === '')) {
      salvarAutor(autorEdit ? { ...autorEdit, ...autor } : autor);
      setAutor({
        nome: '',
        nacionalidade: '',
      });
      setAlerta('');
    } else {
      setAlerta('Por favor, corrija os erros acima.');
    }
  };

  const handleChange = (e) => {
    setAutor({ ...autor, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="nome"
        label="Nome"
        value={autor.nome}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!erros.nome}
        helperText={erros.nome}
      />
      <TextField
        name="nacionalidade"
        label="Nacionalidade"
        value={autor.nacionalidade}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!erros.nacionalidade}
        helperText={erros.nacionalidade}
      />
      {alerta && <Alert severity="error">{alerta}</Alert>}
      <Button type="submit" variant="contained" color="primary">
        Salvar
      </Button>
    </form>
  );
}

export default FormularioAutor;
