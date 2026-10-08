# RoadMap

An interactive, dependency-free learning roadmap for full-stack development, split into five independent
dedicated pages with no central index/dashboard:

- **Frontend (stages 1–15)** — HTML/CSS, JavaScript, TypeScript, React, Next.js, Tailwind, testing, accessibility.
- **Core Backend (stages 1–15)** — Java, Spring Boot, SQL/PostgreSQL, security, testing, Redis, Kafka.
- **Advanced Backend & Job-Ready (stages 16–25)** — clean code, architecture, design patterns, system design.
- **Cloud (stages 26–28)** — Docker, AWS, CI/CD, Kubernetes, observability.
- **AI Agents (stages 29–38, incl. Final Project)** — AI fundamentals, LLM APIs, prompt engineering, RAG,
  tool calling, agents, MCP, guardrails.

Progress persists in `localStorage` under `roadmap_completed_items`.
Documentation / Course buttons open the resource in a new tab.
**Backend path completion notification**: when the very last item of the entire backend track is ticked,
a congratulatory overlay appears with a breakdown per sub-track.

## Project structure

```
frontend-roadmap.html              Frontend track (15 stages)
core-backend-roadmap.html          Core Backend (15 stages)
advanced-backend-roadmap.html      Advanced Backend & Job-Ready (10 stages)
cloud-roadmap.html                 Cloud (3 stages)
ai-agents-roadmap.html             AI Agents (10 stages, incl. Final Project)
css/
  main.css                         Shared styles — luxury deep palette
  multi-page.css                   Page shell, active page indicator, mobile tweaks
js/
  frontendStages.js                Frontend stages (1–15) — const array
  backendStages.js                 Backend stages (1–38) — const array
  roadmap.js                       Shared renderer + state + per-page data binding
  main.js                          (placeholder — not loaded by any page)
```

Each page loads its own data script, then `js/roadmap.js`, then an inline script assigning `window.ROADMAP_STAGES`
to that page's stage array. The renderer reads the assignment on DOMContentLoaded and renders the cards.

## Running locally

No build step. Serve the folder over HTTP (the browser needs to load the JS files):

```bash
python3 -m http.server 8000
# then open http://localhost:8000/frontend-roadmap.html, core-backend-roadmap.html, etc.
```
