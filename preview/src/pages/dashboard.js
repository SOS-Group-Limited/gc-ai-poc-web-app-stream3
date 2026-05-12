const entities = [
  { name: 'SDM Childcare Centre (Jurong East)', type: 'Childcare Centre', rev: 'S$1,493,672', enroll: '142 / 160', pct: 89, updated: 'May 10, 2026', status: 'on-track', statusText: 'On Track' },
  { name: 'Tinkerland Private Limited', type: 'Preschool', rev: 'S$1,829,672', enroll: '165 / 180', pct: 92, updated: 'May 8, 2026', status: 'on-track', statusText: 'On Track' },
  { name: 'SDM International Pre-school', type: 'International Preschool', rev: 'S$3,450,900', enroll: '198 / 220', pct: 90, updated: 'May 9, 2026', status: 'attention', statusText: 'Attention' },
  { name: 'Global Tots @ Mountbatten', type: 'Childcare Centre', rev: 'S$1,670,550', enroll: '88 / 100', pct: 88, updated: 'May 6, 2026', status: 'on-track', statusText: 'On Track' },
  { name: 'Global Tots @ East Gate', type: 'Childcare Centre', rev: 'S$892,340', enroll: '54 / 72', pct: 75, updated: 'Apr 28, 2026', status: 'critical', statusText: 'March Report Overdue' },
  { name: 'Sunflower Preschool', type: 'Preschool', rev: 'S$2,104,800', enroll: '175 / 200', pct: 88, updated: 'May 5, 2026', status: 'on-track', statusText: 'On Track' },
];

