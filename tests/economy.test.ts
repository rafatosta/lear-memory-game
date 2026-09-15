import { expect, it } from 'vitest';
import { buy, canBuy, rewardForMatches } from '../src/domain/economy';
it('awards and spends licuris correctly', () => { expect(rewardForMatches(3, 10)).toBe(30); expect(canBuy(20, 20)).toBe(true); expect(canBuy(19, 20)).toBe(false); expect(buy(30, 20)).toBe(10); });
