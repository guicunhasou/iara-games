# Iara Games

Projeto acadêmico de uma plataforma web fictícia voltada à divulgação e descoberta de jogos brasileiros.

A Iara Games reúne uma página inicial, um catálogo com páginas individuais de jogos, uma simulação de cadastro estática, um módulo experimental de autenticação em React e Firebase e um protótipo de fórum desenvolvido no Node-RED.

## Acesse o projeto

- Site publicado: https://guicunhasou.github.io/iara-games/
- Repositório: https://github.com/guicunhasou/iara-games

## Funcionalidades

- Página inicial com apresentação da plataforma
- Catálogo com 14 jogos
- Páginas de detalhes dos jogos
- Categorias populares
- Área institucional
- Simulação de cadastro com dados fictícios, validada no navegador sem criar conta nem enviar campos
- Biblioteca, Fórum e Suporte aparecem no menu como áreas indisponíveis na versão estática
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

O módulo React é experimental. A versão estática publicada no GitHub Pages tem uma simulação de cadastro separada.
