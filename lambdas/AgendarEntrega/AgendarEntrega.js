const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const checarEntregador = async () => {
  // Faz a Simulação da verificação de quantos entregadores então disponíveis
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000); // Simula que tem algum entregador disponível
  });
};

exports.agendarEntrega = async (event, context) => {
  const { pedido } = event;

  // Lógica para Planejar a entrega do pedido
  console.log(`Planejando a entrega do pedido ${pedido.Id}.`);

  // Verificar a disponibilidade dos entregadores
  const entregadorDisponivel = await checarEntregador();
  if (!entregadorDisponivel) {
    console.error(`Nenhum entregador disponível para esse pedido ${pedido.Id}.`);
    throw new Error('Nenhum entregador disponível no momento.');
  }

  //  Faz a Simulação do agendamento da entrega
  const dataEntrega = new Date();
  dataEntrega.setHours(dataEntrega.getHours() + 2); // Agendar entrega para 2 horas a partir de agora

  // Atualizar o status do pedido no banco de dados
  const params = {
    TableName: 'Pedidos', // Nome da tabela no DynamoDB
    Key: { Id: pedido.Id },
    UpdateExpression: 'set Status = :status, DataEntrega = :dataEntrega',
    ExpressionAttributeValues: {
      ':status': 'Entregador Atribuído',
      ':dataEntrega': dataEntrega.toISOString(),
    },
  };

  try {
    await dynamoDB.update(params).promise();
    console.log(`Entrega agendada para o pedido ${pedido.Id} na data ${dataEntrega.toISOString()}.`);
  } catch (error) {
    console.error(`Erro ao atualizar o status do pedido ${pedido.Id}: ${error.message}`);
    throw new Error('Falha ao agendar a entrega.');
  }
};
