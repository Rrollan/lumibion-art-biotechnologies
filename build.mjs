import { readFile, writeFile, mkdir, copyFile, rm } from 'node:fs/promises';
import { createStyleString } from '@capsizecss/core';
import instrumentSans from '@capsizecss/metrics/instrumentSans';
import { generateFontFace, getMetricsForFamily, readMetrics } from 'fontaine';
import Typograf from 'typograf';
import { makeHome, research, tour, partnership } from './src/pages.mjs';

const out = new URL('./dist/', import.meta.url);
const asset = (name) => new URL('assets/' + name, out);
const publicFile = (name) => new URL('./public/' + name, import.meta.url);
const dependency = (name) => new URL('./node_modules/' + name, import.meta.url);
const typography = new Typograf({ locale: ['en-US'] });
const fontRoot = '@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-';

await rm(out, { recursive: true, force: true });
await mkdir(new URL('assets/', out), { recursive: true });
const normalFont = dependency(fontRoot + 'normal.woff2');
const [preferred, local] = await Promise.all([readMetrics(normalFont), getMetricsForFamily('Arial')]);
const typeCss = ['normal', 'italic'].map((style) => {
  const suffix = style === 'normal' ? '' : '-italic';
  return `@font-face{font-family:"Instrument Sans";src:url("./instrument-sans${suffix}.woff2") format("woff2");font-style:${style};font-weight:400 700;font-display:swap}`;
}).join('\n') + '\n' + generateFontFace(preferred, { name: 'Instrument Sans fallback', font: 'Arial', metrics: local });

const images = ['lumibion-emblem.webp', 'lumibion-gold-favicon.png', 'lumibion-gold-favicon.ico'];
const botanicalImages = [
  'sunflower-specimen', 'field-photo', 'field-photo-sm',
  'nav-work', 'nav-research', 'nav-plan', 'nav-investors', 'nav-guide', 'nav-contact',
  'study-soil', 'study-seedling', 'study-wheat', 'study-microscope', 'study-column', 'study-clipboard',
  'measure-leaf', 'measure-soil', 'measure-plots', 'partner-vials', 'partner-grain', 'partner-papers',
  'microbial', 'reactor', 'soil-section',
  'seed', 'germination', 'seedling', 'vegetative', 'maturity',
  'maize', 'sunflower', 'soybeans', 'tomato',
];
const pages = { '': makeHome(), 'research/': research, 'tour/': tour, 'partnership/': partnership };

await mkdir(asset('botanical/'), { recursive: true });
await Promise.all([
  ...images.map((name) => copyFile(publicFile('assets/' + name), asset(name))),
  ...botanicalImages.map((name) => {
    const path = 'botanical/' + name + '.webp';
    return copyFile(publicFile('assets/' + path), asset(path));
  }),
  copyFile(normalFont, asset('instrument-sans.woff2')),
  copyFile(dependency(fontRoot + 'italic.woff2'), asset('instrument-sans-italic.woff2')),
  copyFile(new URL('./src/landing.css', import.meta.url), asset('landing.css')),
  copyFile(dependency('@fontsource-variable/instrument-sans/LICENSE'), asset('instrument-sans-OFL.txt')),
  copyFile(new URL('./src/site.css', import.meta.url), asset('site.css')),
  copyFile(new URL('./src/site.js', import.meta.url), asset('site.js')),
  writeFile(asset('type.css'), typeCss + createStyleString('wordmark-caption', { fontMetrics: instrumentSans, fontSize: 8, leading: 11 })),
  ...Object.entries(pages).map(async ([route, html]) => {
    const folder = new URL(route, out);
    await mkdir(folder, { recursive: true });
    await writeFile(new URL('index.html', folder), typography.execute(html));
  })
]);
