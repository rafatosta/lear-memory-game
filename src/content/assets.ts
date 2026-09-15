// `BASE_URL` includes the repository path on GitHub Pages (for example,
// `/lear-memory-game/`) and `/` during local development.
const generated = `${import.meta.env.BASE_URL}assets/generated`;
const select = (path: string, finalAsset: string | null = null) => finalAsset ?? `${generated}/${path}`;

export const assetSpecs = { memoryCard: { width: 1024, height: 1024, ratio: 1 }, biome: { width: 2048, height: 1152, ratio: 16 / 9 } };
export const assets = {
  cards: {
    learMacaw: { id: 'lear-macaw', generated: select('cards/lear-macaw.svg'), final: null, alt: 'Arara-azul-de-lear' },
    licuri: { id: 'licuri', generated: select('cards/licuri.svg'), final: null, alt: 'Frutos do licuri' },
    mandacaru: { id: 'mandacaru', generated: select('cards/mandacaru.svg'), final: null, alt: 'Mandacaru' },
    sun: { id: 'sun', generated: select('cards/sun.svg'), final: null, alt: 'Sol da Caatinga' },
    rock: { id: 'rock', generated: select('cards/rock.svg'), final: null, alt: 'Rocha' },
    flower: { id: 'flower', generated: select('cards/flower.svg'), final: null, alt: 'Flor da Caatinga' },
    vegetation: { id: 'vegetation', generated: select('cards/vegetation.svg'), final: null, alt: 'Vegetação da Caatinga' },
    tree: { id: 'caatinga-tree', generated: select('cards/caatinga-tree.svg'), final: null, alt: 'Árvore da Caatinga' },
    back: { generated: select('cards/card-back.svg'), final: null, alt: 'Verso da carta' },
  },
  biome: {
    background: select('biome/biome-background.svg'), ground: select('biome/ground.svg'), licuri: select('biome/licuri-tree.svg'), mandacaru: select('biome/mandacaru.svg'), rock: select('biome/rock.svg'), vegetation: select('biome/vegetation.svg'), macaw: select('biome/lear-macaw.svg'),
  },
  ui: { coin: select('ui/licuri-coin.svg'), trophy: select('ui/trophy.svg'), clock: select('ui/clock.svg') },
} as const;
