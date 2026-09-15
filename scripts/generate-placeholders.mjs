import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../public/assets/generated/', import.meta.url).pathname;
const asset = (shapes) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">${shapes}</svg>`;

const cards = {
  'lear-macaw.svg': asset('<ellipse cx="500" cy="565" rx="205" ry="285" fill="#1675b8"/><circle cx="525" cy="315" r="154" fill="#208ed2"/><path d="M370 480Q520 405 670 640Q470 690 350 570" fill="#10466c"/><path d="M430 720l-100 190 165-135 65 120 15-200" fill="#1675b8"/><circle cx="585" cy="305" r="62" fill="#ffc843"/><circle cx="600" cy="290" r="16" fill="#182e3e"/><path d="M650 360l180 55-160 72" fill="#263f4d"/>'),
  'licuri.svg': asset('<path d="M510 850V450" stroke="#855630" stroke-width="50"/><path d="M510 480Q300 390 190 230M510 480Q710 390 820 230M510 530Q325 550 180 470M510 530Q700 550 845 470" stroke="#6b9238" stroke-width="60" fill="none" stroke-linecap="round"/><g fill="#855630"><ellipse cx="410" cy="570" rx="44" ry="58"/><ellipse cx="520" cy="620" rx="44" ry="58"/><ellipse cx="620" cy="555" rx="44" ry="58"/></g>'),
  'mandacaru.svg': asset('<path d="M445 850V330a70 70 0 01140 0v170h80V390a55 55 0 01110 0v200a55 55 0 01-55 55H585v205M445 620h-90a55 55 0 01-55-55V440a55 55 0 01110 0v80h35" fill="none" stroke="#548a47" stroke-width="65" stroke-linecap="round"/>'),
  'sun.svg': asset('<circle cx="512" cy="512" r="190" fill="#ffc843"/><g stroke="#f0a825" stroke-width="40" stroke-linecap="round"><path d="M512 120v95M512 810v95M120 512h95M810 512h95M235 235l68 68M789 789l-68-68M789 235l-68 68M235 789l68-68"/></g>'),
  'rock.svg': asset('<path d="M210 760l115-315 260-160 235 225 40 250z" fill="#9a795d"/><path d="M325 445l150 90 110-250" fill="none" stroke="#c3a487" stroke-width="36"/>'),
  'flower.svg': asset('<path d="M510 850V510" stroke="#6b9238" stroke-width="45"/><g fill="#ef807b"><ellipse cx="512" cy="370" rx="92" ry="180"/><ellipse cx="512" cy="370" rx="92" ry="180" transform="rotate(72 512 370)"/><ellipse cx="512" cy="370" rx="92" ry="180" transform="rotate(144 512 370)"/><ellipse cx="512" cy="370" rx="92" ry="180" transform="rotate(216 512 370)"/><ellipse cx="512" cy="370" rx="92" ry="180" transform="rotate(288 512 370)"/></g><circle cx="512" cy="370" r="65" fill="#ffc843"/>'),
  'vegetation.svg': asset('<path d="M510 850V430M510 680Q320 600 280 430M510 610Q700 520 760 350" stroke="#58833b" stroke-width="45" fill="none"/><g fill="#7ea34a"><ellipse cx="285" cy="420" rx="95" ry="145" transform="rotate(-35 285 420)"/><ellipse cx="750" cy="345" rx="100" ry="150" transform="rotate(35 750 345)"/><ellipse cx="480" cy="400" rx="100" ry="150"/></g>'),
  'caatinga-tree.svg': asset('<path d="M460 850l35-370-100-185 160 100 105-170-35 255 100 160-135-65-25 275" fill="#855630"/><g fill="#769b47"><circle cx="365" cy="290" r="120"/><circle cx="570" cy="205" r="140"/><circle cx="710" cy="410" r="120"/><circle cx="530" cy="420" r="145"/></g>'),
  'card-back.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><rect width="1024" height="1024" rx="90" fill="#1675b8"/><path d="M512 195c90 130 115 240 0 515-115-275-90-385 0-515z" fill="#8ed1eb"/><path d="M512 245v420M470 380l42 55 42-55M445 510l67 70 67-70" fill="none" stroke="#10466c" stroke-width="30"/><g fill="#ffc843"><circle cx="180" cy="180" r="22"/><circle cx="844" cy="180" r="22"/><circle cx="180" cy="844" r="22"/><circle cx="844" cy="844" r="22"/></g></svg>'
};

const biome = {
  'biome-background.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 1152"><rect width="2048" height="1152" fill="#bfeaf7"/><circle cx="1700" cy="180" r="90" fill="#ffc843"/><path d="M0 560l330-240 270 190 330-260 330 270 280-210 498 255v587H0z" fill="#91aa8d"/><path d="M0 680l440-190 310 140 390-180 430 160 478-130v672H0z" fill="#759168"/><path d="M0 720h2048v432H0z" fill="#d6a968"/><path d="M0 890q300-90 600 5t600 0 848 10v247H0z" fill="#c18b50"/></svg>',
  'ground.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 1152"><path d="M0 600h2048v552H0z" fill="#c18b50"/></svg>',
  'licuri-tree.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M510 950V470" stroke="#855630" stroke-width="65"/><path d="M510 500Q260 430 125 220M510 500Q760 400 900 190M510 560Q250 590 100 490M510 560Q750 600 920 480" fill="none" stroke="#6b9238" stroke-width="90" stroke-linecap="round"/><g fill="#855630"><circle cx="400" cy="570" r="48"/><circle cx="530" cy="610" r="48"/><circle cx="655" cy="540" r="48"/></g></svg>',
  'mandacaru.svg': cards['mandacaru.svg'],
  'rock.svg': cards['rock.svg'],
  'vegetation.svg': cards['vegetation.svg'],
  'lear-macaw.svg': cards['lear-macaw.svg'],
};

const ui = {
  'licuri-coin.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><circle cx="64" cy="64" r="57" fill="#ffc843"/><ellipse cx="64" cy="65" rx="20" ry="31" fill="#855630"/><path d="M64 34v62" stroke="#6b9238" stroke-width="8"/></svg>',
  'trophy.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path d="M40 15h48v38a24 24 0 01-48 0zM40 25H17v18a21 21 0 0023 20M88 25h23v18a21 21 0 01-23 20M64 77v22M40 110h48" fill="none" stroke="#c58b19" stroke-width="10" stroke-linecap="round"/></svg>',
  'clock.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><circle cx="64" cy="64" r="48" fill="none" stroke="#1675b8" stroke-width="10"/><path d="M64 34v31l22 15" fill="none" stroke="#1675b8" stroke-width="10" stroke-linecap="round"/></svg>',
  'leaf.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path d="M110 18C45 20 18 55 18 110c55 0 90-27 92-92z" fill="#6b9238"/></svg>',
  'feather.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path d="M64 12C28 48 32 85 64 116c32-31 36-68 0-104zM64 30v70" fill="#8ed1eb" stroke="#1675b8" stroke-width="8"/></svg>'
};

for (const [folder, files] of Object.entries({ cards, biome, ui })) {
  await mkdir(join(root, folder), { recursive: true });
  await Promise.all(Object.entries(files).map(([name, svg]) => writeFile(join(root, folder, name), svg)));
}
