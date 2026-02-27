/* shared.js — AYDAR site */

/* ── NAV INJECT ── */
function injectNav(activePage) {
  const pages = [
    { href:'index.html',    label:'Home'       },
    { href:'lighting.html', label:'Lighting'   },
    { href:'climate.html',  label:'Climate'    },
    { href:'security.html', label:'Security'   },
    { href:'app.html',      label:'App'        },
    { href:'b2b.html',      label:'B2B'        },
  ];
  const links = pages.map(p =>
    `<li><a href="${p.href}" ${p.label===activePage?'class="active"':''}>${p.label}</a></li>`
  ).join('');
  document.getElementById('nav').innerHTML = `
    <a href="index.html" class="nav-logo">AYDAR</a>
    <ul class="nav-links">${links}</ul>
    <a href="index.html#contact" class="nav-btn">Get in touch</a>
  `;
}

/* ── FOOTER INJECT ── */
function injectFooter() {
  document.getElementById('footer').innerHTML = `
    <div class="fi">
      <div class="ft">
        <div>
          <div class="fb">AYDAR</div>
          <div class="fs">Dar-K but Smarter</div>
          <div class="ftag">aydar.ma · Morocco 🇲🇦</div>
        </div>
        <div class="fc">
          <h4>Products</h4>
          <a href="lighting.html">Smart Lighting</a>
          <a href="climate.html">Climate Control</a>
          <a href="security.html">Security & Access</a>
          <a href="app.html">The AYDAR App</a>
        </div>
        <div class="fc">
          <h4>Services</h4>
          <a href="index.html#products">Installation</a>
          <a href="index.html#products">Maintenance</a>
          <a href="b2b.html">B2B Partners</a>
          <a href="index.html#contact">Consultation</a>
        </div>
        <div class="fc">
          <h4>Company</h4>
          <a href="index.html#about">Our Story</a>
          <a href="index.html#why">Why AYDAR</a>
          <a href="index.html#contact">Contact</a>
          <a href="b2b.html">Partnerships</a>
        </div>
      </div>
      <div class="fbot">
        <p class="fcp">Copyright © 2025 AYDAR <span class="fd">✦</span> Abir Ismaili <span class="fd">✦</span> All rights reserved</p>
        <p class="fcp">Made in Morocco <span class="fd">🇲🇦</span></p>
      </div>
    </div>
  `;
}

/* ── SCROLL BEHAVIOURS ── */
function initScroll() {
  const nav = document.getElementById('nav');
  const btt = document.getElementById('btt');
  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
    if (btt) btt.classList.toggle('show', window.scrollY > 400);
  });
  if (btt) btt.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
}

/* ── REVEAL OBSERVER ── */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold:.1, rootMargin:'0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ── TICKER DUPLICATE (for seamless loop) ── */
function initTicker() {
  const track = document.querySelector('.tt');
  if (!track) return;
  track.innerHTML += track.innerHTML;
}
