/**
 * ============================================
 * RoadMap — Todo List (Fully Dynamic Calendar)
 * ============================================
 * Features:
 *   - Always shows the current month with today highlighted
 *   - Month navigation (prev/next) with proper edge handling
 *   - "Today" button jumps to the current date
 *   - Per-date task storage in localStorage
 *   - Filter tabs: All / Active / Completed
 *   - Daily stats with progress bar
 *   - Edit, delete, and clear-completed
 * ============================================
 */

// -------------------------------------------------------------------------
// Configuration
// -------------------------------------------------------------------------

const TODO_STORAGE_KEY = "roadmap_todo_dynamic";

// -------------------------------------------------------------------------
// State
// -------------------------------------------------------------------------

/** tasksByDate: { "2026-09-28": [ { id, text, completed, createdAt }, ... ] } */
let tasksByDate = {};

/** The currently selected date as "YYYY-MM-DD" — defaults to today */
let selectedDate = formatDate(new Date());

/** Current calendar view month/year (what the grid shows) */
let viewYear = new Date().getFullYear();
let viewMonth = new Date().getMonth(); // 0-indexed

/** Current filter: "all" | "active" | "completed" */
let currentFilter = "all";

/** Editing state */
let editingTaskId = null;

/** DOM references (set on DOMContentLoaded) */
let calendarDaysEl = null;
let calendarTitleEl = null;
let dateDisplayEl = null;
let taskListEl = null;
let taskInputEl = null;
let filterTabsEl = null;
let taskCountEl = null;
let addBtnEl = null;
let dailyStatsEl = null;
let clearCompletedBtn = null;

// -------------------------------------------------------------------------
// LocalStorage helpers
// -------------------------------------------------------------------------

function loadTasksByDate() {
  const stored = localStorage.getItem(TODO_STORAGE_KEY);
  if (!stored) return {};
  try {
    const parsed = JSON.parse(stored);
    if (typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    // corrupted — start fresh
  }
  return {};
}

function saveTasksByDate() {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(tasksByDate));
}

// -------------------------------------------------------------------------
// Date utilities
// -------------------------------------------------------------------------

