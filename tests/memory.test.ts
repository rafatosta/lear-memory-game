import { describe, expect, it } from 'vitest';
import { createGame, resolveSelection, selectCard } from '../src/domain/memory';
import type { CardDefinition } from '../src/types/game';
const cards: CardDefinition[] = [{ id: 'a', name: 'A', image: 'a', alt: 'a', fact: '' }, { id: 'b', name: 'B', image: 'b', alt: 'b', fact: '' }];
describe('memory engine', () => {
  it('creates a shuffled pair for each definition', () => expect(createGame(cards, () => .5).cards).toHaveLength(4));
  it('locks after selecting two cards and resolves a match', () => { let game = createGame(cards, () => .5); const pair = game.cards.filter((card) => card.id === 'a'); game = selectCard(game, pair[0].instanceId); game = selectCard(game, pair[1].instanceId); expect(game.locked).toBe(true); game = resolveSelection(game); expect(game.matches).toBe(1); expect(game.cards.filter((card) => card.status === 'matched')).toHaveLength(2); });
  it('hides an incorrect selection after resolution', () => { let game = createGame(cards, () => .5); game = selectCard(game, game.cards.find((card) => card.id === 'a')!.instanceId); game = selectCard(game, game.cards.find((card) => card.id === 'b')!.instanceId); game = resolveSelection(game); expect(game.cards.every((card) => card.status === 'hidden')).toBe(true); expect(game.attempts).toBe(1); });
});
