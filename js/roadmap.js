/**
 * RoadMap — shared renderer + state (frontend + backend).
 *
 * Each page must define `window.ROADMAP_STAGES` to an array of stage objects
 * BEFORE this script finishes loading. Pages load this script after their
 * data script and a small inline setup that assigns `window.ROADMAP_STAGES`.
 *
 * Supports both stage shapes:
 *   frontEnd: { id, track, title, description, topics: string[], project: string }
 *   backend : { id, title, goal, topics[], outcomes[], resources[], project,
 *               requirements[], checklist[] }  (matches js/backendStages.js)
 */

/* ------------------------------------------------------------------ */
/* Stage items: topics + (backend) checklist                          */
/* ------------------------------------------------------------------ */

function stageItems(stage) {
  return buildStageItemList(stage);
}

function buildStageItemList(stage) {
  const topics = (stage.topics || []).map((t) => ({ id: "t-" + sanitizeItemId(t), label: t, kind: "topic" }));
  const checklist = (stage.checklist || []).map((c) => ({ id: "c-" + sanitizeItemId(c), label: c, kind: "check" }));
  return topics.concat(checklist);
}

/* ------------------------------------------------------------------ */
/* LocalStorage                                                         */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "roadmap_completed_items";

function loadCompletedItems() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return new Set();
  try {
    const ids = JSON.parse(stored);
    return new Set(Array.isArray(ids) ? ids : []);
  } catch (e) {
    return new Set();
  }
}

function saveCompletedItems(completedSet) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedSet]));
}

let completedItems = loadCompletedItems();

// Stages for the current page (set by the inline data assignment on DOMContentLoaded)
let roadmapStages = [];

let progressBar = null;
let progressText = null;
let progressPercent = null;

/* ------------------------------------------------------------------ */
/* Backend track completion detection (shared across all pages)        */
/* ------------------------------------------------------------------ */

function getBackendStages() {
  return window.backendStages || [];
}

/** True once every item in the entire backend path is done. */
function isBackendTrackComplete() {
  const stages = getBackendStages();
  let total = 0;
  let done = 0;
  for (let i = 0; i < stages.length; i++) {
    const items = buildStageItemList(stages[i]);
    for (let j = 0; j < items.length; j++) {
      total++;
      if (completedItems.has(stages[i].id + ":" + items[j].id)) done++;
    }
  }
  return total > 0 && done >= total;
}

/* ------------------------------------------------------------------ */
/* DOM ready                                                           */
/* ------------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  // The data script (frontendStages.js or backendStages.js) has already been
  // parsed and the inline script has assigned window.ROADMAP_STAGES, so we can
  // safely point the renderer at the stage list for this page.
  if (typeof window.ROADMAP_STAGES !== "undefined") {
    roadmapStages = window.ROADMAP_STAGES;
  } else {
    // Fallback if data assignment runs AFTER this handler (defensive).
    roadmapStages = Array.isArray(window.ROADMAP_STAGES)
      ? window.ROADMAP_STAGES
      : [];
  }

  progressBar = document.getElementById("progress-bar");
  progressText = document.getElementById("progress-text");
  progressPercent = document.getElementById("progress-percent");

  renderRoadmap();
  updateProgressBar();
  maybeShowBackendCongrats();

  // Mobile hamburger dropdown toggle
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navbarDropdown = document.querySelector(".navbar-dropdown");

  if (mobileToggle && navbarDropdown) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = mobileToggle.classList.toggle("open");
      navbarDropdown.classList.toggle("open", isOpen);
    });

    // Close the dropdown when clicking a nav link (mobile)
    navbarDropdown.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileToggle.classList.remove("open");
        navbarDropdown.classList.remove("open");
      });
    });

    // Close the dropdown when resizing to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        mobileToggle.classList.remove("open");
        navbarDropdown.classList.remove("open");
      }
    });
  }
});

/* ------------------------------------------------------------------ */
/* Resource buttons (Documentation / Course)                           */
/* ------------------------------------------------------------------ */

const RESOURCE_KIND_LABEL = {
  doc: { label: "Docs", icon: "\u2753", title: "Documentation" },
  course: { label: "Course", icon: "\u2691", title: "Course" },
};

