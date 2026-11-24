const {chromium} = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  for (const s of process.argv.slice(2)) {
  const p = await b.newPage({viewport: {width: 390, height: 844}});
  await p.goto('file://' + path.join(process.env.SITES || '/home/user', 'site__startups__' + s, 'site/index.html'));
  const r = await p.evaluate(() => { const out = []; const add = el => out.push(Math.round(el.getBoundingClientRect().height) + ' ' + el.tagName.toLowerCase() + '.' + String(el.className).split(' ')[0] + ' ' + (el.id || '') + ' ' + el.textContent.trim().slice(0, 30).replace(/\s+/g, ' '));
    for (const el of document.body.children) { if (el.tagName === 'MAIN') { for (const c of el.children) { if (c.classList.contains('wrap')) { for (const d of c.children) add(d); } else add(c); } } else add(el); }
    return out; });
  console.log('== ' + s); console.log(r.filter(x => parseInt(x) > 60).join('\n'));
  await p.close(); }
  await b.close();
})();
