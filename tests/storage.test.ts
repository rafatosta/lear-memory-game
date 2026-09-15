import { beforeEach, expect, it } from 'vitest';
import { defaultSave, storage } from '../src/services/storage';
beforeEach(() => localStorage.clear());
it('persists and restores the save state', () => { const save = { ...defaultSave(), licuris: 40, unlockedItemIds: ['rock'] }; storage.save(save); expect(storage.load()).toEqual(save); });
it('resets saved progress', () => { storage.save({ ...defaultSave(), licuris: 2 }); storage.reset(); expect(storage.load()).toEqual(defaultSave()); });
