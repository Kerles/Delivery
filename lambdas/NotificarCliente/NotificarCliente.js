const ses = new AWS.SES({ region: 'us-east-1' });

exports.notificarCliente = async (event, context) => {
  const { pedido } = event;

  const emailParams = {
    Source: 'onlyfood@outlook.com', //  O  e-mail verificado no AWS SES
    Destination: {
      ToAddresses: [pedido.Cliente.Email], // E-mail do cliente
    },
    Message: {
      Subject: {
        Data: `Atualização do Pedido ${pedido.Id}`,
        Charset: 'UTF-8',
      },
      Body: {
        Text: {
          Data: `Olá,\n\nSeu pedido ${pedido.Id} foi recebido e está sendo processado.\n\nObrigado!`,
          Charset: 'UTF-8',
        },
      },
    },
  };

  try {
    await ses.sendEmail(emailParams).promise();
    console.log(`Notificação enviada para o cliente: ${pedido.Cliente.Email}`);
  } catch (error) {
    console.error(`Erro ao enviar notificação para o cliente: ${error.message}`);
    throw new Error('Falha ao notificar o cliente.');
  }
};
