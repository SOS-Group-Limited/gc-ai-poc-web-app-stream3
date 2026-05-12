import { dashboardPage, initDashboard } from './pages/dashboard.js';
import { documentsPage, initDocuments } from './pages/documents.js';
import { monitoringPage, initMonitoring } from './pages/monitoring.js';
import { intelligencePage, initIntelligence } from './pages/intelligence.js';
import { tasksPage, initTasks } from './pages/tasks.js';

const DEMO_PASSWORD = 'gaw2026';
const app = document.getElementById('app');

function isAuthed() {
  return localStorage.getItem('gaw_authed') === 'true';
}

function navigate(route) {
  window.location.hash = route;
}

function getRoute() {
  return window.location.hash.slice(1) || '/';
}

function renderLogin() {
  app.innerHTML = `
    <div class="login-page">
      <div class="login-card">
        <div class="logo-area">
          <div class="logo-shield">G</div>
          <div class="logo-text">Gaw Capital</div>
          <div class="logo-subtitle">Asset Intelligence Platform</div>
        </div>
        <div class="divider"></div>
        <div class="field-label">Enter access code</div>
        <input type="password" class="password-input" id="pw" placeholder="Access code">
        <button class="login-btn" id="login-btn">Access Platform</button>
        <div class="login-error" id="login-error">Invalid access code. Please try again.</div>
        <div class="footer-text">Gaw Capital Partners &middot; Hackathon 2026</div>
      </div>
    </div>
  `;

  const pw = document.getElementById('pw');
  const btn = document.getElementById('login-btn');
  const err = document.getElementById('login-error');

  function attempt() {
    if (pw.value === DEMO_PASSWORD) {
      localStorage.setItem('gaw_authed', 'true');
      navigate('/dashboard');
      render();
    } else {
      err.style.display = 'block';
      pw.value = '';
      pw.focus();
    }
  }

  btn.addEventListener('click', attempt);
  pw.addEventListener('keydown', (e) => { if (e.key === 'Enter') attempt(); });
  pw.focus();
}

function shell(pageContent, activeNav, topbarSuffix = '') {
  return `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="sidebar-logo">
          <div class="shield">G</div>
          <div class="text">GAW CAPITAL<span>Asset Intelligence</span></div>
        </div>
        <nav class="nav-section">
          <div class="nav-label">Portfolio</div>
          <a class="nav-item ${activeNav === 'dashboard' ? 'active' : ''}" data-nav="dashboard"><span class="nav-icon">&#9638;</span> Dashboard</a>
          <a class="nav-item ${activeNav === 'documents' ? 'active' : ''}" data-nav="documents"><span class="nav-icon">&#128193;</span> Documents</a>
          <a class="nav-item ${activeNav === 'monitoring' ? 'active' : ''}" data-nav="monitoring"><span class="nav-icon">&#128276;</span> Monitoring</a>
          <a class="nav-item ${activeNav === 'intelligence' ? 'active' : ''}" data-nav="intelligence"><span class="nav-icon">&#10024;</span> Intelligence</a>
          <a class="nav-item ${activeNav === 'tasks' ? 'active' : ''}" data-nav="tasks"><span class="nav-icon">&#9745;</span> Tasks</a>
        </nav>
        <nav class="nav-section bottom">
          <a class="nav-item" id="logout-btn"><span class="nav-icon">&#8617;</span> Sign Out</a>
        </nav>
      </aside>
      <div class="main">
        <div class="topbar">
          <div class="topbar-left"><strong>Project Arts</strong> &mdash; Ballet${topbarSuffix}</div>
          <div class="topbar-right">
            <div class="notif-dot">&#128276;<div class="badge">3</div></div>
            <div class="avatar">JB</div>
          </div>
        </div>
        ${pageContent}
      </div>
    </div>
  `;
}

function render() {
  const route = getRoute();

  if (!isAuthed() && route !== '/login') {
    navigate('/login');
    renderLogin();
    return;
  }

  if (route === '/login' || route === '/') {
    if (isAuthed()) {
      navigate('/dashboard');
      render();
      return;
    }
    renderLogin();
    return;
  }

  let pageContent = '';
  let activeNav = '';
  let suffix = '';

  switch (route) {
    case '/dashboard':
      pageContent = dashboardPage();
      activeNav = 'dashboard';
      break;
    case '/documents':
      pageContent = documentsPage();
      activeNav = 'documents';
      suffix = ' &mdash; Documents';
      break;
    case '/monitoring':
      pageContent = monitoringPage();
      activeNav = 'monitoring';
      suffix = ' &mdash; Monitoring';
      break;
    case '/intelligence':
      pageContent = intelligencePage();
      activeNav = 'intelligence';
      suffix = ' &mdash; Intelligence';
      break;
    case '/tasks':
      pageContent = tasksPage();
      activeNav = 'tasks';
      suffix = ' &mdash; Tasks';
      break;
    default:
      navigate('/dashboard');
      render();
      return;
  }

  app.innerHTML = shell(pageContent, activeNav, suffix);

  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => {
      navigate('/' + el.dataset.nav);
      render();
    });
  });

  document.getElementById('logout-btn')?.addEventListener('click', () => {
    localStorage.removeItem('gaw_authed');
    navigate('/login');
    render();
  });

  document.querySelectorAll('.view-all[data-goto]').forEach(el => {
    el.addEventListener('click', () => {
      navigate('/' + el.dataset.goto);
      render();
    });
  });

  // Init page-specific interactivity
  switch (route) {
    case '/dashboard': initDashboard?.(); break;
    case '/documents': initDocuments?.(); break;
    case '/monitoring': initMonitoring?.(); break;
    case '/intelligence': initIntelligence?.(); break;
    case '/tasks': initTasks?.(); break;
  }
}

window.addEventListener('hashchange', render);
render();
