# Guardiões da Arara de Lear

Jogo educativo mobile-first sobre a arara-azul-de-lear, o licuri e a Caatinga. Encontre pares, ganhe licuris e restaure o bioma.

## Começar

```bash
npm install
npm run dev
```

Também estão disponíveis `npm run test`, `npm run lint`, `npm run build` e `npm run validate`. Os SVGs internos podem ser refeitos com `npm run generate:placeholders`.

## Decisões

A engine do jogo e a economia vivem em `src/domain`; textos, itens, preços e assets ficam em `src/content`; o save versionado é encapsulado em `src/services/storage.ts`. A interface usa somente DOM, CSS e SVGs locais.
