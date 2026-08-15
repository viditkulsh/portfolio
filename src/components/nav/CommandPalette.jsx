import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Command } from 'cmdk';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  Briefcase,
  Compass,
  FileText,
  FlaskConical,
  Github,
  Home,
  Linkedin,
  Mail,
  Moon,
  Sun,
  Layers,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import useMotionTier from '../../hooks/useMotionTier';
import { surfaceIn, fade, forTier } from '../../lib/motion';

/**
 * ⌘K command palette.
 *
 * An enhancement, never a requirement (§19): every destination in here is
 * also reachable from the visible navigation. It exists because the
 * audience includes people who reach for ⌘K by reflex, and finding it
 * present is itself a signal about who built the site.
 *
 * cmdk handles list semantics, filtering and roving focus; we own the
 * shortcut, the portal, the scroll lock and focus restoration.
 */

export default function CommandPalette({ open, onOpenChange }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { isStatic } = useMotionTier();
  const [restoreTo, setRestoreTo] = useState(null);

  // Global shortcut: ⌘K / Ctrl+K, and Escape to dismiss.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  // Lock background scroll and remember where focus came from, so closing
  // the palette returns the keyboard user to where they were.
  useEffect(() => {
    if (!open) return undefined;
    setRestoreTo(document.activeElement);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = useCallback(() => {
    onOpenChange(false);
    // Return focus after the exit animation has released the node.
    window.setTimeout(() => {
      if (restoreTo && document.contains(restoreTo)) restoreTo.focus();
    }, 60);
  }, [onOpenChange, restoreTo]);

  const go = useCallback(
    (to, hash) => {
      close();
      if (hash) {
        navigate(to);
        // Wait for the route to paint before seeking the anchor.
        window.setTimeout(() => {
          document
            .getElementById(hash)
            ?.scrollIntoView({ behavior: isStatic ? 'auto' : 'smooth', block: 'start' });
        }, 80);
      } else {
        navigate(to);
      }
    },
    [close, navigate, isStatic]
  );

  const external = useCallback(
    (url) => {
      close();
      window.open(url, '_blank', 'noopener,noreferrer');
    },
    [close]
  );

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
          variants={forTier(fade, isStatic)}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
            onClick={close}
            aria-hidden="true"
          />

          <motion.div
            className="relative w-full max-w-xl overflow-hidden rounded-xl border border-line bg-surface shadow-lg"
            variants={forTier(surfaceIn, isStatic)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Command label="Site command menu" loop>
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Command.Input
                  autoFocus
                  placeholder="Search or jump to…"
                  className="w-full bg-transparent py-4 text-[0.95rem] outline-none placeholder:text-faint"
                />
                <kbd className="t-mono rounded border border-line px-1.5 py-0.5 text-[0.65rem]">
                  esc
                </kbd>
              </div>

              <Command.List className="max-h-[min(58vh,26rem)] overflow-y-auto p-2">
                <Command.Empty className="px-3 py-8 text-center text-sm text-muted">
                  Nothing matches that.
                </Command.Empty>

                <Group heading="Go to">
                  <Item icon={Home} onSelect={() => go('/')}>
                    Home
                  </Item>
                  <Item icon={Layers} onSelect={() => go('/', 'work')}>
                    Work
                  </Item>
                  <Item icon={FlaskConical} onSelect={() => go('/', 'research')}>
                    Research
                  </Item>
                  <Item icon={Briefcase} onSelect={() => go('/', 'experience')}>
                    Experience
                  </Item>
                  <Item icon={Mail} onSelect={() => go('/', 'contact')}>
                    Contact
                  </Item>
                </Group>

                <Group heading="Views">
                  <Item icon={Briefcase} onSelect={() => go('/recruiter')} hint="Fast, dense">
                    Recruiter view
                  </Item>
                  <Item icon={Compass} onSelect={() => go('/explore')} hint="3D, optional">
                    Explore the world
                  </Item>
                  <Item icon={FileText} onSelect={() => go('/resume')}>
                    Résumé
                  </Item>
                </Group>

                <Group heading="Elsewhere">
                  <Item
                    icon={Github}
                    onSelect={() => external('https://github.com/viditkulsh')}
                    trailing={ArrowUpRight}
                  >
                    GitHub
                  </Item>
                  <Item
                    icon={Linkedin}
                    onSelect={() => external('https://www.linkedin.com/in/vidit-kulshrestha/')}
                    trailing={ArrowUpRight}
                  >
                    LinkedIn
                  </Item>
                  <Item
                    icon={Mail}
                    onSelect={() => external('mailto:viditkulsh.work@gmail.com')}
                    trailing={ArrowUpRight}
                  >
                    Email Vidit
                  </Item>
                </Group>

                <Group heading="Preferences">
                  <Item icon={theme === 'dark' ? Sun : Moon} onSelect={toggleTheme}>
                    Switch to {theme === 'dark' ? 'light' : 'dark'} theme
                  </Item>
                </Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function Group({ heading, children }) {
  return (
    <Command.Group
      heading={heading}
      className="[&_[cmdk-group-heading]]:t-eyebrow [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3"
    >
      {children}
    </Command.Group>
  );
}

function Item({ icon: Icon, children, onSelect, hint, trailing: Trailing }) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded px-3 py-2.5 text-sm text-secondary data-[selected=true]:bg-[var(--surface-inset)] data-[selected=true]:text-ink"
    >
      {Icon && <Icon size={15} className="shrink-0 text-muted" aria-hidden="true" />}
      <span className="flex-1">{children}</span>
      {hint && <span className="t-mono text-[0.65rem]">{hint}</span>}
      {Trailing && <Trailing size={13} className="text-faint" aria-hidden="true" />}
    </Command.Item>
  );
}
