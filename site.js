/**
 * Calculus Research — Global Site Features
 * Dark mode, scroll animations, back-to-top, animated counters, exit intent, cookie consent
 */
(function () {
  var BRAND = {
    green: '#0F4D2C',
    greenLight: '#3E9B5F',
    gold: '#F2A41F',
    charcoal: '#1C1F22',
    surface: '#F7F9F8',
    mist: '#A9B7AE'
  };

  // ── Inject Styles ──────────────────────────────────────────────────
  var css = [
    /* Dark mode toggle button */
    '#cr-dark-toggle{background:none;border:1px solid currentColor;border-radius:8px;padding:6px 8px;cursor:pointer;color:inherit;display:flex;align-items:center;gap:5px;font-size:13px;font-family:"Inter",sans-serif;transition:all .2s;opacity:.7}',
    '#cr-dark-toggle:hover{opacity:1}',
    '#cr-dark-toggle svg{width:16px;height:16px;fill:currentColor}',

    /* Dark mode overrides */
    'html.dark body{background:#111418!important;color:#e8e8e8!important}',
    'html.dark nav{background:#161a1e!important;border-color:rgba(255,255,255,.08)!important}',
    'html.dark nav a,html.dark nav button{color:#e0e0e0!important}',
    'html.dark .bg-white,html.dark .bg-cr-surface,html.dark .bg-cr-surface2{background:#1a1f25!important}',
    'html.dark .bg-gray-50,html.dark .bg-gray-100{background:#1e2329!important}',
    'html.dark .text-cr-charcoal,html.dark .text-gray-900,html.dark .text-gray-800{color:#e8e8e8!important}',
    'html.dark .text-gray-600,html.dark .text-gray-500,html.dark .text-cr-mist{color:#9aa3a8!important}',
    'html.dark .text-gray-700{color:#b0b8be!important}',
    'html.dark .border-cr-border,html.dark .border-gray-200,html.dark .border-gray-100{border-color:rgba(255,255,255,.08)!important}',
    'html.dark .shadow-cr,html.dark .shadow-cr-md,html.dark .shadow-cr-sm{box-shadow:0 2px 12px rgba(0,0,0,.4)!important}',
    'html.dark .bg-cr-green-900{background:#0F4D2C!important}',
    'html.dark .hero-bg{background-image:linear-gradient(135deg,rgba(10,14,18,0.92),rgba(15,77,44,0.78)),url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80")!important}',
    'html.dark input,html.dark textarea,html.dark select{background:#1e2329!important;color:#e0e0e0!important;border-color:rgba(255,255,255,.12)!important}',
    'html.dark .rounded-xl,html.dark .rounded-2xl,html.dark .rounded-lg{border-color:rgba(255,255,255,.06)}',

    /* Scroll animations */
    '[data-animate]{opacity:0;transform:translateY(24px);transition:opacity .6s ease-out,transform .6s ease-out}',
    '[data-animate].animate-in{opacity:1!important;transform:translateY(0)!important}',
    '[data-animate="fade-left"]{opacity:0;transform:translateX(-24px)}',
    '[data-animate="fade-left"].animate-in{transform:translateX(0)!important}',
    '[data-animate="fade-right"]{opacity:0;transform:translateX(24px)}',
    '[data-animate="fade-right"].animate-in{transform:translateX(0)!important}',
    '[data-animate="scale"]{opacity:0;transform:scale(.92)}',
    '[data-animate="scale"].animate-in{transform:scale(1)!important}',

    /* Back to top */
    '#cr-back-top{position:fixed;bottom:24px;left:24px;width:44px;height:44px;border-radius:50%;background:' + BRAND.green + ';color:#fff;border:none;cursor:pointer;z-index:9998;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,.2);opacity:0;transform:translateY(16px);pointer-events:none;transition:opacity .3s,transform .3s}',
    '#cr-back-top.visible{opacity:1;transform:translateY(0);pointer-events:auto}',
    '#cr-back-top:hover{background:' + BRAND.greenLight + '}',
    '#cr-back-top svg{width:20px;height:20px;fill:#fff}',

    /* Exit intent popup */
    '#cr-exit-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:10000;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .3s}',
    '#cr-exit-overlay.show{opacity:1;pointer-events:auto}',
    '#cr-exit-popup{background:#fff;border-radius:16px;max-width:440px;width:90%;padding:36px;text-align:center;transform:scale(.9);transition:transform .3s}',
    '#cr-exit-overlay.show #cr-exit-popup{transform:scale(1)}',
    'html.dark #cr-exit-popup{background:#1a1f25;color:#e0e0e0}',
    '#cr-exit-popup h3{font-family:"Space Grotesk",sans-serif;font-size:22px;font-weight:700;color:' + BRAND.green + ';margin:0 0 8px}',
    '#cr-exit-popup p{font-size:14px;color:#555;margin:0 0 20px;line-height:1.6}',
    'html.dark #cr-exit-popup p{color:#9aa3a8}',
    '#cr-exit-popup input{width:100%;padding:12px 16px;border:1px solid #DDE6E1;border-radius:10px;font-size:14px;font-family:"Inter",sans-serif;margin-bottom:12px;outline:none}',
    '#cr-exit-popup input:focus{border-color:' + BRAND.greenLight + '}',
    '#cr-exit-email-btn{width:100%;padding:12px;border:none;border-radius:10px;background:' + BRAND.green + ';color:#fff;font-size:14px;font-weight:600;font-family:"Inter",sans-serif;cursor:pointer;transition:background .2s}',
    '#cr-exit-email-btn:hover{background:' + BRAND.greenLight + '}',
    '#cr-exit-close{position:absolute;top:12px;right:16px;background:none;border:none;font-size:22px;color:#999;cursor:pointer}',
    '#cr-exit-close:hover{color:#333}',
    '#cr-exit-popup .cr-exit-note{font-size:11px;color:#999;margin-top:10px}',

    /* Cookie consent */
    '#cr-cookie-bar{position:fixed;bottom:0;left:0;right:0;background:' + BRAND.charcoal + ';color:#e0e0e0;padding:14px 24px;z-index:10001;display:flex;align-items:center;justify-content:center;gap:16px;font-size:13px;font-family:"Inter",sans-serif;transform:translateY(100%);transition:transform .4s ease-out;flex-wrap:wrap}',
    '#cr-cookie-bar.show{transform:translateY(0)}',
    '#cr-cookie-bar a{color:' + BRAND.greenLight + ';text-decoration:underline}',
    '.cr-cookie-btn{padding:8px 18px;border-radius:8px;border:none;font-size:13px;font-weight:600;cursor:pointer;font-family:"Inter",sans-serif;transition:background .2s}',
    '#cr-cookie-accept{background:' + BRAND.green + ';color:#fff}',
    '#cr-cookie-accept:hover{background:' + BRAND.greenLight + '}',
    '#cr-cookie-decline{background:transparent;color:#aaa;border:1px solid #555}',
    '#cr-cookie-decline:hover{color:#fff;border-color:#888}',

    /* Skip to content */
    '#cr-skip-link{position:absolute;top:-100px;left:16px;background:' + BRAND.green + ';color:#fff;padding:8px 16px;border-radius:8px;z-index:10002;font-size:14px;font-family:"Inter",sans-serif;text-decoration:none;transition:top .2s}',
    '#cr-skip-link:focus{top:16px}',

    '@media(max-width:480px){#cr-back-top{bottom:16px;left:16px;width:40px;height:40px}#cr-cookie-bar{flex-direction:column;text-align:center;padding:16px}}'
  ].join('\n');

  var styleEl = document.createElement('style');
  styleEl.id = 'cr-site-styles';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ── Skip to Content ────────────────────────────────────────────────
  var skipLink = document.createElement('a');
  skipLink.id = 'cr-skip-link';
  skipLink.href = '#main';
  skipLink.textContent = 'Skip to content';
  document.body.insertBefore(skipLink, document.body.firstChild);

  // Tag main content
  var mainContent = document.querySelector('main') || document.querySelector('section');
  if (mainContent && !document.getElementById('main')) {
    mainContent.id = 'main';
  }

  // ── Dark Mode Toggle ──────────────────────────────────────────────
  var darkPref = localStorage.getItem('cr_dark_mode');
  if (darkPref === 'true') document.documentElement.classList.add('dark');

  var sunSVG = '<svg viewBox="0 0 24 24"><path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0-3a1 1 0 01-1-1V1a1 1 0 112 0v2a1 1 0 01-1 1zm0 18a1 1 0 01-1-1v-2a1 1 0 112 0v2a1 1 0 01-1 1zm9-9a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM5 12a1 1 0 01-1 1H2a1 1 0 110-2h2a1 1 0 011 1zm13.07-5.07a1 1 0 01-.71-.29l-1.41-1.41a1 1 0 111.41-1.42l1.42 1.42a1 1 0 01-.71 1.7zM7.05 19.36a1 1 0 01-.7-.29l-1.42-1.42a1 1 0 111.42-1.41l1.41 1.41a1 1 0 01-.71 1.71zm12.02 0a1 1 0 01-.71-.29 1 1 0 010-1.42l1.42-1.41a1 1 0 011.41 1.41l-1.41 1.42a1 1 0 01-.71.29zM7.05 7.05a1 1 0 01-.71-.3 1 1 0 010-1.41L7.76 3.92a1 1 0 011.41 1.42L7.76 6.75a1 1 0 01-.71.3z"/></svg>';
  var moonSVG = '<svg viewBox="0 0 24 24"><path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73A8.15 8.15 0 019.08 5.49a8.59 8.59 0 01.25-2 1 1 0 00-.67-1.18 1 1 0 00-.38-.04 10.14 10.14 0 1012.88 11.8 1 1 0 00.46-1.07z"/></svg>';

  function injectDarkToggle() {
    // Try to find the CTA area in the nav
    var ctaArea = document.querySelector('.hidden.lg\\:flex.items-center.gap-3') ||
                  document.querySelector('nav .hidden.lg\\:flex');
    if (!ctaArea) return;

    var toggle = document.createElement('button');
    toggle.id = 'cr-dark-toggle';
    toggle.setAttribute('aria-label', 'Toggle dark mode');
    toggle.innerHTML = document.documentElement.classList.contains('dark') ? sunSVG : moonSVG;
    toggle.onclick = function () {
      var isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('cr_dark_mode', isDark);
      toggle.innerHTML = isDark ? sunSVG : moonSVG;
    };
    ctaArea.insertBefore(toggle, ctaArea.firstChild);
  }
  injectDarkToggle();

  // ── Scroll Animations ─────────────────────────────────────────────
  function initScrollAnimations() {
    var animEls = document.querySelectorAll('[data-animate]');
    if (!animEls.length) return;

    // Stagger delay by index within parent
    animEls.forEach(function (el, i) {
      if (!el.style.transitionDelay && el.dataset.delay) {
        el.style.transitionDelay = el.dataset.delay;
      }
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    animEls.forEach(function (el) { observer.observe(el); });
  }
  initScrollAnimations();

  // ── Back to Top ────────────────────────────────────────────────────
  var backTop = document.createElement('button');
  backTop.id = 'cr-back-top';
  backTop.setAttribute('aria-label', 'Back to top');
  backTop.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 4l-8 8h5v8h6v-8h5z"/></svg>';
  backTop.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  document.body.appendChild(backTop);

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backTop.classList.add('visible');
    } else {
      backTop.classList.remove('visible');
    }
  }, { passive: true });

  // ── Animated Stat Counters ─────────────────────────────────────────
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  function animateCounter(el) {
    var target = parseFloat(el.dataset.count);
    var suffix = el.dataset.suffix || '';
    var prefix = el.dataset.prefix || '';
    var duration = 2000;
    var start = performance.now();
    var isDecimal = target % 1 !== 0;

    function update(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = target * eased;

      if (isDecimal) {
        el.textContent = prefix + current.toFixed(1) + suffix;
      } else {
        el.textContent = prefix + Math.round(current).toLocaleString() + suffix;
      }

      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }
  initCounters();

  // ── Exit Intent Popup ──────────────────────────────────────────────
  function initExitIntent() {
    if (sessionStorage.getItem('cr_exit_shown')) return;

    var overlay = document.createElement('div');
    overlay.id = 'cr-exit-overlay';
    overlay.innerHTML = [
      '<div id="cr-exit-popup" style="position:relative">',
      '  <button id="cr-exit-close" aria-label="Close">&times;</button>',
      '  <h3>Before You Go...</h3>',
      '  <p>Get exclusive market insights and deal opportunities delivered to your inbox. Join our private network.</p>',
      '  <input type="email" id="cr-exit-email" placeholder="Enter your email address" />',
      '  <button id="cr-exit-email-btn">Subscribe</button>',
      '  <p class="cr-exit-note">No spam. Unsubscribe anytime.</p>',
      '</div>'
    ].join('');
    document.body.appendChild(overlay);

    function showPopup() {
      sessionStorage.setItem('cr_exit_shown', '1');
      overlay.classList.add('show');
      document.removeEventListener('mouseleave', onMouseLeave);
    }

    function closePopup() {
      overlay.classList.remove('show');
    }

    overlay.querySelector('#cr-exit-close').onclick = closePopup;
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closePopup();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePopup();
    });

    overlay.querySelector('#cr-exit-email-btn').onclick = function () {
      var email = document.getElementById('cr-exit-email').value.trim();
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        document.getElementById('cr-exit-email').style.borderColor = '#D64545';
        return;
      }
      // Attempt HubSpot submission, fallback to mailto
      try {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.hsforms.com/submissions/v3/integration/submit/placeholder/placeholder');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({ fields: [{ name: 'email', value: email }] }));
      } catch (e) { /* fallback silently */ }
      overlay.querySelector('#cr-exit-popup').innerHTML = '<h3 style="color:' + BRAND.green + '">Thank You!</h3><p>You\'re now on our list. Watch for insights in your inbox.</p>';
      setTimeout(closePopup, 3000);
    };

    function onMouseLeave(e) {
      if (e.clientY <= 0) showPopup();
    }

    // Only attach after a short delay so it doesn't fire immediately
    setTimeout(function () {
      document.addEventListener('mouseleave', onMouseLeave);
    }, 5000);
  }
  initExitIntent();

  // ── Cookie Consent Banner ──────────────────────────────────────────
  function initCookieBanner() {
    if (localStorage.getItem('cr_cookie_consent')) return;

    var bar = document.createElement('div');
    bar.id = 'cr-cookie-bar';
    bar.innerHTML = [
      '<span>We use cookies to improve your experience on our site. By continuing, you agree to our use of cookies.</span>',
      '<div style="display:flex;gap:8px;flex-shrink:0">',
      '  <button id="cr-cookie-accept" class="cr-cookie-btn">Accept</button>',
      '  <button id="cr-cookie-decline" class="cr-cookie-btn">Decline</button>',
      '</div>'
    ].join('');
    document.body.appendChild(bar);

    // Show after a beat
    setTimeout(function () { bar.classList.add('show'); }, 1000);

    bar.querySelector('#cr-cookie-accept').onclick = function () {
      localStorage.setItem('cr_cookie_consent', 'accepted');
      bar.classList.remove('show');
      setTimeout(function () { bar.remove(); }, 400);
    };
    bar.querySelector('#cr-cookie-decline').onclick = function () {
      localStorage.setItem('cr_cookie_consent', 'declined');
      bar.classList.remove('show');
      setTimeout(function () { bar.remove(); }, 400);
    };
  }
  initCookieBanner();

})();
