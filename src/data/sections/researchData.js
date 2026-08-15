/**
 * The research dimension — how a question becomes a shipped system.
 *
 * GROUNDING RULE — read before editing.
 * These are threads Vidit actually worked, drawn from experienceData.js,
 * portfolioData.js (education.capstone, about.bio), projectsData.js
 * (keyLearnings / challenges / technicalDepth) and the résumé PDFs.
 * This is not a "research lab" invented to fill a section: every thread
 * below names the role or project it happened inside.
 *
 * A thread only earns a `delivered` stage if something concrete came out.
 * Where a thread is still open, it says so.
 */

/** The spine. Rendered as the section's progress structure. */
export const METHOD = [
  { id: 'question', label: 'Question', note: 'What is actually being asked?' },
  { id: 'research', label: 'Research', note: 'What is already known, and by whom?' },
  { id: 'understand', label: 'Understand', note: 'Where are the real constraints?' },
  { id: 'design', label: 'Design', note: 'Which trade-off am I choosing, and why?' },
  { id: 'build', label: 'Build', note: 'Make it exist.' },
  { id: 'validate', label: 'Validate', note: 'Prove it behaves under pressure.' },
  { id: 'deliver', label: 'Deliver', note: 'Hand over something that runs.' },
];

export const researchThreads = [
  {
    id: 'interop',
    title: 'Trustless cross-chain interoperability',
    context: 'DRDO · Blockchain Research Intern · Jan–May 2025',
    source: 'experienceData.js id 3; résumé (all variants); education.capstone',
    // The single most credible depth signal on the site: a defence research
    // organisation, a named problem, and a capstone built on top of it.
    weight: 'primary',
    summary:
      'How do you move an asset between two chains that have no reason to trust each other, without inserting a party that everyone has to trust instead?',
    stages: {
      question:
        'Cross-chain asset transfer usually reintroduces a trusted intermediary — the thing blockchains exist to remove. Can the transfer be made trustless end to end?',
      research:
        'Surveyed cross-chain communication and asset-transfer protocols across Ethereum-compatible chains, and the cryptographic assumptions each one rests on.',
      understand:
        'The hard part is not moving value, it is proving to chain B what chain A already finalised — and every mechanism buys that proof with a different trust assumption.',
      design:
        'Produced architectural diagrams and technical documentation mapping the secure-transfer mechanisms and where each one places its trust.',
      build:
        'Fed directly into proof-of-concept bridge work at Astraeus Next Gen — Solidity, Hardhat, Ethers.js.',
      validate: 'Bridge contracts held above 90% test coverage.',
      deliver:
        'Research documentation supporting academic proposals, and the BCA (Hons) capstone on interoperability protocols with DRDO and Astraeus Next Gen.',
    },
    outcome: {
      label: 'Became',
      value: 'Capstone research + working bridge prototypes',
    },
    tags: ['Cross-chain', 'Cryptography', 'Solidity', 'Protocol design'],
  },

  {
    id: 'tokenization',
    title: 'Tokenizing regulated financial instruments',
    context: 'AGP Webpulse LLC · Assistant Manager, IT Web3 · Dec 2025–present',
    source:
      'Vidit_Kulsh_CV.pdf (updated 24 Jun 2026) — RWA platform, 365+ APIs, 60+ tables, 140+ migrations, Foundry suite of 3,300+ tests across 130+ suites; experienceData.js id 1',
    weight: 'primary',
    summary:
      'What has to be true — technically and legally — before a real-world asset can exist as a token a regulator will accept, and how do you prove the contracts behave before real money touches them?',
    stages: {
      question:
        'Tokenization is straightforward until compliance is a requirement. What does a regulated issuer actually need the chain to guarantee, and how do you demonstrate it holds?',
      research:
        'Tokenization standards and security practices first; then technical due diligence across third-party identity, compliance, custody, wallet and blockchain providers before committing to any of them.',
      understand:
        'The constraint is not the token — it is who may mint, transfer, freeze or recover it, who may approve that, and whether the audit trail can prove what happened afterwards.',
      design:
        'A multi-role access-control model with audit mechanisms and governance workflows, over a data layer of 60+ tables and 140+ migrations built for integrity rather than speed of change.',
      build:
        '365+ backend APIs in Next.js, TypeScript, PostgreSQL and Supabase covering onboarding, governance, compliance, transaction and operational workflows across 5 user roles.',
      validate:
        'A complete Foundry validation suite: 3,300+ test cases across 130+ suites spanning unit, fuzz, invariant, RBAC, integration, attack-vector and state-machine testing. In a system holding other people’s assets, the suite is the deliverable as much as the contracts are.',
      deliver:
        'Platform in active production development, with automated testing covering authorization, workflow validation and business rules.',
    },
    outcome: {
      label: 'Validation',
      value: '3,300+ test cases · 130+ suites',
      open: true,
    },
    tags: ['RWA tokenization', 'Foundry', 'Access control', 'PostgreSQL', 'Next.js'],
  },

  {
    id: 'privacy',
    title: 'Privacy against transparency, in the same system',
    context: 'HemoChain · Ethereum blood-donation tracking · 2024',
    source: 'projectsData.js id 6 — challenges, technicalDepth, keyLearnings',
    weight: 'secondary',
    summary:
      'A blood unit’s journey has to be public for anyone to trust it. The donor behind it must not be. Both constraints are non-negotiable.',
    stages: {
      question:
        'How do you make a supply chain auditable without making the people in it identifiable?',
      research:
        'Examined which parts of the record genuinely need to be on-chain, and which only need to be provable.',
      understand:
        'Transparency is needed at the unit level, confidentiality at the person level — so the two have to be separated in storage, not just in the UI.',
      design:
        'Zero-knowledge proofs for donor identity verification; the unit’s tracking history stays fully public. Medical test reports live on IPFS, referenced from the token by URI, so sensitive documents never touch chain storage.',
      build:
        'ERC-721 token per blood unit, carrying blood type, collection date, storage conditions and test results. Role-based access via OpenZeppelin AccessControl for hospitals, blood banks and donors.',
      validate:
        'Gas cost forced batch processing of multiple donations; deployed to a Polygon testnet to keep fees viable while staying Ethereum-compatible.',
      deliver: 'Proof of concept deployed. Live at hemochain.com.',
    },
    outcome: {
      label: 'Became',
      value: 'Deployed proof of concept',
    },
    tags: ['ERC-721', 'Zero-knowledge', 'IPFS', 'Polygon'],
  },

  {
    id: 'rbac',
    title: 'Permission models that survive scale',
    context: 'IditTrack · Inventory & order management · 2025',
    source: 'projectsData.js id 11 — keyLearnings, technicalDepth, challenges',
    weight: 'secondary',
    summary:
      'Role-based access looks simple until the roles stop nesting. Supply chains are permission webs, and the complexity grows faster than the org chart.',
    stages: {
      question:
        'Why do role systems that work at ten users become unmaintainable at a hundred?',
      research:
        'Traced how admin, warehouse manager and sales-rep roles actually differ — not in pages, but in which rows they may see and which actions they may take.',
      understand:
        'Roles compose across dimensions rather than nesting inside one another. A hierarchy cannot express "manager here, read-only there".',
      design:
        'A flexible permission model resolved through MongoDB aggregation pipelines, so composite role queries stay expressible instead of hard-coded.',
      build:
        'Implemented alongside JWT authentication with refresh-token rotation.',
      validate:
        'Exercised against the real multi-role workflows the platform was built for.',
      deliver: 'Shipped as part of IditTrack, containerised with Docker.',
    },
    outcome: {
      label: 'Became',
      value: 'IditTrack’s access layer',
    },
    tags: ['RBAC', 'MongoDB', 'JWT', 'System design'],
  },

  {
    id: 'foundations',
    title: 'Working down to first principles',
    context: 'Self-directed, alongside BCA (Hons) · Bennett University',
    source:
      'public/images/certificates — Nand2Tetris parts 1 & 2, Cryptography (UMD), Blockchain Specialization (SUNY Buffalo)',
    weight: 'secondary',
    summary:
      'Building a working computer from NAND gates upward, and studying cryptography formally, so that "how does this actually work" has an answer that bottoms out.',
    stages: {
      question: 'What is underneath the abstractions I use every day?',
      research:
        'Nand2Tetris parts 1 and 2 — logic gates, ALU, CPU, assembler, VM, compiler and OS. Cryptography at the University of Maryland.',
      understand:
        'Consensus, hashing and signatures stop being vocabulary once you have implemented the layers they sit on.',
      design: 'Applied directly to blockchain coursework and specialisation work.',
      build: 'Carried into smart-contract and protocol work rather than left as coursework.',
      validate: 'Outstanding Academic Achievement in two consecutive semesters (SGPA 9.48, 9.2).',
      deliver: 'CGPA 8.78/10, BCA (Hons), 2025.',
    },
    outcome: {
      label: 'Result',
      value: 'Depth that transfers',
    },
    tags: ['Computer architecture', 'Cryptography', 'Fundamentals'],
  },
];

export const getThread = (id) => researchThreads.find((t) => t.id === id) || null;

export const primaryThreads = () => researchThreads.filter((t) => t.weight === 'primary');

export default researchThreads;
