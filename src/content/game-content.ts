import { assets } from './assets';
import type { BiomeItem, CardDefinition } from '../types/game';

export const economyConfig = { rewardPerMatch: 10 };
export const memoryCards: CardDefinition[] = [
  { id: 'lear-macaw', name: 'Arara de Lear', image: assets.cards.learMacaw.generated, alt: assets.cards.learMacaw.alt, fact: 'A arara-azul-de-lear é uma espécie brasileira que vive na Caatinga baiana.' },
  { id: 'licuri', name: 'Licuri', image: assets.cards.licuri.generated, alt: assets.cards.licuri.alt, fact: 'O licuri é um alimento importante para a arara-de-lear.' },
  { id: 'mandacaru', name: 'Mandacaru', image: assets.cards.mandacaru.generated, alt: assets.cards.mandacaru.alt, fact: 'O mandacaru é um cacto muito conhecido da Caatinga.' },
  { id: 'sun', name: 'Sol', image: assets.cards.sun.generated, alt: assets.cards.sun.alt, fact: 'A Caatinga tem clima semiárido e longos períodos de seca.' },
  { id: 'rock', name: 'Rocha', image: assets.cards.rock.generated, alt: assets.cards.rock.alt, fact: 'Serras e rochas fazem parte da paisagem onde a arara vive.' },
  { id: 'flower', name: 'Flor', image: assets.cards.flower.generated, alt: assets.cards.flower.alt, fact: 'Mesmo na seca, a Caatinga guarda uma rica biodiversidade.' },
  { id: 'vegetation', name: 'Vegetação', image: assets.cards.vegetation.generated, alt: assets.cards.vegetation.alt, fact: 'Muitas plantas da Caatinga perdem folhas para economizar água.' },
  { id: 'caatinga-tree', name: 'Árvore', image: assets.cards.tree.generated, alt: assets.cards.tree.alt, fact: 'Cuidar do habitat é essencial para conservar a arara-de-lear.' },
];
export const biomeItems: BiomeItem[] = [
  { id: 'licuri-tree', name: 'Plantar licuri', price: 10, progress: 20, image: assets.biome.licuri, alt: 'Licurizeiro', x: .24, y: .78, scale: .34 },
  { id: 'vegetation', name: 'Adicionar vegetação', price: 15, progress: 20, image: assets.biome.vegetation, alt: 'Vegetação', x: .54, y: .83, scale: .2 },
  { id: 'mandacaru', name: 'Adicionar cacto', price: 20, progress: 20, image: assets.biome.mandacaru, alt: 'Mandacaru', x: .73, y: .83, scale: .3 },
  { id: 'lear-macaw', name: 'Atrair arara', price: 30, progress: 20, image: assets.biome.macaw, alt: 'Arara de Lear', x: .48, y: .43, scale: .2 },
  { id: 'rock', name: 'Adicionar rochas', price: 15, progress: 20, image: assets.biome.rock, alt: 'Rochas', x: .9, y: .86, scale: .18 },
];
export const educationalFacts = memoryCards.map(({ id, name, fact }) => ({ id, title: name, text: fact, relatedCard: id }));