/** Format a Date or year/month/day into "YYYY-MM-DD" */
function formatDate(dateOrYear, month, day) {
  if (dateOrYear instanceof Date) {
    const y = dateOrYear.getFullYear();
    const m = String(dateOrYear.getMonth() + 1).padStart(2, "0");
    const d = String(dateOrYear.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  const y = dateOrYear;
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Parse "YYYY-MM-DD" → { year, month: 0-indexed, day } */
function parseDate(str) {
  const parts = str.split("-");
  return {
    year: parseInt(parts[0], 10),
    month: parseInt(parts[1], 10) - 1,
    day: parseInt(parts[2], 10),
  };
}

/** Get today as "YYYY-MM-DD" */
function getTodayString() {
  return formatDate(new Date());
}

/** Check if a date string is today */
function isToday(dateStr) {
  return dateStr === getTodayString();
}

/** Check if a date string is within the currently viewed month */
function isInViewMonth(dateStr) {
  const { year, month, day } = parseDate(dateStr);
  return year === viewYear && month === viewMonth && day >= 1;
}

/** Number of days in the viewed month */
function daysInViewMonth() {
  return new Date(viewYear, viewMonth + 1, 0).getDate();
}

/** First day of week for the 1st of the viewed month (0=Sun, 1=Mon, …) */
function firstDayOfWeekView() {
  return new Date(viewYear, viewMonth, 1).getDay();
}

/** Build the calendar grid data for the currently viewed month */
function buildCalendarDays() {
  const daysInMonth = daysInViewMonth();
  const startDay = firstDayOfWeekView();
  const cells = [];

  // Leading cells from the previous month
  const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();
  for (let i = startDay - 1; i >= 0; i--) {
    const day = prevMonthDays - i;
    const dateStr = formatDate(viewYear, viewMonth - 1, day);
    cells.push({
      day,
      dateStr,
      other: true,
      hasTasks: !!(tasksByDate[dateStr] && tasksByDate[dateStr].length > 0),
      taskCount: tasksByDate[dateStr] ? tasksByDate[dateStr].length : 0,
    });
  }

  // Actual days of the current month
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = formatDate(viewYear, viewMonth, d);
    const hasTasks = !!(tasksByDate[dateStr] && tasksByDate[dateStr].length > 0);
    const taskCount = hasTasks ? tasksByDate[dateStr].length : 0;
    cells.push({
      day: d,
      dateStr,
      other: false,
      hasTasks,
      taskCount,
      isToday: isToday(dateStr),
    });
  }

  // Trailing cells from the next month to complete the last row
  const totalCells = cells.length;
  const remainder = totalCells % 7;
  if (remainder > 0) {
    const nextMonthDay = 1;
    const nextMonth = viewMonth + 1 > 11 ? 0 : viewMonth + 1;
    const nextYear = viewMonth + 1 > 11 ? viewYear + 1 : viewYear;
    for (let i = 1; i <= 7 - remainder; i++) {
      const dateStr = formatDate(nextYear, nextMonth, nextMonthDay + i - 1);
      cells.push({
        day: nextMonthDay + i - 1,
        dateStr,
        other: true,
        hasTasks: !!(tasksByDate[dateStr] && tasksByDate[dateStr].length > 0),
        taskCount: tasksByDate[dateStr] ? tasksByDate[dateStr].length : 0,
      });
    }
  }

  return cells;
}

/** Human-readable date for display */
function formatDisplayDate(dateStr) {
  const { year, month, day } = parseDate(dateStr);
  const d = new Date(year, month, day);
  return {
    weekday: d.toLocaleDateString("en-US", { weekday: "long" }),
    month: d.toLocaleDateString("en-US", { month: "long" }),
    day,
    year,
    short: d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
  };
}

/** Month/year title for the calendar header */
function getMonthYearTitle() {
  const d = new Date(viewYear, viewMonth, 1);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

// -------------------------------------------------------------------------
// DOM Ready
// -------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  tasksByDate = loadTasksByDate();

  // Cache DOM
  calendarDaysEl = document.getElementById("calendar-days");
  calendarTitleEl = document.getElementById("calendar-title");
  dateDisplayEl = document.getElementById("date-display");
  taskListEl = document.getElementById("task-list");
  taskInputEl = document.getElementById("task-input");
  filterTabsEl = document.getElementById("filter-tabs");
  taskCountEl = document.getElementById("task-count");
  addBtnEl = document.getElementById("add-btn");
  dailyStatsEl = document.getElementById("daily-stats");
  clearCompletedBtn = document.getElementById("clear-completed-btn");

  // Bind top-level nav buttons
  const prevMonthBtn = document.getElementById("prev-month-btn");
  const nextMonthBtn = document.getElementById("next-month-btn");
  const todayBtn = document.getElementById("today-btn");

  if (prevMonthBtn) prevMonthBtn.addEventListener("click", navigatePrevMonth);
  if (nextMonthBtn) nextMonthBtn.addEventListener("click", navigateNextMonth);
  if (todayBtn) todayBtn.addEventListener("click", goToToday);

  // Bind clear completed
  if (clearCompletedBtn) {
    clearCompletedBtn.addEventListener("click", clearCompleted);
  }

  // Set initial selected date to today
  selectedDate = getTodayString();

  // Initial render
  renderCalendar();
  selectDate(selectedDate);
  bindEvents();
});

// -------------------------------------------------------------------------
// Event binding
// -------------------------------------------------------------------------

function bindEvents() {
  // Add task: button or Enter
  if (addBtnEl) {
    addBtnEl.addEventListener("click", addTask);
  }
  if (taskInputEl) {
    taskInputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addTask();
      }
    });
  }

  // Filter tabs
  if (filterTabsEl) {
    filterTabsEl.addEventListener("click", (e) => {
      const tab = e.target.closest(".filter-tab");
      if (!tab) return;
      const filter = tab.dataset.filter;
      if (filter) setFilter(filter);
    });
  }

  // Task list click delegation
  if (taskListEl) {
    taskListEl.addEventListener("click", handleTaskListClick);
  }

  // Global Escape cancels editing
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && editingTaskId) {
      cancelEdit();
    }
  });
}

// -------------------------------------------------------------------------
// Calendar rendering
// -------------------------------------------------------------------------

