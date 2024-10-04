const realizarPagamento = async (pedido) => {
  // Faz a Simulação do processo de pagamento
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 2000); // Simula que o pagamento foi bem-sucedido
  });
};

exports.processarPagamento = async (event, context) => {
  const { pedido } = event;

  try {
    const pagSucesso = await realizarPagamento(pedido);
    console.log(`Pagamento do pedido ${pedido.Id} foi processado com Sucesso: ${pagSucesso}`);
    return pagSucesso;
  } catch (error) {
    console.error(`Erro ao processar o pagamento do pedido ${pedido.Id}: ${error.message}`);
    return false;
  }
};
