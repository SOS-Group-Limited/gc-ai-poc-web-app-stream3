const entitiesData = [
  { name: 'SDM Childcare (Jurong East)', mgmt: [1,1,1,1,1,1,1,1,1,1,2], bank: [1,1,1,1,1,1,1,1,1,1,2] },
  { name: 'Tinkerland', mgmt: [1,1,1,1,1,1,1,1,1,1,2], bank: [1,1,1,1,1,1,1,1,1,1,2] },
  { name: 'SDM International Pre-school', mgmt: [1,1,1,1,1,1,1,1,1,2,0], bank: [1,1,1,1,1,1,1,1,1,1,2] },
  { name: 'Global Tots @ East Gate', mgmt: [1,1,1,1,1,1,1,1,3,3,0], bank: [1,1,1,1,1,1,1,1,1,3,0] },
  { name: 'Global Tots @ Mountbatten', mgmt: [1,1,1,1,1,1,1,1,1,1,2], bank: [1,1,1,1,1,1,1,1,1,1,2] },
  { name: 'Sunflower Preschool', mgmt: [1,1,1,1,1,1,1,1,1,1,2], bank: [1,1,1,1,1,1,1,1,1,1,2] },
];
// 0=n/a, 1=received, 2=pending, 3=overdue

const months = ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'];

const alerts = [
  { type: 'err', icon: '&#9888;', text: '<strong>OVERDUE:</strong> April Management Report from Global Tots East Gate is 5 days overdue. Notification sent to AM team.', time: 'May 12, 2026', read: false },
  { type: 'err', icon: '&#9888;', text: '<strong>OVERDUE:</strong> March Management Report from Global Tots East Gate still outstanding. Escalated.', time: 'May 8, 2026', read: false },
  { type: 'warn', icon: '&#9888;', text: '<strong>REMINDER:</strong> April Management Reports due from SDM International Pre-school in 2 days.', time: 'May 5, 2026', read: true },
  { type: 'ok', icon: '&#10003;', text: '<strong>RECEIVED:</strong> April Management Report from SDM Childcare (Jurong East). Auto-filed to 18 SG Finance / Management Accounts.', time: 'May 3, 2026', read: true },
  { type: 'ok', icon: '&#10003;', text: '<strong>RECEIVED:</strong> April Management Report from Sunflower Preschool. Auto-filed.', time: 'May 2, 2026', read: true },
  { type: 'ok', icon: '&#10003;', text: '<strong>RECEIVED:</strong> March Bank Statements consolidated. Auto-filed.', time: 'Apr 12, 2026', read: true },
];

let alertFilter = 'all'; // all, unread, overdue

