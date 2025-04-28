# GitHub Clone

Este projeto é uma aplicação web desenvolvida para o teste técnico da empresa Megazord para a vaga de frontend, o seguinte teste tem como objetivo demonstrar habilidades em Reat, Typescript e integração com apis. A aplicação consiste em um clone do GitHub onde o usuário pode visualizar os repositórios, visualzar os favoritos, filtrar por linguagem ou tipo, aplicar buscas e visualizar informações do repositório.

## Visão Geral

O GitHub Clone é uma aplicação que consome a API do GitHub para exibir as informações do usuário, repositórios e favoritos. O projeto tem dois meios de visualizar as informações, um modo onde é feito uma autenticação via OAuth do GitHub, onde o usuário pode logar com sua conta do GitHub e visualizar as informações do seu perfil e um modo local, onde é visualizado as informações de um usuário fixo. A aplicação também apresenta um layout responsivo, possibilitando o uso em variados dispositivos.

## Funcionalidades

- **Autenticação OAuth com GitHub**:
  - Login seguro usando a API OAuth do GitHub.
  - Exibição de informações do usuário logado (informações pessoais, repositórios, favoritos)

- **Modo Local com Usuário Fixo**:
  - Suporte a um modo local que usa um Personal Access Token (PAT) para buscar dados de um usuário fixo.
  - Exibição das mesmas informações do usuário (informações pessoais, repositórios, favoritos) sem necessidade de login.

- **Busca e Filtros**:
  - Campo de busca para filtrar repositórios por nome, dono ou descrição.
  - Filtros de tipo e de linguagem.

- **Exibição de Informações do Repositório**:
  - Possibilidade de visualizar as informações de um repositório específico.

- **Design Responsivo**:
  - Layout responsivo para dispositivos móveis, tablet e desktop usando Tailwind CSS.

## Tecnologias Utilizadas

- **Frontend**:
  - React
  - TypeScript
  - Tailwind CSS
  
- **Gerenciamento de Estado e Requisições**:
  - `@tanstack/react-query` (para requisições assíncronas e caching)
  - `@octokit/request` (para integração com a API do GitHub. Recomendado pela documentação)

- **Outras Ferramentas**:
  - Vite (para build e desenvolvimento)
  - React Router (para navegação)
  - Zustand (para gerenciamento de estado global)

## Configuração e Instalação

Siga os passos abaixo para rodar o projeto localmente:

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn
- Uma conta no GitHub para autenticação OAuth (opcional para modo local)

### Passos
1. Clone o repositório:
   git clone https://github.com/EliezerGomes/clone-github.git
   cd clone-github

2. Instalação de dependências:
   npm install ou yarn

3. Inicie o Servidor:
   npm run dev ou yarn dev

4. Acesse a Aplicação:
   http://localhost:5173

5. Acesso por Autenticação:
   Clique em "Entrar com GitHub"
   Autorize a aplicação para acessar sua conta do GitHub
   Você será redirecionado para tela principal
   O acesso por autenticação só está disponível em produção devido ao github permitir apenas uma rota de callback

6. Acessar Modo Local:
 - Gerando token de acesso:
  - Logue na sua conta GitHub https://github.com
  - Clique na sua foto de perfil
  - Clique na opção "Settings" ou "Configurações"
  - No menu lateral esquerdo acesse a última opção "Developer settings" ou "Configurações do desenvolvedor"
  - No menu lateral clique na opção "Personal access tokens" ou "Tokens de acesso pessoal"
  - Clique em "Tokens (classic)" ou "Fichas (clássico)"
  - Clique na opção "Generate new token" ou "Gerar novo token"
  - Adicione um nome e as permissões de acesso do token, "repo" e "user" ou "repositório" e "usuário"
  - Copie o token gerado

 - Adicionar no código código:
  - Crie um arquivo ".env"
  - Crie uma variável "VITE_GITHUB_PATH" e adicione o valor do token copiado
  - Na tela de login clique em "Usar conta local"


7. Busca e Filtros:
   Faça uma busca digiando o valor nome do respositório, do dono repositório ou descrição
   Clique em "Enter" para efetuar a busca
   No mobile para visualizar o campo de busca clique no ícone da lupa, caso deseje retornar para os flitros clique no icone dos filtros
   Faça um filtro clicando na opção "Type" ou "Language" e selecione a opção

8. Visualizar Infomações do Repositório:
   Clique no repositório desejado
   Você será redirecionado para a "https://github-explorer.gabrielcordeiro.dev" onde será possível visualizar as informações do repositório

## Decisões Técnicas

- **Autenticação OAuth**:
  - Usei a autenticação via OAuth para facilitar as requisições na aplicação, devido os endpoints de user e starreds necessitarem de um token para serem executadas. O uso da autenticação via OAuth, também facilita a troca de usuários, sem a necessidade de gerar manualmente um token de acesso.

- **Usuário Local**:
  - Implementei um modo local usando um Personal Access Token (PAT) para buscar dados de um usuário fixo, permitindo testes na aplicação sem se fazer necessária o uso de autenticação.

- **Gerenciamento de Requisições**:
  - Usei @tanstack/react-query para gerenciar requisições assíncronas, caching, e estados de carregamento/erro, e guardar as respostas em chache para dessa forma melhorar a perfomance da aplicação.
  - Seguindo a documentação do GitHub eu utilzei @octokit/request para realizar chamadas à API.

- **Design Responsivo**:
  - Usei Tailwind CSS para estilizar a aplicação e para facilitar a criação um layout responsivo, com comportamentos diferentes em mobile, desktop e web.

## Desafios e Soluções

- **Exibir o número total de starred na aba**:
  - Enfrentei um problema para exibir o número total de starreds na aba, devido a requisição de repositorios não conter essa informação e a requisição de starreds apenas ser feita quando clicado.
  - Solução: Infelizmente devido as informações não existirem em outros endpoints, precisei requisitar em starred onde estou retornando o length. 

- **Exibição e fechamento dos menus de filtro**:
  - Para fechar os menus ao clicar em qualquer lugar do site e abrir quando clicar no botão de filtro, quando fechava o menu e clica nos botões para abrir o mesmo não abria.
  - Solução: Adicionei no zustand um variável global para ser acessada tanto pelo pai como pelo componente filho, e no componente filho antes de abrir o menu, estou parando a propagação do evento. 

- **Requisições**:
  - Me deparei com o desafio de como exibir as informações pessoais e de repositório do usuári em produção, em alguns endpoints se faz necessário token de acesso, como starred e user para requisitar.
  - Solução: Criei uma autenticação utilizando o OAuth do github, facilitando a manipulção das requisições; Criei também um modo local com um usuário fixo, dessa forma não amarrando o acesso ao sistema via autenticação.

- **Exibir instagram no sidebar**:
  - Infelizmente a requisção do usuário não trás nenhuma informação referente a alguma rede social.
  - Contorno: Para não deixar apenas um ícone adicionei "-" para indicar que não há informações no item

## Melhorias

- Adicionar tratamento de erros mais robusto e descritivos.
- Adicionar testes unitários usando uma ferramenta como Jest.
- Adicionar animações nas interações com componentes.
- Adicionar paginação para exibir um número específico de repositórios, em casos de muitos repositórios pode tornar a exibição da informação um pouco lenta, uma paginação iria otmizar a performance.
- Salvar o token gerado, seja no session storage ou localstorage, para ao dar refresh da na página não morrer a sessão
