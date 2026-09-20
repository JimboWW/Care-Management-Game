const currentDate = document.getElementById('currentDate');
const LIFE_LOG_KEY = 'careLifeLog';
const TRACKERS = [
  {
    id: 'essential',
    storageKey: 'essentialCareState',
    tasks: [
      'Self-catheterization - morning',
      'Self-catheterization - afternoon',
      'Self-catheterization - evening',
      'Water - bottle 1 of 5',
      'Water - bottle 2 of 5',
      'Water - bottle 3 of 5',
      'Water - bottle 4 of 5',
      'Water - bottle 5 of 5',
      'Bowel care'
    ]
  },
  {
    id: 'long-term',
    storageKey: 'longTermCareState',
    tasks: [
      'Walking',
      'Bath',
      'Arm pulls',
      'Pedal',
      'Sit/stand',
      'Check weight',
      'Check breakfast calories',
      'Check lunch calories',
      'Check dinner calories'
    ]
  },
  {
    id: 'household',
    storageKey: 'householdCareState',
    tasks: [
      'Sanitize urinals',
      'Fill humidifier',
      'Bath',
      'Make bed',
      'Do dishes',
      'Appreciate your wife'
    ]
  }
];

function getDayLabel(date) {
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

function updateCurrentDate() {
  if (currentDate) {
    currentDate.textContent = getDayLabel(new Date());
  }
}

function getTrackerElements(tracker) {
  const section = document.querySelector(`[data-tracker="${tracker.id}"]`);
  return {
    section,
    tableBody: section?.querySelector('tbody'),
    totalRow: section?.querySelector('.total-row'),
    resetButton: section?.querySelector('.tracker-reset')
  };
}

function getTaskRows(tracker) {
  const { tableBody } = getTrackerElements(tracker);
  return tableBody ? [...tableBody.querySelectorAll('tr:not(.total-row)')] : [];
}

function updateRowScore(row, tracker) {
  const dayCells = row.querySelectorAll('.day-cell');
  const scoreCell = row.querySelector('.score-cell');
  const completed = [...dayCells].filter((cell) => cell.classList.contains('is-complete')).length;

  if (scoreCell) {
    scoreCell.textContent = String(completed);
  }

  updateGrandTotal(tracker);
}

function updateGrandTotal(tracker) {
  const { totalRow } = getTrackerElements(tracker);
  const total = getTaskRows(tracker).reduce((sum, row) => {
    const scoreCell = row.querySelector('.score-cell');
    return sum + (Number(scoreCell?.textContent || 0));
  }, 0);

  if (totalRow) {
    const totalCell = totalRow.querySelector('.score-total');
    if (totalCell) {
      totalCell.textContent = String(total);
    }
  }
}

function saveState(tracker) {
  const tasks = getTaskRows(tracker).map((row) => {
    const nameCell = row.querySelector('.task-name');
    const days = [...row.querySelectorAll('.day-cell')].map((cell) =>
      cell.classList.contains('is-complete') ? 1 : 0
    );

    return {
      name: nameCell ? nameCell.textContent.trim() : 'Untitled task',
      days
    };
  });

  localStorage.setItem(tracker.storageKey, JSON.stringify(tasks));
}

function createTaskRow(taskName, days, tracker) {
  const row = document.createElement('tr');

  const nameCell = document.createElement('th');
  nameCell.className = 'task-name';
  nameCell.scope = 'row';
  nameCell.textContent = taskName;
  row.appendChild(nameCell);

  days.forEach((value) => {
    const dayCell = document.createElement('td');
    dayCell.className = 'day-cell';
    if (value === 1) {
      dayCell.classList.add('is-complete');
    }
    dayCell.setAttribute('tabindex', '0');
    dayCell.setAttribute('role', 'button');
    dayCell.setAttribute('aria-label', `Toggle ${taskName} for this day`);
    bindDayCell(dayCell, row, tracker);
    row.appendChild(dayCell);
  });

  const scoreCell = document.createElement('td');
  scoreCell.className = 'score-cell';
  scoreCell.textContent = '0';
  row.appendChild(scoreCell);

  return row;
}

function bindDayCell(cell, row, tracker) {
  if (!cell || !row) {
    return;
  }

  cell.onclick = () => {
    cell.classList.toggle('is-complete');
    updateRowScore(row, tracker);
    saveState(tracker);
  };

  cell.onkeydown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      cell.click();
    }
  };
}

