import React from 'react';
import { WipeLines } from '../system/Reveal';

/**
 * Section opener.
 *
 * The numeric index is not decoration: it tells the reader this page is a
 * sequence with a known length, which is what makes a long scroll feel
 * navigable rather than endless.
 */
export default function SectionHead({ index, eyebrow, title, lede, id }) {
  return (
    <header className="mb-12">
      <div className="section-head">
        {index && (
          <span className="section-index" aria-hidden="true">
            {index}
          </span>
        )}
        <span className="t-eyebrow">{eyebrow}</span>
      </div>
      <WipeLines
        as="h2"
        id={id}
        className="t-xl max-w-[20ch]"
        lines={Array.isArray(title) ? title : [title]}
      />
      {lede && <p className="t-body-lg mt-5">{lede}</p>}
    </header>
  );
}
