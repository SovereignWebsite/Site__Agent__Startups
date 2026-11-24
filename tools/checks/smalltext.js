// On a 390 px phone, list text in main rendered below 15 px (SVG text scaled by its viewBox).
const {chromium} = require('playwright');
const path = require('path');
const glob = require('fs');
(async () => {
  const b = await chromium.launch();
  const sites = process.argv.slice(2);
  for (const site of sites) {
    const dir = path.join(process.env.SITES || '/home/user', 'site__startups__' + site, 'site');
    const pages = ['index.html', ...glob.readdirSync(dir + '/designs').filter(f => f.endsWith('.html') && f !== 'index.html').map(f => 'designs/' + f)];
    for (const pg of pages) {
      const p = await b.newPage({viewport: {width: 390, height: 844}});
      await p.goto('file://' + dir + '/' + pg);
      const res = await p.evaluate(() => {
        const out = {};
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let n;
        while ((n = walker.nextNode())) {
          if (!n.textContent.trim()) continue;
          const el = n.parentElement;
          if (el.closest('.sr-only,[aria-hidden="true"],.ct,.fam,.bar')) continue;
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden') continue;
          let px = parseFloat(cs.fontSize);
          const svg = el.closest('svg');
          if (svg) { const m = el.getScreenCTM ? el.getScreenCTM() : svg.getScreenCTM(); if (m) px *= Math.hypot(m.a, m.b); }
          if (px < 14.5) {
            const key = (svg ? 'svg ' : '') + el.tagName.toLowerCase() + '.' + String(el.getAttribute('class') || '').split(' ')[0] + ' in .' + String((el.parentElement.getAttribute('class') || el.parentElement.tagName)).split(' ')[0] + ' ' + px.toFixed(1);
            out[key] = (out[key] || 0) + 1;
          }
        }
        return out;
      });
      const keys = Object.entries(res);
      if (keys.length) { console.log('== ' + site + ' ' + pg); for (const [k, v] of keys) console.log('   ' + v + ' ' + k); }
      await p.close();
    }
  }
  await b.close();
})();
