import { useState } from 'react';
import ProjectsSection from '../components/sections/Projects';

export default function Projects() {
  const [filter, setFilter] = useState('Semua');

  return <ProjectsSection filter={filter} setFilter={setFilter} />;
}
