const art = (name, classes = '') => `<img class="${classes}" src="./assets/botanical/${name}.webp" alt="" width="640" height="640" loading="lazy">`;
const action = (url, text, variant) => `<a class="l-action ${variant}" href="${url}">${text}</a>`;

const soilNotes = [
  ['study-soil', 'Soil', 'Soil moisture and structure affect how nutrients move towards the roots.'],
  ['study-seedling', 'Roots', 'We’re interested in how much of the available nutrition the plant takes up.'],
  ['study-wheat', 'Field conditions', 'A crop can respond differently in the field, where weather and growing practices vary.'],
];

const stages = [
  ['seed', 'Seed'],
  ['germination', 'Germination'],
  ['seedling', 'Seedling'],
  ['vegetative', 'Vegetative growth'],
  ['maturity', 'Maturity'],
];

const development = [
  ['study-microscope', 'Establish a baseline', 'Record how plants grow under the same conditions with and without the material.'],
  ['study-column', 'Assess the photobioreactor', 'Check whether we can use it to make the same material for each trial.'],
  ['study-clipboard', 'Design a field trial', 'Choose a crop and a site with partners, and agree on what to compare.'],
];

const measures = [
  ['measure-leaf', 'Nutrient uptake', 'Do the plants take up more nutrients?'],
  ['measure-soil', 'Soil moisture', 'Does the amount of water held by the soil change?'],
  ['measure-plots', 'Repeatability', 'Do we see the same response across plots?'],
];

const crops = [
  ['maize', 'Maize'],
  ['sunflower', 'Sunflower'],
  ['soybeans', 'Soybeans'],
  ['tomato', 'Tomatoes'],
];

const roadmap = [
  ['partner-papers', 'Settle ownership', 'Clarify who owns the work and what we can share with research partners.'],
  ['study-microscope', 'Find a research partner', 'Work with a lab to design a study and agree on how to assess the results.'],
  ['measure-plots', 'Plan the field pilot', 'Choose a site, work out how to supply trial material and check which permissions the pilot would need.'],
];

const partners = [
  ['partner-vials', 'Research teams', 'Help design an independent study and decide what to measure.', 'Research enquiry'],
  ['partner-grain', 'Growers', 'Tell us about your crops and what you’d want a field trial to answer.', 'Field trial enquiry'],
  ['partner-papers', 'Investors', 'Discuss what it would take to run the study and a field pilot.', 'Investor enquiry'],
];

const questions = [
  ['Can growers buy it yet?', 'The first programme is still in research and development.'],
  ['Is a field trial scheduled?', 'We plan to agree on a crop, site and comparison with research and field partners first.'],
  ['Why the Netherlands?', 'We’re looking at the Netherlands as a base for research and collaboration with European growers.'],
];

