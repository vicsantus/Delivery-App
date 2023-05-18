# Seja Bem-Vindo(a) ao repositório do projeto Delivery App

Delivery App é um projeto que simula um aplicativo de delivery para uma distribuidora de bebidas. Ele permite que os usuários façam login, cadastrem-se, realizem pedidos e acompanhem o status dos pedidos. Além disso, a pessoa administradora tem a capacidade de adicionar novos membros da empresa. Foi construido toda parte front-end e back-end.

## Teste de funcionamento
https://delivery-app-frontend-production.up.railway.app/login

## Funcionalidades Principais
- Autenticação de usuários: Os usuários podem fazer login para acessar o aplicativo.
- Cadastro de usuário: Os usuários podem se cadastrar fornecendo informações básicas.
- Realização de pedidos: Os usuários podem adicionar bebidas ao carrinho e fazer pedidos.
- Acompanhamento do status do pedido: Os usuários podem verificar se o pedido está em andamento ou já saiu para entrega.
- Administração de membros: A pessoa administradora pode adicionar novos membros da empresa.

## Tecnologias Utilizadas

- JavaScript
- React
- React Native
- Context API
- Node.js
- Express
- Sequelize (ORM para banco de dados)
- MySQL
- JWT (JSON Web Tokens para autenticação)
- Bootstrap (CSS framework)
- Docker

## Configuração do Ambiente de Desenvolvimento

1. Clone este repositório: `git clone git@github.com:vicsantus/Delivery-App.git`
2. Navegue até o diretório do projeto: `cd Delivery-App`
3. Instale as dependências: `npm install`e `npm run dev:prestart`
4. Inicialize o container: `docker-compose up -d`
5. Configure o banco de dados MySQL:
 - Renomeie o arquivo .env.example para .env e configure as variáveis de ambiente relacionadas ao banco de dados.
6. Popule o banco de dados: `npm run db:reset`
7. Inicialize o back-end: `cd back-end` e `npm run dev`
8. Inicialize o fron-end: `cd front-end` e `npm start`

## Contribuição

Contribuições são bem-vindas! Se você deseja contribuir com o projeto, siga as etapas abaixo:

1. Fork este repositório.
2. Crie um branch com sua nova funcionalidade ou correção de bug: `git checkout -b minha-funcionalidade`.
3. Faça commit das suas alterações: `git commit -m 'Adiciona nova funcionalidade'`.
4. Faça push para o branch: `git push origin minha-funcionalidade`.
5. Envie um pull request.

## Licença

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Developers

- <a href = "https://github.com/bmediato">Beatriz Mediato</a>
- <a href = "https://github.com/brunosbrito">Bruno Brito</a>
- <a href = "https://github.com/Cozmu">Jorge Wellington</a>
- <a href = "https://github.com/vicsantus">Victor Santos</a>

## Contato

Se tiver alguma dúvida ou sugestão sobre o projeto, entre em contato com <a href = "mailto:victor.santos.fk@hotmail.com">victor.santos.fk@hotmail.com</a>

