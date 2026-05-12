const folders = {
  '01': { name: '01 Investment', files: [
    { name: 'HD Investment Memo', ver: '—', status: 'current', st: 'Current', date: 'Mar 16', by: 'James Bradley', size: '323 KB', icon: 'xls' },
    { name: 'HD T1a IC Memo (25Feb2026)', ver: '—', status: 'current', st: 'Current', date: 'Feb 25', by: 'Paul', size: '502 KB', icon: 'pdf' },
    { name: 'Crusade Partners DD Checklist', ver: '—', status: 'current', st: 'Current', date: 'Mar 11', by: 'Thomas Budden', size: '160 KB', icon: 'xls' },
  ]},
  '02': { name: '02 Model & Budget', files: [
    { name: 'Ballet UW v5', ver: 'v5', status: 'current', st: 'Current', date: 'Apr 16', by: 'Lillian Chow', size: '4,452 KB', icon: 'xls' },
    { name: 'Ballet UW v4.8.6 - APPROVED', ver: 'v4.8.6', status: 'approved', st: 'Approved', date: 'Apr 16', by: 'Lillian Chow', size: '4,452 KB', icon: 'xls' },
    { name: 'Ballet UW v4.8.6 - sent to Capital Markets', ver: 'v4.8.6', status: 'superseded', st: 'Superseded', date: 'Apr 14', by: 'Lillian Chow', size: '2,898 KB', icon: 'xls' },
    { name: 'Ballet UW v4.8.5', ver: 'v4.8.5', status: 'superseded', st: 'Superseded', date: 'Apr 2', by: 'Lillian Chow', size: '4,448 KB', icon: 'xls' },
    { name: 'Ballet UW v4.8.3', ver: 'v4.8.3', status: 'superseded', st: 'Superseded', date: 'Apr 1', by: 'Lillian Chow', size: '4,449 KB', icon: 'xls' },
    { name: '(DraftResults-v2) GawCapital - SDM', ver: '—', status: 'draft', st: 'Draft', date: 'Apr 1', by: 'James Bradley', size: '1,404 KB', icon: 'xls' },
    { name: 'SF 5 years forecast', ver: '—', status: 'current', st: 'Current', date: 'Mar 18', by: 'Lillian Chow', size: '307 KB', icon: 'xls' },
    { name: '2026 forecast', ver: '—', status: 'current', st: 'Current', date: 'Jan 7', by: 'Lillian Chow', size: '78 KB', icon: 'xls' },
    { name: 'Capex 2026', ver: '—', status: 'current', st: 'Current', date: 'Nov 10', by: 'Spencer', size: '25 KB', icon: 'xls' },
    { name: 'Budget V2', ver: 'V2', status: 'current', st: 'Current', date: 'Nov 10', by: 'Spencer', size: '42 KB', icon: 'xls' },
  ]},
  '03': { name: '03 Gaw Communication', files: [
    { name: 'Board Minutes - Q4 2025', ver: '—', status: 'current', st: 'Current', date: 'Jan 15', by: 'Spencer', size: '245 KB', icon: 'pdf' },
    { name: 'Investor Update - Dec 2025', ver: 'v2', status: 'current', st: 'Current', date: 'Jan 8', by: 'James Bradley', size: '1,200 KB', icon: 'pdf' },
  ]},
  '18': { name: '18 SG Finance', files: [
    { name: 'GTEG Mgmt Accounts Dec 2025', ver: '—', status: 'current', st: 'Current', date: 'Mar 30', by: 'Sharon Chan', size: '89 KB', icon: 'xls' },
    { name: 'GTEG Mgmt Accounts Nov 2025', ver: '—', status: 'current', st: 'Current', date: 'Feb 28', by: 'Sharon Chan', size: '85 KB', icon: 'xls' },
    { name: 'General Ledger Detail (Jan-Jun 2025)', ver: '—', status: 'current', st: 'Current', date: 'Aug 13', by: 'Sharon Chan', size: '2,100 KB', icon: 'xls' },
    { name: 'GST Filing Q4 2025', ver: '—', status: 'current', st: 'Current', date: 'Apr 10', by: 'Jo Chan', size: '156 KB', icon: 'pdf' },
    { name: 'Payroll Summary Dec 2025', ver: '—', status: 'current', st: 'Current', date: 'Jan 5', by: 'Sharon Chan', size: '67 KB', icon: 'xls' },
  ]},
};

