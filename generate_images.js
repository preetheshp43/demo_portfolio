import fs from 'fs';
import path from 'path';

const outDir = 'C:\\Users\\PC - 06\\.gemini\\antigravity\\scratch\\preethesh-portfolio\\public\\images';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const cards = [
  {
    name: 'project-1.svg',
    badge: 'AGENTIC AI',
    title: 'Retail Supply Chain',
    sub: 'Multi-Agent Decision Engine',
    color: '#2f7d6d',
    symbol: '<path d="M160 100 L185 145 L135 145 Z" fill="none" stroke="#2f7d6d" stroke-width="3"/><circle cx="160" cy="130" r="12" fill="#2f7d6d"/>'
  },
  {
    name: 'project-2.svg',
    badge: 'ML OPTIMIZER',
    title: 'Disaster Response',
    sub: 'Real-Time Resource Dispatch',
    color: '#3ea894',
    symbol: '<path d="M160 95 L145 130 L165 130 L155 165 L180 125 L160 125 Z" fill="#3ea894"/>'
  },
  {
    name: 'project-3.svg',
    badge: 'CORE PYTHON',
    title: 'Academic GPA Calc',
    sub: 'Deterministic Matrix Engine',
    color: '#2f7d6d',
    symbol: '<text x="160" y="145" font-family="monospace" font-size="44" font-weight="bold" fill="#f4f1ea" text-anchor="middle">&#931;</text>'
  },
  {
    name: 'project-4.svg',
    badge: 'ARCHITECTURE',
    title: 'Agent Tool Router',
    sub: 'State Persistence &amp; Eval',
    color: '#5ec4b0',
    symbol: '<rect x="135" y="105" width="50" height="50" rx="8" fill="none" stroke="#5ec4b0" stroke-width="3"/><circle cx="160" cy="130" r="10" fill="#5ec4b0"/>'
  },
  {
    name: 'project-5.svg',
    badge: 'FULL STACK',
    title: 'React &amp; TypeScript',
    sub: 'High-Craft Design System',
    color: '#2f7d6d',
    symbol: '<ellipse cx="160" cy="130" rx="28" ry="12" fill="none" stroke="#2f7d6d" stroke-width="2.5"/><ellipse cx="160" cy="130" rx="28" ry="12" transform="rotate(60 160 130)" fill="none" stroke="#2f7d6d" stroke-width="2.5"/><ellipse cx="160" cy="130" rx="28" ry="12" transform="rotate(120 160 130)" fill="none" stroke="#2f7d6d" stroke-width="2.5"/><circle cx="160" cy="130" r="5" fill="#f4f1ea"/>'
  },
  {
    name: 'project-6.svg',
    badge: 'DATA PIPELINE',
    title: 'Geo-Severity ML',
    sub: 'Emergency Clustering Pipeline',
    color: '#3ea894',
    symbol: '<circle cx="145" cy="120" r="8" fill="#3ea894"/><circle cx="175" cy="115" r="12" fill="#3ea894" fill-opacity="0.6"/><circle cx="160" cy="145" r="10" fill="#3ea894"/><line x1="145" y1="120" x2="175" y2="115" stroke="#f4f1ea" stroke-width="1.5"/><line x1="145" y1="120" x2="160" y2="145" stroke="#f4f1ea" stroke-width="1.5"/><line x1="175" y1="115" x2="160" y2="145" stroke="#f4f1ea" stroke-width="1.5"/>'
  },
  {
    name: 'project-7.svg',
    badge: 'SYSTEM DESIGN',
    title: 'Algorithms &amp; DSA',
    sub: 'Low-Latency Optimization',
    color: '#2f7d6d',
    symbol: '<path d="M135 115 L160 95 L185 115 L160 135 Z" fill="none" stroke="#2f7d6d" stroke-width="2.5"/><path d="M135 135 L160 115 L185 135 L160 155 Z" fill="none" stroke="#3ea894" stroke-width="2.5"/><circle cx="160" cy="125" r="4" fill="#f4f1ea"/>'
  }
];

for (const card of cards) {
  const content = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" width="320" height="320">
  <defs>
    <linearGradient id="bg-${card.name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#181422"/>
      <stop offset="100%" stop-color="#0c0a10"/>
    </linearGradient>
    <pattern id="grid-${card.name}" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(244,241,234,0.05)" stroke-width="1"/>
    </pattern>
  </defs>
  
  <rect width="320" height="320" rx="16" fill="url(#bg-${card.name})"/>
  <rect width="320" height="320" rx="16" fill="url(#grid-${card.name})"/>
  <rect x="1" y="1" width="318" height="318" rx="15" fill="none" stroke="${card.color}" stroke-opacity="0.35" stroke-width="2"/>
  
  <rect x="24" y="24" width="118" height="26" rx="6" fill="${card.color}" fill-opacity="0.18" stroke="${card.color}" stroke-opacity="0.5"/>
  <text x="83" y="41" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="bold" fill="${card.color}" text-anchor="middle" letter-spacing="1">${card.badge}</text>
  
  <circle cx="160" cy="130" r="46" fill="#1e1828" stroke="${card.color}" stroke-width="1.5" stroke-dasharray="4 3"/>
  ${card.symbol}
  
  <text x="160" y="215" font-family="'Space Grotesk', -apple-system, sans-serif" font-size="18" font-weight="bold" fill="#f4f1ea" text-anchor="middle">${card.title}</text>
  <text x="160" y="240" font-family="'Inter', sans-serif" font-size="12" fill="#a8a29e" text-anchor="middle">${card.sub}</text>
  
  <line x1="40" y1="270" x2="280" y2="270" stroke="rgba(244,241,234,0.1)" stroke-width="1"/>
  <text x="160" y="292" font-family="'JetBrains Mono', monospace" font-size="9" fill="${card.color}" text-anchor="middle" letter-spacing="2">PROJECT ARCHIVE // PREETHESH</text>
</svg>`;

  const filePath = path.join(outDir, card.name);
  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('All 7 SVGs re-written with valid XML entities.');
