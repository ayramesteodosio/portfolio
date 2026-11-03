# Portfólio, Ayrames Teodósio

Site pessoal de portfólio, em uma página só, em português (`/pt/`) e inglês (`/en/`). Mostra quem eu sou, os projetos, a stack e o contato.

Feito com Next.js, React, TypeScript e Tailwind CSS, exportado como site estático.

Publicado em https://ayramesteodosio.github.io/portfolio/

## Requisitos

- Node.js 24
- npm

## Comandos

```bash
npm install
npm run dev
npm test
npm run test:e2e
npm run build
npm run serve
```

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento em http://localhost:3000 |
| `npm test` | Testes unitários com Vitest |
| `npm run test:e2e` | Testes no navegador com Playwright: rotas, interações, responsividade e acessibilidade |
| `npm run build` | Gera o site estático na pasta `out/` |
| `npm run serve` | Serve a pasta `out/` em http://localhost:4173 |
| `npm run og` | Gera `public/og.png`, a imagem que aparece quando o link é compartilhado |
| `npm run typecheck` | Confere os tipos |
| `npm run lint` | Roda o ESLint |

## Variáveis de build

| Variável | Padrão | Para que serve |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:4173` | Endereço público do site, usado no Open Graph, no canonical e nos links de idioma |
| `NEXT_PUBLIC_BASE_PATH` | vazio | Caminho base quando o site não fica na raiz do domínio, como `/portfolio` no GitHub Pages |

## Publicação

Cada push na branch `main` roda `.github/workflows/deploy.yml`. O workflow confere os tipos, roda o lint e os testes unitários, gera o build com o caminho base `/portfolio` e publica no GitHub Pages.

## Como acrescentar um projeto

1. Coloque a captura em `src/assets/images`, em WebP (um teste confere).
2. Crie a entrada em `src/content/projects.ts`, com `slug`, stack, status e a imagem.
3. Escreva os textos do projeto em `src/content/pt.ts` e `src/content/en.ts`, na chave `projects.items`, com o mesmo `slug`.
4. Rode `npm test`: os testes avisam se faltar texto em algum idioma.
