import { useEffect, useMemo, useRef, useState } from 'react';
import { assets } from '../content/assets';
import { biomeItems, economyConfig, educationalFacts, memoryCards } from '../content/game-content';
import { canBuy, buy } from '../domain/economy';
import { createGame, resolveSelection, selectCard } from '../domain/memory';
import { defaultSave, storage } from '../services/storage';
import type { GameState, SaveData } from '../types/game';

type Tab = 'play' | 'biome' | 'shop';
const formatTime = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

function MemoryGame({ onMatch, onFinish }: { onMatch: () => void; onFinish: (time: number) => void }) {
  const [game, setGame] = useState<GameState>(() => createGame(memoryCards));
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const didFinish = useRef(false);
  useEffect(() => { if (!started || game.finished) return; const id = window.setInterval(() => setSeconds((value) => value + 1), 1000); return () => clearInterval(id); }, [started, game.finished]);
  useEffect(() => { if (!game.locked) return; const id = window.setTimeout(() => setGame((current) => { const before = current.matches; const next = resolveSelection(current); if (next.matches > before) onMatch(); return next; }), 700); return () => clearTimeout(id); }, [game.locked, onMatch]);
  useEffect(() => { if (game.finished && !didFinish.current) { didFinish.current = true; onFinish(seconds); } }, [game.finished, onFinish, seconds]);
  const choose = (id: string) => { setStarted(true); setGame((current) => selectCard(current, id)); };
  const restart = () => { didFinish.current = false; setGame(createGame(memoryCards)); setSeconds(0); setStarted(false); };
  return <section className="game" aria-label="Jogo da memória"><div className="stats"><span><b>{game.matches}/8</b>Pares</span><span><b>{game.attempts}</b>Tentativas</span><span><b>{formatTime(seconds)}</b>Tempo</span></div><div className="memory-grid">{game.cards.map((card) => <button key={card.instanceId} className={`memory-card ${card.status}`} onClick={() => choose(card.instanceId)} disabled={card.status !== 'hidden' || game.locked} aria-label={card.status === 'hidden' ? 'Virar carta' : card.name}><span className="card-face back"><img src={assets.cards.back.generated} alt="" /></span><span className="card-face front"><img src={card.image} alt={card.alt} /></span></button>)}</div>{game.finished ? <div className="feedback success"><img src={assets.ui.trophy} alt="" /> Bioma em festa! Você encontrou todos os pares.</div> : <div className="feedback">Cada par encontrado rende <strong>+{economyConfig.rewardPerMatch} licuris</strong>.</div>}<button className="secondary restart" onClick={restart}>↻ Nova partida</button></section>;
}

function Biome({ unlocked }: { unlocked: string[] }) { const items = biomeItems.filter((item) => unlocked.includes(item.id)); const progress = Math.min(100, items.reduce((sum, item) => sum + item.progress, 0)); return <section className="biome-section"><div className="biome-label"><div><span>MEU BIOMA</span><strong>{progress}% restaurado</strong></div><div className="progress"><i style={{ width: `${progress}%` }} /></div></div><div className="biome"><img className="biome-bg" src={assets.biome.background} alt="Paisagem da Caatinga" />{items.map((item) => <img key={item.id} className="biome-item" src={item.image} alt={item.alt} style={{ left: `${item.x * 100}%`, top: `${item.y * 100}%`, width: `${item.scale * 100}%` }} />)}</div>{items.length === 0 && <p className="empty">Ganhe licuris e restaure este cantinho da Caatinga.</p>}</section>; }

export function App() {
  const [tab, setTab] = useState<Tab>('play'); const [save, setSave] = useState<SaveData>(() => storage.load()); const [toast, setToast] = useState('');
  useEffect(() => storage.save(save), [save]);
  const progress = useMemo(() => Math.min(100, biomeItems.filter((item) => save.unlockedItemIds.includes(item.id)).reduce((sum, item) => sum + item.progress, 0)), [save.unlockedItemIds]);
  const match = () => { setSave((data) => ({ ...data, licuris: data.licuris + economyConfig.rewardPerMatch })); setToast(`+${economyConfig.rewardPerMatch} licuris!`); };
  const finish = (time: number) => setSave((data) => ({ ...data, gamesPlayed: data.gamesPlayed + 1, bestTimeSeconds: data.bestTimeSeconds === null ? time : Math.min(time, data.bestTimeSeconds) }));
  const purchase = (id: string) => { const item = biomeItems.find((entry) => entry.id === id)!; if (!canBuy(save.licuris, item.price, save.unlockedItemIds.includes(id))) return; setSave((data) => ({ ...data, licuris: buy(data.licuris, item.price), unlockedItemIds: [...data.unlockedItemIds, id] })); setToast(`${item.name}: bioma mais vivo!`); };
  const clearProgress = () => { if (window.confirm('Apagar todos os licuris e itens do bioma? Esta ação não pode ser desfeita.')) setSave(defaultSave()); };
  return <main className="app"><header><div className="brand"><img src={assets.cards.learMacaw.generated} alt="" /><div><span>GUARDIÕES DA</span><h1>Arara de Lear</h1></div></div><button className="sound" onClick={() => setSave((data) => ({ ...data, soundEnabled: !data.soundEnabled }))} aria-label={save.soundEnabled ? 'Desligar sons' : 'Ligar sons'}>{save.soundEnabled ? '🔊' : '🔇'}</button></header><div className="wallet"><img src={assets.ui.coin} alt="" /><strong>{save.licuris}</strong><span>licuris</span>{toast && <em role="status">{toast}</em>}</div><div className="content">{tab === 'play' && <><MemoryGame onMatch={match} onFinish={finish} /><Biome unlocked={save.unlockedItemIds} /></>}{tab === 'biome' && <><Biome unlocked={save.unlockedItemIds} /><section className="facts"><h2>Você sabia?</h2>{educationalFacts.slice(0, 4).map((fact) => <article key={fact.id}><h3>{fact.title}</h3><p>{fact.text}</p></article>)}</section></>}{tab === 'shop' && <section className="shop"><h2>Loja do bioma</h2><p>Use seus licuris para trazer vida de volta à Caatinga.</p>{biomeItems.map((item) => { const owned = save.unlockedItemIds.includes(item.id); return <article key={item.id} className="shop-item"><img src={item.image} alt="" /><div><h3>{item.name}</h3><small>+{item.progress}% de restauração</small></div><button disabled={owned || save.licuris < item.price} onClick={() => purchase(item.id)}>{owned ? 'No bioma' : <><img src={assets.ui.coin} alt="" />{item.price}</>}</button></article>; })}<p className="progress-note">Progresso atual: {progress}%</p><button className="danger" onClick={clearProgress}>Apagar progresso salvo</button></section>}</div><nav aria-label="Navegação principal">{([['play', '▦', 'Jogar'], ['biome', '♧', 'Bioma'], ['shop', '⌂', 'Loja']] as const).map(([id, icon, label]) => <button key={id} className={tab === id ? 'active' : ''} onClick={() => setTab(id)}><span>{icon}</span>{label}</button>)}</nav></main>;
}
