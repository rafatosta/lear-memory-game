import type { SaveData } from '../types/game';
const key = 'lear-memory-game-save';
export const defaultSave = (): SaveData => ({ version: 1, licuris: 0, unlockedItemIds: [], soundEnabled: true, bestTimeSeconds: null, gamesPlayed: 0 });
export const storage = {
  load(): SaveData { try { const raw = localStorage.getItem(key); if (!raw) return defaultSave(); const saved = JSON.parse(raw) as Partial<SaveData>; return { ...defaultSave(), ...saved, version: 1 }; } catch { return defaultSave(); } },
  save(data: SaveData) { localStorage.setItem(key, JSON.stringify(data)); },
  reset() { localStorage.removeItem(key); },
};