export function dashboardPage() {
  return `
    <div class="content">
      <div class="project-header">
        <h1>Project Arts &mdash; Ballet</h1>
        <div class="subtitle">Singapore Preschool Portfolio &middot; Gaw Capital Partners</div>
        <div class="status">Active &mdash; Hold Year 3</div>
      </div>

      <div class="metrics-row">
        <div class="metric-card"><div class="value">$25.0M</div><div class="label">Investment Amount</div></div>
        <div class="metric-card"><div class="value">$31.2M</div><div class="label">Current NAV</div></div>
        <div class="metric-card"><div class="value red">18.4%</div><div class="label">Projected IRR</div></div>
        <div class="metric-card"><div class="value">3.2 yrs</div><div class="label">Hold Period</div></div>
      </div>

      <div class="section-title">Portfolio Entities</div>
      <div class="grid-3" id="entity-grid">
        ${entities.map((e, i) => entityCard(e, i)).join('')}
      </div>

      <!-- Entity Detail Drawer (hidden by default) -->
      <div id="entity-drawer" class="entity-drawer hidden">
        <div class="drawer-header">
          <h3 id="drawer-title"></h3>
          <button id="drawer-close" class="drawer-close">&times;</button>
        </div>
        <div id="drawer-body"></div>
      </div>

      <div class="grid-2">
        <div class="panel">
          <div class="section-title">Key Documents</div>
          ${docRow('XLS', 'excel', 'Ballet UW v5', 'Apr 16, 2026 &middot; Lillian Chow &middot; 4,452 KB', 'current', 'Confirmed')}
          ${docRow('XLS', 'excel', 'Ballet UW v4.8.6', 'Apr 14, 2026 &middot; Capital Markets &middot; 2,898 KB', 'approved', 'Approved')}
          ${docRow('PDF', 'pdf', 'IC Memo (25Feb2026)', 'Feb 25, 2026 &middot; Paul &middot; 502 KB', 'current', 'Confirmed')}
          ${docRow('XLS', 'excel', 'GTEG Mgmt Accounts Dec 2025', 'Mar 30, 2026 &middot; Sharon Chan &middot; 89 KB', 'review', 'Under Review')}
          <a class="view-all" data-goto="documents">View all documents &rarr;</a>
        </div>
        <div>
          <div class="panel" style="margin-bottom: 24px;">
            <div class="section-title">Upcoming Deadlines</div>
            ${deadline('Apr Management Report', 'Global Tots East Gate', 'overdue', 'Overdue')}
            ${deadline('Apr Management Report', 'Sunflower Preschool', 'warn', 'May 14')}
            ${deadline('Q1 Audit Report', 'All Entities', 'ok', 'May 20')}
            ${deadline('Capex Forecast', 'Portfolio', 'ok', 'May 25')}
            <a class="view-all" data-goto="monitoring">View all &rarr;</a>
          </div>
          <div class="panel">
            <div class="section-title">Recent Activity</div>
            ${activity('doc', 'UW Model v5 uploaded by Lillian Chow', 'Apr 16, 2026')}
            ${activity('alert', 'March report overdue &mdash; Global Tots East Gate', 'Apr 10, 2026')}
            ${activity('decision', 'IC Memo approved by Investment Committee', 'Feb 25, 2026')}
            ${activity('task', 'Budget V2 submitted for review', 'Nov 10, 2025')}
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initDashboard() {
  // Entity card click → show drawer
  document.querySelectorAll('.entity-card[data-idx]').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.idx);
      const e = entities[idx];
      const drawer = document.getElementById('entity-drawer');
      document.getElementById('drawer-title').textContent = e.name;
      document.getElementById('drawer-body').innerHTML = `
        <div class="drawer-meta">${e.type} &middot; Singapore</div>
        <div class="drawer-stats">
          <div class="drawer-stat"><div class="drawer-stat-val">${e.rev}</div><div class="drawer-stat-lbl">YTD Revenue</div></div>
          <div class="drawer-stat"><div class="drawer-stat-val">${e.enroll}</div><div class="drawer-stat-lbl">Enrollment</div></div>
          <div class="drawer-stat">
            <div class="drawer-stat-val">${e.pct}%</div><div class="drawer-stat-lbl">Occupancy</div>
            <div class="occupancy-bar"><div class="occupancy-fill ${e.pct >= 85 ? 'ok' : e.pct >= 75 ? 'warn' : 'low'}" style="width:${e.pct}%"></div></div>
          </div>
        </div>
        <div class="drawer-section">
          <div class="drawer-section-title">Recent Documents</div>
          <div class="drawer-doc-item">Management Report &mdash; Apr 2026 <span class="status-badge ${e.status === 'critical' ? 'overdue' : 'current'}">${e.status === 'critical' ? 'Overdue' : 'Received'}</span></div>
          <div class="drawer-doc-item">Management Report &mdash; Mar 2026 <span class="status-badge current">Received</span></div>
          <div class="drawer-doc-item">Bank Statement &mdash; Apr 2026 <span class="status-badge pending">Pending</span></div>
        </div>
        <div class="drawer-section">
          <div class="drawer-section-title">Status</div>
          <div class="status-badge ${e.status}" style="font-size:12px;padding:4px 12px">${e.statusText}</div>
          <div style="font-size:12px;color:#9ca3af;margin-top:8px">Last updated: ${e.updated}</div>
        </div>
      `;
      drawer.classList.remove('hidden');
      // Highlight selected card
      document.querySelectorAll('.entity-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });

  document.getElementById('drawer-close')?.addEventListener('click', () => {
    document.getElementById('entity-drawer').classList.add('hidden');
    document.querySelectorAll('.entity-card').forEach(c => c.classList.remove('selected'));
  });

  // Doc row click → navigate to documents
  document.querySelectorAll('.doc-row').forEach(row => {
    row.style.cursor = 'pointer';
    row.addEventListener('click', () => {
      window.location.hash = '/documents';
    });
  });
}

function entityCard(e, i) {
  return `
    <div class="entity-card" data-idx="${i}">
      <div class="name">${e.name}</div>
      <div class="type">${e.type} &middot; Singapore</div>
      <div class="metric-row"><span class="k">YTD Revenue</span><span class="v">${e.rev}</span></div>
      <div class="metric-row"><span class="k">Enrollment</span><span class="v">${e.enroll}</span></div>
      <div class="metric-row"><span class="k">Last Updated</span><span class="v">${e.updated}</span></div>
      <div class="status-badge ${e.status}">${e.statusText}</div>
    </div>`;
}

function docRow(icon, iconClass, name, meta, statusClass, statusText) {
  return `
    <div class="doc-row">
      <div class="doc-info">
        <div class="doc-icon ${iconClass}">${icon}</div>
        <div><div class="doc-name">${name}</div><div class="doc-meta">${meta}</div></div>
      </div>
      <div class="status-badge ${statusClass}">${statusText}</div>
    </div>`;
}

function deadline(title, entity, dateClass, dateText) {
  return `
    <div class="deadline-item">
      <div class="deadline-info"><div class="dl-title">${title}</div><div class="dl-entity">${entity}</div></div>
      <div class="dl-date ${dateClass}">${dateText}</div>
    </div>`;
}

function activity(type, text, time) {
  return `
    <div class="activity-item">
      <div class="activity-dot ${type}"></div>
      <div><div class="activity-text">${text}</div><div class="activity-time">${time}</div></div>
    </div>`;
}
