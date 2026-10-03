/**
 * ============================================
 * RoadMap - Main JavaScript
 * ============================================
 * This file holds the FRONTEND roadmap (frontendStages) and the shared
 * renderer. The BACKEND roadmap (Java / Spring Boot / Cloud / AI Agents)
 * lives in js/backendStages.js as `backendStages`, loaded first by index.html.
 * Handles:
 *   - Roadmap stage rendering with per-item checkboxes
 *   - Individual topic completion tracking
 *   - Overall progress bar + per-stage progress
 *   - localStorage persistence (key: roadmap_completed_items)
 * ============================================
 */

// -------------------------------------------------------------------------
// Roadmap Data — 15 frontend stages (content unchanged).
// Each stage: { id, track, title, description, topics: string[], project: string }
// -------------------------------------------------------------------------

const frontendStages = [
  {
    id: "stage-1",
    track: "frontend",
    title: "Computer Science Foundations",
    description:
      "Core CS concepts every developer should understand before diving into a framework.",
    topics: [
      "How computers execute programs",
      "Memory: stack vs heap",
      "Basic networking (HTTP, DNS, TCP/IP)",
      "What is an API?",
      "Client-server architecture",
      "JSON & data interchange",
      "Command line basics",
    ],
    project: "Trace an HTTP request from browser to server and back",
  },

  // --- 2. Programming Fundamentals ---
  {
    id: "stage-2",
    track: "frontend",
    title: "Programming Fundamentals",
    description:
      "Universal programming concepts: variables, control flow, functions, and problem-solving.",
    topics: [
      "Variables & constants",
      "Data types (primitives, strings, booleans)",
      "Operators (arithmetic, logical, comparison)",
      "Conditionals (if/else, switch)",
      "Loops (for, foreach, while)",
      "Functions & parameters",
      "Scope & lifetime",
      "Basic debugging",
    ],
    project: "Build a console calculator and a number guessing game",
  },

  // --- 3. Web Fundamentals ---
  {
    id: "stage-3",
    track: "frontend",
    title: "Web Fundamentals",
    description:
      "How the web works — essential knowledge for both frontend and backend.",
    topics: [
      "HTML structure & semantic elements",
      "CSS selectors, box model, flexbox, grid",
      "JavaScript basics (DOM, events)",
      "HTTP methods (GET, POST, PUT, DELETE)",
      "Status codes (200, 404, 500, etc.)",
      "Browser dev tools",
      "How a browser renders a page",
    ],
    project: "Build a static multi-page website from scratch",
  },

  // --- 4. Git & Professional Development ---
  {
    id: "stage-4",
    track: "frontend",
    title: "Git & Professional Development",
    description:
      "Version control, collaboration, and the habits of a professional developer.",
    topics: [
      "Git init, add, commit, status",
      "Branching & merging",
      "Resolving merge conflicts",
      "Push, pull, clone",
      "GitHub repositories & pull requests",
      "Git ignore (.gitignore)",
      "Writing good commit messages",
      "Reading documentation effectively",
    ],
    project: "Create a GitHub portfolio and commit daily",
  },

  // --- 5. Frontend Foundations — HTML & CSS ---
  {
    id: "stage-5",
    track: "frontend",
    title: "Frontend Foundations — HTML & CSS",
    description:
      "Build the visual layer of web applications with semantic HTML and modern CSS.",
    topics: [
      "Semantic HTML5 elements",
      "Forms, inputs, and validation attributes",
      "CSS selectors & specificity",
      "Box model (margin, border, padding, content)",
      "Flexbox layout",
      "CSS Grid layout",
      "Responsive design with media queries",
      "CSS variables & custom properties",
      "Animations & transitions basics",
    ],
    project: "Build a responsive landing page",
  },

  // --- 6. JavaScript Fundamentals ---
  {
    id: "stage-6",
    track: "frontend",
    title: "JavaScript Fundamentals",
    description: "Deep dive into JavaScript — the language of the web.",
    topics: [
      "Variables (let, const, var)",
      "Data types & type coercion",
      "Functions (declaration, expression, arrow)",
      "Scope & closures",
      "Arrays & array methods (map, filter, reduce)",
      "Objects & destructuring",
      "ES modules (import/export)",
      "Async JavaScript (callbacks, promises, async/await)",
      "Fetch API & consuming REST APIs",
      "Error handling (try/catch)",
    ],
    project: "Fetch and display data from a public API",
  },

  // --- 7. TypeScript Basics ---
  {
    id: "stage-7",
    track: "frontend",
    title: "TypeScript Basics",
    description:
      "Add static typing to JavaScript for safer, more maintainable code.",
    topics: [
      "Type annotations (strings, numbers, booleans)",
      "Arrays & tuples",
      "Interfaces & type aliases",
      "Functions & return types",
      "Union types & type guards",
      "Generics basics",
      "Enums",
      "Type inference",
      "tsconfig.json basics",
      "Compiling TypeScript to JavaScript",
    ],
    project: "Convert a JavaScript project to TypeScript",
  },

  // --- 8. React Fundamentals ---
  {
    id: "stage-8",
    track: "frontend",
    title: "React Fundamentals",
    description: "Component-based UI development with React.",
    topics: [
      "JSX syntax",
      "Functional components",
      "Props & prop types",
      "State with useState",
      "Event handling",
      "Conditional rendering",
      "Lists & keys",
      "Forms in React (controlled components)",
      "Component composition",
      "React Developer Tools",
    ],
    project: "Build a task tracker or weather dashboard in React",
  },

  // --- 9. Advanced React ---
  {
    id: "stage-9",
    track: "frontend",
    title: "Advanced React",
    description:
      "Go deeper with hooks, side effects, and state management patterns.",
    topics: [
      "useEffect & side effects",
      "useContext & Context API",
      "useReducer for complex state",
      "Custom hooks",
      "useRef & DOM references",
      "Performance with useMemo & useCallback",
      "React Router (navigation)",
      " Lifting state up",
      "Children prop & slots pattern",
    ],
    project: "Multi-page React app with shared state",
  },

  // --- 10. Next.js Fundamentals ---
  {
    id: "stage-10",
    track: "frontend",
    title: "Next.js Fundamentals",
    description:
      "Production React framework with server-side rendering and file-based routing.",
    topics: [
      "Next.js project structure",
      "File-based routing (App Router)",
      "Pages & layouts",
      "Server components vs client components",
      "Data fetching (server-side)",
      "Dynamic routes & params",
      "Static generation vs server rendering",
      "Metadata & SEO basics",
      "API routes (serverless functions)",
      "Image optimization",
    ],
    project: "Build a blog or portfolio site with Next.js",
  },

  // --- 11. Tailwind CSS ---
  {
    id: "stage-11",
    track: "frontend",
    title: "Tailwind CSS",
    description:
      "Utility-first CSS framework for rapidly building custom interfaces.",
    topics: [
      "Tailwind setup & configuration",
      "Utility classes (spacing, colors, typography)",
      "Flexbox & grid with Tailwind",
      "Responsive design with breakpoints",
      "Dark mode",
      "Customizing the theme",
      "Component extraction patterns",
      "Hover, focus, & state variants",
      "Animation utilities",
    ],
    project: "Redesign a previous project with Tailwind",
  },

  // --- 12. TanStack Query (React Query) ---
  {
    id: "stage-12",
    track: "frontend",
    title: "TanStack Query",
    description:
      "Powerful data-fetching and server-state management for React.",
    topics: [
      "QueryClient & QueryClientProvider",
      "useQuery for fetching data",
      "Loading & error states",
      "Caching & refetching",
      "useMutation for mutations",
      "Optimistic updates",
      "Query invalidation",
      "Infinite queries / pagination",
      "Devtools",
    ],
    project: "Data dashboard with caching and mutations",
  },

  // --- 13. Form Handling — React Hook Form & Zod ---
  {
    id: "stage-13",
    track: "frontend",
    title: "Form Handling — React Hook Form & Zod",
    description: "Manage forms and validate data with modern libraries.",
    topics: [
      "React Hook Form setup",
      "Registering inputs",
      "Form validation with Zod schemas",
      "Handling submit & errors",
      "Default values & initial form state",
      "Dependent fields",
      "File uploads",
      "Schema refactoring & reusability",
    ],
    project: "Multi-step registration form with validation",
  },

  // --- 14. Frontend Testing ---
  {
    id: "stage-14",
    track: "frontend",
    title: "Frontend Testing",
    description:
      "Ensure your frontend code works as expected with automated tests.",
    topics: [
      "Testing philosophy (unit vs integration vs e2e)",
      "Vitest or Jest basics",
      "React Testing Library",
      "Rendering components in tests",
      "Querying & asserting DOM",
      "Mocking functions & modules",
      "Testing custom hooks",
      "End-to-end testing with Playwright or Cypress (intro)",
    ],
    project: "Write tests for a React component and a custom hook",
  },

  // --- 15. Frontend Performance & Accessibility ---
  {
    id: "stage-15",
    track: "frontend",
    title: "Performance & Accessibility",
    description: "Make your frontend fast and usable for everyone.",
    topics: [
      "Semantic HTML for accessibility",
      "ARIA attributes & screen readers",
      "Keyboard navigation",
      "Color contrast & focus management",
      "Lighthouse audits",
      "Bundle size & code splitting",
      "Lazy loading & Suspense",
      "Core Web Vitals",
      "Memoization & re-render optimization",
    ],
    project: "Audit and improve an existing app's performance & a11y",
  },
];

