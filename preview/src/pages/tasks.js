let tasks = [
  { id: 1, pri: 'p1', source: 'planned', title: 'Finalize UW Model v5 for Capital Markets submission', cat: 'Finance', due: 'May 15', dueClass: 'soon', assignee: 'LC', status: 'progress' },
  { id: 2, pri: 'p1', source: 'planned', title: 'Review March Management Accounts — all entities', cat: 'Finance', due: 'May 10', dueClass: 'overdue', assignee: 'JB', status: 'progress' },
  { id: 3, pri: 'p3', source: 'adhoc', title: 'Collect signed NDA from Hampton', cat: 'Legal', due: 'May 12', dueClass: 'overdue', assignee: 'SW', status: 'progress' },
  { id: 4, pri: 'p2', source: 'planned', title: 'Prepare Q1 Investor Report', cat: 'Reporting', due: 'May 30', dueClass: '', assignee: 'LC', status: 'todo' },
  { id: 5, pri: 'p2', source: 'planned', title: 'Update capex forecast for 2026', cat: 'Finance', due: 'May 20', dueClass: '', assignee: 'SW', status: 'todo' },
  { id: 6, pri: 'p3', source: 'adhoc', title: 'Translate Thai corporate documents for DD checklist', cat: 'Operations', due: 'May 18', dueClass: 'soon', assignee: 'LC', status: 'todo' },
  { id: 7, pri: 'p1', source: 'planned', title: 'Follow up GTEG March management report — waiting on Sharon Chan', cat: 'Finance', due: 'May 7', dueClass: 'overdue', assignee: 'JB', status: 'blocked' },
  { id: 8, pri: 'p1', source: 'planned', title: 'Submit UW v4.8.6 to Capital Markets', cat: 'Finance', due: 'Apr 14', dueClass: '', assignee: 'LC', status: 'done' },
  { id: 9, pri: 'p1', source: 'planned', title: 'IC Memo approval for 25Feb tranche', cat: 'Legal', due: 'Feb 25', dueClass: '', assignee: 'JB', status: 'done' },
  { id: 10, pri: 'p2', source: 'adhoc', title: 'Crusade Partners DD checklist review', cat: 'DD', due: 'Mar 11', dueClass: '', assignee: 'SW', status: 'done' },
  { id: 11, pri: 'p2', source: 'planned', title: 'Budget V2 final review and submission', cat: 'Finance', due: 'Nov 10', dueClass: '', assignee: 'SW', status: 'done' },
];

let viewMode = 'board'; // board, list, workload
let showAddModal = false;

const columns = [
  { key: 'todo', label: 'To Do' },
  { key: 'progress', label: 'In Progress' },
  { key: 'blocked', label: 'Blocked' },
  { key: 'done', label: 'Done' },
];

