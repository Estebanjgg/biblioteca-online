// src/components/PagamentoModal.js
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Typography,
} from '@mui/material';

function PagamentoModal({ open, onClose, emprestimo, finalizarPagamento }) {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amountGiven, setAmountGiven] = useState('');
  const [change, setChange] = useState(0);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [price, setPrice] = useState(emprestimo ? parseFloat(emprestimo.price) : 0);

  useEffect(() => {
    setPaymentMethod('');
    setAmountGiven('');
    setChange(0);
    setStep(1);
    setError('');

    if (emprestimo) {
      let finalPrice = parseFloat(emprestimo.price);
      // Verificar se deve aplicar multa por atraso
      if (emprestimo.tipo === 'rental' && !emprestimo.fineApplied) {
        const dataDevolucao = new Date(emprestimo.dataDevolucao);
        const dataDevolucaoUsuarioDate = new Date();

        if (dataDevolucaoUsuarioDate > dataDevolucao) {
          const fine = finalPrice * 0.05;
          finalPrice += fine;
          emprestimo.fineApplied = true;
        }
      }
      setPrice(finalPrice);
    }
  }, [emprestimo]);

  const handlePaymentMethodSelect = (e) => {
    setPaymentMethod(e.target.value);
    if (e.target.value === 'card') {
      setStep(3);
    } else {
      setStep(2);
    }
  };

  const handleAmountGiven = (e) => {
    setAmountGiven(e.target.value);
  };

  const handleProcessPayment = () => {
    const amount = parseFloat(amountGiven);
    const totalPrice = price;

    if (amount < totalPrice) {
      setError('O valor entregue é menor que o total a pagar.');
      return;
    }

    const changeAmount = amount - totalPrice;
    setChange(changeAmount);
    setError('');
    setStep(3);
  };

  const handleFinish = () => {
    const dataDevolucaoUsuario = new Date().toISOString().split('T')[0];
    let updatedEmprestimo = {
      ...emprestimo,
      devuelto: true,
      dataDevolucaoUsuario,
      paymentMethod: paymentMethod,
      price: price,
    };
    finalizarPagamento(updatedEmprestimo);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Processar Pagamento</DialogTitle>
      <DialogContent>
        {step === 1 && (
          <FormControl component="fieldset">
            <FormLabel component="legend">Meio de Pagamento</FormLabel>
            <RadioGroup
              name="paymentMethod"
              value={paymentMethod}
              onChange={handlePaymentMethodSelect}
            >
              <FormControlLabel value="cash" control={<Radio />} label="Dinheiro" />
              <FormControlLabel value="card" control={<Radio />} label="Cartão" />
            </RadioGroup>
          </FormControl>
        )}
        {step === 2 && (
          <>
            <Typography>Valor a pagar: {price.toFixed(2)}</Typography>
            <TextField
              label="Valor entregue pelo cliente"
              type="number"
              value={amountGiven}
              onChange={handleAmountGiven}
              fullWidth
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button variant="contained" color="primary" onClick={handleProcessPayment}>
              Processar Pagamento
            </Button>
          </>
        )}
        {step === 3 && (
          <>
            <Typography>Pagamento realizado com sucesso!</Typography>
            <Typography>
              Meio de Pagamento: {paymentMethod === 'cash' ? 'Dinheiro' : 'Cartão'}
            </Typography>
            {paymentMethod === 'cash' && (
              <>
                <Typography>Valor pago: {parseFloat(amountGiven).toFixed(2)}</Typography>
                <Typography>Troco: {change.toFixed(2)}</Typography>
              </>
            )}
            <Button variant="contained" color="primary" onClick={handleFinish}>
              Finalizar
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default PagamentoModal;