// -------------------------------------------------------------------------
// Full roadmap = Frontend track (this file) + Backend track (backendStages.js)
// -------------------------------------------------------------------------

const roadmapStages = [
  ...frontendStages,
  ...(typeof backendStages === "undefined" ? [] : backendStages),
];

/**
 * Every tickable item of a stage.
 * Backend stages expose a richer shape (topics + completion checklist);
 * frontend stages keep the original topics-only behaviour.
 */
function stageItems(stage) {
  const topics = (stage.topics || []).map((t) => ({
    id: "t-" + sanitizeItemId(t),
    label: t,
    kind: "topic",
  }));
  const checklist = (stage.checklist || []).map((c) => ({
    id: "c-" + sanitizeItemId(c),
    label: c,
    kind: "check",
  }));
  return topics.concat(checklist);
}

// -------------------------------------------------------------------------
// LocalStorage Helpers
// -------------------------------------------------------------------------

const STORAGE_KEY = "roadmap_completed_items";

/**
 * Load the set of completed item IDs from localStorage.
 * Item IDs look like: "stage-16:variables", "stage-8:useState"
 */
function loadCompletedItems() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return new Set();

  try {
    const ids = JSON.parse(stored);
    return new Set(Array.isArray(ids) ? ids : []);
  } catch {
    return new Set();
  }
}

