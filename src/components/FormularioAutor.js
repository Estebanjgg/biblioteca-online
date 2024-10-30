// src/components/FormularioAutor.js

import React, { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete } from '@mui/material';
import { validarAutor } from '../validators/autorValidator';
import { paises } from '../services/paisesService'; // Importa a lista de países

function FormularioAutor({ salvarAutor, autorEdit }) {
  const [autor, setAutor] = useState({
    nome: '',
    nacionalidade: '',
  });

  const [erros, setErros] = useState({});

  useEffect(() => {
    if (autorEdit) {
      setAutor(autorEdit);
    }
  }, [autorEdit]);

  const handleChange = (e) => {
    setAutor({ ...autor, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempErros = validarAutor(autor);
    setErros(tempErros);
    if (Object.values(tempErros).every((x) => x === '')) {
      salvarAutor(autor);
      setAutor({
        nome: '',
        nacionalidade: '',
      });
    }
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
      <Autocomplete
        options={paises}
        getOptionLabel={(option) => option}
        value={autor.nacionalidade}
        onChange={(event, newValue) => {
          setAutor({ ...autor, nacionalidade: newValue || '' });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Nacionalidade"
            margin="normal"
            fullWidth
          />
        )}
      />
      <Button type="submit" variant="contained" color="primary">
        Salvar
      </Button>
    </form>
  );
}

export default FormularioAutor;
