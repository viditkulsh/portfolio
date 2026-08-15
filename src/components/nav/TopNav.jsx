import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Command as CommandIcon, Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import useMotionTier from '../../hooks/useMotionTier';

/**
 * Primary navigation.
 *
 * Minimal by intent (§19), but never cryptic: the palette is an addition to
 * plain visible links, not a replacement for them. A non-technical visitor
 * should never need to discover a keyboard shortcut to get anywhere.
 *
 * The nav shows a hairline reading-progress bar rather than a separate
 * floating progress widget — same information, no extra chrome.
 */

const LINKS = [
  { label: 'Work', to: '/', hash: 'work' },
  { label: 'Research', to: '/', hash: 'research' },
  { label: 'Experience', to: '/', hash: 'experience' },
  { label: 'Explore', to: '/explore' },
  { label: 'Résumé', to: '/resume' },
];

export default function TopNav({ onOpenPalette }) {
  const { theme, toggleTheme } = useTheme();
  const { isStatic } = useMotionTier();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
  }, []);

  // Solidify the bar once the hero is behind it, so type never sits on type.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile sheet on navigation, and lock scroll while it's open.
  useEffect(() => setMobileOpen(false), [location.pathname]);
  useEffect(() => {
    if (!mobileOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setMobileOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  const jump = (hash) => (e) => {
    if (location.pathname !== '/') return; // let the router navigate first
    e.preventDefault();
    document
      .getElementById(hash)
      ?.scrollIntoView({ behavior: isStatic ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[60] transition-colors duration-base"
        style={{
          background: scrolled ? 'color-mix(in srgb, var(--bg) 88%, transparent)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`,
        }}
      >
        <nav className="shell flex h-16 items-center justify-between gap-4" aria-label="Primary">
          <Link
            to="/"
            className="font-display text-xl tracking-tight text-ink"
            aria-label="Vidit Kulshrestha — home"
          >
            VK
            <span className="ml-0.5 text-accent" aria-hidden="true">
              .
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.hash ? `/#${link.hash}` : link.to}
                  onClick={link.hash ? jump(link.hash) : undefined}
                  className="rounded px-3 py-2 text-sm text-muted transition-colors duration-fast hover:text-ink"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onOpenPalette}
              className="hidden items-center gap-2 rounded-[--radius] border border-line px-2.5 py-1.5 text-xs text-muted transition-colors duration-fast hover:border-line-strong hover:text-ink sm:flex"
              aria-label="Open command menu"
            >
              <CommandIcon size={13} aria-hidden="true" />
              <span className="t-mono">{isMac ? '⌘' : 'Ctrl'} K</span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="btn btn-ghost !px-2"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <Link to="/recruiter" className="btn btn-primary btn-sm hidden lg:inline-flex">
              Hiring?
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="btn btn-ghost !px-2 md:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>

        {/* Reading progress. Communicates position in a long document —
            the one piece of ambient UI that earns permanent screen space. */}
        <motion.div
          className="h-px origin-left bg-ember"
          style={{ scaleX: isStatic ? 0 : progress }}
          aria-hidden="true"
        />
      </header>

      {/* Mobile sheet. Plain links, full labels, no gestures to learn. */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[90] md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 top-0 rounded-b-xl border-b border-line bg-bg p-6 pt-5">
            <div className="mb-6 flex items-center justify-between">
              <span className="t-eyebrow">Menu</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="btn btn-ghost !px-2"
                aria-label="Close menu"
                autoFocus
              >
                <X size={18} />
              </button>
            </div>
            <ul className="stack">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.hash ? `/#${link.hash}` : link.to}
                    onClick={(e) => {
                      setMobileOpen(false);
                      if (link.hash) jump(link.hash)(e);
                    }}
                    className="t-md block font-display text-ink"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-4">
                <Link to="/recruiter" className="btn btn-primary w-full">
                  Hiring? Start here
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