function hydrateExistingRows(tracker) {
  const rows = getTaskRows(tracker);

  rows.forEach((row) => {
    const dayCells = row.querySelectorAll('.day-cell');
    dayCells.forEach((cell) => bindDayCell(cell, row, tracker));
    updateRowScore(row, tracker);
  });
}

function loadState(tracker) {
  const { tableBody, totalRow } = getTrackerElements(tracker);
  const savedState = localStorage.getItem(tracker.storageKey);

  let tasks = tracker.tasks.map((name) => ({
    name,
    days: Array(7).fill(0)
  }));

  if (savedState) {
    try {
      const savedTasks = JSON.parse(savedState);
      if (Array.isArray(savedTasks) && savedTasks.length === tracker.tasks.length) {
        tasks = savedTasks.map((task, index) => ({
          name: tracker.tasks[index],
          days: Array.isArray(task.days) && task.days.length === 7 ? task.days : Array(7).fill(0)
        }));
      }
    } catch (error) {
      console.warn(`Unable to load ${tracker.id} care data; starting with a blank week.`, error);
    }
  }

  getTaskRows(tracker).forEach((row) => row.remove());
  tasks.forEach((task) => {
    const row = createTaskRow(task.name, task.days, tracker);
    tableBody.insertBefore(row, totalRow);
  });

  hydrateExistingRows(tracker);
  updateGrandTotal(tracker);
}

function handleReset(tracker) {
  getTaskRows(tracker).forEach((row) => {
    row.querySelectorAll('.day-cell').forEach((cell) => {
      cell.classList.remove('is-complete');
    });
    updateRowScore(row, tracker);
  });

  saveState(tracker);
}

function initializeWorksheet() {
  updateCurrentDate();
  TRACKERS.forEach((tracker) => {
    loadState(tracker);
    const { resetButton } = getTrackerElements(tracker);
    resetButton?.addEventListener('click', () => handleReset(tracker));
  });

  document.getElementById('reset-week')?.addEventListener('click', () => {
    TRACKERS.forEach((tracker) => handleReset(tracker));
  });

  initializeLifeLog();
}

function initializeLifeLog() {
  const form = document.getElementById('life-log-form');
  const dateInput = document.getElementById('life-log-date');
  const entriesContainer = document.getElementById('life-log-entries');

  if (!form || !dateInput || !entriesContainer) {
    return;
  }

  dateInput.value = new Date().toISOString().slice(0, 10);

  const readEntries = () => {
    try {
      const entries = JSON.parse(localStorage.getItem(LIFE_LOG_KEY) || '[]');
      return Array.isArray(entries) ? entries : [];
    } catch (error) {
      return [];
    }
  };

  const saveEntries = (entries) => {
    localStorage.setItem(LIFE_LOG_KEY, JSON.stringify(entries));
  };

  const renderEntries = () => {
    const entries = readEntries();
    entriesContainer.replaceChildren();

    if (!entries.length) {
      const emptyMessage = document.createElement('p');
      emptyMessage.className = 'life-log-empty';
      emptyMessage.textContent = 'No entries yet. Add a problem, discovery, or improvement when one is useful to remember.';
      entriesContainer.appendChild(emptyMessage);
      return;
    }

    entries.forEach((entry, index) => {
      const card = document.createElement('article');
      card.className = 'life-log-entry';

      const heading = document.createElement('div');
      heading.className = 'life-log-entry-heading';
      const title = document.createElement('h3');
      title.textContent = entry.title;
      const deleteButton = document.createElement('button');
      deleteButton.className = 'life-log-delete';
      deleteButton.type = 'button';
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        const nextEntries = readEntries();
        nextEntries.splice(index, 1);
        saveEntries(nextEntries);
        renderEntries();
      });
      heading.append(title, deleteButton);

      const metadata = document.createElement('p');
      metadata.className = 'life-log-entry-meta';
      metadata.textContent = `${entry.type} · ${entry.date}`;
      card.append(heading, metadata);

      if (entry.notes) {
        const notes = document.createElement('p');
        notes.className = 'life-log-entry-notes';
        notes.textContent = entry.notes;
        card.appendChild(notes);
      }

      entriesContainer.appendChild(card);
    });
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const entry = {
      date: formData.get('date'),
      type: formData.get('type'),
      title: formData.get('title').trim(),
      notes: formData.get('notes').trim()
    };

    const entries = readEntries();
    entries.unshift(entry);
    saveEntries(entries);
    form.reset();
    dateInput.value = new Date().toISOString().slice(0, 10);
    renderEntries();
  });

  renderEntries();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeWorksheet, { once: true });
} else {
  initializeWorksheet();
}