export function landing() {
  return `
    <div class="botanical-landing">
      <section class="bot-hero" aria-labelledby="hero-title">
        <div class="wrap bot-hero-inner">
          <div class="bot-hero-copy">
            <h1 id="hero-title">Soil microbes<br class="hero-break"> and crop nutrition</h1>
            <p>At LUMIBION, we’re studying whether the cyanobacterium <i>Nostoc commune</i> can improve how crops take up nutrients.</p>
            <div class="bot-actions">${action('#research','Explore the research','l-primary')}${action('#investors','For investors','l-ghost')}</div>
          </div>
          <figure class="bot-hero-art">
            <img src="./assets/botanical/sunflower-specimen.webp" width="512" height="1530" alt="Sunflower with its roots exposed" fetchpriority="high">
            <figcaption>Sunflower and root system</figcaption>
          </figure>
        </div>
      </section>

      <section class="bot-section bot-case" id="approach" aria-labelledby="case-title">
        <div class="wrap">
          <div class="bot-intro">
            <h2 id="case-title">How roots take up nutrients</h2>
            <p>Roots draw on nutrients dissolved in soil water. To see if a microbe makes a difference, we need to look at the soil and the plant together.</p>
          </div>
          <div class="bot-triad">
            ${soilNotes.map(([icon,title,copy]) => `<article>${art(icon, 'bot-icon')}<h3>${title}</h3><p>${copy}</p></article>`).join('')}
          </div>
        </div>
      </section>

      <section class="bot-section bot-stages" aria-labelledby="stages-title">
        <div class="wrap">
          <div class="bot-intro">
            <h2 id="stages-title">When to measure growth</h2>
            <p>As a crop grows, its nutrient needs change. A trial needs to account for the stage at which we measure roots and nutrient uptake.</p>
          </div>
          <figure class="growth-atlas">
            <ol aria-label="Stages of cereal growth">
              ${stages.map(([name,title]) => `<li>${art(name, 'growth-specimen')}<span>${title}</span></li>`).join('')}
            </ol>
            <figcaption>Growth stages of a cereal crop</figcaption>
          </figure>
        </div>
      </section>

      <section class="bot-section bot-research" id="research" aria-labelledby="macro-title">
        <div class="wrap bot-split">
          <figure class="specimen-stage specimen-macro">
            ${art('microbial', 'specimen-main')}
            <figcaption>Illustration of a microbial colony</figcaption>
          </figure>
          <div class="bot-split-copy">
            <h2 id="macro-title"><i>Nostoc commune</i></h2>
            <p>This cyanobacterium is the focus of our first programme. We want to find out whether it changes the nutrients that crops can take up from soil.</p>
            <dl class="bot-research-facts">
              <div><dt>Current stage</dt><dd>Research and development</dd></div>
              <div><dt>Next step</dt><dd>An independent study</dd></div>
            </dl>
            ${action('./research/','View the research programme','l-text')}
          </div>
        </div>
      </section>

      <section class="bot-section bot-method" id="development" aria-labelledby="method-title">
        <div class="wrap">
          <div class="bot-intro">
            <h2 id="method-title">Before a field trial</h2>
            <p>We’re considering a photobioreactor to produce material for testing. We need to know whether we can make it consistently and whether plants respond to it.</p>
          </div>
          <div class="bot-method-body">
            <ol class="bot-steps">
              ${development.map(([icon,title,copy]) => `<li>${art(icon, 'bot-icon')}<div><h3>${title}</h3><p>${copy}</p></div></li>`).join('')}
            </ol>
            <figure class="specimen-stage specimen-column">
              ${art('reactor', 'specimen-main')}
              <figcaption>Illustration of a photobioreactor</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section class="bot-field" aria-labelledby="field-title">
        <div class="bot-field-image">
          <picture>
            <source media="(max-width: 680px)" srcset="./assets/botanical/field-photo-sm.webp">
            <img src="./assets/botanical/field-photo.webp" alt="" width="1536" height="1024" loading="lazy">
          </picture>
        </div>
        <div class="wrap bot-field-inner">
          <h2 id="field-title">What would a pilot measure?</h2>
          <dl class="field-measures">${measures.map(([icon,title,copy]) => `<div><dt>${art(icon, 'bot-icon')}${title}</dt><dd>${copy}</dd></div>`).join('')}</dl>
        </div>
      </section>

      <section class="bot-section bot-crops" aria-labelledby="crops-title">
        <div class="wrap">
          <div class="bot-intro">
            <h2 id="crops-title">Choosing crops and sites</h2>
            <p>Which crop we test will depend on the soil, the grower’s usual practices and the question we’re trying to answer. These are examples of crops a future study could consider.</p>
          </div>
          <ul class="crop-atlas">
            ${crops.map(([name,title]) => `<li>${art(name)}<h3>${title}</h3></li>`).join('')}
          </ul>
        </div>
      </section>

      <section class="bot-section bot-roadmap" id="roadmap" aria-labelledby="roadmap-title">
        <div class="wrap bot-split">
          <div class="bot-split-copy">
            <h2 id="roadmap-title">A pilot in the Netherlands</h2>
            <p>We plan to start with an independent study in the Netherlands. The results would help us decide whether to run a field pilot with local growers.</p>
          </div>
          <ol class="bot-roadmap-steps">
            ${roadmap.map(([icon,title,copy]) => `<li>${art(icon, 'bot-icon')}<div><h3>${title}</h3><p>${copy}</p></div></li>`).join('')}
          </ol>
        </div>
      </section>

      <section class="bot-section bot-investors" id="investors" aria-labelledby="investor-title">
        <div class="wrap investor-grid">
          <div class="investor-intro">
            <h2 id="investor-title">For investors</h2>
            <p>Our immediate goal is an independent study that gives us enough evidence to decide whether to run a field trial.</p>
            <div class="bot-actions">${action('./partnership/?topic=2','Prepare an investor enquiry','l-primary')}${action('#roadmap','See the pilot plan','l-ghost')}</div>
          </div>
          <div class="investor-summary">
            <h3>What the research needs</h3>
            <dl>
              <div><dt>Before the study</dt><dd>A research partner and a reliable source of trial material</dd></div>
              <div><dt>Before a pilot</dt><dd>Study results and agreement on a crop and a site</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section class="bot-section bot-partners" id="partner" aria-labelledby="partner-title">
        <div class="wrap">
          <h2 id="partner-title">Work with LUMIBION</h2>
          <div class="bot-partner-grid">
            ${partners.map(([icon,title,copy,link],i) => `<article>${art(icon, 'bot-icon')}<h3>${title}</h3><p>${copy}</p>${action('./partnership/?topic='+i, link, 'l-text')}</article>`).join('')}
          </div>
        </div>
      </section>

      <section class="bot-section bot-questions" aria-labelledby="faq-title">
        <div class="wrap bot-split">
          <h2 id="faq-title">Common questions</h2>
          <div class="bot-faq">
            ${questions.map(([question,answer]) => `<details><summary>${question}<span aria-hidden="true"></span></summary><p>${answer}</p></details>`).join('')}
            ${action('./tour/','Open the field guide','l-text')}
          </div>
        </div>
      </section>
    </div>`;
}
