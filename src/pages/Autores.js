import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
} from '@mui/material';
import ListaAutores from '../components/ListaAutores';
import FormularioAutor from '../components/FormularioAutor';

function Autores() {
  const [autores, setAutores] = useState([]);
  const [open, setOpen] = useState(false);
  const [autorEdit, setAutorEdit] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('autores')) || [];
    setAutores(data);
  }, []);

  const salvarAutor = (autor) => {
    let data = [...autores];
    if (autor.id) {
      data = data.map((item) => (item.id === autor.id ? autor : item));
    } else {
      autor.id = Date.now();
      data.push(autor);
    }
    setAutores(data);
    localStorage.setItem('autores', JSON.stringify(data));
    setOpen(false);
    setAutorEdit(null);
  };

  const editarAutor = (autor) => {
    setAutorEdit(autor);
    setOpen(true);
  };

  const excluirAutor = (id) => {
    const data = autores.filter((autor) => autor.id !== id);
    setAutores(data);
    localStorage.setItem('autores', JSON.stringify(data));
  };

  const handleClickOpen = () => {
    setOpen(true);
    setAutorEdit(null);
  };

  const handleClose = () => {
    setOpen(false);
    setAutorEdit(null);
  };

  return (
    <Container
      sx={{
        backgroundColor: '#f7f9fc',
        borderRadius: 2,
        padding: 3,
        mt: 4,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: 'bold', color: '#3a3a3a' }}
      >
        Lista de Autores
      </Typography>
      <Box display="flex" justifyContent="center" mb={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          sx={{
            fontWeight: 'bold',
            backgroundColor: '#4caf50',
            '&:hover': { backgroundColor: '#388e3c' },
          }}
        >
          Novo Autor
        </Button>
      </Box>
      <Box mb={2} display="flex" justifyContent="center">
        <ListaAutores autores={autores} editarAutor={editarAutor} excluirAutor={excluirAutor} />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 3,
            boxShadow: 5,
          },
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          {autorEdit ? 'Editar Autor' : 'Novo Autor'}
        </DialogTitle>
        <DialogContent>
          <FormularioAutor salvarAutor={salvarAutor} autorEdit={autorEdit} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default Autores;