const fileDetails = {
  'Ballet UW v5': {
    sheets: 'Front, Consolidated Monthly CF, Returns, DCF, Consolidated Yearly CF, Comps, Schools Monthly CF, Schools Yearly CF, Schools HQ, Tinytots Yearly CF, +8 more',
    versions: [
      { ver: 'v5', date: 'Apr 16, 2026', by: 'Lillian Chow', current: true },
      { ver: 'v4.8.6 — Approved', date: 'Apr 16, 2026', by: 'Lillian Chow' },
      { ver: 'v4.8.5', date: 'Apr 2, 2026', by: 'Lillian Chow' },
      { ver: 'v4.8.3', date: 'Apr 1, 2026', by: 'Lillian Chow' },
      { ver: 'v4.6', date: 'Mar 31, 2026', by: 'Lillian Chow' },
      { ver: 'v4.1', date: 'Mar 26, 2026', by: 'Lillian Chow' },
      { ver: 'v4', date: 'Mar 25, 2026', by: 'Lillian Chow' },
    ]
  }
};

let activeFolder = '02';
let selectedFile = 'Ballet UW v5';
let searchTerm = '';

export function documentsPage() {
  return `<div class="content no-pad"><div class="docs-layout" id="docs-layout">
    ${renderFolderPanel()}
    ${renderFilePanel()}
    ${renderDetailPanel()}
  </div></div>`;
}

