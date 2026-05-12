const presetResponses = {
  'irr': {
    q: "What's the current projected IRR for Project Arts?",
    a: `Based on the latest underwriting model (Ballet UW v5, confirmed current as of April 16, 2026), the <strong>projected IRR for Project Arts is 18.4%</strong>.
      <table class="msg-table"><thead><tr><th>Metric</th><th>Value</th></tr></thead><tbody>
        <tr><td>Investment Amount</td><td>US$25.0M</td></tr>
        <tr><td>Current NAV</td><td>US$31.2M</td></tr>
        <tr><td>Projected IRR</td><td>18.4%</td></tr>
        <tr><td>MOIC</td><td>1.6x</td></tr>
        <tr><td>Hold Period</td><td>3.2 years</td></tr>
        <tr><td>WACC</td><td>13.5%</td></tr>
      </tbody></table>
      The DCF valuation uses an S&P approach with a WACC of 13.5%. Revenue is projected to grow from S$12.9M (2026) to S$22.1M (2030), driven primarily by SDM International Pre-school expansion.`,
    source: 'Ballet UW v5 → Returns sheet, DCF sheet'
  },
  'rollup': {
    q: "What rollup targets should we consider for the schools portfolio?",
    a: `Based on the current portfolio composition and Singapore preschool market dynamics, here are <strong>three potential rollup targets</strong> ranked by strategic fit:<br><br>
      <strong>1. MindChamps PreSchool</strong> (SGX-listed)<br>Currently trading at 8.2x EV/EBITDA vs. your portfolio average of 10.1x. 15 centers across Singapore with strong brand recognition in the premium segment. Would complement SDM International's positioning.<br><br>
      <strong>2. Pat's Schoolhouse</strong> (private)<br>8 centers, concentrated in central Singapore. Known for bilingual curriculum. Strong enrollment stability (avg. 92% occupancy). Would provide geographic diversification.<br><br>
      <strong>3. Little Skool-House</strong> (NTUC subsidiary)<br>More complex structurally, but 16 centers with government subsidy advantages. Would significantly scale the portfolio.<br><br>
      <em>Note: These recommendations are based on publicly available market data. Detailed financial analysis would be required before any approach.</em>`,
    source: 'Portfolio entity data, SGX filings, ECDA registry, market research (Q1 2026)'
  },
  'overdue': {
    q: "Which management reports are overdue this month?",
    a: `Currently <strong>2 reports are overdue</strong>:<br><br>
      <table class="msg-table"><thead><tr><th>Entity</th><th>Report</th><th>Due Date</th><th>Days Overdue</th></tr></thead><tbody>
        <tr><td>Global Tots @ East Gate</td><td>March Mgmt Report</td><td>Apr 7, 2026</td><td style="color:#b12b35;font-weight:700">35 days</td></tr>
        <tr><td>Global Tots @ East Gate</td><td>April Mgmt Report</td><td>May 7, 2026</td><td style="color:#b12b35;font-weight:700">5 days</td></tr>
      </tbody></table><br>
      Automated reminders have been sent to Sharon Chan and Jo Chan. Last reminder was escalated on May 8. All other entities are up to date or within the pending window.`,
    source: 'Monitoring data, Alert log'
  },
  'summary': {
    q: "Summarize Project Arts for MP briefing",
    a: `<strong>Project Arts — Ballet: Executive Summary</strong><br><br>
      <strong>Investment Overview:</strong> US$25.0M invested in a Singapore preschool portfolio comprising 6 entities (SDM Childcare, Tinkerland, SDM Ichiban, SDM International, Global Tots x2, Sunflower). Currently in Hold Year 3.<br><br>
      <strong>Performance:</strong> Current NAV of US$31.2M, projected IRR of 18.4% (1.6x MOIC). Revenue on track at S$12.9M for 2026, with growth driven by SDM International expansion and new enrollment capacity.<br><br>
      <strong>Key Highlights:</strong><br>
      • UW Model v5 finalized and confirmed current (Apr 16)<br>
      • IC Memo approved by Investment Committee (Feb 25)<br>
      • Portfolio average occupancy at 87% vs. 91% industry benchmark<br><br>
      <strong>Items Requiring Attention:</strong><br>
      • Global Tots East Gate: March and April management reports overdue (35 and 5 days respectively)<br>
      • SDM International Pre-school flagged "Attention" — enrollment trending below forecast<br>
      • Capex forecast update due May 25<br><br>
      <strong>Strategic Outlook:</strong> Exit timing analysis suggests optimal window in 2028-2029, aligned with projected revenue ramp from SDM International expansion and favorable sector M&A multiples (median 11.3x EV/EBITDA).`,
    source: 'UW Model v5, Monitoring data, Entity performance data, Market research Q1 2026'
  },
  'exit': {
    q: "What's the optimal exit timing for Project Arts?",
    a: `Based on DCF analysis and market conditions, the <strong>optimal exit window is H2 2028 to H1 2029</strong>.<br><br>
      <strong>Key factors:</strong><br><br>
      <table class="msg-table"><thead><tr><th>Factor</th><th>Detail</th></tr></thead><tbody>
        <tr><td>Revenue trajectory</td><td>S$20.5M by 2029 (59% growth from 2026)</td></tr>
        <tr><td>SDM International ramp</td><td>Full capacity expected by mid-2028</td></tr>
        <tr><td>Sector multiples</td><td>Trending up — 11.3x median (2025), projected 12-13x by 2028</td></tr>
        <tr><td>Capex cycle</td><td>Major capex (S$12M school build) completes 2028</td></tr>
        <tr><td>Interest rate environment</td><td>SG rates expected to ease through 2028</td></tr>
      </tbody></table><br>
      Exiting before the SDM International expansion is fully reflected in revenue would leave significant value on the table. Exiting after 2029 risks sector multiple compression as the Singapore childcare market matures.`,
    source: 'Ballet UW v5 → DCF sheet, Comps sheet, Market research'
  },
  'market': {
    q: "What are the key trends in Singapore's preschool market?",
    a: `<strong>Singapore Preschool Market — Key Trends (Q1 2026)</strong><br><br>
      <strong>1. Government Subsidy Expansion</strong><br>MOE increased childcare subsidies by 15% effective Jan 2026, driving enrollment in suburban centers. Direct benefit to SDM and Global Tots entities.<br><br>
      <strong>2. Demographic Tailwinds</strong><br>Singapore birth rate stabilizing at 1.05 (2025), but government pro-natality policies (Baby Bonus enhancement, parental leave extension) expected to support demand through 2028.<br><br>
      <strong>3. Premium Segment Growth</strong><br>International and bilingual preschool fees grew 8.3% YoY vs. 4.2% for standard childcare. SDM International well-positioned in this segment.<br><br>
      <strong>4. Consolidation Accelerating</strong><br>3 acquisitions in Singapore childcare sector in Q1 2026 alone. Strategic buyers (Busy Bees, KinderWorld) actively acquiring 5-15 center platforms — exactly the size of Ballet portfolio.<br><br>
      <strong>5. Workforce Challenges</strong><br>Teacher attrition at 18% industry-wide. Centers investing in retention (avg. 6% salary increases). Portfolio should benchmark staff costs against peers.`,
    source: 'ECDA Annual Report, MOE Policy Updates, SGX filings, Industry surveys'
  },
};

