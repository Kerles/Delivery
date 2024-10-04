# Implementação de um Assistente de Delivery com AWS Step Functions e Bedrock

Este repositório contém a implementação de um Assistente de Delivery utilizando AWS Step Functions e Bedrock, com funções escritas em Node.js.

### Descrição das Pastas

- **/lambdas**: Contém subpastas, cada uma representando uma função Lambda escrita em Node.js. Cada subpasta contém o código da função que será invocada pela máquina de estado do Step Functions.
  - **/receberPedido**: Contém a função `receberPedido.js`, responsável por receber o pedido do cliente.
  - **/validarPedido**: Contém a função `validarPedido.js`, que valida as informações do pedido.
  - **/processarPagamento**: Contém a função `processarPagamento.js`, que processa o pagamento do pedido.
  - **/notificarCliente**: Contém a função `notificarCliente.js`, que notifica o cliente sobre o status do pedido.
  - **/agendarEntrega**: Contém a função `agendarEntrega.js`, que agenda a entrega do pedido.

- **/Step Functions**: Contém a definição da máquina de estado em formato YAML e um gráfico visual da máquina de estado em formato PNG.
  - `stateMachine.asl.yaml`: Definição da máquina de estado que orquestra as funções Lambda.
  - `state_machine_graph.png`: Gráfico visual da máquina de estado, facilitando a compreensão do fluxo de trabalho.

###  Recursos Utilizados

- **AWS Lambda**: Funções escritas em Node.js que executam a lógica de negócios para cada etapa do fluxo de trabalho.
- **AWS Step Functions**: Orquestração do fluxo de trabalho.
- **Amazon SQS**: Fila para receber mensagens de pedidos.
- **Amazon S3**: Armazenamento de dados do pedido.
- **Amazon DynamoDB**: Banco de dados para armazenar metadados do pedido.
- **Amazon SNS**: Serviço de notificação para enviar mensagens ao cliente.
- **AWS Bedrock**: Serviço para invocar modelos de inteligência artificial.

<h3 align="center">Gráfico da Máquina de Estado</h3>
<p align="center"><img width="235"  alt="Workflow Studio State machine graph" src="https://github.com/user-attachments/assets/540d21e3-d953-42aa-8556-aff12cfa2c1d"></p>

O gráfico acima representa a máquina de estado definida no arquivo `stateMachine.asl.yaml`, que orquestra o fluxo de trabalho da aplicação.
