import type { ImageMetadata } from 'astro';
import wizzibiz from '../assets/projects/wizzibiz.webp';
import rask from '../assets/projects/rask.webp';
import gcf from '../assets/projects/gcf.webp';
import bus from '../assets/projects/bus.webp';
import learntk from '../assets/projects/learntk.webp';
import ats from '../assets/projects/ats.webp';
import ttsky from '../assets/projects/ttsky.webp';
import vapedrop from '../assets/work/vapedrop.jpg';
import ukseds from '../assets/work/ukseds.jpg';

export const site = {
  name: 'Shalev Lau',
  title: 'Shalev Lau',
  description:
    'Robotics at Bristol. Side projects, hackathons, silicon and photographs — the things that are not on the CV.',
  url: 'https://shalev.eu.org',
  email: 'connecti@shalev.eu.org',
  location: 'Bristol, UK',
};

export const links = {
  github: 'https://github.com/altcar',
  linkedin: 'https://www.linkedin.com/in/shalevl/',
  email: `mailto:${site.email}`,
  vcard: '/Shalev-Lau.vcf',
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  summary: string;
  tags: string[];
  image?: ImageMetadata;
  alt?: string;
  href?: string;
  detail?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'wizzibiz',
    title: 'Wizzibiz',
    year: '2026',
    summary:
      'Tinder for the dawn chorus. Swipe real bird recordings and a small CNN on Cloudflare Workers learns which songs you like.',
    tags: ['PyTorch', 'DSP', 'Workers'],
    image: wizzibiz,
    alt: 'Wizzibiz interface: a bird song waveform, nope/like buttons, and a scatter plot of the sound map.',
    href: 'https://wizzibiz.hheylau.workers.dev/',
    featured: true,
  },
  {
    slug: 'rask',
    title: 'RASK',
    year: '2026',
    summary:
      'Auditing location bias in hiring. 2,484 résumés, three addresses, and 15.3% of decisions flipped by a city name.',
    tags: ['MiniLM', 'Fairness', 'FastAPI'],
    image: rask,
    alt: 'RASK bias audit site: “Same résumé. Same skills. Different city.” next to a chart of pass rates by address.',
    href: 'https://rask-bias.hheylau.workers.dev',
    featured: true,
  },
  {
    slug: 'gcf',
    title: 'Green Career Fair',
    year: '2026',
    summary:
      'QR visitor pass, booth scanner and chocolate counter for a careers fair. Seven stands, one lap.',
    tags: ['Astro', 'D1', 'Workers'],
    image: gcf,
    alt: 'Green Career Fair registration page with a “Get your QR” visitor pass form on the right.',
    href: 'https://gcf.hheylau.workers.dev',
    featured: true,
  },
  {
    slug: 'bus',
    title: 'Harry Stoke bus board',
    year: '2025',
    summary:
      'Live departures for three Bristol stops — minutes, not timetables — pulled straight from BODS.',
    tags: ['Node', 'BODS', 'Caching'],
    image: bus,
    alt: 'Live bus departures board showing routes m1, T1 and m4 with minutes until each bus.',
    href: 'https://altcar.github.io/Bus-live-feed/',
    featured: true,
  },
  {
    slug: 'learntk',
    title: 'CodeCreators',
    year: '2025',
    summary: 'A student-run Python course platform: Discord sign-in, paid sessions, recorded lectures.',
    tags: ['Astro', 'Discord', 'Stripe'],
    image: learntk,
    alt: 'CodeCreators landing page: “Learn Python properly, with people around you,” with join and Discord buttons.',
    href: 'https://learntk.vercel.app',
    featured: true,
  },
  {
    slug: 'ats',
    title: 'ATS bias lab',
    year: '2025',
    summary:
      'Responsible AI hackathon: measure gender bias in an applicant-tracking model, then ship the fix and a report.',
    tags: ['Python', 'Research'],
    image: ats,
    alt: 'Report cover for the ATS gender bias project with charts and a mitigation summary.',
    href: 'https://altcar.github.io/ATS-bias-mitigate/',
    featured: true,
  },
  {
    slug: 'ttsky',
    title: 'NPU on silicon',
    year: '2026',
    summary: 'A Verilog neural-network accelerator taken through Tiny Tapeout on the open SKY130 process.',
    tags: ['Verilog', 'ASIC'],
    image: ttsky,
    alt: 'GDS layout viewer showing the floorplan of a small neural-network chip.',
    href: 'https://gds-viewer.tinytapeout.com/?model=https://altcar.github.io/ttsky-sesh/tinytapeout.oas&pdk=sky130A',
  },
  {
    slug: 'vapedrop',
    title: 'VapeDrop',
    year: '2023 —',
    summary:
      'A drop-off network for disposable vapes in Sheffield: 800 kg of batteries collected and recycled.',
    tags: ['Operations', 'Sustainability'],
    image: vapedrop,
    alt: 'A VapeDrop collection bin on a street corner in Sheffield.',
    href: 'https://github.com/altcar/VapeDrop',
  },
  {
    slug: 'ukseds',
    title: 'AstroPath',
    year: '2025',
    summary: 'Payload concept presented with UKSEDS — judged Best Innovation nationally at CUSP.',
    tags: ['Space', 'Systems'],
    image: ukseds,
    alt: 'Team standing in front of a Best Innovation banner at the CUSP space propulsion event.',
  },
];

export const featured = projects.filter((project) => project.featured);