function renderCalendar() {
  if (!calendarDaysEl || !calendarTitleEl) return;

  // Update month/year title
  calendarTitleEl.textContent = getMonthYearTitle();

  const cells = buildCalendarDays();
  let html = "";

  cells.forEach((cell) => {
    if (cell.other) {
      html += `<div class="cal-day other-month">${cell.day}</div>`;
      return;
    }

    const classes = ["cal-day"];
    if (cell.isToday) classes.push("today");
    if (cell.dateStr === selectedDate) classes.push("selected");
    if (cell.hasTasks) classes.push("has-tasks");

    const countSpan = cell.hasTasks
      ? `<span class="cal-day-count">${cell.taskCount}</span>`
      : "";

    html += `
      <div class="${classes.join(" ")}" data-date="${cell.dateStr}">
        <span class="cal-day-number">${cell.day}</span>
        ${countSpan}
      </div>`;
  });

  calendarDaysEl.innerHTML = html;

  // Click handlers for selectable days
  calendarDaysEl.querySelectorAll(".cal-day:not(.other-month)").forEach((el) => {
    el.addEventListener("click", () => {
      const dateStr = el.dataset.date;
      if (dateStr) selectDate(dateStr);
    });
  });
}

// -------------------------------------------------------------------------
// Select a date
// -------------------------------------------------------------------------

function selectDate(dateStr) {
  selectedDate = dateStr;
  renderCalendar();
  renderDateDisplay();
  renderTaskList();
  updateDailyStats();
  updateTaskCount();
}

// -------------------------------------------------------------------------
// Date display (the selected date card)
// -------------------------------------------------------------------------

function renderDateDisplay() {
  if (!dateDisplayEl) return;

  const info = formatDisplayDate(selectedDate);
  const todayStr = getTodayString();
  const isTodayDate = selectedDate === todayStr;

  dateDisplayEl.innerHTML = `
    <div class="date-display-left">
      <span class="date-display-day">${info.weekday}</span>
      <span class="date-display-date">${info.month} ${info.day}, ${info.year}</span>
    </div>
    <div class="date-display-nav">
      <button class="cal-nav-small" id="disp-prev-day" title="Previous day">‹</button>
      <button class="cal-nav-small" id="disp-next-day" title="Next day">›</button>
      <button class="date-display-today-btn" id="disp-today">Today</button>
    </div>
  `;

  // Bind small nav inside date display
  const dPrev = document.getElementById("disp-prev-day");
  const dNext = document.getElementById("disp-next-day");
  const dToday = document.getElementById("disp-today");

  if (dPrev) dPrev.addEventListener("click", navigatePrevDay);
  if (dNext) dNext.addEventListener("click", navigateNextDay);
  if (dToday) dToday.addEventListener("click", goToToday);
}

// -------------------------------------------------------------------------
// Navigation — month-level
// -------------------------------------------------------------------------

function navigatePrevMonth() {
  if (viewMonth === 0) {
    viewMonth = 11;
    viewYear--;
  } else {
    viewMonth--;
  }
  renderCalendar();
}

function navigateNextMonth() {
  if (viewMonth === 11) {
    viewMonth = 0;
    viewYear++;
  } else {
    viewMonth++;
  }
  renderCalendar();
}

// -------------------------------------------------------------------------
// Navigation — day-level
// -------------------------------------------------------------------------

function navigatePrevDay() {
  const { year, month, day } = parseDate(selectedDate);
  const prev = new Date(year, month, day - 1);
  const newStr = formatDate(prev);

  // Update view to match the new date's month if it changed
  const prevInfo = parseDate(newStr);
  if (prevInfo.year !== viewYear || prevInfo.month !== viewMonth) {
    viewYear = prevInfo.year;
    viewMonth = prevInfo.month;
    renderCalendar();
  }

  selectDate(newStr);
}

function navigateNextDay() {
  const { year, month, day } = parseDate(selectedDate);
  const next = new Date(year, month, day + 1);
  const newStr = formatDate(next);

  const nextInfo = parseDate(newStr);
  if (nextInfo.year !== viewYear || nextInfo.month !== viewMonth) {
    viewYear = nextInfo.year;
    viewMonth = nextInfo.month;
    renderCalendar();
  }

  selectDate(newStr);
}

function goToToday() {
  const todayStr = getTodayString();
  const todayInfo = parseDate(todayStr);

  // Sync view to today's month
  viewYear = todayInfo.year;
  viewMonth = todayInfo.month;
  renderCalendar();
  selectDate(todayStr);
}

// -------------------------------------------------------------------------
// Add task
// -------------------------------------------------------------------------

