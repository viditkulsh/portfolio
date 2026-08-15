/**
 * System architecture for the flagship case studies.
 *
 * GROUNDING RULE — read before editing.
 * Every node, edge and note below traces to something Vidit already stated
 * about his own work (projectsData.js `technicalDepth` / `challenges` /
 * `highlights`, the résumé PDFs in public/resumes, or the GitHub repo
 * metadata in githubData.json). The `source` field on each diagram records
 * which. Nothing here is inferred from what a system of this kind "would
 * normally" contain — if a fact isn't on record, the node doesn't exist.
 *
 * Adding a node means adding its source.
 */

/** Node kinds drive colour and shape, so the diagram legend stays honest. */
export const NODE_KIND = {
  CLIENT: 'client',
  SERVICE: 'service',
  DATA: 'data',
  CHAIN: 'chain',
  EXTERNAL: 'external',
  CROSSCUT: 'crosscut',
};

export const architectureData = {
  idittrack: {
    projectId: 11,
    title: 'IditTrack',
    subtitle: 'Inventory & order management for small businesses',
    source:
      'projectsData.js — technicalDepth, challenges, highlights; résumé (Full Stack, Software Eng): React/Node/MongoDB/REST, Docker',
    // The one hard problem worth the reader's attention. Stated by Vidit as
    // "the biggest challenge" — so it leads.
    thesis:
      'Legacy POS systems disagree about everything. The interesting engineering is the adapter layer that makes them agree.',
    layers: [
      {
        id: 'edge',
        label: 'Client',
        nodes: [
          {
            id: 'web',
            label: 'React SPA',
            kind: NODE_KIND.CLIENT,
            detail: 'Role-aware UI — admin, warehouse manager and sales rep see different data and actions.',
          },
        ],
      },
      {
        id: 'api',
        label: 'API',
        nodes: [
          {
            id: 'rest',
            label: 'Express REST API',
            kind: NODE_KIND.SERVICE,
            detail: 'Product catalogue, order tracking and inventory endpoints.',
          },
          {
            id: 'ws',
            label: 'WebSocket sync',
            kind: NODE_KIND.SERVICE,
            detail:
              'Real-time inventory sync engine. Stock levels change from several sources at once, so pushing beats polling.',
          },
        ],
      },
      {
        id: 'logic',
        label: 'Business logic',
        nodes: [
          {
            id: 'auth',
            label: 'JWT + refresh rotation',
            kind: NODE_KIND.CROSSCUT,
            detail:
              'Refresh tokens rotate on use, so a stolen refresh token is single-use and detectable.',
          },
          {
            id: 'rbac',
            label: 'RBAC resolver',
            kind: NODE_KIND.CROSSCUT,
            detail:
              'Permissions resolved through MongoDB aggregation pipelines. Supply chains are permission webs, not hierarchies — roles compose rather than nest.',
          },
          {
            id: 'adapter',
            label: 'POS adapter layer',
            kind: NODE_KIND.SERVICE,
            emphasis: true,
            detail:
              'Normalises XML, JSON and CSV-over-FTP into one internal schema without dropping fields. This is the load-bearing piece.',
          },
          {
            id: 'ftp',
            label: 'FTP stream processor',
            kind: NODE_KIND.SERVICE,
            detail:
              'Node streams rather than buffered reads, so a large supplier file does not sit in memory.',
          },
        ],
      },
      {
        id: 'data',
        label: 'Data',
        nodes: [
          {
            id: 'mongo',
            label: 'MongoDB',
            kind: NODE_KIND.DATA,
            detail: 'Products, orders, roles and permission documents.',
          },
        ],
      },
      {
        id: 'ext',
        label: 'External',
        nodes: [
          {
            id: 'pos',
            label: 'Legacy POS systems',
            kind: NODE_KIND.EXTERNAL,
            detail: 'Three formats in the wild: XML, JSON, and CSV delivered over FTP.',
          },
        ],
      },
    ],
    edges: [
      { from: 'web', to: 'rest', label: 'REST' },
      { from: 'web', to: 'ws', label: 'subscribe', kind: 'live' },
      { from: 'rest', to: 'auth' },
      { from: 'rest', to: 'rbac' },
      { from: 'rest', to: 'mongo' },
      { from: 'rbac', to: 'mongo', label: 'aggregation' },
      { from: 'pos', to: 'adapter', label: 'XML / JSON', kind: 'ingest' },
      { from: 'pos', to: 'ftp', label: 'CSV over FTP', kind: 'ingest' },
      { from: 'ftp', to: 'adapter' },
      { from: 'adapter', to: 'mongo', label: 'normalised' },
      { from: 'adapter', to: 'ws', label: 'stock delta', kind: 'live' },
    ],
    // Shown in Layer 3. Each is a decision Vidit recorded making.
    tradeoffs: [
      {
        decision: 'One adapter layer instead of per-vendor forks',
        why: 'Every new POS format would otherwise fork the ingest path and multiply the code that can silently lose a field.',
        cost: 'The normalised schema has to be the superset of every vendor format, so it carries fields most tenants never populate.',
      },
      {
        decision: 'Streams for FTP ingest',
        why: 'Large supplier files would otherwise be read into memory whole, and memory is the cheapest thing to run out of.',
        cost: 'Stream error handling is harder to get right than buffered reads, and partial-failure recovery has to be explicit.',
      },
      {
        decision: 'Aggregation-pipeline RBAC over nested role documents',
        why: 'Real permissions compose across dimensions — a warehouse manager for one region is a read-only user for another.',
        cost: 'Permission checks become database queries, so they must be cached or they sit on every request.',
      },
    ],
  },

  sathisahyogi: {
    projectId: 8,
    title: 'SathiSahyogi',
    subtitle: 'Volunteer coordination on Ethereum',
    source:
      'GitHub repo viditkulsh/sathisahyogi description (Ethereum, smart-contract matching of volunteer skills to beneficiary needs); résumé (Blockchain): campaign creation, contributions, fund release, Hardhat, Ethers.js, React, Tailwind, MetaMask; projectsData.js — role-based access, resource tracking',
    thesis:
      'Coordination fails when nobody trusts the record. Putting commitments and fund release on-chain makes the record the thing everyone can check.',
    layers: [
      {
        id: 'edge',
        label: 'Client',
        nodes: [
          {
            id: 'web',
            label: 'React + Tailwind',
            kind: NODE_KIND.CLIENT,
            detail: 'Volunteer and NGO views over the same contract state.',
          },
          {
            id: 'wallet',
            label: 'MetaMask',
            kind: NODE_KIND.CLIENT,
            detail: 'Wallet is the identity — no separate account system to keep in sync.',
          },
        ],
      },
      {
        id: 'access',
        label: 'Access control',
        nodes: [
          {
            id: 'roles',
            label: 'Role-based access',
            kind: NODE_KIND.CROSSCUT,
            detail:
              'NGO admins delegate specific capabilities to coordinators without handing over full control.',
          },
        ],
      },
      {
        id: 'contracts',
        label: 'Contracts',
        nodes: [
          {
            id: 'campaign',
            label: 'Campaign contract',
            kind: NODE_KIND.CHAIN,
            emphasis: true,
            detail: 'Campaign creation, contribution accounting and fund release conditions.',
          },
          {
            id: 'matching',
            label: 'Matching logic',
            kind: NODE_KIND.CHAIN,
            detail: 'Aligns volunteer skills against beneficiary needs so allocation is visible, not ad hoc.',
          },
        ],
      },
      {
        id: 'chain',
        label: 'Network',
        nodes: [
          {
            id: 'eth',
            label: 'Ethereum',
            kind: NODE_KIND.CHAIN,
            detail: 'Settlement and the shared record of who committed to what.',
          },
        ],
      },
      {
        id: 'tooling',
        label: 'Toolchain',
        nodes: [
          {
            id: 'hardhat',
            label: 'Hardhat + Ethers.js',
            kind: NODE_KIND.EXTERNAL,
            detail: 'Deployment and test harness for the contract suite.',
          },
        ],
      },
    ],
    edges: [
      { from: 'web', to: 'wallet', label: 'sign' },
      { from: 'wallet', to: 'roles' },
      { from: 'roles', to: 'campaign', label: 'authorised call' },
      { from: 'campaign', to: 'matching' },
      { from: 'campaign', to: 'eth', label: 'state', kind: 'settle' },
      { from: 'matching', to: 'eth', kind: 'settle' },
      { from: 'hardhat', to: 'campaign', label: 'deploy / test', kind: 'ingest' },
    ],
    tradeoffs: [
      {
        decision: 'Put fund release on-chain rather than in an off-chain ledger',
        why: 'Contribution and release are exactly the events donors and NGOs need to verify without trusting the operator.',
        cost: 'Every state change costs gas and is public, so nothing sensitive can live in contract storage.',
      },
      {
        decision: 'Wallet as identity',
        why: 'Removes a password system and keeps authorisation and settlement in the same trust domain.',
        cost: 'Onboarding now requires a wallet, which is a real barrier for the volunteer audience.',
      },
      {
        decision: 'Delegated capabilities instead of a single admin key',
        why: 'Coordinators need to act during a campaign without holding the keys to the funds.',
        cost: 'More contract surface to test — role transitions are where access-control bugs live.',
      },
    ],
  },

  adbhutglobal: {
    projectId: 9,
    title: 'Adbhut Global',
    subtitle: 'Corporate site — client delivery',
    source:
      'projectsData.js + experienceData.js (Adbhut Global, Apr 2025); résumé (all three variants): React/HTML/Tailwind, image optimisation, lazy loading, CDN. Live at adbhutglobal.com.',
    // Deliberately not given an architecture diagram: this is a marketing
    // site, and drawing a system for it would be dressing up delivery work
    // as something it isn't. It earns its flagship slot on shipping and
    // measured outcomes instead.
    presentation: 'delivery',
    thesis:
      'A client site is judged on whether it loads and converts. The work was performance and structure, not architecture.',
    deliveryNotes: [
      {
        label: 'Shipped',
        value: 'adbhutglobal.com',
        detail: 'Live in production since April 2025.',
      },
      {
        label: 'Load time',
        value: '35% faster',
        detail: 'Image compression, lazy loading and CDN delivery.',
        claim: 'reported',
      },
      {
        label: 'Engagement',
        value: '+40%',
        detail: 'Reported by the client after a mobile-first rebuild.',
        claim: 'reported',
      },
      {
        label: 'Bounce rate',
        value: '−25%',
        detail: 'Reported alongside the engagement figure.',
        claim: 'reported',
      },
      {
        label: 'Form volume',
        value: '500+ / day',
        detail: 'Backend logic sized for sustained daily submissions.',
        claim: 'reported',
      },
    ],
  },
};

export const getArchitecture = (key) => architectureData[key] || null;

export const architectureByProjectId = (id) =>
  Object.values(architectureData).find((a) => a.projectId === Number(id)) || null;

export default architectureData;
