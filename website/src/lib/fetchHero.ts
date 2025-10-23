// src/lib/parseGalleryData.js
import Papa from 'papaparse';
 const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQQ-ELkfhDKgQcw7If4Rnn9CbeTanMvAl9SppYVo9W9uY_b5vp1wzFClaQQHD10VwkMg636wJq4f9F4/pub?gid=2079248219&single=true&output=csv'; // Replace with your URL



export default async function getGalleryData() {
   const response = await fetch(csvUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch CSV: ${response.statusText}`);
  }
  let csvText = await response.text();

  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
    delimiter: ','
  }).data;
  return parsed;
}