const STORAGE_KEY = 'careWorksheetState';

const tableBody = document.querySelector('.care-table tbody');
const totalRow = document.querySelector('.care-table .total-row');
const currentDate = document.getElementById('currentDate');
const resetButton = document.getElementById('reset-week');
const addTaskButton = document.getElementById('add-task');

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

function getTaskRows() {
  return [...document.querySelectorAll('tbody tr:not(.total-row)')];
}

function updateRowScore(row) {
  const dayCells = row.querySelectorAll('.day-cell');
  const scoreCell = row.querySelector('.score-cell');
  const completed = [...dayCells].filter((cell) => cell.classList.contains('is-complete')).length;

  if (scoreCell) {
    scoreCell.textContent = String(completed);
  }

  updateGrandTotal();
}

function updateGrandTotal() {
  const total = getTaskRows().reduce((sum, row) => {
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

function saveState() {
  const tasks = getTaskRows().map((row) => {
    const nameCell = row.querySelector('.task-name');
    const days = [...row.querySelectorAll('.day-cell')].map((cell) =>
      cell.classList.contains('is-complete') ? 1 : 0
    );

    return {
      name: nameCell ? nameCell.textContent.trim() : 'Untitled task',
      days
    };
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createTaskRow(taskName = 'New task', days = Array(7).fill(0)) {
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
    bindDayCell(dayCell, row);
    row.appendChild(dayCell);
  });

  const scoreCell = document.createElement('td');
  scoreCell.className = 'score-cell';
  scoreCell.textContent = '0';
  row.appendChild(scoreCell);

  return row;
}

function bindDayCell(cell, row) {
  if (!cell || !row) {
    return;
  }

  cell.onclick = () => {
    cell.classList.toggle('is-complete');
    updateRowScore(row);
    saveState();
  };

  cell.onkeydown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      cell.click();
    }
  };
}

function hydrateExistingRows() {
  const rows = getTaskRows();

  rows.forEach((row) => {
    const dayCells = row.querySelectorAll('.day-cell');
    dayCells.forEach((cell) => bindDayCell(cell, row));
    updateRowScore(row);
  });
}

function loadState() {
  const savedState = localStorage.getItem(STORAGE_KEY);

  if (!savedState) {
    hydrateExistingRows();
    updateGrandTotal();
    return;
  }

  try {
    const tasks = JSON.parse(savedState);
    if (!Array.isArray(tasks)) {
      throw new Error('Saved state is not an array');
    }

    const rows = getTaskRows();
    rows.forEach((row) => row.remove());

    tasks.forEach((task) => {
      const row = createTaskRow(task.name, task.days || Array(7).fill(0));
      tableBody.insertBefore(row, totalRow);
    });

    hydrateExistingRows();
    updateGrandTotal();
  } catch (error) {
    console.warn('Unable to load care worksheet data; falling back to current table state.', error);
    hydrateExistingRows();
    updateGrandTotal();
  }
}

function handleReset() {
  getTaskRows().forEach((row) => {
    row.querySelectorAll('.day-cell').forEach((cell) => {
      cell.classList.remove('is-complete');
    });
    updateRowScore(row);
  });

  saveState();
}

function addTask() {
  const row = createTaskRow('New task', Array(7).fill(0));
  tableBody.insertBefore(row, totalRow);
  updateRowScore(row);
  saveState();
}

function attachTaskNameEditing() {
  tableBody.addEventListener('click', (event) => {
    const nameCell = event.target.closest('.task-name');
    if (!nameCell || nameCell.querySelector('input')) {
      return;
    }

    const currentValue = nameCell.textContent.trim();
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentValue;
    input.className = 'task-name-input';
    nameCell.textContent = '';
    nameCell.appendChild(input);
    input.focus();
    input.select();

    const finishEdit = () => {
      const nextValue = input.value.trim() || currentValue;
      nameCell.textContent = nextValue;
      saveState();
    };

    input.addEventListener('blur', finishEdit, { once: true });
    input.addEventListener('keydown', (keyEvent) => {
      if (keyEvent.key === 'Enter') {
        input.blur();
      }
      if (keyEvent.key === 'Escape') {
        nameCell.textContent = currentValue;
        input.remove();
      }
    });
  });
}

function initializeWorksheet() {
  updateCurrentDate();
  attachTaskNameEditing();
  loadState();

  if (resetButton) {
    resetButton.addEventListener('click', handleReset);
  }

  if (addTaskButton) {
    addTaskButton.addEventListener('click', addTask);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeWorksheet, { once: true });
} else {
  initializeWorksheet();
}
