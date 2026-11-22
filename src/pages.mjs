import { landing } from './landing.mjs';

const brand = (root) => `<a class="brand" href="${root}" aria-label="LUMIBION Art Biotechnologies, home"><img src="${root}assets/lumibion-emblem.webp" width="48" height="60" alt=""><span>LUMIBION <small class="wordmark-caption">ART BIOTECHNOLOGIES</small></span></a>`;

function rootDiagram() {
  return `<div class="root-study" data-root-study>
    <img class="root-sample" src="../assets/botanical/soil-section.webp" alt="" width="560" height="560" loading="lazy">
    <div class="diagram-label diagram-plant"><span></span>Plant</div>
    <div class="diagram-label diagram-soil"><span></span>Soil surface</div>
    <div class="diagram-label diagram-root"><span></span>Root zone</div>
  </div>`;
}

const button = (url, label, variant = 'solid') => `<a class="button ${variant}" href="${url}">${label}</a>`;
const navIcon = (root, name) => `<img class="nav-icon" src="${root}assets/botanical/nav-${name}.webp" width="20" height="22" alt="">`;

function shell({ title, description, root = './', active, body, home = false }) {
  const pageLink = (page, text) => `<a href="${root}${page}/"${active === page ? ' aria-current="page"' : ''}>${text}</a>`;
  const index = home ? '' : root;
  const navigation = [
    ['work', index + '#approach', 'Our work'],
    ['research', home ? '#research' : root + 'research/', 'Research', active === 'research'],
    ['plan', index + '#roadmap', 'Pilot plan'],
    ['investors', index + '#investors', 'Investors'],
    ['guide', root + 'tour/', 'Field guide', active === 'tour'],
  ];
  const menuLinks = navigation.map(([icon, href, name, current]) =>
    `<a href="${href}"${current ? ' aria-current="page"' : ''}>${navIcon(root, icon)}${name}</a>`
  ).join('');
  const contactLink = `<a class="header-contact" href="${index}#partner">${navIcon(root, 'contact')} Contact</a>`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${description}">
  <meta name="theme-color" content="#fbf9f2">
  <title>${title}</title>
  <link rel="icon" href="${root}assets/lumibion-gold-favicon.png" type="image/png" sizes="32x32">
  <link rel="icon" href="${root}assets/lumibion-gold-favicon.ico" sizes="any">
  <link rel="preload" href="${root}assets/instrument-sans.woff2" as="font" type="font/woff2" crossorigin>
  ${home || active === 'research' ? `<link rel="preload" href="${root}assets/instrument-sans-italic.woff2" as="font" type="font/woff2" crossorigin>` : ''}
  <link rel="stylesheet" href="${root}assets/type.css">
  <link rel="stylesheet" href="${root}assets/site.css">
  <link rel="stylesheet" href="${root}assets/landing.css">
  <script type="module" src="${root}assets/site.js"></script>
</head>
<body class="${home ? 'home' : ''} ${active || ''}">
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="wrap header-inner">
      ${brand(root)}
      <nav class="site-nav" aria-label="Main navigation">
        ${menuLinks}
      </nav>
      ${contactLink}
      <details class="mobile-nav">
        <summary aria-label="Menu"><span>Menu</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h16M4 15h16"/></svg></summary>
        <nav aria-label="Mobile navigation">
          ${menuLinks}
          <a href="${index}#partner">${navIcon(root, 'contact')}Contact</a>
        </nav>
      </details>
    </div>
  </header>
  <main id="main" tabindex="-1">${body}</main>
  <footer class="footer">
    <div class="wrap footer-inner">
      ${brand(root)}
      <nav aria-label="Footer navigation">${pageLink('research','Research')}${pageLink('tour','Field guide')}<a href="${root}#partner">Partnerships</a></nav>
      <p>© LUMIBION Art Biotechnologies</p>
    </div>
  </footer>
</body>
</html>`;
}


const topics = ['Research', 'Field trial', 'Investment'];

export function makeHome() {
  return shell({
    title: 'LUMIBION | Soil microbes and crop nutrition',
    description: 'LUMIBION studies whether Nostoc commune can improve how crops take up nutrients. Read about the research and plans for a field trial.',
    home: true,
    body: landing()
  });
}

const researchPanels = [
  ['Research question', 'Can <i>Nostoc commune</i> improve nutrient uptake?', 'We want to compare plants grown under the same conditions with and without the material.'],
  ['Current stage', 'The programme is in development', 'We’re considering how to make consistent trial material and looking for a research partner to design an independent study.'],
  ['Field trial', 'What a field trial would test', 'We want to see whether a response in the lab also appears in the field. First we need to agree on a crop, a site and what to measure.'],
];

function studyPlan() {
  return `<div class="study-grid">
    ${researchPanels.map(([topic, title, copy]) => `<article class="study-card">
      <p class="study-topic">${topic}</p>
      <h3>${title}</h3>
      <p>${copy}</p>
    </article>`).join('')}
  </div>`;
}

export const research = shell({
  title: 'Nostoc commune research | LUMIBION',
  description: 'Read how LUMIBION plans to study Nostoc commune, from the first lab comparison to a possible field trial.',
  root: '../',
  active: 'research',
  body: `
    <div class="wrap">
      <section class="research-header section">
        <div>
          <h1><i>Nostoc commune</i></h1>
        </div>
        <div>
          <p>This cyanobacterium is the focus of our first crop nutrition study.</p>
          ${button('#programme', 'Read the study plan', 'link')}
        </div>
      </section>
      <section class="programme" id="programme" aria-labelledby="programme-title">
        <h2 id="programme-title">Study plan</h2>
        ${studyPlan()}
      </section>
      <section class="research-band research-partner" aria-labelledby="research-partner-title">
        <h2 id="research-partner-title">Help design the study</h2>
        ${button('../partnership/?topic=0', 'Prepare a research enquiry', 'outline')}
      </section>
    </div>`
});

const chapters = [
  ['soil', 'Soil & roots', 'What plants take up through their roots', 'Roots absorb water and nutrients from soil. Around the roots, microorganisms can affect which nutrients are available to the plant.'],
  ['research-in-focus', 'Research', 'What we want to learn about <i>Nostoc commune</i>', 'We’re asking whether this cyanobacterium changes nutrient uptake. A lab comparison would tell us what to look for in a field trial.'],
  ['pilot', 'Field trial', 'What to check in the field', 'Researchers and growers would choose a crop and a site, then agree on what to measure. One question is whether a plant response appears consistently across plots.'],
];

const tourImages = [
  rootDiagram(),
  `<figure class="specimen-stage guide-specimen">
    <img class="specimen-main" src="../assets/botanical/microbial.webp" alt="" width="560" height="560" loading="lazy">
    <figcaption>Illustration of a microbial colony</figcaption>
  </figure>`,
  `<figure class="guide-field">
    <img src="../assets/botanical/field-photo-sm.webp" alt="Rows of crops in an open field" width="750" height="500" loading="lazy">
  </figure>`,
];

export const tour = shell({
  title: 'Field guide | LUMIBION',
  description: 'A short guide to plant roots and how LUMIBION plans to study soil microbes in the lab and field.',
  root: '../',
  active: 'tour',
  body: `
    <div class="wrap">
      <section class="tour-header section">
        <h1>Soil and roots</h1>
        <p>Follow nutrients from the soil into the plant, then see what we plan to test.</p>
      </section>
      <div class="story">
        <nav class="story-nav" aria-label="Field guide chapters">
          ${chapters.map(([id, name]) => `<a href="#${id}">${name}</a>`).join('')}
        </nav>
        ${chapters.map(([id,,title,text], i) => `<section class="story-chapter" id="${id}" aria-labelledby="${id}-title">
          <div class="story-copy">
            <h2 id="${id}-title">${title}</h2>
            <p>${text}</p>
            ${i === 2 ? button('../partnership/?topic=1','Discuss a pilot') : ''}
          </div>
          ${tourImages[i]}
        </section>`).join('')}
      </div>
    </div>`
});

export const partnership = shell({
  title: 'Contact LUMIBION',
  description: 'Prepare an enquiry about research, a field trial or investment.',
  root: '../',
  active: 'partnership',
  body: `
    <section class="section wrap contact-layout">
      <div>
        <h1>Contact LUMIBION</h1>
        <p class="contact-description">Download your message as a text file and share it with your LUMIBION contact.</p>
        <a class="text-link" href="../#partner">Back to partnerships</a>
      </div>
      <form class="enquiry-form" method="post" data-enquiry>
        <label for="topic">Topic</label>
        <select id="topic" name="topic">${topics.map((topic, index) => `<option value="${index}">${topic}</option>`).join('')}</select>
        <label for="name">Name</label>
        <input id="name" name="name" autocomplete="name" maxlength="100" required>
        <label for="organisation">Organisation <span>(optional)</span></label>
        <input id="organisation" name="organisation" autocomplete="organization" maxlength="140">
        <label for="email">Email</label>
        <input id="email" name="email" type="email" autocomplete="email" maxlength="200" required>
        <label for="message">What would you like to discuss?</label>
        <textarea id="message" name="message" rows="5" maxlength="3000" required></textarea>
        <button class="button solid" type="submit" disabled>Download enquiry</button>
        <p class="form-status" role="status"></p>
        <noscript>Enable JavaScript to download your draft.</noscript>
      </form>
    </section>`
});
