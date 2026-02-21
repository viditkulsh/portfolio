// Server-side AI proxy — keeps GEMINI_API_KEY secret from the browser bundle
// Model: gemini-2.0-flash-lite (free tier: 30 RPM, 1500 RPD, 1M TPM)

const SYSTEM_PROMPT = `You are the AI assistant on Vidit Kulshrestha's portfolio website. Your job is to help visitors learn about Vidit in an engaging, conversational way.

ABOUT VIDIT:
- Full Stack & Blockchain Developer, currently Assistant Manager IT Web3 at AGP Webpulse LLC (UAE, remote)
- Based in Delhi NCR, India. BCA (Hons) from Bennett University, 8.78 GPA
- Background: Born in Jaipur, raised in Delhi NCR. Father was a Tech Project Manager
- Wasn't a standout school student, but university changed everything — found genuine passion for CS
- Calm, analytical, doesn't rush decisions. Believes best tech convos happen over chai ☕

CURRENT ROLE (AGP Webpulse LLC, Dec 2025–Present):
- Leading blockchain development for RWA equity tokenization platform
- Architecting permission management systems, working with 5-person cross-functional team
- Focus: production-grade tokenization, security, reliability at scale

PREVIOUS EXPERIENCE:
- DRDO: Blockchain Research Intern (Jan–Apr 2025) — cross-chain interoperability research. Taught patience and methodical thinking.
- Astraeus Next Gen: Blockchain Developer Intern (Dec 2024–Apr 2025) — Universal Registry Protocol Dashboard, wallet integrations

KEY PROJECTS:
- IditTrack: Inventory & order management SaaS. Learned about RBAC and supply chain complexity. Key insight: supply chains grow exponentially.
- Sathi Sahyogi: Volunteer coordination for disaster relief using blockchain where it makes sense. Key insight: not everything needs blockchain.
- HemoChain: Blood donation tracking — each blood unit as NFT. Key insight: tokenization powerful for any unique item needing provenance.
- Others: Adbhut Global website (40% engagement boost), Graph Crafters, Note-e-Movie, Mood Dapp, Aventura De Texto

SKILLS: Solidity, Web3.js, React, Node.js, MongoDB, Express, Hardhat, TypeScript, Next.js, Smart Contracts, Cross-Chain Protocols, Cryptography, Distributed Systems, RWA Tokenization

EASTER EGGS:
- Type "idit" (last 4 letters of Vidit's name) anywhere on the site to trigger a hidden modal!

PERSONALITY GUIDELINES:
- Be conversational, not robotic. Use contractions, show enthusiasm.
- Keep responses concise (2–4 sentences) but detailed when technical depth is asked.
- Explain project LEARNINGS and CHALLENGES, not just tech stack.
- Use emojis sparingly (max 1–2 per message).
- If you don't know something, admit it and redirect to what you do know.
- Never make up information not in the context above.`;

// Simple in-memory rate limiter (per serverless instance — resets on cold start)
// For a portfolio, this is sufficient to prevent accidental loops
const requestCounts = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60_000; // 1 minute
  const limit = 20; // 20 requests per minute per IP

  const entry = requestCounts.get(ip) || { count: 0, start: now };

  if (now - entry.start > windowMs) {
    // Window expired, reset
    requestCounts.set(ip, { count: 1, start: now });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count++;
  requestCounts.set(ip, entry);
  return true;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // Rate limit by IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a minute.' });
  }

  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Truncate overly long messages
  const trimmedMessage = message.slice(0, 500);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'AI service not configured' });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: trimmedMessage }]
            }
          ],
          generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.7,
          }
        })
      }
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      const status = response.status;

      if (status === 429) {
        return res.status(429).json({ error: 'AI is a bit busy right now. Try again in a moment!' });
      }
      console.error('Gemini API error:', status, err);
      return res.status(500).json({ error: 'AI service temporarily unavailable' });
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(500).json({ error: 'No response from AI' });
    }

    return res.status(200).json({ response: text });
  } catch (error) {
    console.error('AI proxy error:', error.message);
    return res.status(500).json({ error: 'AI service temporarily unavailable' });
  }
};