function addTask() {
  if (!taskInputEl) return;

  const text = taskInputEl.value.trim();
  if (!text) return;

  const dateTasks = getTasksForDate(selectedDate);

  const newTask = {
    id: generateId(),
    text,
    completed: false,
    createdAt: Date.now(),
  };

  dateTasks.unshift(newTask);
  tasksByDate[selectedDate] = dateTasks;

  saveTasksByDate();
  renderCalendar();
  renderTaskList();
  updateDailyStats();
  updateTaskCount();

  taskInputEl.value = "";
  taskInputEl.focus();
}

// -------------------------------------------------------------------------
// Delete task
// -------------------------------------------------------------------------

function deleteTask(taskId) {
  const dateTasks = getTasksForDate(selectedDate);
  tasksByDate[selectedDate] = dateTasks.filter((t) => t.id !== taskId);
  saveTasksByDate();
  renderCalendar();
  renderTaskList();
  updateDailyStats();
  updateTaskCount();
}

// -------------------------------------------------------------------------
// Toggle completion
// -------------------------------------------------------------------------

function toggleComplete(taskId) {
  const dateTasks = getTasksForDate(selectedDate);
  const task = dateTasks.find((t) => t.id === taskId);
  if (!task) return;

  task.completed = !task.completed;
  tasksByDate[selectedDate] = dateTasks;
  saveTasksByDate();
  renderTaskList();
  updateDailyStats();
  updateTaskCount();
  renderCalendar();
}

// -------------------------------------------------------------------------
// Edit task
// -------------------------------------------------------------------------

function startEdit(taskId) {
  if (editingTaskId && editingTaskId !== taskId) {
    cancelEdit();
  }

  const dateTasks = getTasksForDate(selectedDate);
  const task = dateTasks.find((t) => t.id === taskId);
  if (!task) return;

  editingTaskId = taskId;

  const textEl = taskListEl.querySelector(
    `.task-item[data-id="${taskId}"] .task-text`
  );
  if (!textEl) return;

  const editContainer = document.createElement("div");
  editContainer.className = "edit-container";

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "edit-input";
  editInput.value = task.text;
  editInput.setAttribute("autofocus", "");

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "edit-actions";

  const saveBtn = document.createElement("button");
  saveBtn.className = "save-btn";
  saveBtn.textContent = "Save";
  saveBtn.addEventListener("click", () => saveEdit(taskId));

  const cancelBtn = document.createElement("button");
  cancelBtn.className = "cancel-btn";
  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", cancelEdit);

  actionsDiv.appendChild(saveBtn);
  actionsDiv.appendChild(cancelBtn);
  editContainer.appendChild(editInput);
  editContainer.appendChild(actionsDiv);

  textEl.replaceWith(editContainer);

  editInput.focus();
  editInput.select();

  editInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveEdit(taskId);
    }
  });
}

function saveEdit(taskId) {
  const editContainer = taskListEl.querySelector(
    `.task-item[data-id="${taskId}"] .edit-container`
  );
  if (!editContainer) return;

  const editInput = editContainer.querySelector(".edit-input");
  if (!editInput) return;

  const newText = editInput.value.trim();
  if (!newText) {
    cancelEdit();
    return;
  }

  const dateTasks = getTasksForDate(selectedDate);
  const task = dateTasks.find((t) => t.id === taskId);
  if (!task) return;

  task.text = newText;
  tasksByDate[selectedDate] = dateTasks;
  saveTasksByDate();
  editingTaskId = null;
  renderTaskList();
  updateTaskCount();
}

function cancelEdit() {
  if (!editingTaskId) return;
  editingTaskId = null;
  renderTaskList();
}

// -------------------------------------------------------------------------
// Filter
// -------------------------------------------------------------------------

function setFilter(filter) {
  currentFilter = filter;

  if (filterTabsEl) {
    const tabs = filterTabsEl.querySelectorAll(".filter-tab");
    tabs.forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.filter === filter);
    });
  }

  renderTaskList();
  updateTaskCount();
}

// -------------------------------------------------------------------------
// Render task list
// -------------------------------------------------------------------------

