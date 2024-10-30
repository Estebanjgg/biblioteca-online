import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

function Dashboard() {
  const [livros, setLivros] = useState([]);
  const [emprestimos, setEmprestimos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const livrosData = JSON.parse(localStorage.getItem('livros')) || [];
    const emprestimosData = JSON.parse(localStorage.getItem('emprestimos')) || [];
    const categoriasData = JSON.parse(localStorage.getItem('categorias')) || [];

    setLivros(livrosData);
    setEmprestimos(emprestimosData);
    setCategorias(categoriasData);
  }, []);

  // Calcular métricas
  const totalLivros = livros.reduce((total, livro) => total + livro.quantidade, 0);
  const livrosComprados = emprestimos.filter((emprestimo) => emprestimo.tipo === 'purchase').length;

  // Contagem de empréstimos por dia e mês
  const emprestimosPorDia = emprestimos.reduce((acc, emprestimo) => {
    const data = new Date(emprestimo.dataEmprestimo).toLocaleDateString();
    acc[data] = (acc[data] || 0) + 1;
    return acc;
  }, {});

  const emprestimosPorMes = emprestimos.reduce((acc, emprestimo) => {
    const data = new Date(emprestimo.dataEmprestimo);
    const mes = `${data.getMonth() + 1}-${data.getFullYear()}`;
    acc[mes] = (acc[mes] || 0) + 1;
    return acc;
  }, {});

  // Livro mais emprestado
  const livroEmprestadoContador = emprestimos.reduce((acc, emprestimo) => {
    acc[emprestimo.livroTitulo] = (acc[emprestimo.livroTitulo] || 0) + 1;
    return acc;
  }, {});

  const livroMaisEmprestado = Object.keys(livroEmprestadoContador).reduce((a, b) =>
    livroEmprestadoContador[a] > livroEmprestadoContador[b] ? a : b, '');

  // Preparar dados para gráfico de empréstimos por mês
  const dataGraficoMes = Object.keys(emprestimosPorMes).map((mes) => ({
    name: mes,
    emprestimos: emprestimosPorMes[mes],
  }));

  // Dados para gráfico de categorias
  const dataGraficoCategorias = categorias.map((categoria) => ({
    name: categoria.nome,
    count: livros.filter((livro) => livro.categoria === categoria.nome).length,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Container sx={{ marginTop: '30px' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Dashboard da Biblioteca
      </Typography>

      <Grid container spacing={4}>
        {/* Métricas de Empréstimos */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Empréstimos por Dia
            </Typography>
            <List>
              {Object.keys(emprestimosPorDia).map((data) => (
                <ListItem key={data} sx={{ justifyContent: 'center' }}>
                  <ListItemText primary={`${data}: ${emprestimosPorDia[data]} empréstimo(s)`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Livro Mais Emprestado
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#4caf50', mt: 2 }}>
              {livroMaisEmprestado || 'Nenhum'}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Livros Comprados
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#ff5722', mt: 2 }}>
              {livrosComprados} livro(s)
            </Typography>
          </Paper>
        </Grid>

        {/* Gráfico: Empréstimos por Mês */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Empréstimos por Mês
            </Typography>
            <BarChart width={400} height={300} data={dataGraficoMes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="emprestimos" fill="#8884d8" />
            </BarChart>
          </Paper>
        </Grid>

        {/* Gráfico: Distribuição de Categorias */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Distribuição de Categorias
            </Typography>
            <PieChart width={400} height={300}>
              <Pie
                data={dataGraficoCategorias}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
              >
                {dataGraficoCategorias.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Paper>
        </Grid>
      </Grid> 
    </Container>
  );
}

export default Dashboard;  