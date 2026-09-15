export const canBuy = (balance: number, price: number, alreadyUnlocked = false) => !alreadyUnlocked && balance >= price;
export const buy = (balance: number, price: number) => balance - price;
export const rewardForMatches = (matches: number, rewardPerMatch: number) => matches * rewardPerMatch;