function renderTaskList() {
  if (!taskListEl) return;

  const dateTasks = getTasksForDate(selectedDate);
  let filtered = [];

  switch (currentFilter) {
    case "active":
      filtered = dateTasks.filter((t) => !t.completed);
      break;
    case "completed":
      filtered = dateTasks.filter((t) => t.completed);
      break;
    case "all":
    default:
      filtered = [...dateTasks];
      break;
  }

  // Sort: incomplete first, then by creation date descending
  filtered.sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return b.createdAt - a.createdAt;
  });

  if (filtered.length === 0) {
    taskListEl.innerHTML = `
      <div class="todo-empty">
        <div class="empty-icon">📝</div>
        <h3>No tasks for this day</h3>
        <p>Add a task above to get started.</p>
      </div>
    `;
    return;
  }

  let html = "";
  filtered.forEach((task) => {
    const isEditing = editingTaskId === task.id;
    const checkedClass = task.completed ? "checked" : "";
    const completedClass = task.completed ? "completed" : "";
    const editingClass = isEditing ? "editing" : "";

    html += `
      <div class="task-item ${completedClass} ${editingClass}" data-id="${task.id}">
        <div
          class="task-checkbox ${checkedClass}"
          data-action="toggle"
          title="${task.completed ? "Mark as incomplete" : "Mark as complete"}"
        ></div>
        <div class="task-content">
          ${isEditing ? "" : `<div class="task-text">${escapeHtml(task.text)}</div>`}
        </div>
        <div class="task-actions">
          <button class="task-btn edit-btn" data-action="edit" title="Edit task">✏️</button>
          <button class="task-btn delete-btn" data-action="delete" title="Delete task">🗑️</button>
        </div>
      </div>
    `;
  });

  taskListEl.innerHTML = html;
}

// -------------------------------------------------------------------------
// Task list click handler (event delegation)
// -------------------------------------------------------------------------

function handleTaskListClick(e) {
  const target = e.target.closest("[data-action]");
  if (!target) return;

  const item = target.closest(".task-item");
  if (!item) return;

  const taskId = item.dataset.id;
  if (!taskId) return;

  const action = target.dataset.action;

  switch (action) {
    case "toggle":
      toggleComplete(taskId);
      break;
    case "edit":
      startEdit(taskId);
      break;
    case "delete":
      deleteTask(taskId);
      break;
  }
}

// -------------------------------------------------------------------------
// Get tasks for a date (ensures array exists)
// -------------------------------------------------------------------------

function getTasksForDate(dateStr) {
  if (!tasksByDate[dateStr]) {
    tasksByDate[dateStr] = [];
  }
  return tasksByDate[dateStr];
}

// -------------------------------------------------------------------------
// Daily stats
// -------------------------------------------------------------------------

function updateDailyStats() {
  if (!dailyStatsEl) return;

  const dateTasks = getTasksForDate(selectedDate);
  const total = dateTasks.length;
  const completed = dateTasks.filter((t) => t.completed).length;
  const active = total - completed;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  dailyStatsEl.innerHTML = `
    <div class="daily-stat">
      <div class="daily-stat-value">${total}</div>
      <div class="daily-stat-label">Total</div>
    </div>
    <div class="daily-stat">
      <div class="daily-stat-value success">${completed}</div>
      <div class="daily-stat-label">Completed</div>
    </div>
    <div class="daily-stat">
      <div class="daily-stat-value warning">${active}</div>
      <div class="daily-stat-label">Active</div>
    </div>
    <div class="daily-stat" style="flex:2; min-width:160px;">
      <div class="daily-stat-value">${percent}%</div>
      <div class="daily-stat-label">Progress</div>
      <div class="daily-progress-bar-container">
        <div class="daily-progress-bar" style="width: ${percent}%"></div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------------------
// Task count text
// -------------------------------------------------------------------------

function updateTaskCount() {
  if (!taskCountEl) return;

  const dateTasks = getTasksForDate(selectedDate);
  const total = dateTasks.length;
  const remaining = dateTasks.filter((t) => !t.completed).length;
  const info = formatDisplayDate(selectedDate);

  if (total === 0) {
    taskCountEl.textContent = "No tasks";
  } else {
    taskCountEl.textContent = `${remaining} ${remaining === 1 ? "task" : "tasks"} left — ${info.short}`;
  }
}

// -------------------------------------------------------------------------
// Clear completed
// -------------------------------------------------------------------------

function clearCompleted() {
  const dateTasks = getTasksForDate(selectedDate);
  const before = dateTasks.length;
  tasksByDate[selectedDate] = dateTasks.filter((t) => !t.completed);
  const after = tasksByDate[selectedDate].length;

  if (after < before) {
    saveTasksByDate();
    renderCalendar();
    renderTaskList();
    updateDailyStats();
    updateTaskCount();
  }
}

// -------------------------------------------------------------------------
// Utilities
// -------------------------------------------------------------------------

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
