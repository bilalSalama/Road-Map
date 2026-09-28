/**
 * ============================================
 * RoadMap - Main JavaScript (.NET Full-Stack Path)
 * ============================================
 * Handles:
 *   - Roadmap stage rendering with per-item checkboxes
 *   - Individual topic completion tracking
 *   - Overall progress bar + per-stage progress
 *   - localStorage persistence (key: roadmap_completed_items)
 * ============================================
 */

// -------------------------------------------------------------------------
// Roadmap Data — 25 stages, .NET Full-Stack path
// Each stage: { id, title, description, topics: string[], project: string }
// -------------------------------------------------------------------------

const roadmapStages = [
  // --- 1. Computer Science Foundations ---
  {
    id: "stage-1",
    title: "Computer Science Foundations",
    description: "Core CS concepts every developer should understand before diving into a framework.",
    topics: [
      "How computers execute programs",
      "Memory: stack vs heap",
      "Basic networking (HTTP, DNS, TCP/IP)",
      "What is an API?",
      "Client-server architecture",
      "JSON & data interchange",
      "Command line basics"
    ],
    project: "Trace an HTTP request from browser to server and back"
  },

  // --- 2. Programming Fundamentals ---
  {
    id: "stage-2",
    title: "Programming Fundamentals",
    description: "Universal programming concepts: variables, control flow, functions, and problem-solving.",
    topics: [
      "Variables & constants",
      "Data types (primitives, strings, booleans)",
      "Operators (arithmetic, logical, comparison)",
      "Conditionals (if/else, switch)",
      "Loops (for, foreach, while)",
      "Functions & parameters",
      "Scope & lifetime",
      "Basic debugging"
    ],
    project: "Build a console calculator and a number guessing game"
  },

  // --- 3. Web Fundamentals ---
  {
    id: "stage-3",
    title: "Web Fundamentals",
    description: "How the web works — essential knowledge for both frontend and backend.",
    topics: [
      "HTML structure & semantic elements",
      "CSS selectors, box model, flexbox, grid",
      "JavaScript basics (DOM, events)",
      "HTTP methods (GET, POST, PUT, DELETE)",
      "Status codes (200, 404, 500, etc.)",
      "Browser dev tools",
      "How a browser renders a page"
    ],
    project: "Build a static multi-page website from scratch"
  },

  // --- 4. Git & Professional Development ---
  {
    id: "stage-4",
    title: "Git & Professional Development",
    description: "Version control, collaboration, and the habits of a professional developer.",
    topics: [
      "Git init, add, commit, status",
      "Branching & merging",
      "Resolving merge conflicts",
      "Push, pull, clone",
      "GitHub repositories & pull requests",
      "Git ignore (.gitignore)",
      "Writing good commit messages",
      "Reading documentation effectively"
    ],
    project: "Create a GitHub portfolio and commit daily"
  },

  // --- 5. Frontend Foundations — HTML & CSS ---
  {
    id: "stage-5",
    title: "Frontend Foundations — HTML & CSS",
    description: "Build the visual layer of web applications with semantic HTML and modern CSS.",
    topics: [
      "Semantic HTML5 elements",
      "Forms, inputs, and validation attributes",
      "CSS selectors & specificity",
      "Box model (margin, border, padding, content)",
      "Flexbox layout",
      "CSS Grid layout",
      "Responsive design with media queries",
      "CSS variables & custom properties",
      "Animations & transitions basics"
    ],
    project: "Build a responsive landing page"
  },

  // --- 6. JavaScript Fundamentals ---
  {
    id: "stage-6",
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
      "Error handling (try/catch)"
    ],
    project: "Fetch and display data from a public API"
  },

  // --- 7. TypeScript Basics ---
  {
    id: "stage-7",
    title: "TypeScript Basics",
    description: "Add static typing to JavaScript for safer, more maintainable code.",
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
      "Compiling TypeScript to JavaScript"
    ],
    project: "Convert a JavaScript project to TypeScript"
  },

  // --- 8. React Fundamentals ---
  {
    id: "stage-8",
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
      "React Developer Tools"
    ],
    project: "Build a task tracker or weather dashboard in React"
  },

  // --- 9. Advanced React ---
  {
    id: "stage-9",
    title: "Advanced React",
    description: "Go deeper with hooks, side effects, and state management patterns.",
    topics: [
      "useEffect & side effects",
      "useContext & Context API",
      "useReducer for complex state",
      "Custom hooks",
      "useRef & DOM references",
      "Performance with useMemo & useCallback",
      "React Router (navigation)",
      " Lifting state up",
      "Children prop & slots pattern"
    ],
    project: "Multi-page React app with shared state"
  },

  // --- 10. Next.js Fundamentals ---
  {
    id: "stage-10",
    title: "Next.js Fundamentals",
    description: "Production React framework with server-side rendering and file-based routing.",
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
      "Image optimization"
    ],
    project: "Build a blog or portfolio site with Next.js"
  },

  // --- 11. Tailwind CSS ---
  {
    id: "stage-11",
    title: "Tailwind CSS",
    description: "Utility-first CSS framework for rapidly building custom interfaces.",
    topics: [
      "Tailwind setup & configuration",
      "Utility classes (spacing, colors, typography)",
      "Flexbox & grid with Tailwind",
      "Responsive design with breakpoints",
      "Dark mode",
      "Customizing the theme",
      "Component extraction patterns",
      "Hover, focus, & state variants",
      "Animation utilities"
    ],
    project: "Redesign a previous project with Tailwind"
  },

  // --- 12. TanStack Query (React Query) ---
  {
    id: "stage-12",
    title: "TanStack Query",
    description: "Powerful data-fetching and server-state management for React.",
    topics: [
      "QueryClient & QueryClientProvider",
      "useQuery for fetching data",
      "Loading & error states",
      "Caching & refetching",
      "useMutation for mutations",
      "Optimistic updates",
      "Query invalidation",
      "Infinite queries / pagination",
      "Devtools"
    ],
    project: "Data dashboard with caching and mutations"
  },

  // --- 13. Form Handling — React Hook Form & Zod ---
  {
    id: "stage-13",
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
      "Schema refactoring & reusability"
    ],
    project: "Multi-step registration form with validation"
  },

  // --- 14. Frontend Testing ---
  {
    id: "stage-14",
    title: "Frontend Testing",
    description: "Ensure your frontend code works as expected with automated tests.",
    topics: [
      "Testing philosophy (unit vs integration vs e2e)",
      "Vitest or Jest basics",
      "React Testing Library",
      "Rendering components in tests",
      "Querying & asserting DOM",
      "Mocking functions & modules",
      "Testing custom hooks",
      "End-to-end testing with Playwright or Cypress (intro)"
    ],
    project: "Write tests for a React component and a custom hook"
  },

  // --- 15. Frontend Performance & Accessibility ---
  {
    id: "stage-15",
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
      "Memoization & re-render optimization"
    ],
    project: "Audit and improve an existing app's performance & a11y"
  },

  // --- 16. C# Fundamentals ---
  {
    id: "stage-16",
    title: "C# Fundamentals",
    description: "Learn the C# language — the foundation of .NET development.",
    topics: [
      "C# project structure & .csproj",
      "Variables & data types",
      "Value types vs reference types",
      "strings & string interpolation",
      "Operators",
      "if/else & switch expressions",
      "for, foreach, while loops",
      "Methods & parameters (ref, out, params)",
      "Arrays",
      "Collections (List<T>, Dictionary<TKey, TValue>, HashSet<T>)",
      "Exception handling (try/catch/finally)",
      "File I/O basics",
      "null handling & null-coalescing operator",
      "record types",
      "top-level statements"
    ],
    project: "Console Todo App with file persistence"
  },

  // --- 17. OOP with C# ---
  {
    id: "stage-17",
    title: "Object-Oriented Programming with C#",
    description: "Master OOP principles and design classes that model real-world domains.",
    topics: [
      "Classes & objects",
      "Constructors & object initialization",
      "Encapsulation (access modifiers)",
      "Inheritance",
      "Polymorphism (overriding, virtual)",
      "Abstraction (abstract classes)",
      "Interfaces & implementation",
      "Composition vs inheritance",
      "SOLID principles introduction",
      "DTOs & domain models",
      "Method overriding & base keyword"
    ],
    project: "Library Management System with inheritance & interfaces"
  },

  // --- 18. Data Structures & Algorithms ---
  {
    id: "stage-18",
    title: "Data Structures & Algorithms",
    description: "Write efficient code by understanding common data structures and algorithms.",
    topics: [
      "Arrays & Lists performance characteristics",
      "Stacks & Queues",
      "Dictionaries / Hash tables",
      "Linked Lists",
      "Trees (binary trees, BST basics)",
      "Graphs basics",
      "Sorting algorithms (bubble, selection, insertion, merge)",
      "Searching algorithms (linear, binary)",
      "Big O notation",
      "Recursion basics"
    ],
    project: "Pathfinding visualizer or contact book with search"
  },

  // --- 19. SQL & Databases ---
  {
    id: "stage-19",
    title: "SQL & Databases",
    description: "Store and query data with relational databases.",
    topics: [
      "SQL Server basics & installation",
      "SELECT, INSERT, UPDATE, DELETE",
      "WHERE & filtering",
      "ORDER BY, GROUP BY, HAVING",
      "Joins (INNER, LEFT, RIGHT, FULL)",
      "Aggregations (COUNT, SUM, AVG, MIN, MAX)",
      "Subqueries",
      "Primary keys & foreign keys",
      "Database design & normalization",
      "Indexes & performance",
      "Transactions (BEGIN, COMMIT, ROLLBACK)",
      "Views & stored procedures basics"
    ],
    project: "Design an e-commerce database and write complex queries"
  },

  // --- 20. LINQ ---
  {
    id: "stage-20",
    title: "LINQ (Language Integrated Query)",
    description: "Query collections and data with C# syntax — a core .NET skill.",
    topics: [
      "LINQ basics & extension methods",
      "Query syntax vs method syntax",
      "Filtering with Where",
      "Projection with Select",
      "Sorting with OrderBy / ThenBy",
      "Aggregation (Count, Sum, Average, Min, Max)",
      "Grouping with GroupBy",
      "Joining with Join / GroupJoin",
      "Any, All, Contains, First, Single",
      "Deferred execution & IEnumerable",
      "LINQ to Objects vs LINQ to Entities"
    ],
    project: "Data analysis tool that processes collections with LINQ"
  },

  // --- 21. Entity Framework Core ---
  {
    id: "stage-21",
    title: "Entity Framework Core",
    description: "The official ORM for .NET — work with databases using C# objects.",
    topics: [
      "EF Core setup & DbContext",
      "DbSet & entity configuration",
      "Code-first approach",
      "Migrations (add, update, script)",
      "Relationships (one-to-one, one-to-many, many-to-many)",
      "Fluent API configuration",
      "Data annotations",
      "Querying with LINQ to Entities",
      "Change tracking",
      "Insert, update, delete via EF Core",
      "Eager vs lazy vs explicit loading",
      "Performance: AsNoTracking, split queries"
    ],
    project: "Blog API with EF Core and SQL Server"
  },

  // --- 22. ASP.NET Core Fundamentals ---
  {
    id: "stage-22",
    title: "ASP.NET Core Fundamentals",
    description: "The core framework for building web apps and APIs in .NET.",
    topics: [
      "ASP.NET Core project structure",
      "Program.cs & app builder",
      "Dependency Injection (DI) container",
      "Service lifetimes (Transient, Scoped, Singleton)",
      "Middleware pipeline",
      "Routing (convention-based & attribute)",
      "Configuration (appsettings.json, environment variables)",
      "Logging (ILogger, log levels)",
      "Models & ViewModels",
      "Model binding basics",
      "Error handling (exceptions, status codes)",
      "development vs production configuration"
    ],
    project: "Basic Web API with DI, logging, and configuration"
  },

  // --- 23. ASP.NET Core Web API ---
  {
    id: "stage-23",
    title: "ASP.NET Core Web API",
    description: "Build RESTful APIs that serve data over HTTP.",
    topics: [
      "REST principles & resource naming",
      "API Controllers & actions",
      "HTTP methods (GET, POST, PUT, PATCH, DELETE)",
      "Route parameters & query strings",
      "Request/response models & serialization",
      "HTTP status codes",
      "Content negotiation (JSON by default)",
      "Swagger / OpenAPI with Swashbuckle",
      "API versioning basics",
      "Input validation with Data Annotations & FluentValidation",
      "ProblemDetails for errors",
      "File upload/download in APIs"
    ],
    project: "Product Catalog REST API with full CRUD"
  },

  // --- 24. Authentication & Authorization ---
  {
    id: "stage-24",
    title: "Authentication & Authorization",
    description: "Secure your APIs and control access to resources.",
    topics: [
      "Authentication vs authorization",
      "JWT tokens (access & refresh)",
      "ASP.NET Core Identity",
      "Registering users & password hashing",
      "Role-based access control",
      "Policy-based authorization",
      "Securing endpoints with [Authorize]",
      "OAuth2 / OpenID Connect basics",
      "Token validation & expiration",
      "Refresh token flow",
      " CORS configuration"
    ],
    project: "Secure Todo API with JWT authentication"
  },

  // --- 25. Advanced .NET Backend ---
  {
    id: "stage-25",
    title: "Advanced .NET Backend & Real-World Skills",
    description: "Production-ready skills: caching, background jobs, real-time, Docker, cloud, testing, and architecture.",
    topics: [
      ".NET async/await & Task",
      "BackgroundService & hosted services",
      "Hangfire or Quartz for background jobs",
      "SignalR for real-time communication",
      "Redis caching with StackExchange.Redis or IDistributedCache",
      "Exception filters & global exception handling",
      "Action filters & middleware authoring",
      "API documentation & versioning",
      "Integration testing with WebApplicationFactory",
      "Unit testing with xUnit & Moq",
      "Dockerizing a .NET API",
      "Docker Compose for multi-container apps",
      "CI/CD with GitHub Actions",
      "Deploying to Azure App Service or AWS",
      "Environment-specific settings & secrets",
      "Monitoring & health checks"
    ],
    project: "Full production-ready API with auth, caching, background jobs, SignalR, Docker, and CI/CD"
  }
];

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
// Render Roadmap Cards
// -------------------------------------------------------------------------

