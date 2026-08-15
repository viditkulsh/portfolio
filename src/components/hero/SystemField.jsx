import React, { useEffect, useRef } from 'react';
import useMotionTier from '../../hooks/useMotionTier';

/**
 * The hero's ambient system.
 *
 * WHAT IT COMMUNICATES — this is the whole justification for its existence:
 * scattered points converge into a connected lattice, and then packets move
 * along its edges. That is the site's thesis in one gesture — disorder
 * resolved into a system, and a system with traffic on it. It is not
 * "particles because particles look expensive".
 *
 * Deliberately 2D canvas, not WebGL: it costs no dependency, runs on
 * everything, and a hero has no business pulling Three.js onto the critical
 * path (§28). The 3D budget is spent on /explore, where the user opted in.
 *
 * Tiering:
 *   full    — convergence, ambient drift, packets, pointer parallax
 *   reduced — converged lattice, no loop after settle, no packets
 *   static  — final frame painted once. No rAF is ever scheduled.
 */

const NODE_TARGET = 46;
const LINK_DIST = 132;
const PACKET_EVERY = 900; // ms between packet launches

export default function SystemField({ className = '' }) {
  const canvasRef = useRef(null);
  const { tier, isStatic, allowAmbient } = useMotionTier();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return undefined;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes = [];
    let links = [];
    let packets = [];
    let raf = 0;
    let startedAt = 0;
    let lastPacket = 0;
    let running = true;
    const pointer = { x: -9999, y: -9999, active: false };

    // Read theme colours from the token layer rather than hard-coding, so
    // the field re-tints correctly when the theme flips.
    const readTokens = () => {
      const s = getComputedStyle(document.documentElement);
      return {
        node: s.getPropertyValue('--field-node').trim() || 'rgba(0,0,0,.5)',
        edge: s.getPropertyValue('--field-edge').trim() || 'rgba(0,0,0,.12)',
        live: s.getPropertyValue('--field-live').trim() || '#f2733c',
      };
    };
    let tokens = readTokens();

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2); // cap: 3x DPR is pure cost
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Scale count to area so a wide desktop isn't sparse and a phone
      // isn't overloaded.
      const count = Math.round(
        Math.min(NODE_TARGET, Math.max(16, (width * height) / 17000))
      );

      nodes = Array.from({ length: count }, () => {
        // Target position: a jittered grid. Pure random reads as noise even
        // once settled; a jittered grid reads as an engineered structure.
        const tx = Math.random() * width;
        const ty = Math.random() * height;
        return {
          // Origin: scattered far wider than the frame — this is the
          // "disorder" the convergence resolves.
          x: tx + (Math.random() - 0.5) * width * 1.5,
          y: ty + (Math.random() - 0.5) * height * 1.5,
          tx,
          ty,
          // Per-node drift phase so ambient motion never looks synchronised.
          phase: Math.random() * Math.PI * 2,
          amp: 3 + Math.random() * 7,
          r: 1.1 + Math.random() * 1.9,
          depth: 0.35 + Math.random() * 0.65, // parallax weight
        };
      });

      packets = [];
      computeLinks();
    };

    // Links are recomputed only on resize, not per frame — an O(n²) pass
    // every frame is the classic way these effects tank a page.
    const computeLinks = () => {
      links = [];
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const dx = nodes[i].tx - nodes[j].tx;
          const dy = nodes[i].ty - nodes[j].ty;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) links.push({ a: i, b: j, d });
        }
      }
    };

    const easeOut = (t) => 1 - (1 - t) ** 3;

    const draw = (now) => {
      if (!startedAt) startedAt = now;
      const elapsed = now - startedAt;

      // Convergence completes in 1.8s, then holds.
      const settle = isStatic ? 1 : easeOut(Math.min(elapsed / 1800, 1));
      const drifting = allowAmbient && settle >= 1;

      ctx.clearRect(0, 0, width, height);

      // Resolve live positions once per frame, reused by edges and nodes.
      for (let i = 0; i < nodes.length; i += 1) {
        const n = nodes[i];
        let x = n.x + (n.tx - n.x) * settle;
        let y = n.y + (n.ty - n.y) * settle;

        if (drifting) {
          // Ambient: a slow lissajous, amplitude in single-digit pixels.
          // Enough that the page is never dead; little enough that it is
          // not asking to be watched.
          const t = now / 5200;
          x += Math.cos(t + n.phase) * n.amp;
          y += Math.sin(t * 0.8 + n.phase * 1.3) * n.amp * 0.7;

          // Pointer parallax — the field acknowledges the cursor without
          // chasing it. Depth-weighted so it reads as dimensional.
          if (pointer.active) {
            const dx = pointer.x - x;
            const dy = pointer.y - y;
            const d = Math.hypot(dx, dy);
            if (d < 190) {
              const push = ((190 - d) / 190) * 16 * n.depth;
              x -= (dx / (d || 1)) * push;
              y -= (dy / (d || 1)) * push;
            }
          }
        }
        n.rx = x;
        n.ry = y;
      }

      // Edges first, so nodes sit on top.
      ctx.strokeStyle = tokens.edge;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let k = 0; k < links.length; k += 1) {
        const a = nodes[links[k].a];
        const b = nodes[links[k].b];
        ctx.moveTo(a.rx, a.ry);
        ctx.lineTo(b.rx, b.ry);
      }
      ctx.globalAlpha = settle;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Packets: the "system has traffic on it" signal. Only on full tier.
      if (drifting) {
        if (now - lastPacket > PACKET_EVERY && links.length && packets.length < 5) {
          lastPacket = now;
          packets.push({ link: links[(Math.random() * links.length) | 0], t: 0 });
        }
        ctx.fillStyle = tokens.live;
        packets = packets.filter((p) => {
          p.t += 0.011;
          if (p.t >= 1) return false;
          const a = nodes[p.link.a];
          const b = nodes[p.link.b];
          const x = a.rx + (b.rx - a.rx) * p.t;
          const y = a.ry + (b.ry - a.ry) * p.t;
          // Fade in and out so packets arrive and leave rather than blink.
          ctx.globalAlpha = Math.sin(p.t * Math.PI) * 0.9;
          ctx.beginPath();
          ctx.arc(x, y, 2.1, 0, Math.PI * 2);
          ctx.fill();
          return true;
        });
        ctx.globalAlpha = 1;
      }

      ctx.fillStyle = tokens.node;
      for (let i = 0; i < nodes.length; i += 1) {
        const n = nodes[i];
        ctx.globalAlpha = settle * 0.85;
        ctx.beginPath();
        ctx.arc(n.rx, n.ry, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Stop scheduling once there is nothing left to animate. A settled
      // reduced-tier field must not hold a rAF loop open forever.
      if (!running) return;
      if (drifting || settle < 1) raf = requestAnimationFrame(draw);
    };

    build();

    if (isStatic) {
      // Paint the resolved lattice exactly once. No loop, no motion.
      nodes.forEach((n) => {
        n.x = n.tx;
        n.y = n.ty;
      });
      draw(performance.now());
    } else {
      raf = requestAnimationFrame(draw);
    }

    // ---- Listeners ----------------------------------------------------
    let resizeFrame = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        build();
        startedAt = 0;
        if (isStatic) {
          nodes.forEach((n) => {
            n.x = n.tx;
            n.y = n.ty;
          });
          draw(performance.now());
        } else if (!raf) {
          raf = requestAnimationFrame(draw);
        }
      });
    };

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };

    // Pause entirely when the tab is hidden or the hero scrolls away —
    // an off-screen canvas animating is pure battery cost.
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!isStatic) {
        running = true;
        if (!raf) raf = requestAnimationFrame(draw);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isStatic && !raf) {
            running = true;
            raf = requestAnimationFrame(draw);
          }
        } else {
          running = false;
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    // Re-read tokens when the theme class flips.
    const themeObserver = new MutationObserver(() => {
      tokens = readTokens();
      if (isStatic) draw(performance.now());
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    if (allowAmbient) {
      canvas.addEventListener('pointermove', onPointerMove, { passive: true });
      canvas.addEventListener('pointerleave', onPointerLeave, { passive: true });
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeFrame);
      io.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [tier, isStatic, allowAmbient]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
