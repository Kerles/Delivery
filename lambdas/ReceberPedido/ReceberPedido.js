exports.receberPedido = async (event, context) => {
  const { pedido } = event;

  // Lógica para receber o pedido
  console.log(`Pedido recebido: ${pedido.Id}`);

  // Validação do pedido
  if (!pedido.Id || !pedido.Itens || pedido.Itens.length === 0) {
    throw new Error('Pedido inválido: ID ou itens ausentes.');
  }

  const AWS = require('aws-sdk');
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  // Armazena no DynamoDB
  const params = {
    TableName: 'Pedidos',
    Item: {
      Id: pedido.Id,
      Itens: pedido.Itens,
      Status: 'Recebido',
      DataRecebimento: new Date().toISOString(),
    },
  };

  try {
    await dynamoDB.put(params).promise();
    console.log(`Pedido ${pedido.Id} foi armazenado com sucesso.`);
  } catch (error) {
    console.error(`Erro ao armazenar o pedido: ${error.message}`);
    throw new Error('Erro ao processar o pedido.');
  }
};