function renderRoadmap() {
  const grid = document.getElementById("roadmap-grid");
  if (!grid) return;

  grid.innerHTML = "";

  roadmapStages.forEach((stage) => {
    const stageCompleted = isStageCompleted(stage.id);
    const stageItemCount = stage.topics.length;
    const stageCompletedCount = countStageCompleted(stage.id);

    const card = document.createElement("div");
    card.className = `stage-card${stageCompleted ? " completed" : ""}`;
    card.dataset.stageId = stage.id;

    // Topics list — each topic gets its own checkbox
    const topicsHtml = stage.topics
      .map(
        (topic, idx) => {
          const itemId = `${stage.id}:${sanitizeItemId(topic)}`;
          const checked = completedItems.has(itemId) ? "checked" : "";
          return `
            <div class="topic-item" data-item-id="${itemId}">
              <div class="topic-checkbox ${checked}" data-action="toggle-item" title="Toggle: ${escapeHtml(topic)}"></div>
              <span class="topic-text">${escapeHtml(topic)}</span>
            </div>`;
        }
      )
      .join("");

    // Stage checkbox (completes all topics in the stage at once)
    const stageCheckboxChecked = stageCompleted ? "checked" : "";

    card.innerHTML = `
      <div class="stage-header">
        <div class="stage-number">${stage.id.replace("stage-", "")}</div>
        <div class="stage-info">
          <div class="stage-title">${escapeHtml(stage.title)}</div>
          <div class="stage-description">${escapeHtml(stage.description)}</div>
          <div class="stage-progress-mini">
            <span class="stage-progress-text">${stageCompletedCount}/${stageItemCount} topics</span>
            <div class="stage-progress-bar-container">
              <div class="stage-progress-bar" style="width: ${stageItemCount === 0 ? 0 : (stageCompletedCount / stageItemCount) * 100}%"></div>
            </div>
          </div>
        </div>
        <div class="stage-checkbox${stageCheckboxChecked}" data-action="toggle-stage" title="Toggle entire stage"></div>
      </div>
      <div class="stage-details">
        <div class="detail-section">
          <span class="detail-label">Topics to Learn — check each item</span>
          <div class="topics-list">${topicsHtml}</div>
        </div>
        <div class="detail-section">
          <span class="detail-label">Practical Project</span>
          <ul class="projects-list">
            <li>${escapeHtml(stage.project)}</li>
          </ul>
        </div>
      </div>
    `;

    // --- Event: toggle individual topic ---
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
// Toggle: entire stage (all topics in the stage)
// -------------------------------------------------------------------------

function toggleStage(stageId) {
  const stage = roadmapStages.find((s) => s.id === stageId);
  if (!stage) return;

  const isCurrentlyCompleted = isStageCompleted(stageId);

  stage.topics.forEach((topic) => {
    const itemId = `${stageId}:${sanitizeItemId(topic)}`;
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
  if (!stage || stage.topics.length === 0) return false;
  return stage.topics.every((topic) =>
    completedItems.has(`${stageId}:${sanitizeItemId(topic)}`)
  );
}

function countStageCompleted(stageId) {
  const stage = roadmapStages.find((s) => s.id === stageId);
  if (!stage) return 0;
  return stage.topics.filter(
    (topic) => completedItems.has(`${stageId}:${sanitizeItemId(topic)}`)
  ).length;
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
    totalItems += stage.topics.length;
    stage.topics.forEach((topic) => {
      if (completedItems.has(`${stage.id}:${sanitizeItemId(topic)}`)) {
        completedCount++;
      }
    });
  });

  const percent = totalItems === 0 ? 0 : Math.round((completedCount / totalItems) * 100);

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