let messages = [
  { role: 'user', text: presetResponses.irr.q },
  { role: 'ai', text: presetResponses.irr.a, source: presetResponses.irr.source },
  { role: 'user', text: presetResponses.rollup.q },
  { role: 'ai', text: presetResponses.rollup.a, source: presetResponses.rollup.source },
];

const suggestedPrompts = [
  { label: 'Summarize Project Arts for MP briefing', key: 'summary' },
  { label: 'Which reports are overdue?', key: 'overdue' },
  { label: 'Exit timing analysis', key: 'exit' },
  { label: 'Singapore preschool market trends', key: 'market' },
];

export function intelligencePage() {
  return `
    <div class="content no-pad">
      <div class="intel-layout">
        <div class="chat-panel">
          <div class="chat-context">
            <div class="dot"></div>
            <div class="clabel">Connected to:</div>
            <div class="tags">
              <span class="tag">Project Arts — Ballet</span>
              <span class="tag">UW Model v5</span>
              <span class="tag">Mgmt Accounts (Dec 2025)</span>
              <span class="tag">Monitoring Data</span>
            </div>
          </div>
          <div class="chat-messages" id="chat-messages">${renderMessages()}</div>
          <div class="suggested" id="suggested-prompts">
            ${suggestedPrompts.filter(p => !messages.find(m => m.text === presetResponses[p.key]?.q)).map(p =>
              `<div class="suggested-chip" data-key="${p.key}">${p.label}</div>`
            ).join('')}
          </div>
          <div class="chat-input-area">
            <input type="text" class="chat-input" id="chat-input" placeholder="Ask about Project Arts...">
            <button class="send-btn" id="send-btn">&#10148;</button>
          </div>
        </div>
        ${renderResearchPanel()}
      </div>
    </div>
  `;
}

function renderMessages() {
  return messages.map(m => {
    if (m.role === 'user') {
      return `<div class="msg user"><div class="msg-bubble">${m.text}</div></div>`;
    }
    return `<div class="msg ai"><div class="msg-bubble">${m.text}</div>${m.source ? `<div class="msg-source"><strong>Source:</strong> ${m.source}</div>` : ''}</div>`;
  }).join('');
}

