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
import ListaEmprestimos from '../components/ListaEmprestimos';
import FormularioEmprestimo from '../components/FormularioEmprestimo';

function Emprestimos() {
  const [emprestimos, setEmprestimos] = useState([]);
  const [open, setOpen] = useState(false);
  const [emprestimoEdit, setEmprestimoEdit] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('emprestimos')) || [];
    setEmprestimos(data);
  }, []);

  const salvarEmprestimo = (emprestimo) => {
    let data = [...emprestimos];
    if (emprestimo.id) {
      data = data.map((item) => (item.id === emprestimo.id ? emprestimo : item));
    } else {
      emprestimo.id = Date.now();      
      emprestimo.devuelto = emprestimo.tipo === 'purchase' ? true : false;
      emprestimo.dataDevolucaoUsuario = emprestimo.tipo === 'purchase' ? emprestimo.dataEmprestimo : '';
      emprestimo.fineApplied = false;
      data.push(emprestimo);
    }
    setEmprestimos(data);
    localStorage.setItem('emprestimos', JSON.stringify(data));
    setOpen(false);
    setEmprestimoEdit(null);
  };

  const editarEmprestimo = (emprestimo) => {
    setEmprestimoEdit(emprestimo);
    setOpen(true);
  };

  const excluirEmprestimo = (id) => {
    const data = emprestimos.filter((emprestimo) => emprestimo.id !== id);
    setEmprestimos(data);
    localStorage.setItem('emprestimos', JSON.stringify(data));
  };

  const marcarComoDevuelto = (id) => {
    const data = emprestimos.map((emprestimo) => {
      if (emprestimo.id === id) {
        const dataDevolucaoUsuario = new Date().toISOString().split('T')[0]; // Data atual no formato 'YYYY-MM-DD'

        let updatedPrice = emprestimo.price;
        let fineApplied = false;

        if (emprestimo.tipo === 'rental') {
          const dataDevolucao = new Date(emprestimo.dataDevolucao);
          const dataDevolucaoUsuarioDate = new Date(dataDevolucaoUsuario);

          if (dataDevolucaoUsuarioDate > dataDevolucao) {            
            const fine = emprestimo.price * 0.05;
            updatedPrice += fine;
            fineApplied = true;
          }
        }

        return {
          ...emprestimo,
          devuelto: true,
          dataDevolucaoUsuario,
          price: updatedPrice,
          fineApplied,
        };
      }
      return emprestimo;
    });
    setEmprestimos(data);
    localStorage.setItem('emprestimos', JSON.stringify(data));
  };

  const handleClickOpen = () => {
    setOpen(true);
    setEmprestimoEdit(null);
  };

  const handleClose = () => {
    setOpen(false);
    setEmprestimoEdit(null);
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
        Lista de Empréstimos e Vendas
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
          Novo Empréstimo
        </Button>
      </Box>
      <Box mb={2} display="flex" justifyContent="center">
        <ListaEmprestimos
          emprestimos={emprestimos}
          editarEmprestimo={editarEmprestimo}
          excluirEmprestimo={excluirEmprestimo}
          marcarComoDevuelto={marcarComoDevuelto}
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
          {emprestimoEdit ? 'Editar Empréstimo' : 'Novo Empréstimo'}
        </DialogTitle>
        <DialogContent>
          <FormularioEmprestimo
            salvarEmprestimo={salvarEmprestimo}
            emprestimoEdit={emprestimoEdit}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default Emprestimos;
