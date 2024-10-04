exports.validarPedido = async (event, context) => {
  const { pedido } = event;

  // Validação do pedido
  if (!pedido || !pedido.Id || !pedido.Itens || pedido.Itens.length === 0) {
    console.error(`Pedido inválido: ${JSON.stringify(pedido)}`);
    return false;
  }

  const itensValidos = pedido.Itens.every(item => 
    item.Id && item.Preco > 0 && item.Quantidade > 0
  );

  if (!itensValidos) {
    console.error(`Itens do pedido ${pedido.Id} são inválidos.`);
    return false;
  }

  console.log(`Pedido ${pedido.Id} validado: true`);
  return true;
};
