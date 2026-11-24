const {chromium} = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const s of ['sgit', 'the-cyber-boardroom', 'risk-mandate', 'agentic-cells', 'sovereign-website']) {
    const p = await b.newPage({viewport: {width: 390, height: 844}});
    await p.goto(`https://${s}.startups.sovereignweb.site/?h=19`, {waitUntil: 'networkidle'});
    console.log(s, await p.evaluate(() => document.documentElement.scrollHeight));
    await p.close();
  }
  await b.close();
})();
