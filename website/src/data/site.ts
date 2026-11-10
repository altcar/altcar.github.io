export const site = {
  name: 'Shalev Lau',
  role: 'Robotics & control systems',
  location: 'Bristol, United Kingdom',
  title: 'Shalev Lau — Robotics & control systems engineer',
  description:
    'Robotics and control systems engineer in Bristol. Co-founder of METER, an assistive navigation company, and researcher at the Bristol Robotics Laboratory.',
  url: 'https://shalev.eu.org',
  email: 'connecti@shalev.eu.org',
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
  kicker: string;
  group: 'Venture' | 'AI' | 'Systems';
  blurb: string;
  tags: string[];
  metric?: string;
  href?: string;
  detail?: string;
  image?: string;
  glyph?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'meter',
    group: 'Venture',
    title: 'METER',
    year: '2024 —',
    kicker: 'Assistive tech · company',
    blurb:
      'Ultra-wideband positioning that tells a blind or low-vision user what is around them, in plain language. Co-founded the company; I build the product and the software behind it.',
    tags: ['UWB', 'Embedded', 'Next.js', 'Product'],
    metric: 'Innovation grant · 15+ investor pitches',
    detail: '/meter/',
    glyph: 'M',
    featured: true,
  },
  {
    slug: 'vapedrop',
    group: 'Venture',
    title: 'VapeDrop',
    year: '2023 —',
    kicker: 'Circular economy',
    blurb:
      'A drop-off network for disposable vapes across Sheffield. We collect, log and recycle the batteries instead of sending them to landfill.',
    tags: ['Operations', 'Sustainability', 'Data'],
    metric: '800kg+ batteries diverted',
    href: 'https://github.com/altcar/VapeDrop',
    image: '/img/vapedrop.webp',
    glyph: 'V',
    featured: true,
  },
  {
    slug: 'rask',
    group: 'AI',
    title: 'RASK',
    year: '2026',
    kicker: 'Responsible AI',
    blurb:
      'Auditing résumé-screening models for location bias, then erasing it — a fairness pipeline built on public résumé and job-listing datasets.',
    tags: ['Python', 'NLP', 'Fairness'],
    href: 'https://github.com/altcar/RASK-bias',
    glyph: 'R',
    featured: true,
  },
  {
    slug: 'green-career-fair',
    group: 'Systems',
    title: 'Green Career Fair',
    year: '2026',
    kicker: 'Event systems',
    blurb:
      'A production QR pass system: visitors register once, seven employer stands scan their pass, and the chocolate counter hands over the reward when the card is full. Astro SSR on Workers with D1.',
    tags: ['Astro', 'Workers', 'D1'],
    metric: '7 stands · zero third-party CDNs',
    href: 'https://gcf.hheylau.workers.dev',
    glyph: 'G',
    featured: true,
  },
  {
    slug: 'wizzibiz',
    group: 'AI',
    title: 'Wizzibiz',
    year: '2026',
    kicker: 'Audio ML',
    blurb:
      '“Tinder for the dawn chorus.” A swipe feed of real bird recordings where a small CNN trained on mel-spectrograms learns which songs you like — the built version of our HackSheffield 8 idea.',
    tags: ['DSP', 'PyTorch', 'Workers'],
    href: 'https://wizzibiz.hheylau.workers.dev/',
    glyph: 'W',
    featured: true,
  },
  {
    slug: 'ttsky-sesh',
    group: 'Systems',
    title: 'NPU test chip',
    year: '2026',
    kicker: 'Silicon',
    blurb:
      'A Verilog neural-network accelerator taken through Tiny Tapeout on the open SKY130 process, from RTL and testbenches to a manufacturable GDS layout.',
    tags: ['Verilog', 'ASIC', 'SKY130'],
    href: 'https://gds-viewer.tinytapeout.com/?model=https://altcar.github.io/ttsky-sesh/tinytapeout.oas&pdk=sky130A',
    glyph: 'Δ',
  },
  {
    slug: 'ats-bias',
    group: 'AI',
    title: 'ATS bias mitigation',
    year: '2025',
    kicker: 'Responsible AI',
    blurb:
      'Responsible AI hackathon: measuring gender bias in applicant-tracking models and shipping a mitigation layer, with a written report and a 19-slide deck.',
    tags: ['Python', 'Research', 'Presenting'],
    href: 'https://altcar.github.io/ATS-bias-mitigate/',
    glyph: 'A',
  },
  {
    slug: 'bus-board',
    group: 'Systems',
    title: 'Harry Stoke bus board',
    year: '2025',
    kicker: 'Real-time data',
    blurb:
      'Live bus departures for three Bristol stops — minutes, not timetables. BODS as the live source, with a rate-limited snapshot fallback.',
    tags: ['Node.js', 'BODS', 'Caching'],
    href: 'https://altcar.github.io/Bus-live-feed/',
    glyph: 'B',
  },
  {
    slug: 'ukseds',
    group: 'Systems',
    title: 'AstroPath',
    year: '2025',
    kicker: 'Space',
    blurb:
      'Payload concept presented with UKSEDS at the CUSP community for space propulsion — judged Best Innovation nationally.',
    tags: ['Systems', 'Payload', 'Team'],
    metric: 'Best Innovation Award',
    image: '/img/ukseds.webp',
    glyph: '★',
  },
];

export const experience = [
  {
    when: '2024 — now',
    role: 'Co-founder & CFO',
    org: 'METER',
    note: 'Founded an assistive-tech company around UWB indoor positioning. Hardware plus software, a secured innovation grant, and pitches to 15+ investors.',
  },
  {
    when: '2023 — now',
    role: 'Project lead, VapeDrop',
    org: 'Enactus Sheffield',
    note: 'Built the collection and recycling network for disposable vapes: 800kg+ of batteries diverted, a five-year corporate partnership, +25% project profitability.',
  },
  {
    when: '2023 — now',
    role: 'Technical crew',
    org: "Sheffield Students' Union",
    note: 'Sound, video and lighting for club nights and live gigs — running a crew at night and solving problems while the room is full.',
  },
  {
    when: '2021 — 2022',
    role: 'Co-founder & marketing lead',
    org: 'Vesta Package',
    note: 'Student e-commerce company. Best Marketing Award in the South East, 100% compliance at the Young Enterprise audit, £900+ revenue in six months.',
  },
  {
    when: '2017 — 2022',
    role: 'President, STEM & coding club',
    org: 'STEM & Coding Club',
    note: 'Taught and ran robotics projects — Arduino, motors, Raspberry Pi — and represented the club publicly.',
  },
];

export const skills = [
  {
    label: 'Control & embedded',
    items: ['MATLAB / Simulink', 'LabVIEW', 'C / C++', 'Altium Designer', 'Fusion 360', 'UWB & sensors'],
  },
  {
    label: 'Software',
    items: ['Python', 'TypeScript', 'Node.js', 'Astro', 'PyTorch', 'SQL'],
  },
  {
    label: 'Infrastructure',
    items: ['Cloudflare Workers', 'Docker', 'Proxmox', 'CI/CD', 'Zero Trust', 'Git'],
  },
];

export const marquee = [
  'Control systems',
  'Embedded software',
  'Robotics',
  'UWB positioning',
  'Full-stack',
  'Product',
  'Data & ML',
  'Silicon curious',
];
