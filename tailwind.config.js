/** @type {import('tailwindcss').Config} */

// Tailwind reads the same custom properties defined in src/styles/tokens.css.
// That means a utility like `text-muted` and a hand-written rule using
// `var(--text-muted)` can never drift apart, and theming stays a variable
// swap rather than a `dark:` variant on every element.
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-sunken': 'var(--bg-sunken)',
        surface: 'var(--surface)',
        'surface-raised': 'var(--surface-raised)',
        'surface-inset': 'var(--surface-inset)',

        ink: 'var(--text)',
        secondary: 'var(--text-secondary)',
        muted: 'var(--text-muted)',
        faint: 'var(--text-faint)',

        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        'line-faint': 'var(--line-faint)',

        ember: {
          DEFAULT: 'var(--ember)',
          strong: 'var(--ember-strong)',
          soft: 'var(--ember-soft)',
          line: 'var(--ember-line)',
        },
        /* Use `text-accent` for accent-coloured TEXT and `ember` for fills,
           borders and graphics. They are the same hue; accent is darkened
           in the light theme so small text clears AA. */
        accent: 'var(--ember-text)',
        cyan: {
          DEFAULT: 'var(--cyan)',
          strong: 'var(--cyan-strong)',
          soft: 'var(--cyan-soft)',
          line: 'var(--cyan-line)',
        },
        positive: 'var(--positive)',
        caution: 'var(--caution)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
      maxWidth: {
        shell: 'var(--shell)',
        measure: 'var(--measure)',
        'measure-tight': 'var(--measure-tight)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
        spring: 'var(--ease-spring)',
      },
      transitionDuration: {
        fast: '180ms',
        base: '320ms',
        slow: '620ms',
      },
      zIndex: {
        nav: '60',
        overlay: '80',
        modal: '100',
      },
      keyframes: {
        'pulse-node': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '1' },
        },
        'draw-line': {
          from: { strokeDashoffset: 'var(--dash, 1000)' },
          to: { strokeDashoffset: '0' },
        },
      },
      animation: {
        'pulse-node': 'pulse-node 3.2s var(--ease-in-out) infinite',
        'draw-line': 'draw-line 1.4s var(--ease-out) forwards',
      },
    },
  },
  plugins: [],
};
