const patientName = 'Ava Reed';
const maxDays = 14;

const actionCatalog = {
  meds: {
    title: 'Administer medication',
    description: 'Keep the routine on schedule and calm the symptoms.',
    effects: { health: 8, mood: 4, energy: -4, funds: -8, care: 2, stress: -6 }
  },
  meals: {
    title: 'Prepare balanced meals',
    description: 'Support nutrition and reduce fatigue.',
    effects: { health: 10, mood: 6, energy: 2, funds: -7, care: 2, stress: -4 }
  },
  social: {
    title: 'Social check-in',
    description: 'Offer companionship and encourage conversation.',
    effects: { health: 3, mood: 10, energy: -2, funds: -4, care: 3, stress: -8 }
  },
  exercise: {
    title: 'Gentle movement',
    description: 'Encourage light exercise to improve wellbeing.',
    effects: { health: 7, mood: 5, energy: -6, funds: 0, care: 2, stress: -4 }
  },
  rest: {
    title: 'Rest and recovery',
    description: 'Protect energy and lower stress after a busy day.',
    effects: { health: 5, mood: 4, energy: 12, funds: 0, care: 1, stress: -7 }
  },
  admin: {
    title: 'Handle paperwork',
    description: 'Review plans, schedules, and support resources.',
    effects: { health: 1, mood: 2, energy: -3, funds: -5, care: 4, stress: -5 }
  }
};

const dailyEvents = [
  { text: 'The patient slept well and woke up calmer than expected.', effects: { health: 4, mood: 5, energy: 5, stress: -4 } },
  { text: 'A family call lifted spirits and reduced isolation.', effects: { health: 2, mood: 9, energy: 2, stress: -6 } },
  { text: 'A minor flare-up reminded everyone to stay alert with care routines.', effects: { health: -6, mood: -4, energy: -3, stress: 8 } },
  { text: 'The support worker arrived on time and created a smoother day.', effects: { health: 5, mood: 3, energy: 4, stress: -5 } },
  { text: 'The patient was tired after a long night, so the schedule needed extra rest.', effects: { health: -3, mood: -2, energy: -8, stress: 6 } },
  { text: 'A small improvement in appetite made the day feel more hopeful.', effects: { health: 6, mood: 4, energy: 3, stress: -3 } }
];

const defaultState = () => ({
  day: 1,
  health: 72,
  mood: 68,
  energy: 64,
  funds: 120,
  care: 0,
  stress: 32,
  log: [
    { text: 'A new care plan begins. The first goal is to keep Ava stable and supported through the week.' }
  ],
  gameOver: false,
  result: ''
});

let state = defaultState();

const elements = {
  health: document.getElementById('health-stat'),
  mood: document.getElementById('mood-stat'),
  energy: document.getElementById('energy-stat'),
  funds: document.getElementById('funds-stat'),
  care: document.getElementById('care-stat'),
  stress: document.getElementById('stress-stat'),
  dayLabel: document.getElementById('day-label'),
  actionButtons: document.getElementById('action-buttons'),
  logList: document.getElementById('log-list'),
  careProgress: document.getElementById('care-progress'),
  newGameBtn: document.getElementById('new-game-btn')
};

function clamp(value, min = 0, max = 100) {
  return Math.min(Math.max(value, min), max);
}

function updateProgress() {
  const total = Math.min(state.care, 20);
  const progress = (total / 20) * 100;
  elements.careProgress.style.width = `${progress}%`;
}

function addLog(text) {
  state.log.unshift({ text });
  if (state.log.length > 7) {
    state.log.pop();
  }
}

function applyEffects(effectMap, label) {
  for (const [key, value] of Object.entries(effectMap)) {
    if (key === 'care') {
      state[key] += value;
    } else if (key === 'funds') {
      state[key] += value;
      state[key] = Math.max(0, state[key]);
    } else {
      state[key] = clamp(state[key] + value);
    }
  }

  if (label) {
    addLog(label);
  }
}

function renderActions() {
  elements.actionButtons.innerHTML = '';

  Object.entries(actionCatalog).forEach(([key, action]) => {
    const button = document.createElement('button');
    button.className = 'action-btn';
    button.innerHTML = `<strong>${action.title}</strong><span>${action.description}</span>`;
    button.addEventListener('click', () => performTurn(key));
    elements.actionButtons.appendChild(button);
  });
}

function render() {
  elements.health.textContent = state.health;
  elements.mood.textContent = state.mood;
  elements.energy.textContent = state.energy;
  elements.funds.textContent = state.funds;
  elements.care.textContent = state.care;
  elements.stress.textContent = state.stress;
  elements.dayLabel.textContent = `Day ${state.day} of ${maxDays}`;
  updateProgress();

  elements.logList.innerHTML = state.log
    .map((entry) => `<li><strong>Day ${state.day - state.log.indexOf(entry)}</strong> ${entry.text}</li>`)
    .join('');
}

function endGame() {
  state.gameOver = true;

  if (state.health >= 75 && state.mood >= 70 && state.care >= 16) {
    state.result = 'Ava is thriving. The care plan delivered a strong recovery and positive support.';
  } else if (state.health >= 60 && state.mood >= 60) {
    state.result = 'Ava is stable, but the plan needs more consistent attention to reach a full recovery.';
  } else {
    state.result = 'The care plan is under strain. A more balanced routine would help Ava recover.';
  }

  addLog(state.result);
  render();

  Object.values(actionCatalog).forEach((action) => {
    const buttons = document.querySelectorAll('.action-btn');
    buttons.forEach((button) => {
      button.disabled = true;
      button.style.opacity = '0.6';
      button.style.cursor = 'not-allowed';
    });
  });
}

function performTurn(actionKey) {
  if (state.gameOver) return;

  const chosenAction = actionCatalog[actionKey];
  applyEffects(chosenAction.effects, `${chosenAction.title}: ${chosenAction.description}`);

  const event = dailyEvents[Math.floor(Math.random() * dailyEvents.length)];
  applyEffects(event.effects, `Daily event: ${event.text}`);

  state.day += 1;

  if (state.health <= 25 || state.mood <= 20 || state.stress >= 85) {
    addLog('Crisis point reached. The care routine needs a reset before the next day can be managed safely.');
    endGame();
    return;
  }

  if (state.day > maxDays) {
    endGame();
    return;
  }

  addLog(`New day begins. The team is preparing for ${patientName}'s next care needs.`);
  render();
}

function resetGame() {
  state = defaultState();
  renderActions();
  render();

  const buttons = document.querySelectorAll('.action-btn');
  buttons.forEach((button) => {
    button.disabled = false;
    button.style.opacity = '1';
    button.style.cursor = 'pointer';
  });
}

elements.newGameBtn.addEventListener('click', resetGame);
renderActions();
render();