function renderFolderPanel() {
  const allFolders = [
    { id: '01', name: '01 Investment' },
    { id: '02', name: '02 Model & Budget', subs: ['School Submitted Budget', 'Archive'] },
    { id: '03', name: '03 Gaw Communication' },
    { id: '04', name: '04 Gaw Finance & Comsec' },
    { id: '05', name: '05 Pitchbook & Marketing' },
    { id: '08', name: '08 Receivership' },
    { id: '09', name: '09 Takeover Process' },
    { id: '10', name: '10 HoldCos' },
    { id: '11', name: '11 Schools' },
    { id: '13', name: '13 Sunflower' },
    { id: '14', name: '14 Tinytots' },
    { id: '16', name: '16 Audit Reports' },
    { id: '17', name: '17 SG Operations' },
    { id: '18', name: '18 SG Finance' },
    { id: '19', name: '19 Bank Admin' },
    { id: '22', name: '22 Sales' },
  ];

  return `
    <div class="folder-panel">
      <h2>Project Folders</h2>
      <input type="text" class="search-box" id="folder-search" placeholder="Search folders..." value="${searchTerm}">
      <ul class="folder-tree">
        ${allFolders.filter(f => !searchTerm || f.name.toLowerCase().includes(searchTerm.toLowerCase())).map(f => {
          const isActive = f.id === activeFolder;
          const hasSubs = f.subs && isActive;
          return `<li>
            <div class="folder ${isActive ? 'active' : ''}" data-folder="${f.id}">
              <span class="chevron">${hasSubs ? '&#9660;' : '&#9654;'}</span>
              <span class="icon">${isActive ? '&#128194;' : '&#128193;'}</span> ${f.name}
            </div>
            ${hasSubs ? `<ul class="sub">${f.subs.map(s => `<li><div class="folder"><span class="chevron">&nbsp;</span><span class="icon">&#128193;</span> ${s}</div></li>`).join('')}</ul>` : ''}
          </li>`;
        }).join('')}
      </ul>
    </div>`;
}

function renderFilePanel() {
  const f = folders[activeFolder] || folders['02'];
  const banner = activeFolder === '02' ? `<div class="version-banner">&#10003; Ballet UW v5 &mdash; Confirmed current as of Apr 16, 2026 by Lillian Chow</div>` : '';
  return `
    <div class="file-panel">
      <div class="file-header">
        <h2>${f.name}</h2>
        <div class="breadcrumb">Project Arts &rsaquo; ${f.name}</div>
      </div>
      ${banner}
      <table class="file-table">
        <thead><tr><th>Name</th><th>Version</th><th>Status</th><th>Modified</th><th>Modified By</th><th>Size</th></tr></thead>
        <tbody>
          ${f.files.map(file => `<tr class="file-row ${file.name === selectedFile ? 'selected-row' : ''}" data-file="${file.name}">
            <td><div class="fname"><div class="ficon ${file.icon}">${file.icon.toUpperCase()}</div> ${file.name}</div></td>
            <td>${file.ver}</td><td><span class="status-badge ${file.status}">${file.st}</span></td>
            <td>${file.date}</td><td>${file.by}</td><td>${file.size}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function renderDetailPanel() {
  const f = folders[activeFolder]?.files.find(f => f.name === selectedFile) || folders['02'].files[0];
  const detail = fileDetails[f.name];

  if (!detail) {
    return `<div class="detail-panel">
      <h3>${f.name}</h3>
      <div class="detail-meta">Microsoft ${f.icon === 'pdf' ? 'PDF' : 'Excel'} &middot; ${f.size}</div>
      <div class="detail-section">
        <div class="label">File Info</div>
        <div style="font-size:12px;color:#4b4b4b;line-height:1.8">
          Modified: ${f.date}<br>By: ${f.by}<br>Status: ${f.st}
        </div>
      </div>
      <div class="detail-section">
        <div class="label">Version History</div>
        <div class="version-timeline">
          <div class="vt-item current"><div class="vt-ver">${f.ver === '—' ? 'v1' : f.ver}</div><div class="vt-meta">${f.date} &middot; ${f.by}</div></div>
        </div>
      </div>
    </div>`;
  }

  return `<div class="detail-panel">
    <h3>${f.name}</h3>
    <div class="detail-meta">Microsoft Excel &middot; ${f.size}</div>
    <div class="detail-section">
      <div class="label">Sheets</div>
      <div style="font-size:12px;color:#4b4b4b;line-height:1.8">${detail.sheets}</div>
    </div>
    <div class="detail-section">
      <div class="label">Version History</div>
      <div class="version-timeline">
        ${detail.versions.map(v => `<div class="vt-item ${v.current ? 'current' : ''}"><div class="vt-ver">${v.ver}</div><div class="vt-meta">${v.date} &middot; ${v.by}</div></div>`).join('')}
      </div>
    </div>
    <div class="confirm-bar" id="confirm-bar">
      <div class="q">Is ${f.ver} the latest version?</div>
      <div class="confirm-btns">
        <button class="btn-yes" id="confirm-yes">&#10003; Yes</button>
        <button class="btn-no" id="confirm-no">No</button>
      </div>
    </div>
  </div>`;
}

function rerender() {
  const layout = document.getElementById('docs-layout');
  if (layout) layout.innerHTML = `${renderFolderPanel()}${renderFilePanel()}${renderDetailPanel()}`;
  bindDocEvents();
}

function bindDocEvents() {
  document.querySelectorAll('.folder[data-folder]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.folder;
      if (folders[id]) {
        activeFolder = id;
        selectedFile = folders[id].files[0]?.name || '';
        rerender();
      }
    });
  });

  document.querySelectorAll('.file-row[data-file]').forEach(el => {
    el.addEventListener('click', () => {
      selectedFile = el.dataset.file;
      rerender();
    });
  });

  document.getElementById('folder-search')?.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    rerender();
    document.getElementById('folder-search')?.focus();
  });

  document.getElementById('confirm-yes')?.addEventListener('click', () => {
    const bar = document.getElementById('confirm-bar');
    if (bar) bar.innerHTML = '<div style="color:#16a34a;font-size:13px;font-weight:600">&#10003; Confirmed as current version</div>';
  });

  document.getElementById('confirm-no')?.addEventListener('click', () => {
    const bar = document.getElementById('confirm-bar');
    if (bar) bar.innerHTML = '<div style="color:#b12b35;font-size:13px;font-weight:600">&#9888; Flagged for review &mdash; notification sent to team</div>';
  });
}

export function initDocuments() {
  bindDocEvents();
}
