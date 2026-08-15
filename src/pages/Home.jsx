import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import Hero from '../components/hero/Hero';
import WorkSection from '../components/home/WorkSection';
import ResearchSection from '../components/home/ResearchSection';
import ExperienceSection from '../components/home/ExperienceSection';
import SignalSection from '../components/home/SignalSection';
import ContactSection from '../components/home/ContactSection';
import usePageMeta from '../hooks/usePageMeta';

/**
 * The homepage narrative.
 *
 *   IDENTITY  → hero: who, and what he builds
 *   BUILD     → work: three systems, three problems
 *   THINK     → research: how a question becomes a system
 *   PROVE     → experience: where it happened
 *   SIGNAL    → skills, each bound to real work
 *   ACT       → contact
 *
 * One continuous document rather than four disconnected "modes". The
 * recruiter view still exists at /recruiter for people who want density
 * over narrative — that audience is served better by a different page,
 * not by flattening this one.
 */
export default function Home() {
  const { portfolioData } = usePortfolio();
  const currentRole = portfolioData.experience.find((r) => r.duration.includes('Present'));

  usePageMeta({
    title: `${portfolioData.personal.name} — ${portfolioData.personal.title}`,
    description: portfolioData.personal.shortIntro,
    path: '/',
  });

  return (
    <>
      <Hero personal={portfolioData.personal} currentRole={currentRole} />
      <WorkSection projects={portfolioData.projects} />
      <ResearchSection threads={portfolioData.research} />
      <ExperienceSection experience={portfolioData.experience} />
      <SignalSection
        skills={portfolioData.skills}
        projects={portfolioData.projects}
        experience={portfolioData.experience}
      />
      <ContactSection personal={portfolioData.personal} />
    </>
  );
}
