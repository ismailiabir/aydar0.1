const STORAGE_KEY = 'studentProgressHubV1';

const state = {
  studentName: '',
  theme: 'teal',
  subjects: [],
  exams: [],
  skills: [],
  resources: [],
  tasks: []
};

const refs = {
  studentName: document.getElementById('studentName'),
  themeSelect: document.getElementById('themeSelect'),
  subjectList: document.getElementById('subjectList'),
  examList: document.getElementById('examList'),
  skillList: document.getElementById('skillList'),
  resourceList: document.getElementById('resourceList'),
  taskList: document.getElementById('taskList'),
  overallPrep: document.getElementById('overallPrep'),
  nearestExam: document.getElementById('nearestExam'),
  skillsMastered: document.getElementById('skillsMastered'),
  tasksDone: document.getElementById('tasksDone')
};

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return seed();
  try {
    Object.assign(state, JSON.parse(raw));
  } catch {
    seed();
  }
}

function seed() {
  state.subjects = [
    { id: uid(), name: '➗ Math', prep: 52, teacher: '', priority: 'High' },
    { id: uid(), name: '🧬 Biology', prep: 70, teacher: '', priority: 'Medium' }
  ];
  state.exams = [{ id: uid(), name: 'Math Midterm', subject: '➗ Math', date: '', readiness: 45 }];
  state.skills = [{ id: uid(), name: 'Integration by parts', subject: '➗ Math', level: 'Learning' }];
  state.resources = [{ id: uid(), title: 'Integration playlist', subject: '➗ Math', type: 'YouTube', url: '' }];
  state.tasks = [{ id: uid(), task: 'Do 20 past-paper questions', subject: '➗ Math', date: '', status: 'Not started' }];
}

function bindTopControls() {
  refs.studentName.value = state.studentName || '';
  refs.themeSelect.value = state.theme || 'teal';
  document.documentElement.setAttribute('data-theme', refs.themeSelect.value);

  refs.studentName.addEventListener('input', (e) => {
    state.studentName = e.target.value;
    save();
  });

  refs.themeSelect.addEventListener('change', (e) => {
    state.theme = e.target.value;
    document.documentElement.setAttribute('data-theme', state.theme);
    save();
  });

  document.getElementById('exportBtn').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'student-progress-data.json';
    a.click();
  });

  document.getElementById('importInput').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    const data = JSON.parse(text);
    ['studentName', 'theme', 'subjects', 'exams', 'skills', 'resources', 'tasks'].forEach((k) => {
      if (data[k] !== undefined) state[k] = data[k];
    });
    renderAll();
    save();
  });

  document.getElementById('resetBtn').addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    Object.assign(state, { studentName: '', theme: 'teal', subjects: [], exams: [], skills: [], resources: [], tasks: [] });
    seed();
    renderAll();
    save();
  });
}

function renderCollection(listEl, templateId, arr, fields) {
  listEl.innerHTML = '';
  arr.forEach((entry) => {
    const node = document.getElementById(templateId).content.firstElementChild.cloneNode(true);

    fields.forEach((f) => {
      const input = node.querySelector(`[data-field="${f}"]`);
      if (!input) return;
      input.value = entry[f] ?? '';
      input.addEventListener('input', () => {
        entry[f] = input.type === 'number' || input.type === 'range' ? Number(input.value) : input.value;
        decorateNode(node, entry);
        updateMetrics();
        save();
      });
    });

    node.querySelector('[data-action="remove"]').addEventListener('click', () => {
      const idx = arr.findIndex((x) => x.id === entry.id);
      if (idx >= 0) arr.splice(idx, 1);
      renderAll();
      save();
    });

    decorateNode(node, entry);
    listEl.appendChild(node);
  });
}

function decorateNode(node, entry) {
  const prepOut = node.querySelector('[data-out="prepOut"]');
  if (prepOut) prepOut.textContent = `${entry.prep || 0}%`;

  const countdown = node.querySelector('[data-out="countdown"]');
  if (countdown) {
    countdown.textContent = entry.date ? `${daysUntil(entry.date)} days left` : 'No date';
  }
}

function daysUntil(dateStr) {
  const now = new Date();
  const target = new Date(dateStr + 'T00:00:00');
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

function updateMetrics() {
  const prepAvg = state.subjects.length
    ? Math.round(state.subjects.reduce((s, x) => s + Number(x.prep || 0), 0) / state.subjects.length)
    : 0;
  refs.overallPrep.textContent = `${prepAvg}%`;

  const upcoming = state.exams
    .filter((e) => e.date)
    .map((e) => ({ ...e, left: daysUntil(e.date) }))
    .filter((e) => e.left >= 0)
    .sort((a, b) => a.left - b.left)[0];

  refs.nearestExam.textContent = upcoming ? `${upcoming.name} (${upcoming.left}d)` : 'No upcoming exams';
  refs.skillsMastered.textContent = state.skills.filter((s) => s.level === 'Mastered').length;
  refs.tasksDone.textContent = state.tasks.filter((t) => t.status === 'Done').length;
}

function renderAll() {
  refs.studentName.value = state.studentName || '';
  refs.themeSelect.value = state.theme || 'teal';
  document.documentElement.setAttribute('data-theme', state.theme || 'teal');

  renderCollection(refs.subjectList, 'subjectTpl', state.subjects, ['name', 'prep', 'teacher', 'priority']);
  renderCollection(refs.examList, 'examTpl', state.exams, ['name', 'subject', 'date', 'readiness']);
  renderCollection(refs.skillList, 'skillTpl', state.skills, ['name', 'subject', 'level']);
  renderCollection(refs.resourceList, 'resourceTpl', state.resources, ['title', 'subject', 'type', 'url']);
  renderCollection(refs.taskList, 'taskTpl', state.tasks, ['task', 'subject', 'date', 'status']);

  updateMetrics();
}

function hookAddButtons() {
  document.getElementById('addSubject').addEventListener('click', () => {
    state.subjects.push({ id: uid(), name: '', prep: 0, teacher: '', priority: 'Medium' });
    renderAll(); save();
  });
  document.getElementById('addExam').addEventListener('click', () => {
    state.exams.push({ id: uid(), name: '', subject: '', date: '', readiness: 0 });
    renderAll(); save();
  });
  document.getElementById('addSkill').addEventListener('click', () => {
    state.skills.push({ id: uid(), name: '', subject: '', level: 'Beginner' });
    renderAll(); save();
  });
  document.getElementById('addResource').addEventListener('click', () => {
    state.resources.push({ id: uid(), title: '', subject: '', type: 'YouTube', url: '' });
    renderAll(); save();
  });
  document.getElementById('addTask').addEventListener('click', () => {
    state.tasks.push({ id: uid(), task: '', subject: '', date: '', status: 'Not started' });
    renderAll(); save();
  });
}

load();
bindTopControls();
hookAddButtons();
renderAll();
save();
