# Assets

SVGs gerados ficam em `public/assets/generated`; arte final poderá ficar em `public/assets/final`. Não remova os fallbacks gerados.

## Regra de composição e reutilização

Ilustrações reutilizáveis (animais, plantas, rochas, flores e demais objetos) devem ser SVGs independentes com fundo transparente. O arquivo do objeto não deve incorporar fundo, moldura, borda ou aparência de carta.

O contexto de uso é responsável pela composição visual:

- **Carta do jogo:** a carta fornece fundo, borda, raio, sombra e espaçamento; o SVG fornece somente a ilustração.
- **Bioma/cenário:** o cenário fornece o fundo; o mesmo SVG pode ser posicionado e redimensionado livremente sobre ele.
- **UI:** ícones continuam independentes e transparentes quando não representam uma superfície completa.

Exceções são assets que representam explicitamente uma superfície completa, como `card-back.svg` e `biome-background.svg`. Nesses casos, o fundo faz parte semanticamente do próprio asset.

Os placeholders gerados por `scripts/generate-placeholders.mjs` devem respeitar esta regra. Não use remoção automática baseada apenas na cor branca, pois partes brancas podem pertencer legitimamente à ilustração.
