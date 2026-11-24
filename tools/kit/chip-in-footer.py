# Put the seed's version chip inside the footer landmark (design.b round 1; axe "region"), until the seed does.
import sys
p = sys.argv[1]
s = open(p).read()
old = ".replace(/<\\/body>/i, `${chip}\\n</body>`);"
new = ".replace(/<\\/footer>(?![\\s\\S]*<\\/footer>)/i, `${chip}\\n</footer>`);\n  if (!s.includes('class=\"sws-version\"')) s = s.replace(/<\\/body>/i, `${chip}\\n</body>`);"
if old in s:
    s = s.replace(old, new)
    open(p, 'w').write(s)
    print('patched', p)
else:
    print('already patched or changed', p)
