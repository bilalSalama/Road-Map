# RoadMap

An interactive, dependency-free learning roadmap for full-stack development, with two tracks:

- **Frontend (stages 1–15)** — HTML/CSS, JavaScript, TypeScript, React, Next.js, Tailwind, testing, accessibility.
- **Backend (stages 1–38)** — Java, Spring Boot, SQL/PostgreSQL, security, testing, Redis, Kafka,
  clean code & architecture, Docker, AWS, CI/CD, Kubernetes, observability, and backend AI
  integration (LLM APIs, prompt engineering, RAG, tool calling, agents, MCP, guardrails).

Every backend stage has a goal, topics, expected outcomes, free documentation & course buttons,
a practical project with detailed requirements, and a tickable completion checklist.
All links point to official documentation or genuinely free material.

## Features

- Per-topic and per-checklist checkboxes with per-stage and overall progress bars.
- Progress persists in `localStorage` under `roadmap_completed_items`.
- Documentation / Course buttons open the resource in a new tab.

## Project structure

```
index.html            Page shell, navigation, hero, progress bar, roadmap grid
css/main.css          Shared styles for both tracks
js/backendStages.js   Backend roadmap data (stages 1–38)
js/main.js            Frontend roadmap data (stages 1–15) + shared renderer
```

`js/backendStages.js` must be loaded **before** `js/main.js`, since the renderer
combines both tracks into the `roadmapStages` list.

## Running locally

No build step. Serve the folder over HTTP (the browser needs to load the JS files):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```