function renderResourceButtons(resources) {
  if (!resources || !resources.length) return "";

  const button = (r) => {
    const kind = RESOURCE_KIND_LABEL[r.kind] || RESOURCE_KIND_LABEL.doc;
    return (
      `\n` +
      `<a class="resource-btn ${r.kind === "course" ? "course" : "doc"}"\n` +
      `   href="${escapeHtml(r.url)}"\n` +
      `   target="_blank"\n` +
      `   rel="noopener noreferrer"\n` +
      `   title="${kind.title}: ${escapeHtml(r.title)}">\n` +
      `  <span class="resource-btn-icon" aria-hidden="true">${kind.icon}</span>\n` +
      `  <span class="resource-btn-label">${kind.label}</span>\n` +
      `  <span class="resource-btn-title">${escapeHtml(r.title)}</span>\n` +
      `</a>`
    );
  };

  const docs = resources.filter((r) => r.kind !== "course").map(button);
  const courses = resources.filter((r) => r.kind === "course").map(button);

  const group = (title, buttons) =>
    buttons.length
      ? `\n<div class="resource-group">\n<span class="resource-group-label">${title}</span>\n<div class="resource-btns">${buttons.join("")}</div>\n</div>`
      : "";

  const body = group("Free Documentation", docs) + group("Free Courses", courses);
  if (!body) return "";

  return (
    `\n<div class="detail-section">\n<span class="detail-label">Free Learning Resources</span>\n` +
    body +
    `\n</div>`
  );
}

/* ------------------------------------------------------------------ */
/* Render roadmap cards                                                */
/* ------------------------------------------------------------------ */

