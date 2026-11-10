import type { ImageMetadata } from 'astro';
import hike1 from '../assets/gallery/hike-1.jpg';
import hike2 from '../assets/gallery/hike-2.jpg';
import hike3 from '../assets/gallery/hike-3.jpg';
import hike4 from '../assets/gallery/hike-4.jpg';
import hike5 from '../assets/gallery/hike-5.jpg';
import hike6 from '../assets/gallery/hike-6.jpg';
import hike7 from '../assets/gallery/hike-7.jpg';

export type Photo = {
  src: ImageMetadata;
  alt: string;
  place: string;
  note: string;
};

export const photos: Photo[] = [
  {
    src: hike1,
    alt: 'Sea cliffs at the Lizard in Cornwall, gulls circling above dark rocks and green turf.',
    place: 'Lizard Point',
    note: 'Cornwall',
  },
  {
    src: hike2,
    alt: 'A hand holding a small red flower with the city of Bristol out of focus behind it.',
    place: 'Cabot Tower',
    note: 'Bristol',
  },
  {
    src: hike3,
    alt: 'Boats moored at the harbourside in Bristol under a grey sky, with the colourful houses of Cliftonwood behind.',
    place: 'Harbourside',
    note: 'Bristol',
  },
  {
    src: hike4,
    alt: 'A deep orange sunrise over flat fields and a road, seen from Exeter.',
    place: 'Sunrise',
    note: 'Exeter',
  },
  {
    src: hike5,
    alt: 'Looking down over Bristol from Cabot Tower: autumn trees, park paths and the city stretching to the hills.',
    place: 'Cabot Tower',
    note: 'Bristol',
  },
  {
    src: hike6,
    alt: 'Clifton Suspension Bridge seen across Bristol from a high viewpoint, with autumn trees in the foreground.',
    place: 'Suspension Bridge',
    note: 'Bristol',
  },
  {
    src: hike7,
    alt: 'Bristol Cathedral and the city centre rooftops seen from above on a grey autumn day.',
    place: 'Cathedral',
    note: 'Bristol',
  },
];
