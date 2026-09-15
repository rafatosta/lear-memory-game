import type { CardDefinition, GameState } from '../types/game';

const shuffle = <T,>(items: T[], random = Math.random): T[] => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) { const j = Math.floor(random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; }
  return result;
};
export const createGame = (definitions: CardDefinition[], random = Math.random): GameState => ({ cards: shuffle(definitions.flatMap((card) => [0, 1].map((copy) => ({ ...card, instanceId: `${card.id}-${copy}`, status: 'hidden' as const }))), random), selectedIds: [], matches: 0, attempts: 0, locked: false, finished: false });
export const selectCard = (state: GameState, instanceId: string): GameState => {
  if (state.locked || state.selectedIds.length === 2 || state.cards.find((card) => card.instanceId === instanceId)?.status !== 'hidden') return state;
  const cards = state.cards.map((card) => card.instanceId === instanceId ? { ...card, status: 'visible' as const } : card);
  const selectedIds = [...state.selectedIds, instanceId];
  return { ...state, cards, selectedIds, locked: selectedIds.length === 2, attempts: selectedIds.length === 2 ? state.attempts + 1 : state.attempts };
};
export const resolveSelection = (state: GameState): GameState => {
  if (state.selectedIds.length !== 2) return state;
  const selected = state.cards.filter((card) => state.selectedIds.includes(card.instanceId));
  const isMatch = selected[0].id === selected[1].id;
  const cards = state.cards.map((card) => state.selectedIds.includes(card.instanceId) ? { ...card, status: isMatch ? 'matched' as const : 'hidden' as const } : card);
  const matches = state.matches + Number(isMatch);
  return { ...state, cards, selectedIds: [], locked: false, matches, finished: matches === state.cards.length / 2 };
};
export { shuffle };
