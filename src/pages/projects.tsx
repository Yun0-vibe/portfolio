import { Section } from '../components/section';
import { ProjectFilters, ProjectModal } from '../components/projects';
import { useState } from 'react';
import type { Project } from '../data';

export function ProjectsPage() {
  const [active, setActive] = useState<Project | null>(null);
  return (
    <main>
      <Section
        kicker="Work archive"
        title={<>All projects<span className="text-lime-700">.</span></>}
        blurb="Every build in one place. Search by name or stack, filter by category and status, open any card for the full story."
      >
        <ProjectFilters onPick={setActive} />
      </Section>
      <ProjectModal p={active} onClose={() => setActive(null)} />
    </main>
  );
}
