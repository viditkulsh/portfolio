/**
 * The Explore world's contents.
 *
 * Each monument represents something real from the portfolio, so the world
 * is a second reading of the same material rather than a decorative toy.
 * Positions are laid out as a district: research at the far end, current
 * work at the centre, contact at the entrance.
 *
 * Height encodes scope and colour encodes kind — so the skyline itself is
 * legible before you read a single label.
 */

export const KIND_COLOR = {
  research: '#5fbdb4',
  system: '#f2733c',
  role: '#c9c0b2',
  contact: '#8fb573',
};

export const monuments = [
  {
    id: 'agp',
    kind: 'role',
    label: 'AGP Webpulse',
    sub: 'Tokenization infrastructure',
    body: 'Current role. Architecting a regulated platform for tokenizing financial instruments, and the multi-tier permission system underneath it.',
    position: [0, 0, -2],
    size: [2.4, 5.2, 2.4],
    link: { to: '/#experience', label: 'See the role' },
  },
  {
    id: 'drdo',
    kind: 'research',
    label: 'DRDO',
    sub: 'Cross-chain interoperability',
    body: 'Research into trustless cross-chain communication — how chain B can verify what chain A finalised without a trusted party in between.',
    position: [-7, 0, -8],
    size: [2.2, 4.2, 2.2],
    link: { to: '/#research', label: 'Read the research' },
  },
  {
    id: 'astraeus',
    kind: 'role',
    label: 'Astraeus Next Gen',
    sub: 'Bridge prototypes',
    body: 'Proof-of-concept cross-chain bridges in Solidity, held above 90% test coverage.',
    position: [-3.5, 0, -7.5],
    size: [1.8, 3.4, 1.8],
    link: { to: '/#experience', label: 'See the role' },
  },
  {
    id: 'idittrack',
    kind: 'system',
    label: 'IditTrack',
    sub: 'Inventory & orders',
    body: 'Micro-SaaS for small businesses. The interesting part is the adapter layer that makes three incompatible POS formats agree.',
    position: [5.5, 0, -3],
    size: [2.6, 4.6, 2.6],
    link: { to: '/work/idittrack', label: 'Open case study' },
  },
  {
    id: 'sathisahyogi',
    kind: 'system',
    label: 'SathiSahyogi',
    sub: 'Coordination on Ethereum',
    body: 'Volunteer matching and fund release as smart contracts, so the record everyone depends on is one nobody has to trust.',
    position: [4.5, 0, 3.5],
    size: [2.2, 3.8, 2.2],
    link: { to: '/work/sathisahyogi', label: 'Open case study' },
  },
  {
    id: 'hemochain',
    kind: 'system',
    label: 'HemoChain',
    sub: 'Provenance under privacy',
    body: 'One ERC-721 per blood unit. Public journey, private donor — reconciled with zero-knowledge proofs and off-chain reports on IPFS.',
    position: [-5.5, 0, 2.5],
    size: [1.9, 3.2, 1.9],
    link: { to: '/work', label: 'See all work' },
  },
  {
    id: 'adbhut',
    kind: 'system',
    label: 'Adbhut Global',
    sub: 'Shipped and live',
    body: 'A client site in production since April 2025. Judged on load time and conversion, not architecture.',
    position: [8, 0, 2],
    size: [1.7, 2.4, 1.7],
    link: { to: '/work/adbhutglobal', label: 'Open case study' },
  },
  {
    id: 'foundations',
    kind: 'research',
    label: 'Foundations',
    sub: 'NAND to Tetris, cryptography',
    body: 'A working computer built up from logic gates, and cryptography studied formally — so "how does this work" has an answer that bottoms out.',
    position: [-8.5, 0, -1.5],
    size: [1.6, 2.8, 1.6],
    link: { to: '/#research', label: 'Read the research' },
  },
  {
    id: 'contact',
    kind: 'contact',
    label: 'Contact',
    sub: 'Start a conversation',
    body: 'Open to work on systems where correctness and trust matter.',
    position: [0, 0, 7],
    size: [2.8, 1.6, 2.8],
    link: { to: '/#contact', label: 'Get in touch' },
  },
];

/** Edges that reflect real lineage — research feeding the work it produced. */
export const connections = [
  ['drdo', 'astraeus'],
  ['astraeus', 'agp'],
  ['drdo', 'agp'],
  ['foundations', 'drdo'],
  ['agp', 'idittrack'],
  ['sathisahyogi', 'hemochain'],
  ['agp', 'sathisahyogi'],
  ['idittrack', 'adbhut'],
  ['agp', 'contact'],
];
