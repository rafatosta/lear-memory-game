export type CardStatus = 'hidden' | 'visible' | 'matched';

export interface CardDefinition { id: string; name: string; image: string; alt: string; fact: string }
export interface MemoryCard extends CardDefinition { instanceId: string; status: CardStatus }
export interface GameState { cards: MemoryCard[]; selectedIds: string[]; matches: number; attempts: number; locked: boolean; finished: boolean }
export interface BiomeItem { id: string; name: string; price: number; progress: number; image: string; alt: string; x: number; y: number; scale: number }
export interface SaveData { version: 1; licuris: number; unlockedItemIds: string[]; soundEnabled: boolean; bestTimeSeconds: number | null; gamesPlayed: number }