export function monitoringPage() {
  const cellMap = { 0: ['na','&mdash;'], 1: ['received','&#10003;'], 2: ['pending','&#8987;'], 3: ['overdue','&#10007;'] };
  const received = entitiesData.reduce((s,e) => s + e.mgmt.filter(v=>v===1).length + e.bank.filter(v=>v===1).length, 0);
  const pending = entitiesData.reduce((s,e) => s + e.mgmt.filter(v=>v===2).length + e.bank.filter(v=>v===2).length, 0);
  const overdue = entitiesData.reduce((s,e) => s + e.mgmt.filter(v=>v===3).length + e.bank.filter(v=>v===3).length, 0);
  const total = received + pending + overdue;
  const rate = total > 0 ? Math.round(received / total * 100) : 0;

  return `
    <div class="content">
      <div class="page-header">
        <h1>Monitoring & Alerts</h1>
        <div class="sub">Track submissions, deadlines, and automated alerts across all portfolio entities</div>
      </div>

      <div class="summary-row">
        <div class="summary-card"><div class="val green">${received}</div><div class="lbl">Received</div></div>
        <div class="summary-card"><div class="val yellow">${pending}</div><div class="lbl">Pending</div></div>
        <div class="summary-card"><div class="val red">${overdue}</div><div class="lbl">Overdue</div></div>
        <div class="summary-card"><div class="val">${rate}%</div><div class="lbl">On-Time Rate</div></div>
      </div>

      <div class="matrix-panel">
        <h2>Monthly Submission Tracker <span style="font-size:12px;color:#9ca3af;font-weight:400;margin-left:8px">(click cells to toggle status)</span></h2>
        <table class="matrix" id="tracker-matrix">
          <thead><tr><th>Entity / Document</th>${months.map(m=>`<th>${m}</th>`).join('')}</tr></thead>
          <tbody>
            <tr class="group-header"><td colspan="12">Management Reports</td></tr>
            ${entitiesData.map((e,ei) => `<tr>${cellTd(e.name)}${e.mgmt.map((v,mi) => `<td><span class="cell ${cellMap[v][0]}" data-entity="${ei}" data-type="mgmt" data-month="${mi}">${cellMap[v][1]}</span></td>`).join('')}</tr>`).join('')}
            <tr class="group-header"><td colspan="12">Bank Statements</td></tr>
            ${entitiesData.map((e,ei) => `<tr>${cellTd(e.name)}${e.bank.map((v,mi) => `<td><span class="cell ${cellMap[v][0]}" data-entity="${ei}" data-type="bank" data-month="${mi}">${cellMap[v][1]}</span></td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
      </div>

      <!-- Cell detail popup -->
      <div id="cell-popup" class="cell-popup hidden"></div>

      <div class="bottom-grid">
        <div class="panel">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <div class="section-title" style="margin-bottom:0">Alert Log</div>
            <div class="alert-filters">
              <button class="alert-filter-btn ${alertFilter==='all'?'active':''}" data-filter="all">All</button>
              <button class="alert-filter-btn ${alertFilter==='unread'?'active':''}" data-filter="unread">Unread</button>
              <button class="alert-filter-btn ${alertFilter==='overdue'?'active':''}" data-filter="overdue">Overdue</button>
            </div>
          </div>
          <div id="alert-list">
            ${renderAlerts()}
          </div>
        </div>
        <div class="panel">
          <div class="section-title">Automation Rules</div>
          ${ruleItem('Monthly Management Report Collection', 'Collect from all entities by 7th of each month. Send reminder on day 3 and day 5 if not received.', true)}
          ${ruleItem('Monthly Bank Statement Collection', 'Collect consolidated bank statements by 10th of each month.', true)}
          ${ruleItem('UW Model Version Confirmation', 'Flag any UW Model version not confirmed as current within 30 days of upload.', true)}
          ${ruleItem('Quarterly Audit Report', 'Collect quarterly audit reports from all entities by 15th of month following quarter end.', true)}
        </div>
      </div>
    </div>
  `;
}

function renderAlerts() {
  return alerts
    .filter(a => {
      if (alertFilter === 'unread') return !a.read;
      if (alertFilter === 'overdue') return a.type === 'err';
      return true;
    })
    .map(a => `<div class="alert-item ${a.read ? 'read' : ''}"><div class="alert-icon ${a.type}">${a.icon}</div><div><div class="alert-text">${a.text}</div><div class="alert-time">${a.time}</div></div></div>`)
    .join('') || '<div style="font-size:13px;color:#9ca3af;padding:16px 0">No alerts match this filter.</div>';
}

function cellTd(name) { return `<td>${name}</td>`; }

function ruleItem(title, detail, active) {
  return `<div class="rule-item">
    <div style="display:flex;align-items:center;justify-content:space-between">
      <div class="rule-title">${title}</div>
      <label class="toggle-switch"><input type="checkbox" ${active?'checked':''}><span class="toggle-slider"></span></label>
    </div>
    <div class="rule-detail">${detail}</div>
  </div>`;
}

export function initMonitoring() {
  // Cell click → cycle status
  document.querySelectorAll('.cell[data-entity]').forEach(cell => {
    cell.addEventListener('click', () => {
      const ei = parseInt(cell.dataset.entity);
      const mi = parseInt(cell.dataset.month);
      const type = cell.dataset.type;
      const arr = entitiesData[ei][type];
      const cycle = [1,2,3,0];
      const next = cycle[(cycle.indexOf(arr[mi]) + 1) % 4];
      arr[mi] = next;
      // Re-render the whole page
      const content = document.querySelector('.content');
      if (content) {
        content.outerHTML = monitoringPage();
        initMonitoring();
      }
    });
  });

  // Alert filter buttons
  document.querySelectorAll('.alert-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      alertFilter = btn.dataset.filter;
      document.querySelectorAll('.alert-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('alert-list').innerHTML = renderAlerts();
    });
  });

  // Rule toggles
  document.querySelectorAll('.toggle-switch input').forEach(toggle => {
    toggle.addEventListener('change', () => {
      const rule = toggle.closest('.rule-item');
      rule.style.opacity = toggle.checked ? '1' : '0.5';
    });
  });
}
