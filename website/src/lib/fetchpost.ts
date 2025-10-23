// src/lib/fetchPosts.js
import Papa from 'papaparse';
import { decodeMojibake } from './utils.ts'; // Adjust path if needed

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQQ-ELkfhDKgQcw7If4Rnn9CbeTanMvAl9SppYVo9W9uY_b5vp1wzFClaQQHD10VwkMg636wJq4f9F4/pub?gid=0&single=true&output=csv'; // Your CDN URL

function slugify(str: string) {
  // Unicode-aware: Keep letters (\p{L}), numbers (\p{N}), spaces, and hyphens
  return str.toLowerCase().trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')  // 'u' flag for Unicode; 'g' global
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');  // Trim leading/trailing hyphens
}

// Helper: Get all posts (unchanged except fallback title)
export async function getAllPosts() {
  const response = await fetch(CSV_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch CSV: ${response.statusText}`);
  }
  let csvText = await response.text();
  csvText = decodeMojibake(csvText);

  const parsed = Papa.parse<Record<string, any>>(csvText, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
    delimiter: ','
  }).data as Array<Record<string, any>>;

  const validPosts = (parsed as Array<Record<string, any>>).filter(row => row.content);

 return validPosts.map((row: Record<string, any>, index: number) => ({
    id: index + 1,  // Unique ID for keys/slugs
    title: row.Title || 'Untitled Post',
    tags: row.tag ? String(row.tag).split(',').map((t: string) => ({
      name: t.trim(),
      slug: slugify(t.trim())
    })) : [],
    content: row.content
  }));
}

// New: Get tag frequencies for word cloud
export function getTagFrequencies(posts: any[]) {
  const freq: Record<string, number> = {};
  posts.forEach(post => {
    (post.tags || []).forEach((tag: any) => {
      const slug = String(tag.slug);
      freq[slug] = (freq[slug] || 0) + 1;
    });
  });
  return freq;
}

// New: Get unique tags for paths
export function getUniqueTags(posts: any[]) {
  const unique: Record<string, string> = {};
  posts.forEach(post => {
    (post.tags || []).forEach((tag: { slug: string | number; name: any; }) => {
      unique[String(tag.slug)] = String(tag.name);  // Map slug to display name
    });
  });
  return unique;
}

// New: Filter posts by tag slug
export function getPostsByTag(posts: any[], tagSlug: string) {
  return posts.filter(post => post.tags.some((tag: { slug: string; }) => tag.slug === tagSlug));
}