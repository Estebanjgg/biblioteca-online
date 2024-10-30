import validator from 'validator';
import { getUsuarios } from '../services/usuarioService';

export const validarUsuario = (usuario) => {
  let temp = {};
  const usuarios = getUsuarios();
  
  temp.nome = usuario.nome ? '' : 'O nome é obrigatório.';
  temp.email = validator.isEmail(usuario.email) ? '' : 'Email inválido.';
  temp.telefone = usuario.telefone.trim() !== '' ? '' : 'O telefone é obrigatório.';


  if (usuarios.some(u => u.nome === usuario.nome && u.id !== usuario.id)) {
    temp.nome = 'O nome já está registrado.';
  }
  if (usuarios.some(u => u.email === usuario.email && u.id !== usuario.id)) {
    temp.email = 'O email já está registrado.';
  }
  if (usuarios.some(u => u.telefone === usuario.telefone && u.id !== usuario.id)) {
    temp.telefone = 'O telefone já está registrado.';
  }

  return temp;
};