function renderRoadmap() {
  const grid = document.getElementById("roadmap-grid");
  if (!grid) return;

  grid.innerHTML = "";

  roadmapStages.forEach((stage) => {
    const items = buildStageItemList(stage);
    const stageCompleted = isStageCompleted(stage.id);
    const stageItemCount = items.length;
    const stageCompletedCount = countStageCompleted(stage.id);
    const isBackend = stage.id.indexOf("backend-stage-") === 0;

    const card = document.createElement("div");
    card.className = `stage-card${stageCompleted ? " completed" : ""}${isBackend ? " backend" : " frontend"}`;
    card.dataset.stageId = stage.id;

    const renderItem = (item) => {
      const itemId = `${stage.id}:${item.id}`;
      const checked = completedItems.has(itemId) ? "checked" : "";
      const prefix = item.kind === "check" ? "&#10003; " : "";
      return (
        `\n<div class="topic-item${item.kind === "check" ? " check-item" : ""}" data-item-id="${itemId}">\n` +
        `<div class="topic-checkbox ${checked}" data-action="toggle-item" title="Toggle: ${escapeHtml(item.label)}"></div>\n` +
        `<span class="topic-text">${prefix}${escapeHtml(item.label)}</span>\n` +
        `</div>`
      );
    };

    const topicsHtml = items.filter((i) => i.kind === "topic").map(renderItem).join("");
    const checklistHtml = items.filter((i) => i.kind === "check").map(renderItem).join("");

    const goalHtml = stage.goal
      ? `\n<div class="detail-section">\n<span class="detail-label">Goal &mdash; What &amp; Why</span>\n<p class="stage-goal">${escapeHtml(stage.goal)}</p>\n</div>`
      : "";

    const outcomesHtml =
      stage.outcomes && stage.outcomes.length
        ? `\n<div class="detail-section">\n<span class="detail-label">Expected Skills &amp; Outcomes</span>\n<ul class="projects-list">${stage.outcomes.map((o) => `<li>${escapeHtml(o)}</li>`).join("")}</ul>\n</div>`
        : "";

    const resourcesHtml = renderResourceButtons(stage.resources);

    const requirementsHtml =
      stage.requirements && stage.requirements.length
        ? `\n<div class="detail-section">\n<span class="detail-label">Project Requirements</span>\n<ul class="projects-list requirements-list">${stage.requirements.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}</ul>\n</div>`
        : "";

    const checklistSectionHtml = checklistHtml
      ? `\n<div class="detail-section">\n<span class="detail-label">Completion Checklist &mdash; tick when done</span>\n<div class="topics-list checklist-list">${checklistHtml}</div>\n</div>`
      : "";

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
              <div class="stage-progress-bar" style="width: ${stageItemCount === 0 ? 0 : (stageCompletedCount / stageItemCount) * 100}%"></div>
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
          <ul class="projects-list"><li>${escapeHtml(stage.project)}</li></ul>
        </div>
        ${requirementsHtml}
        ${checklistSectionHtml}
      </div>
    `;

    card.querySelectorAll("[data-action='toggle-item']").forEach((cb) => {
      cb.addEventListener("click", (e) => {
        e.stopPropagation();
        const itemId = cb.closest(".topic-item").dataset.itemId;
        toggleItem(itemId);
      });
    });

    const stageCb = card.querySelector('[data-action="toggle-stage"]');
    stageCb.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleStage(stage.id);
    });

    grid.appendChild(card);
  });
}

/* ------------------------------------------------------------------ */
/* Toggle: single item                                                 */
/* ------------------------------------------------------------------ */

function toggleItem(itemId) {
  if (completedItems.has(itemId)) {
    completedItems.delete(itemId);
  } else {
    completedItems.add(itemId);
  }
  saveCompletedItems(completedItems);
  updateCardStates();
  updateProgressBar();
  maybeShowBackendCongrats();
}

/* ------------------------------------------------------------------ */
/* Toggle: entire stage (topics + checklist)                           */
/* ------------------------------------------------------------------ */

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
  maybeShowBackendCongrats();
}

/* ------------------------------------------------------------------ */
/* Helpers: stage completion                                             */
/* ------------------------------------------------------------------ */

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
  return items.filter((item) => completedItems.has(`${stageId}:${item.id}`)).length;
}

/* ------------------------------------------------------------------ */
/* Update UI after state change                                        */
/* ------------------------------------------------------------------ */

function updateCardStates() {
  renderRoadmap();
}

/* ------------------------------------------------------------------ */
/* Progress bar (overall, per page)                                    */
/* ------------------------------------------------------------------ */

function updateProgressBar() {
  let totalItems = 0;
  let completedCount = 0;

  roadmapStages.forEach((stage) => {
    buildStageItemList(stage).forEach((item) => {
      totalItems++;
      if (completedItems.has(`${stage.id}:${item.id}`)) completedCount++;
    });
  });

  const percent = totalItems === 0 ? 0 : Math.round((completedCount / totalItems) * 100);

  if (progressBar) progressBar.style.width = `${percent}%`;
  if (progressText) progressText.textContent = `${completedCount} / ${totalItems} items completed`;
  if (progressPercent) progressPercent.textContent = `${percent}%`;
}

/* ------------------------------------------------------------------ */
/* Congratulatory notification for the completed Backend path          */
/* ------------------------------------------------------------------ */

let congratsOverlay = null;

function showCongratsNotification() {
  if (congratsOverlay) return;

  // Dynamic counts from the full backend path (fetched from the assigned
  // window.backendStages set on the current page, or the full path as a fallback).
  const allBackend = window.backendStages && Array.isArray(window.backendStages)
    ? window.backendStages
    : backendStages;

  const core = allBackend.slice(0, 15).length;
  const advanced = allBackend.slice(15, 25).length;
  const cloud = allBackend.slice(25, 28).length;
  const ai = allBackend.slice(28, 38).length;

  const overlay = document.createElement("div");
  overlay.className = "congrats-overlay";
  overlay.innerHTML = `
    <div class="congrats-card" role="dialog" aria-live="assertive">
      <div class="emoji">&#127942;</div>
      <h2>Congratulations!</h2>
      <p class="big">You have successfully completed the entire <strong>Backend path</strong>.</p>
      <ul class="congrats-list">
        <li>Core Backend — ${core} stages done</li>
        <li>Advanced Backend &amp; Job-Ready — ${advanced} stages done</li>
        <li>Cloud (AWS, Kubernetes, CI/CD) — ${cloud} stages done</li>
        <li>AI Agents — ${ai} stages done</li>
      </ul>
      <a class="btn" href="frontend-roadmap.html">Explore the full Roadmap</a>
    </div>
  `;

  document.body.appendChild(overlay);
  congratsOverlay = overlay;

  // Fade out + remove on next tick so the overlay is actually visible.
  setTimeout(() => {
    overlay.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    overlay.style.opacity = "0";
    overlay.style.transform = "scale(1.02)";
    setTimeout(() => overlay.remove(), 600);
  }, 8000);
}

function maybeShowBackendCongrats() {
  if (getBackendStages().length === 0) return;
  if (window.__backendCongratsShown) return;
  if (isBackendTrackComplete()) {
    window.__backendCongratsShown = true;
    showCongratsNotification();
  }
}

/* ------------------------------------------------------------------ */
/* Utilities                                                           */
/* ------------------------------------------------------------------ */

function sanitizeItemId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
