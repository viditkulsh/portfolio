/**
 * Certificates.
 *
 * The previous version pointed every entry at a `/images/certificates/*.jpg`
 * that does not exist in the repo — 18 dead image requests rendering as empty
 * boxes. The real artefacts are the PDFs in public/images/certificates, so
 * each entry now carries `file` (the actual document) and no fabricated image.
 * The UI renders a typographic card from issuer + credential ID and links to
 * the PDF and the issuer's verification URL.
 *
 * `group` drives presentation: technical certificates lead, the breadth ones
 * are collapsed behind a disclosure rather than padding the page.
 */

const DIR = '/images/certificates';

export const certificatesData = [
  // ── Foundations: the ones that evidence depth ──────────────────────────
  {
    id: 20,
    title: 'Build a Modern Computer from First Principles: Nand to Tetris I',
    issuer: 'Hebrew University of Jerusalem',
    date: '',
    credentialId: '',
    skills: ['Boolean Logic', 'ALU Design', 'Machine Language', 'Computer Architecture'],
    file: `${DIR}/Nand2Tetris.pdf`,
    verificationUrl: '',
    group: 'foundations',
    note: 'Logic gates up to a working CPU.',
  },
  {
    id: 21,
    title: 'Nand to Tetris II: Building a Modern Computer, Project-Centered',
    issuer: 'Hebrew University of Jerusalem',
    date: '',
    credentialId: '',
    skills: ['Assembler', 'Virtual Machine', 'Compiler', 'Operating System'],
    file: `${DIR}/Nand2Tetris2.pdf`,
    verificationUrl: '',
    group: 'foundations',
    note: 'Assembler through compiler and OS.',
  },
  {
    id: 8,
    title: 'Cryptography',
    issuer: 'University of Maryland, College Park',
    date: 'November 7, 2024',
    credentialId: '0WQ67B639L8N',
    skills: ['Algorithms', 'Encryption', 'Cybersecurity'],
    file: `${DIR}/Cryptography.pdf`,
    verificationUrl: 'https://coursera.org/verify/0WQ67B639L8N',
    group: 'foundations',
  },
  {
    id: 3,
    title: 'The Bits and Bytes of Computer Networking',
    issuer: 'Google',
    date: 'February 25, 2024',
    credentialId: 'ZHFD5ZA8YQ4G',
    skills: ['OSI Model', 'Network Security', 'DHCP'],
    file: `${DIR}/Bits and Bytes of Computning Networking.pdf`,
    verificationUrl: 'https://coursera.org/verify/ZHFD5ZA8YQ4G',
    group: 'foundations',
  },
  {
    id: 11,
    title: 'Linux Fundamentals',
    issuer: 'LearnQuest',
    date: 'September 8, 2023',
    credentialId: 'H3XUJMHTZVA8',
    skills: ['Linux', 'Bash', 'Command-Line Interface'],
    file: `${DIR}/Linux_Fundamentals_Coursera.pdf`,
    verificationUrl: 'https://coursera.org/verify/H3XUJMHTZVA8',
    group: 'foundations',
  },

  // ── Blockchain specialisation track ───────────────────────────────────
  {
    id: 6,
    title: 'Blockchain Specialization',
    issuer: 'University at Buffalo (SUNY)',
    date: 'April 17, 2024',
    credentialId: 'NKNTMAC6QJJ9',
    skills: ['Blockchain'],
    file: `${DIR}/Blockchain Specialization.pdf`,
    verificationUrl: 'https://coursera.org/verify/specialization/NKNTMAC6QJJ9',
    group: 'blockchain',
    note: 'Four-course specialisation.',
    isSpecialization: true,
  },
  {
    id: 2,
    title: 'Blockchain Basics',
    issuer: 'University at Buffalo (SUNY)',
    date: 'April 17, 2024',
    credentialId: 'R4JUF8CEGFE5',
    skills: [],
    file: `${DIR}/Blockchain Basic Coursera.pdf`,
    verificationUrl: 'https://coursera.org/verify/R4JUF8CEGFE5',
    group: 'blockchain',
  },
  {
    id: 22,
    title: 'Smart Contracts',
    issuer: 'University at Buffalo (SUNY)',
    date: '',
    credentialId: '',
    skills: ['Solidity', 'Smart Contracts'],
    file: `${DIR}/Smart_Contracts_Coursera.pdf`,
    verificationUrl: '',
    group: 'blockchain',
  },
  {
    id: 7,
    title: 'Decentralized Applications (DApps)',
    issuer: 'University at Buffalo (SUNY)',
    date: 'February 26, 2024',
    credentialId: 'VFABPJNPGS6E',
    skills: [],
    file: `${DIR}/Decentralized Applications Certificate.pdf`,
    verificationUrl: 'https://coursera.org/verify/VFABPJNPGS6E',
    group: 'blockchain',
  },
  {
    id: 1,
    title: 'Blockchain Platforms',
    issuer: 'University at Buffalo (SUNY)',
    date: 'April 25, 2024',
    credentialId: 'LLQ33LSJH7UQ',
    skills: [],
    file: `${DIR}/Blockchain Platforms.pdf`,
    verificationUrl: 'https://coursera.org/verify/LLQ33LSJH7UQ',
    group: 'blockchain',
  },

  // ── Cloud & platform ──────────────────────────────────────────────────
  {
    id: 4,
    title: 'AWS Academy Cloud Foundations',
    issuer: 'AWS Academy',
    date: '',
    credentialId: 'c7fa381f-b831-4a8d-a58c-87b0f94f3619',
    skills: ['Cloud Foundations'],
    file: `${DIR}/AWS_Academy_Graduate___AWS_Academy_Cloud_Foundations_Badge20231120-29-9zfuw2.pdf`,
    verificationUrl: 'https://www.credly.com/go/5EiLSUn8',
    group: 'platform',
  },
  {
    id: 12,
    title: 'Introduction to Mobile App Development',
    issuer: 'IBM',
    date: 'November 19, 2024',
    credentialId: 'PHT1O885P355',
    skills: ['Mobile Development', 'Android', 'iOS'],
    file: `${DIR}/Introduction to Mobile App Development.pdf`,
    verificationUrl: 'https://coursera.org/verify/PHT1O885P355',
    group: 'platform',
  },

  // ── Breadth: real, but secondary. Collapsed in the UI. ─────────────────
  {
    id: 5,
    title: 'AI, Empathy & Ethics',
    issuer: 'University of California, Santa Cruz',
    date: 'November 13, 2023',
    credentialId: 'RTSATUDW7RSB',
    skills: ['Artificial Intelligence', 'Data Ethics'],
    file: `${DIR}/Ai_Empathy & Ethics.pdf`,
    verificationUrl: 'https://coursera.org/verify/RTSATUDW7RSB',
    group: 'breadth',
  },
  {
    id: 13,
    title: 'Introduction to Intellectual Property',
    issuer: 'University of Pennsylvania',
    date: 'November 6, 2023',
    credentialId: 'YZX7CZR9W6R2',
    skills: ['Intellectual Property', 'Legal Strategy'],
    file: `${DIR}/Intro_to_intellec_prop.pdf`,
    verificationUrl: 'https://coursera.org/verify/YZX7CZR9W6R2',
    group: 'breadth',
  },
  {
    id: 17,
    title: 'Project Management: The Basics for Success',
    issuer: 'University of California, Irvine',
    date: 'December 8, 2024',
    credentialId: '0DT3VCWKTZ59',
    skills: ['Project Management', 'Leadership'],
    file: `${DIR}/Prj Management.pdf`,
    verificationUrl: 'https://www.coursera.org/account/accomplishments/verify/0DT3VCWKTZ59',
    group: 'breadth',
  },
  {
    id: 14,
    title: 'Work Smarter, Not Harder: Time Management',
    issuer: 'University of California, Irvine',
    date: 'December 5, 2024',
    credentialId: 'G5SCH3JYI6TP',
    skills: ['Time Management', 'Prioritization'],
    file: `${DIR}/Wrk_Smart Not Hard.pdf`,
    verificationUrl: 'https://coursera.org/verify/G5SCH3JYI6TP',
    group: 'breadth',
  },
  {
    id: 15,
    title: 'Introduction to Psychology',
    issuer: 'Princeton University',
    date: 'December 5, 2024',
    credentialId: 'W4N5JM7YVYNU',
    skills: ['Psychology'],
    file: `${DIR}/Psychology.pdf`,
    verificationUrl: 'https://coursera.org/verify/W4N5JM7YVYNU',
    group: 'breadth',
  },
  {
    id: 19,
    title: 'Moralities of Everyday Life',
    issuer: 'Yale University',
    date: 'November 13, 2023',
    credentialId: 'VVJTVZYQ4V87',
    skills: ['Psychology', 'Ethics'],
    file: `${DIR}/Moralities_of_Everyday_Life.pdf`,
    verificationUrl: 'https://coursera.org/verify/VVJTVZYQ4V87',
    group: 'breadth',
  },
  {
    id: 18,
    title: 'Introduction to Personal Branding',
    issuer: 'University of Virginia',
    date: 'December 5, 2024',
    credentialId: 'DJ2EA5O0DKSX',
    skills: ['Branding', 'Communication'],
    file: `${DIR}/Personal_Branding.pdf`,
    verificationUrl: 'https://www.coursera.org/account/accomplishments/verify/DJ2EA5O0DKSX',
    group: 'breadth',
  },
];

export const CERT_GROUPS = [
  { id: 'foundations', label: 'Foundations', note: 'How the machine actually works' },
  { id: 'blockchain', label: 'Blockchain', note: 'SUNY Buffalo specialisation track' },
  { id: 'platform', label: 'Cloud & platform', note: '' },
  { id: 'breadth', label: 'Breadth', note: 'Outside the stack' },
];

export const certificatesByGroup = (group) =>
  certificatesData.filter((c) => c.group === group);

export const primaryCertificates = () =>
  certificatesData.filter((c) => c.group !== 'breadth');

export default certificatesData;
