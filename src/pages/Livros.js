import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
} from '@mui/material';
import ListaLivros from '../components/ListaLivros';
import FormularioLivro from '../components/FormularioLivro';

function Livros() {
  const [livros, setLivros] = useState([]);
  const [emprestimos, setEmprestimos] = useState([]);
  const [open, setOpen] = useState(false);
  const [livroEdit, setLivroEdit] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('livros')) || [];
    setLivros(data);

    const emprestimosData = JSON.parse(localStorage.getItem('emprestimos')) || [];
    setEmprestimos(emprestimosData);
  }, []);

  const salvarLivro = (livro) => {
    let data = [...livros];
    if (livro.id) {
      data = data.map((item) => (item.id === livro.id ? livro : item));
    } else {
      livro.id = Date.now();
      data.push(livro);
    }
    setLivros(data);
    localStorage.setItem('livros', JSON.stringify(data));
    setOpen(false);
    setLivroEdit(null);
  };

  const editarLivro = (livro) => {
    setLivroEdit(livro);
    setOpen(true);
  };

  const excluirLivro = (id) => {
    const data = livros.filter((livro) => livro.id !== id);
    setLivros(data);
    localStorage.setItem('livros', JSON.stringify(data));
  };

  const handleClickOpen = () => {
    setOpen(true);
    setLivroEdit(null);
  };

  const handleClose = () => {
    setOpen(false);
    setLivroEdit(null);
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
        Catálogo de Livros
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
          Adicionar Novo Livro
        </Button>
      </Box>
      <Box mb={2} display="flex" justifyContent="center">
        <ListaLivros
          livros={livros}
          editarLivro={editarLivro}
          excluirLivro={excluirLivro}
          emprestimos={emprestimos}
        />
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
          {livroEdit ? 'Editar Livro' : 'Novo Livro'}
        </DialogTitle>
        <DialogContent>
          <FormularioLivro salvarLivro={salvarLivro} livroEdit={livroEdit} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}
export default Livros;