function renderResearchPanel() {
  return `
    <div class="research-panel">
      <h2>Saved Insights</h2>
      <div class="rp-section-label">Recent Research</div>
      ${insightCard('market', 'Singapore Childcare Market Overview — Q1 2026', 'Total addressable market grew 6.8% YoY to S$3.2B. Government subsidy expansion driving demand in suburban areas.', 'Generated Apr 1, 2026')}
      ${insightCard('competitor', 'Competitor Pricing Analysis — Major SG Operators', 'Average monthly fees increased 4.2% across top-10 operators. Premium segment showing strongest growth.', 'Generated Mar 15, 2026')}
      ${insightCard('exit', 'Education Sector M&A Activity — Asia 2025', '23 transactions closed in APAC education sector. Median EV/EBITDA of 11.3x for childcare platforms.', 'Generated Feb 28, 2026')}
      ${insightCard('operational', 'Enrollment Optimization — Portfolio Benchmark', 'Portfolio average occupancy at 87% vs. industry benchmark of 91%. Three centers below 80% threshold.', 'Generated Feb 15, 2026')}
      <div class="rp-section-label">Scheduled Research</div>
      ${scheduledItem('Singapore childcare market update', 'Next: Jul 1, 2026', 'Quarterly')}
      ${scheduledItem('Competitor pricing changes', 'Next: Jun 1, 2026', 'Monthly')}
      ${scheduledItem('APAC education M&A tracker', 'Next: Jul 1, 2026', 'Quarterly')}
    </div>`;
}

function findResponse(input) {
  const lower = input.toLowerCase();
  if (lower.includes('irr') || lower.includes('return')) return presetResponses.irr;
  if (lower.includes('rollup') || lower.includes('target') || lower.includes('acquisition')) return presetResponses.rollup;
  if (lower.includes('overdue') || lower.includes('report') || lower.includes('missing')) return presetResponses.overdue;
  if (lower.includes('summary') || lower.includes('summarize') || lower.includes('briefing') || lower.includes('mp')) return presetResponses.summary;
  if (lower.includes('exit') || lower.includes('timing') || lower.includes('sell')) return presetResponses.exit;
  if (lower.includes('market') || lower.includes('trend') || lower.includes('singapore') || lower.includes('preschool')) return presetResponses.market;
  return {
    a: `I can help with that. Based on the Project Arts data I have access to, here are the areas I can provide insights on:<br><br>
      • <strong>Financial performance</strong> — IRR, NAV, revenue projections, DCF analysis<br>
      • <strong>Monitoring status</strong> — overdue reports, upcoming deadlines<br>
      • <strong>Market intelligence</strong> — Singapore preschool trends, competitor analysis<br>
      • <strong>Strategic recommendations</strong> — rollup targets, exit timing, operational improvements<br><br>
      Could you be more specific about what you'd like to know?`,
    source: null
  };
}

function addMessage(role, text, source) {
  messages.push({ role, text, source });
  const container = document.getElementById('chat-messages');
  if (!container) return;
  container.innerHTML = renderMessages();
  container.scrollTop = container.scrollHeight;
  // Update suggested prompts
  const sp = document.getElementById('suggested-prompts');
  if (sp) {
    sp.innerHTML = suggestedPrompts.filter(p => !messages.find(m => m.text === presetResponses[p.key]?.q)).map(p =>
      `<div class="suggested-chip" data-key="${p.key}">${p.label}</div>`
    ).join('');
    bindSuggested();
  }
}

function sendMessage(text) {
  if (!text.trim()) return;
  addMessage('user', text);
  // Simulate typing delay
  setTimeout(() => {
    const resp = findResponse(text);
    addMessage('ai', resp.a, resp.source);
  }, 600 + Math.random() * 800);
}

function bindSuggested() {
  document.querySelectorAll('.suggested-chip[data-key]').forEach(chip => {
    chip.addEventListener('click', () => {
      const key = chip.dataset.key;
      const preset = presetResponses[key];
      if (preset) sendMessage(preset.q);
    });
  });
}

export function initIntelligence() {
  const input = document.getElementById('chat-input');
  const btn = document.getElementById('send-btn');

  btn?.addEventListener('click', () => {
    sendMessage(input.value);
    input.value = '';
  });

  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      sendMessage(input.value);
      input.value = '';
    }
  });

  bindSuggested();

  // Scroll to bottom of chat
  const container = document.getElementById('chat-messages');
  if (container) container.scrollTop = container.scrollHeight;

  // Insight card expand/collapse
  document.querySelectorAll('.insight-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('expanded');
    });
  });
}

function insightCard(cat, title, summary, date) {
  return `<div class="insight-card"><div class="ic-cat ${cat}">${cat}</div><div class="ic-title">${title}</div><div class="ic-summary">${summary}</div><div class="ic-date">${date}</div></div>`;
}

function scheduledItem(title, next, freq) {
  return `<div class="scheduled-item"><div><div class="si-title">${title}</div><div class="si-next">${next}</div></div><div class="si-freq">${freq}</div></div>`;
}
