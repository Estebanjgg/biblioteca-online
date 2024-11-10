// src/pages/Emprestimos.js

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
import PagamentoModal from '../components/PagamentoModal';

function Emprestimos() {
  const [emprestimos, setEmprestimos] = useState([]);
  const [open, setOpen] = useState(false);
  const [emprestimoEdit, setEmprestimoEdit] = useState(null);

  const [openPagamento, setOpenPagamento] = useState(false);
  const [emprestimoParaPagamento, setEmprestimoParaPagamento] = useState(null);

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
    const emprestimo = emprestimos.find((e) => e.id === id);
    setEmprestimoParaPagamento(emprestimo);
    setOpenPagamento(true);
  };

  const finalizarPagamento = (updatedEmprestimo) => {
    const data = emprestimos.map((emprestimo) => {
      if (emprestimo.id === updatedEmprestimo.id) {
        return updatedEmprestimo;
      }
      return emprestimo;
    });
    setEmprestimos(data);
    localStorage.setItem('emprestimos', JSON.stringify(data));
    setOpenPagamento(false);
    setEmprestimoParaPagamento(null);
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
        maxWidth: '90%', // Ajuste conforme necessário
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
      <Box
        mb={2}
        display="flex"
        justifyContent="center"
        sx={{
          maxHeight: '500px', // Define a altura máxima da lista de empréstimos
          overflowY: 'auto',   // Habilita a rolagem vertical quando necessário
          width: '100%',       // Garante que a tabela ocupe toda a largura disponível
        }}
      >
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
      <PagamentoModal
        open={openPagamento}
        onClose={() => setOpenPagamento(false)}
        emprestimo={emprestimoParaPagamento}
        finalizarPagamento={finalizarPagamento}
      />
    </Container>
  );
}

export default Emprestimos;
