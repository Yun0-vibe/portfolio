import { useState } from 'react';
import { Section } from '../components/section';
import { Reveal } from '../components/reveal';
import { ProjectFilters, ProjectModal } from '../components/projects';
import type { Project } from '../data';

export function ProjectsPage() {
  const [active, setActive] = useState<Project | null>(null);
  return (
    <main className="pt-24">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="flex items-baseline justify-between gap-6">
          <h1 className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500">Work</h1>
          <span className="label">Archive</span>
        </div>
        <h2 className="mt-10 max-w-3xl text-3xl font-medium leading-[1.1] tracking-[-0.035em] text-white md:text-[3.25rem]">
          Every build, in one place.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-400">
          Search by name or stack, filter by category and status, open any card for the full story.
        </p>

        <div className="mt-14">
          <Reveal>
            <ProjectFilters onPick={setActive} />
          </Reveal>
        </div>
      </div>
      <ProjectModal p={active} onClose={() => setActive(null)} />
    </main>
  );
}
