# Iara Games

Projeto acadêmico de uma plataforma web fictícia voltada à divulgação e descoberta de jogos brasileiros.

A Iara Games reúne uma página inicial, um catálogo com páginas individuais de jogos, um formulário de cadastro estático, um módulo experimental de autenticação em React e Firebase e um protótipo de fórum desenvolvido no Node-RED.

## Acesse o projeto

- Site publicado: https://guicunhasou.github.io/iara-games/
- Repositório: https://github.com/guicunhasou/iara-games

## Funcionalidades

- Página inicial com apresentação da plataforma
- Catálogo com 14 jogos
- Páginas de detalhes dos jogos
- Categorias populares
- Área institucional
- Formulário de cadastro com validação no navegador
- Protótipo de login e cadastro com Firebase Authentication
- Protótipo de fórum com busca de tópicos no Node-RED Dashboard

## Tecnologias

- HTML5
- CSS3
- JavaScript
- Bootstrap
- React
- Vite
- Firebase Authentication
- Node-RED
- Node-RED Dashboard
- GitHub Pages

## Estrutura principal

```text
iara-games/
├── assets/
│   ├── css/
│   ├── images/
│   └── pages/
│       ├── iara-cadastro/   # aplicação React experimental
│       └── jogos/           # páginas individuais
├── js/
├── index.html
├── iara-games.json          # fluxo exportado do Node-RED
└── README.md
```

## Executar o site estático

Abra `index.html` com um servidor local, como a extensão Live Server do VS Code.

## Executar o módulo React

```bash
cd assets/pages/iara-cadastro
npm ci
npm run dev
```

Verificações disponíveis:

```bash
npm run lint
npm run build
npm audit
```

O módulo React ainda é experimental e não substitui automaticamente o formulário estático publicado no GitHub Pages.
