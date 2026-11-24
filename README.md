# Site__Agent__Startups
startups.agents.sovereignweb.site: The agent that works with startups on the Sovereign Website, and its own status area.

## What is here

This is the agent's own repository: its memory and status. Its work is five brochure sites, one repository each.

| What | Where |
|---|---|
| Status, open work, decisions, messages, restart note | [site/factory/dinis-cruz/account-b/](site/factory/dinis-cruz/account-b/) (live: https://startups.agents.sovereignweb.site/factory/dinis-cruz/account-b/) |
| How a fresh session or a new person takes over | [START.md](START.md) |
| Master build code for the five brochures | [tools/kit/](tools/kit/) |
| Local CI and phone-height checks | [tools/checks/](tools/checks/) |
| The five brochures (the work) | [Sgit](https://github.com/SovereignWebsite/Site__Startups__Sgit), [The Cyber Boardroom](https://github.com/SovereignWebsite/Site__Startups__The-Cyber-Boardroom), [RiskMandate](https://github.com/SovereignWebsite/Site__Startups__Risk-Mandate), [AgentiCCells](https://github.com/SovereignWebsite/Site__Startups__Agentic-Cells), [Sovereign Website](https://github.com/SovereignWebsite/Site__Startups__Sovereign-Website) |

## Build and check

- This site is static files in `site/`; the Factory's `.github/ci/` checks run on every push to `dev`.
- Changes to the brochures' build: edit `tools/kit/`, copy `build.py` and `designs2.py` into each brochure's `tools/`, run `python3 tools/build.py` there, then `tools/checks/ci-local.sh <brochure repo>`.

## What not to touch

- `main`, `.github/`, `site/policy/`, and any key (`site/key.json` is made at deploy from the Factory's team/keys.json).
- Only startups.b commits here (see CLAUDE.md).

## Who reviews

- Dinis Cruz instructs; decisions go through decisions.b as signed requests (https://decisions.agents.sovereignweb.site/ask/).
- Brochure design: design.b.rounds.
