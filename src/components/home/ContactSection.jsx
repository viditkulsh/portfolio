import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarCheck, Mail, MapPin } from 'lucide-react';
import { Reveal } from '../system/Reveal';
import { WipeLines } from '../system/Reveal';
import socialMediaData from '../../data/sections/socialMediaData';

/**
 * Contact.
 *
 * Ends the narrative with the one thing the page has been building toward:
 * a way to start a conversation. Two primary actions only — book time, or
 * send email — because a wall of equal-weight links makes the reader choose
 * instead of act.
 */

const ELSEWHERE = ['github', 'linkedin', 'medium', 'leetcode'];

export default function ContactSection({ personal }) {
  const calendar = socialMediaData.platforms.calendar;

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="shell">
        <div className="rounded-xl border border-line bg-surface-inset p-8 md:p-14">
          <p className="t-eyebrow mb-6">Contact</p>

          <WipeLines
            as="h2"
            id="contact-heading"
            className="t-xl max-w-[16ch]"
            lines={['Building something', 'that has to hold up?']}
          />

          <p className="t-body-lg mt-6 max-w-[46ch]">
            I'm most useful on systems where correctness and trust matter — tokenization,
            fintech, distributed infrastructure. Open to hearing about work in that space.
          </p>

          <Reveal className="mt-10 flex flex-wrap gap-3" delay={0.05}>
            <a
              href={calendar.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <CalendarCheck size={15} aria-hidden="true" />
              Book a time
            </a>
            <a href={`mailto:${personal.email}`} className="btn btn-quiet">
              <Mail size={15} aria-hidden="true" />
              {personal.email}
            </a>
          </Reveal>

          <div className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-3">
            <div>
              <p className="t-eyebrow mb-2">Based in</p>
              <p className="flex items-center gap-1.5 text-sm text-secondary">
                <MapPin size={13} aria-hidden="true" />
                {personal.location}
              </p>
            </div>

            <div>
              <p className="t-eyebrow mb-2">Résumé</p>
              <Link to="/resume" className="link-draw text-sm">
                Three variants, by role
              </Link>
            </div>

            <div>
              <p className="t-eyebrow mb-2">Elsewhere</p>
              <ul className="flex flex-wrap gap-x-4 gap-y-1">
                {ELSEWHERE.map((key) => {
                  const platform = socialMediaData.platforms[key];
                  if (!platform) return null;
                  return (
                    <li key={key}>
                      <a
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-secondary transition-colors hover:text-accent"
                      >
                        {platform.name}
                        <ArrowUpRight size={11} aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