/**
 * Save the current set of completed item IDs to localStorage.
 */
function saveCompletedItems(completedSet) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedSet]));
}

// -------------------------------------------------------------------------
// State
// -------------------------------------------------------------------------

let completedItems = loadCompletedItems();

let progressBar = null;
let progressText = null;
let progressPercent = null;

// -------------------------------------------------------------------------
// DOM Ready
// -------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  progressBar = document.getElementById("progress-bar");
  progressText = document.getElementById("progress-text");
  progressPercent = document.getElementById("progress-percent");

  renderRoadmap();
  updateProgressBar();
});

// -------------------------------------------------------------------------
// Resource Buttons (Documentation / Course)
// -------------------------------------------------------------------------

const RESOURCE_KIND_LABEL = {
  doc: { label: "Docs", icon: "\u{1F4D6}", title: "Documentation" },
  course: { label: "Course", icon: "\u{1F393}", title: "Course" },
};

/**
 * Render one clickable button per resource for a stage.
 * Each button opens the resource in a new tab and is labelled by its kind:
 * "doc" for reference documentation, "course" for guided learning material.
 */
function renderResourceButtons(resources) {
  if (!resources || !resources.length) return "";

  const button = (r) => {
    const kind = RESOURCE_KIND_LABEL[r.kind] || RESOURCE_KIND_LABEL.doc;
    return `
            <a class="resource-btn ${r.kind === "course" ? "course" : "doc"}"
               href="${escapeHtml(r.url)}"
               target="_blank"
               rel="noopener noreferrer"
               title="${kind.title}: ${escapeHtml(r.title)}">
              <span class="resource-btn-icon" aria-hidden="true">${kind.icon}</span>
              <span class="resource-btn-label">${kind.label}</span>
              <span class="resource-btn-title">${escapeHtml(r.title)}</span>
            </a>`;
  };

  const docs = resources.filter((r) => r.kind !== "course").map(button);
  const courses = resources.filter((r) => r.kind === "course").map(button);

  const group = (title, buttons) =>
    buttons.length
      ? `
        <div class="resource-group">
          <span class="resource-group-label">${title}</span>
          <div class="resource-btns">${buttons.join("")}</div>
        </div>`
      : "";

  const body =
    group("Free Documentation", docs) + group("Free Courses", courses);

  if (!body) return "";

  return `
        <div class="detail-section">
          <span class="detail-label">Free Learning Resources</span>
          ${body}
        </div>`;
}

