import { useEffect } from 'react';

/**
 * Per-route metadata.
 *
 * This is a client-rendered SPA, so this does not help crawlers that don't
 * execute JavaScript — the static tags in index.html carry that job. What it
 * does fix is everything downstream of a real browser: the tab title, the
 * document title screen readers announce on navigation, and the canonical
 * URL for tools that render before reading.
 *
 * Genuine per-route SEO needs prerendering or SSR; that is a framework
 * decision, noted rather than faked here.
 */

const SITE = 'https://viditkulshrestha.com';

function setMeta(selector, attr, value) {
  if (!value) return;
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export default function usePageMeta({ title, description, path }) {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      setMeta('meta[name="description"]', 'content', description);
      setMeta('meta[property="og:description"]', 'content', description);
      setMeta('meta[name="twitter:description"]', 'content', description);
    }

    if (title) {
      setMeta('meta[property="og:title"]', 'content', title);
      setMeta('meta[name="twitter:title"]', 'content', title);
    }

    if (path) {
      const url = `${SITE}${path}`;
      setMeta('link[rel="canonical"]', 'href', url);
      setMeta('meta[property="og:url"]', 'content', url);
    }
  }, [title, description, path]);
}
