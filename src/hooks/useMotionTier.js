import { useEffect, useState } from 'react';

/**
 * Motion capability tiering.
 *
 * One place decides how much motion this visitor gets, so no component
 * has to re-implement the check and no two components can disagree.
 *
 *   'full'    — desktop-class device, motion welcome. Ambient + narrative + WebGL.
 *   'reduced' — low-power / small / mid device. Interaction motion and short
 *               transitions survive; continuous ambient loops and WebGL do not.
 *   'static'  — user asked for reduced motion, or the device can't cope.
 *               Everything renders in its final state. No exceptions.
 *
 * `static` is a promise: a component receiving it must not animate at all,
 * including on mount. Reduced-motion users get the whole story, instantly.
 */

const QUERY_REDUCED = '(prefers-reduced-motion: reduce)';
const QUERY_COARSE = '(pointer: coarse)';

/* Cached at module scope, and the probe context is explicitly released.
   Both matter: this runs once per hook instance *and* on every resize, and
   a browser allows only ~16 live WebGL contexts. Probing without caching or
   releasing exhausts that budget and starts evicting real contexts —
   including the one the /explore world is running on. */
let webglSupport = null;

function detectWebGL() {
  if (webglSupport !== null) return webglSupport;
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    webglSupport = Boolean(gl);
    // Hand the context back immediately — this was only ever a capability
    // check, and holding it would deny one to something that needs it.
    gl?.getExtension?.('WEBGL_lose_context')?.loseContext();
    return webglSupport;
  } catch {
    webglSupport = false;
    return false;
  }
}

function resolve() {
  if (typeof window === 'undefined') {
    // SSR / prerender: assume the calm tier rather than promising motion
    // we may not be able to deliver.
    return { tier: 'reduced', webgl: false, coarse: false };
  }

  const prefersReduced = window.matchMedia(QUERY_REDUCED).matches;
  const coarse = window.matchMedia(QUERY_COARSE).matches;
  const webgl = detectWebGL();

  if (prefersReduced) return { tier: 'static', webgl, coarse };

  // navigator.deviceMemory / hardwareConcurrency are advisory and absent on
  // Safari — treat missing values as "unknown, assume capable" rather than
  // punishing every Safari visitor with a downgrade.
  const memory = navigator.deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 8;
  const narrow = window.innerWidth < 768;
  const saveData = navigator.connection?.saveData === true;

  const weak = memory <= 4 || cores <= 4 || saveData;

  if (!webgl || weak || narrow) return { tier: 'reduced', webgl, coarse };
  return { tier: 'full', webgl, coarse };
}

export function useMotionTier() {
  const [state, setState] = useState(resolve);

  useEffect(() => {
    const reduced = window.matchMedia(QUERY_REDUCED);
    const coarse = window.matchMedia(QUERY_COARSE);
    const update = () => setState(resolve());

    // Re-resolve when the user flips the OS setting mid-session, and when
    // the viewport crosses the narrow threshold (rotation, window resize).
    reduced.addEventListener('change', update);
    coarse.addEventListener('change', update);

    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      reduced.removeEventListener('change', update);
      coarse.removeEventListener('change', update);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return {
    ...state,
    isStatic: state.tier === 'static',
    isFull: state.tier === 'full',
    /** Ambient loops are the first thing to go — they never stop costing. */
    allowAmbient: state.tier === 'full',
    /** Scroll-driven narrative degrades to a plain reveal, then to nothing. */
    allowNarrative: state.tier !== 'static',
    /** WebGL is opt-in on top of everything else. */
    allowWebGL: state.tier === 'full' && state.webgl,
  };
}

export default useMotionTier;
