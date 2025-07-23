# Visão Geral

Aplicação full-stack desenvolvida como teste técnico para a Work Doc. O projeto demonstra a construção de uma aplicação web completa, desde a API backend até a interface frontend interativa, com foco em boas práticas, organização de código e experiência do usuário.

## Objetivos

- Desenvolver uma API em Node.js (NestJS) para servir dados de filmes.
- Construir um frontend em React (TypeScript) que consome essa API.
- Implementar funcionalidades de busca, listagem e visualização de detalhes de filmes.
- Demonstrar organização de código, manipulação de dados JSON e integração frontend-backend.

## Funcionalidades

- **Página Inicial:**

  - Exibição de filmes em carrosséis horizontais.
  - Banner de destaque com vídeo/imagem e efeito de transição suave.

- **Cabeçalho Dinâmico:**

  - Cabeçalho fixo com alteração de cor ao rolar a página.

- **Busca Avançada:**

  - Campo de busca no cabeçalho.
  - Sugestão (autocomplete) com debounce.
  - Resultados em dropdown com pôster e título.
  - Fallback para imagens quebradas.

- **Navegação e Detalhes:**

  - Página de resultados completos da busca.
  - Página de detalhes do filme com sinopse, elenco, avaliações, etc.

- **Comunicação API:**
  - Consumo da API para todas as operações.
  - Tratamento de erros de requisição no frontend.

## Arquitetura e Tecnologias

### Frontend

- **Framework:** React
- **Linguagem:** TypeScript
- **Roteamento:** React Router DOM
- **HTTP:** Axios
- **Build Tool:** Vite
- **Estilização:** CSS puro

### Backend

- **Ambiente:** Node.js
- **Framework:** NestJS (com Express)
- **Linguagem:** TypeScript
- **Dados:** Arquivo JavaScript estático (`movieData.js`)
- **CORS:** Configurado para integração frontend-backend

## Considerações Finais

Este projeto demonstra a construção de uma aplicação web moderna, abordando comunicação entre serviços, tratamento de dados, experiência do usuário e organização de código. O uso de TypeScript em frontend e backend garante desenvolvimento seguro e escalável.