export function tasksPage() {
  return `
    <div class="content">
      <div class="tasks-header">
        <h1>Task Ledger</h1>
        <div style="display:flex;gap:12px;align-items:center">
          <div class="view-toggle" id="view-toggle">
            <button class="${viewMode==='board'?'active':''}" data-view="board">Board</button>
            <button class="${viewMode==='list'?'active':''}" data-view="list">List</button>
            <button class="${viewMode==='workload'?'active':''}" data-view="workload">Workload</button>
          </div>
          <button class="add-btn" id="add-task-btn">+ Add Task</button>
        </div>
      </div>

      <div class="impact-banner">
        <div style="font-size:18px;flex-shrink:0">&#9888;</div>
        <div><strong>Workload Alert:</strong> Adding "Translate Thai corporate docs" (ad-hoc, due May 18) will push "Prepare Q1 Investor Report" past its May 30 deadline for Lillian. Review prioritization?</div>
      </div>

      ${renderWorkloadBars()}

      <div id="task-view">${viewMode === 'board' ? renderBoard() : viewMode === 'list' ? renderList() : renderWorkloadView()}</div>

      <!-- Add Task Modal -->
      <div id="add-modal" class="modal-overlay ${showAddModal ? '' : 'hidden'}">
        <div class="modal-card">
          <div class="modal-header"><h3>Add New Task</h3><button class="drawer-close" id="modal-close">&times;</button></div>
          <div class="modal-body">
            <div class="form-group"><label>Title</label><input type="text" id="new-title" class="form-input" placeholder="Task title"></div>
            <div class="form-row">
              <div class="form-group"><label>Priority</label><select id="new-pri" class="form-input"><option value="p1">P1 - Critical</option><option value="p2" selected>P2 - Important</option><option value="p3">P3 - Normal</option></select></div>
              <div class="form-group"><label>Source</label><select id="new-source" class="form-input"><option value="planned">Planned</option><option value="adhoc">Ad-hoc</option></select></div>
            </div>
            <div class="form-row">
              <div class="form-group"><label>Category</label><select id="new-cat" class="form-input"><option>Finance</option><option>Legal</option><option>Operations</option><option>DD</option><option>Reporting</option></select></div>
              <div class="form-group"><label>Assignee</label><select id="new-assignee" class="form-input"><option value="LC">Lillian Chow</option><option value="JB">James Bradley</option><option value="SW">Spencer Wong</option></select></div>
            </div>
            <div class="form-group"><label>Due Date</label><input type="text" id="new-due" class="form-input" placeholder="e.g. May 25" value="May 25"></div>
            <button class="add-btn" id="save-task" style="width:100%;margin-top:8px">Add Task</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderWorkloadBars() {
  const people = {LC:'Lillian Chow', JB:'James Bradley', SW:'Spencer Wong'};
  return `<div class="workload-bar">${Object.entries(people).map(([k,name]) => {
    const count = tasks.filter(t => t.assignee === k && t.status !== 'done').length;
    const pct = Math.min(count * 16, 100);
    const cls = pct >= 90 ? 'over' : pct >= 70 ? 'warn' : 'ok';
    return `<div class="wl-person"><div class="wl-name">${name}</div><div class="wl-meter"><div class="fill ${cls}" style="width:${pct}%"></div></div><div class="wl-tasks">${count} active tasks · ${pct}% capacity</div></div>`;
  }).join('')}</div>`;
}

function renderBoard() {
  return `<div class="kanban">${columns.map(col => {
    const colTasks = tasks.filter(t => t.status === col.key);
    return `<div class="kanban-col"><div class="col-header"><div class="col-title">${col.label}</div><div class="col-count">${colTasks.length}</div></div>
      <div class="col-cards" data-col="${col.key}">${colTasks.map(t => taskCard(t)).join('')}</div></div>`;
  }).join('')}</div>`;
}

function renderList() {
  const active = tasks.filter(t => t.status !== 'done');
  const done = tasks.filter(t => t.status === 'done');
  return `
    <div class="panel" style="margin-bottom:16px">
      <table class="file-table"><thead><tr><th>Task</th><th>Priority</th><th>Source</th><th>Category</th><th>Status</th><th>Due</th><th>Assignee</th><th></th></tr></thead>
        <tbody>${active.map(t => `<tr class="task-list-row" data-id="${t.id}">
          <td style="font-weight:600">${t.title}</td>
          <td><span class="priority ${t.pri}">${t.pri.toUpperCase()}</span></td>
          <td><span class="status-badge ${t.source}">${t.source==='adhoc'?'Ad-hoc':'Planned'}</span></td>
          <td><span class="tc-category" style="margin:0">${t.cat}</span></td>
          <td><span class="status-badge ${t.status==='blocked'?'overdue':t.status==='progress'?'attention':'info'}">${columns.find(c=>c.key===t.status)?.label}</span></td>
          <td><span class="tc-due ${t.dueClass}">${t.dueClass==='overdue'?'Overdue ('+t.due+')':t.due}</span></td>
          <td><span class="tc-assignee">${t.assignee}</span></td>
          <td><select class="status-select" data-task="${t.id}">${columns.map(c=>`<option value="${c.key}" ${t.status===c.key?'selected':''}>${c.label}</option>`).join('')}</select></td>
        </tr>`).join('')}</tbody>
      </table>
    </div>
    <details><summary style="font-size:13px;font-weight:600;color:#9ca3af;cursor:pointer;margin-bottom:8px">Completed (${done.length})</summary>
      <div class="panel" style="opacity:0.6"><table class="file-table"><thead><tr><th>Task</th><th>Priority</th><th>Category</th><th>Completed</th><th>Assignee</th></tr></thead>
        <tbody>${done.map(t => `<tr><td>${t.title}</td><td><span class="priority ${t.pri}">${t.pri.toUpperCase()}</span></td><td>${t.cat}</td><td>${t.due}</td><td><span class="tc-assignee">${t.assignee}</span></td></tr>`).join('')}</tbody>
      </table></div>
    </details>`;
}

function renderWorkloadView() {
  const people = {LC:'Lillian Chow', JB:'James Bradley', SW:'Spencer Wong'};
  return Object.entries(people).map(([k,name]) => {
    const pt = tasks.filter(t => t.assignee === k && t.status !== 'done');
    return `<div class="panel" style="margin-bottom:16px"><div class="section-title">${name} <span style="font-size:12px;color:#9ca3af;font-weight:400">(${pt.length} active)</span></div>
      <div style="display:flex;flex-direction:column;gap:8px">${pt.map(t => `<div class="task-card" data-id="${t.id}" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px">
        <div style="display:flex;align-items:center;gap:12px"><span class="priority ${t.pri}">${t.pri.toUpperCase()}</span><span style="font-size:13px;font-weight:500">${t.title}</span></div>
        <span class="tc-due ${t.dueClass}">${t.dueClass==='overdue'?'Overdue':'Due '+t.due}</span>
      </div>`).join('')}</div></div>`;
  }).join('');
}

function taskCard(t) {
  return `<div class="task-card ${t.status==='done'?'done':''}" data-id="${t.id}">
    <div class="tc-top"><span class="priority ${t.pri}">${t.pri.toUpperCase()}</span><span class="status-badge ${t.source}">${t.source==='adhoc'?'Ad-hoc':'Planned'}</span></div>
    <div class="tc-title">${t.title}</div>
    <div class="tc-category">${t.cat}</div>
    <div class="tc-footer">
      <span class="tc-due ${t.dueClass}">${t.status==='done'?'Completed '+t.due:t.dueClass==='overdue'?'Overdue ('+t.due+')':'Due '+t.due}</span>
      <span class="tc-assignee">${t.assignee}</span>
    </div>
    ${t.status !== 'done' ? `<div class="task-actions">
      ${columns.filter(c=>c.key!==t.status).map(c=>`<button class="task-move-btn" data-task="${t.id}" data-to="${c.key}">${c.label}</button>`).join('')}
    </div>` : ''}
  </div>`;
}

function rerenderView() {
  const el = document.getElementById('task-view');
  if (!el) return;
  el.innerHTML = viewMode === 'board' ? renderBoard() : viewMode === 'list' ? renderList() : renderWorkloadView();
  bindTaskEvents();
  // Update workload bars
  const wl = document.querySelector('.workload-bar');
  if (wl) wl.outerHTML = renderWorkloadBars();
}

function bindTaskEvents() {
  // Task card move buttons
  document.querySelectorAll('.task-move-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.task);
      const to = btn.dataset.to;
      const task = tasks.find(t => t.id === id);
      if (task) { task.status = to; rerenderView(); }
    });
  });

  // List view status selects
  document.querySelectorAll('.status-select').forEach(sel => {
    sel.addEventListener('change', () => {
      const id = parseInt(sel.dataset.task);
      const task = tasks.find(t => t.id === id);
      if (task) { task.status = sel.value; rerenderView(); }
    });
  });

  // Task card click to expand actions
  document.querySelectorAll('.task-card[data-id]').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.task-card').forEach(c => { if (c !== card) c.classList.remove('expanded'); });
      card.classList.toggle('expanded');
    });
  });
}

export function initTasks() {
  // View toggle
  document.querySelectorAll('#view-toggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      viewMode = btn.dataset.view;
      document.querySelectorAll('#view-toggle button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      rerenderView();
    });
  });

  // Add task modal
  document.getElementById('add-task-btn')?.addEventListener('click', () => {
    document.getElementById('add-modal')?.classList.remove('hidden');
  });
  document.getElementById('modal-close')?.addEventListener('click', () => {
    document.getElementById('add-modal')?.classList.add('hidden');
  });
  document.getElementById('add-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'add-modal') document.getElementById('add-modal')?.classList.add('hidden');
  });

  // Save new task
  document.getElementById('save-task')?.addEventListener('click', () => {
    const title = document.getElementById('new-title')?.value;
    if (!title?.trim()) return;
    tasks.unshift({
      id: Date.now(),
      pri: document.getElementById('new-pri')?.value || 'p2',
      source: document.getElementById('new-source')?.value || 'planned',
      title: title.trim(),
      cat: document.getElementById('new-cat')?.value || 'Finance',
      due: document.getElementById('new-due')?.value || 'TBD',
      dueClass: '',
      assignee: document.getElementById('new-assignee')?.value || 'LC',
      status: 'todo',
    });
    document.getElementById('add-modal')?.classList.add('hidden');
    document.getElementById('new-title').value = '';
    rerenderView();
  });

  bindTaskEvents();
}
