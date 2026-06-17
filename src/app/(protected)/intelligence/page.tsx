"use client";

import { useState } from "react";

type Insight = {
  cat: string;
  title: string;
  summary: string;
  date: string;
};

const insights: Insight[] = [
  {
    cat: "market",
    title: "Singapore Childcare Market Overview - Q1 2026",
    summary:
      "Total addressable market grew 6.8% YoY to S$3.2B. Government subsidy expansion driving demand in suburban areas.",
    date: "Generated Apr 1, 2026",
  },
  {
    cat: "competitor",
    title: "Competitor Pricing Analysis - Major SG Operators",
    summary:
      "Average monthly fees increased 4.2% across top-10 operators. Premium segment showing strongest growth.",
    date: "Generated Mar 15, 2026",
  },
  {
    cat: "exit",
    title: "Education Sector M&A Activity - Asia 2025",
    summary:
      "23 transactions closed in APAC education sector. Median EV/EBITDA of 11.3x for childcare platforms.",
    date: "Generated Feb 28, 2026",
  },
  {
    cat: "operational",
    title: "Enrollment Optimization - Portfolio Benchmark",
    summary:
      "Portfolio average occupancy at 87% vs. industry benchmark of 91%. Three centers below 80% threshold.",
    date: "Generated Feb 15, 2026",
  },
];

export default function IntelligencePage() {
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);

  return (
    <div className="content no-pad">
      <div className="intel-layout">
        <div className="chat-panel" style={{ padding: 0, overflow: "hidden" }}>
          <iframe
            allow="microphone"
            frameBorder="0"
            src="http://gc-dify-poc.eastasia.cloudapp.azure.com/chatbot/DttT8oSIyy7MTCzt"
            style={{ width: "100%", height: "100%", border: "none" }}
            title="Dify Intelligence"
          />
        </div>

        <div className="research-panel">
          <h2>Saved Insights</h2>
          <div className="rp-section-label">Recent Research</div>
          {insights.map((insight) => (
            <button
              key={insight.title}
              className={`insight-card ${expandedInsight === insight.title ? "expanded" : ""}`}
              onClick={() =>
                setExpandedInsight((previous) =>
                  previous === insight.title ? null : insight.title,
                )
              }
              type="button"
            >
              <div className={`ic-cat ${insight.cat}`}>{insight.cat}</div>
              <div className="ic-title">{insight.title}</div>
              <div className="ic-summary">{insight.summary}</div>
              <div className="ic-date">{insight.date}</div>
            </button>
          ))}

          <div className="rp-section-label">External Data Sources</div>
          <div className="ds-item">
            <div className="ds-status connected" />
            <div>
              <div className="ds-name">Refinitiv Workspace</div>
              <div className="ds-desc">Market data, comps, sector multiples</div>
            </div>
            <div className="ds-badge connected">Connected</div>
          </div>
          <div className="ds-item">
            <div className="ds-status pending" />
            <div>
              <div className="ds-name">Bloomberg Terminal</div>
              <div className="ds-desc">Bond pricing, credit data</div>
            </div>
            <div className="ds-badge">Pending</div>
          </div>
          <div className="ds-item">
            <div className="ds-status connected" />
            <div>
              <div className="ds-name">ECDA Registry</div>
              <div className="ds-desc">License status, regulatory filings</div>
            </div>
            <div className="ds-badge connected">Connected</div>
          </div>
          <div className="ds-item">
            <div className="ds-status connected" />
            <div>
              <div className="ds-name">SGX Edge</div>
              <div className="ds-desc">Listed operator financials</div>
            </div>
            <div className="ds-badge connected">Connected</div>
          </div>

          <div className="rp-section-label">Scheduled Research</div>
          <div className="scheduled-item">
            <div>
              <div className="si-title">Singapore childcare market update</div>
              <div className="si-next">Next: Jul 1, 2026</div>
            </div>
            <div className="si-freq">Quarterly</div>
          </div>
          <div className="scheduled-item">
            <div>
              <div className="si-title">Competitor pricing changes</div>
              <div className="si-next">Next: Jun 1, 2026</div>
            </div>
            <div className="si-freq">Monthly</div>
          </div>
          <div className="scheduled-item">
            <div>
              <div className="si-title">APAC education M&A tracker</div>
              <div className="si-next">Next: Jul 1, 2026</div>
            </div>
            <div className="si-freq">Quarterly</div>
          </div>
        </div>
      </div>
    </div>
  );
}