// -------------------------------------------------------------------------
// Render Roadmap Cards
// -------------------------------------------------------------------------

function renderRoadmap() {
  const grid = document.getElementById("roadmap-grid");
  if (!grid) return;

  grid.innerHTML = "";

  roadmapStages.forEach((stage) => {
    const items = stageItems(stage);
    const stageCompleted = isStageCompleted(stage.id);
    const stageItemCount = items.length;
    const stageCompletedCount = countStageCompleted(stage.id);
    const isBackend = String(stage.id).startsWith("backend-stage-");

    const card = document.createElement("div");
    card.className = `stage-card${stageCompleted ? " completed" : ""}${isBackend ? " backend" : ""}`;
    card.dataset.stageId = stage.id;

    // --- Helper: render one checkbox row ---
    const renderItem = (item) => {
      const itemId = `${stage.id}:${item.id}`;
      const checked = completedItems.has(itemId) ? "checked" : "";
      const prefix = item.kind === "check" ? "&#10003; " : "";
      return `
            <div class="topic-item${item.kind === "check" ? " check-item" : ""}" data-item-id="${itemId}">
              <div class="topic-checkbox ${checked}" data-action="toggle-item" title="Toggle: ${escapeHtml(item.label)}"></div>
              <span class="topic-text">${prefix}${escapeHtml(item.label)}</span>
            </div>`;
    };

    const topicsHtml = items
      .filter((i) => i.kind === "topic")
      .map(renderItem)
      .join("");
    const checklistHtml = items
      .filter((i) => i.kind === "check")
      .map(renderItem)
      .join("");

    // Backend stages carry richer metadata: goal, outcomes, resources, requirements
    const goalHtml = stage.goal
      ? `
        <div class="detail-section">
          <span class="detail-label">Goal &mdash; What &amp; Why</span>
          <p class="stage-goal">${escapeHtml(stage.goal)}</p>
        </div>`
      : "";

    const outcomesHtml =
      stage.outcomes && stage.outcomes.length
        ? `
        <div class="detail-section">
          <span class="detail-label">Expected Skills &amp; Outcomes</span>
          <ul class="projects-list">
            ${stage.outcomes.map((o) => `<li>${escapeHtml(o)}</li>`).join("")}
          </ul>
        </div>`
        : "";

    // Documentation / Course buttons, one per resource, grouped by kind
    const resourcesHtml = renderResourceButtons(stage.resources);

    const requirementsHtml =
      stage.requirements && stage.requirements.length
        ? `
        <div class="detail-section">
          <span class="detail-label">Project Requirements</span>
          <ul class="projects-list requirements-list">
            ${stage.requirements.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}
          </ul>
        </div>`
        : "";

    const checklistSectionHtml = checklistHtml
      ? `
        <div class="detail-section">
          <span class="detail-label">Completion Checklist &mdash; tick when done</span>
          <div class="topics-list checklist-list">${checklistHtml}</div>
        </div>`
      : "";

    // Stage checkbox (completes everything in the stage at once)
    const stageCheckboxChecked = stageCompleted ? "checked" : "";

    const descriptionHtml = stage.description
      ? `<div class="stage-description">${escapeHtml(stage.description)}</div>`
      : "";

    const numberLabel = stage.id
      .replace(/^backend-stage-/, "B")
      .replace(/^stage-/, "");

    card.innerHTML = `
      <div class="stage-header">
        <div class="stage-number">${numberLabel}</div>
        <div class="stage-info">
          <div class="stage-title">${escapeHtml(stage.title)}</div>
          ${descriptionHtml}
          <div class="stage-progress-mini">
            <span class="stage-progress-text">${stageCompletedCount}/${stageItemCount} items</span>
            <div class="stage-progress-bar-container">
              <div class="stage-progress-bar" style="width: ${
                stageItemCount === 0
                  ? 0
                  : (stageCompletedCount / stageItemCount) * 100
              }%"></div>
            </div>
          </div>
        </div>
        <div class="stage-checkbox${stageCheckboxChecked}" data-action="toggle-stage" title="Toggle entire stage"></div>
      </div>
      <div class="stage-details">
        ${goalHtml}
        ${resourcesHtml}
        <div class="detail-section">
          <span class="detail-label">Topics to Learn &mdash; check each item</span>
          <div class="topics-list">${topicsHtml}</div>
        </div>
        ${outcomesHtml}
        <div class="detail-section">
          <span class="detail-label">Practical Project</span>
          <ul class="projects-list">
            <li>${escapeHtml(stage.project)}</li>
          </ul>
        </div>
        ${requirementsHtml}
        ${checklistSectionHtml}
      </div>
    `;

    // --- Event: toggle individual item ---
    card.querySelectorAll("[data-action='toggle-item']").forEach((cb) => {
      cb.addEventListener("click", (e) => {
        e.stopPropagation();
        const itemId = cb.closest(".topic-item").dataset.itemId;
        toggleItem(itemId);
      });
    });

    // --- Event: toggle entire stage ---
    const stageCb = card.querySelector('[data-action="toggle-stage"]');
    stageCb.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleStage(stage.id);
    });

    grid.appendChild(card);
  });
}

