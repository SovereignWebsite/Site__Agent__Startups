// Page height at 390 px for each site's home page, and the tallest sections.
const {chromium} = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  for (const site of process.argv.slice(2)) {
    const p = await b.newPage({viewport: {width: 390, height: 844}});
    await p.goto('file://' + path.join(process.env.SITES || '/home/user', 'site__startups__' + site, 'site/index.html'));
    await p.waitForTimeout(500);
    const r = await p.evaluate(() => {
      const H = document.documentElement.scrollHeight;
      const parts = [];
      const main = document.querySelector('main');
      const walk = el => { for (const c of el.children) { const h = c.getBoundingClientRect().height; if (h > 250) parts.push([Math.round(h), c.tagName.toLowerCase() + '.' + (c.className || '').split(' ')[0] + ' ' + (c.querySelector('h2,h1')?.textContent || '').trim().slice(0, 40)]); } };
      walk(main); main.querySelectorAll(':scope > .wrap').forEach(walk);
      const foot = document.querySelector('footer.foot');
      return {H, foot: foot ? Math.round(foot.getBoundingClientRect().height) : 0, parts: parts.sort((a, b) => b[0] - a[0]).slice(0, 10)};
    });
    console.log('== ' + site + ' ' + r.H + ' px (footer ' + r.foot + ')');
    for (const x of r.parts) console.log('   ' + x[0] + ' ' + x[1]);
    await p.close();
  }
  await b.close();
})();