// -------------------------------------------------------------------------
// Toggle: single item
// -------------------------------------------------------------------------

function toggleItem(itemId) {
  if (completedItems.has(itemId)) {
    completedItems.delete(itemId);
  } else {
    completedItems.add(itemId);
  }

  saveCompletedItems(completedItems);
  updateCardStates();
  updateProgressBar();
}

// -------------------------------------------------------------------------
// Toggle: entire stage (topics + checklist)
// -------------------------------------------------------------------------

function toggleStage(stageId) {
  const stage = roadmapStages.find((s) => s.id === stageId);
  if (!stage) return;

  const isCurrentlyCompleted = isStageCompleted(stageId);

  stageItems(stage).forEach((item) => {
    const itemId = `${stageId}:${item.id}`;
    if (isCurrentlyCompleted) {
      completedItems.delete(itemId);
    } else {
      completedItems.add(itemId);
    }
  });

  saveCompletedItems(completedItems);
  updateCardStates();
  updateProgressBar();
}

// -------------------------------------------------------------------------
// Helpers: stage completion
// -------------------------------------------------------------------------

function isStageCompleted(stageId) {
  const stage = roadmapStages.find((s) => s.id === stageId);
  if (!stage) return false;
  const items = stageItems(stage);
  if (items.length === 0) return false;
  return items.every((item) => completedItems.has(`${stageId}:${item.id}`));
}

function countStageCompleted(stageId) {
  const stage = roadmapStages.find((s) => s.id === stageId);
  if (!stage) return 0;
  const items = stageItems(stage);
  return items.filter((item) => completedItems.has(`${stageId}:${item.id}`))
    .length;
}

// -------------------------------------------------------------------------
// Update UI after state change
// -------------------------------------------------------------------------

function updateCardStates() {
  renderRoadmap();
}

// -------------------------------------------------------------------------
// Progress Bar (overall)
// -------------------------------------------------------------------------

function updateProgressBar() {
  let totalItems = 0;
  let completedCount = 0;

  roadmapStages.forEach((stage) => {
    stageItems(stage).forEach((item) => {
      totalItems++;
      if (completedItems.has(`${stage.id}:${item.id}`)) {
        completedCount++;
      }
    });
  });

  const percent =
    totalItems === 0 ? 0 : Math.round((completedCount / totalItems) * 100);

  if (progressBar) {
    progressBar.style.width = `${percent}%`;
  }
  if (progressText) {
    progressText.textContent = `${completedCount} / ${totalItems} items completed`;
  }
  if (progressPercent) {
    progressPercent.textContent = `${percent}%`;
  }
}

// -------------------------------------------------------------------------
// Utility: sanitize a topic string into a safe item ID fragment
// -------------------------------------------------------------------------

function sanitizeItemId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

// -------------------------------------------------------------------------
// Utility: escape HTML
// -------------------------------------------------------------------------

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
