"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Check, Hourglass, Minus, X } from "lucide-react";

type AlertType = "err" | "warn" | "ok";

type AlertItem = {
  type: AlertType;
  text: string;
  time: string;
  read: boolean;
};

type EntityData = {
  name: string;
  mgmt: number[];
  bank: number[];
};

const entitiesSeed: EntityData[] = [
  {
    name: "SDM Childcare (Jurong East)",
    mgmt: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    bank: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  },
  {
    name: "Tinkerland",
    mgmt: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    bank: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  },
  {
    name: "SDM International Pre-school",
    mgmt: [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
    bank: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  },
  {
    name: "Global Tots @ East Gate",
    mgmt: [1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 0],
    bank: [1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0],
  },
  {
    name: "Global Tots @ Mountbatten",
    mgmt: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    bank: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  },
  {
    name: "Sunflower Preschool",
    mgmt: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    bank: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  },
];

const alertsSeed: AlertItem[] = [
  {
    type: "err",
    text: "OVERDUE: April Management Report from Global Tots East Gate is 5 days overdue. Notification sent to AM team.",
    time: "May 12, 2026",
    read: false,
  },
  {
    type: "err",
    text: "OVERDUE: March Management Report from Global Tots East Gate still outstanding. Escalated.",
    time: "May 8, 2026",
    read: false,
  },
  {
    type: "warn",
    text: "REMINDER: April Management Reports due from SDM International Pre-school in 2 days.",
    time: "May 5, 2026",
    read: true,
  },
  {
    type: "ok",
    text: "RECEIVED: April Management Report from SDM Childcare (Jurong East). Auto-filed to 18 SG Finance / Management Accounts.",
    time: "May 3, 2026",
    read: true,
  },
  {
    type: "ok",
    text: "RECEIVED: April Management Report from Sunflower Preschool. Auto-filed.",
    time: "May 2, 2026",
    read: true,
  },
  {
    type: "ok",
    text: "RECEIVED: March Bank Statements consolidated. Auto-filed.",
    time: "Apr 12, 2026",
    read: true,
  },
];

const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];

const cycle = [1, 2, 3, 0] as const;

export default function MonitoringPage() {
  const [entities, setEntities] = useState<EntityData[]>(entitiesSeed);
  const [alertFilter, setAlertFilter] = useState<"all" | "unread" | "overdue">("all");
  const [rules, setRules] = useState([true, true, true, true]);

  const summary = useMemo(() => {
    const received = entities.reduce(
      (sum, entity) =>
        sum +
        entity.mgmt.filter((value) => value === 1).length +
        entity.bank.filter((value) => value === 1).length,
      0,
    );
    const pending = entities.reduce(
      (sum, entity) =>
        sum +
        entity.mgmt.filter((value) => value === 2).length +
        entity.bank.filter((value) => value === 2).length,
      0,
    );
    const overdue = entities.reduce(
      (sum, entity) =>
        sum +
        entity.mgmt.filter((value) => value === 3).length +
        entity.bank.filter((value) => value === 3).length,
      0,
    );
    const total = received + pending + overdue;
    return {
      received,
      pending,
      overdue,
      rate: total > 0 ? Math.round((received / total) * 100) : 0,
    };
  }, [entities]);

  const filteredAlerts = useMemo(() => {
    if (alertFilter === "unread") return alertsSeed.filter((alert) => !alert.read);
    if (alertFilter === "overdue") return alertsSeed.filter((alert) => alert.type === "err");
    return alertsSeed;
  }, [alertFilter]);

  const onCellClick = (entityIndex: number, type: "mgmt" | "bank", monthIndex: number) => {
    setEntities((previous) => {
      const next = [...previous];
      const target = [...next[entityIndex][type]];
      const current = target[monthIndex] as (typeof cycle)[number];
      const nextIndex = (cycle.indexOf(current) + 1) % cycle.length;
      target[monthIndex] = cycle[nextIndex];
      next[entityIndex] = { ...next[entityIndex], [type]: target };
      return next;
    });
  };

  const iconForCell = (value: number) => {
    if (value === 0) return <Minus size={13} />;
    if (value === 1) return <Check size={13} />;
    if (value === 2) return <Hourglass size={13} />;
    return <X size={13} />;
  };

  const classForCell = (value: number) => {
    if (value === 0) return "na";
    if (value === 1) return "received";
    if (value === 2) return "pending";
    return "overdue";
  };

  return (
    <div className="content">
      <div className="page-header">
        <h1>Monitoring & Alerts</h1>
        <div className="sub">
          Track submissions, deadlines, and automated alerts across all portfolio entities
        </div>
      </div>

      <div className="summary-row">
        <div className="summary-card">
          <div className="val green">{summary.received}</div>
          <div className="lbl">Received</div>
        </div>
        <div className="summary-card">
          <div className="val yellow">{summary.pending}</div>
          <div className="lbl">Pending</div>
        </div>
        <div className="summary-card">
          <div className="val red">{summary.overdue}</div>
          <div className="lbl">Overdue</div>
        </div>
        <div className="summary-card">
          <div className="val">{summary.rate}%</div>
          <div className="lbl">On-Time Rate</div>
        </div>
      </div>

      <div className="matrix-panel">
        <h2>
          Monthly Submission Tracker{" "}
          <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 400, marginLeft: 8 }}>
            (click cells to toggle status)
          </span>
        </h2>
        <table className="matrix" id="tracker-matrix">
          <thead>
            <tr>
              <th>Entity / Document</th>
              {months.map((month) => (
                <th key={month}>{month}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="group-header">
              <td colSpan={12}>Management Reports</td>
            </tr>
            {entities.map((entity, entityIndex) => (
              <tr key={`mgmt-${entity.name}`}>
                <td>{entity.name}</td>
                {entity.mgmt.map((value, monthIndex) => (
                  <td key={`mgmt-${entity.name}-${monthIndex}`}>
                    <button
                      className={`cell ${classForCell(value)}`}
                      data-entity={entityIndex}
                      data-month={monthIndex}
                      data-type="mgmt"
                      onClick={() => onCellClick(entityIndex, "mgmt", monthIndex)}
                      type="button"
                    >
                      {iconForCell(value)}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
            <tr className="group-header">
              <td colSpan={12}>Bank Statements</td>
            </tr>
            {entities.map((entity, entityIndex) => (
              <tr key={`bank-${entity.name}`}>
                <td>{entity.name}</td>
                {entity.bank.map((value, monthIndex) => (
                  <td key={`bank-${entity.name}-${monthIndex}`}>
                    <button
                      className={`cell ${classForCell(value)}`}
                      data-entity={entityIndex}
                      data-month={monthIndex}
                      data-type="bank"
                      onClick={() => onCellClick(entityIndex, "bank", monthIndex)}
                      type="button"
                    >
                      {iconForCell(value)}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="panel" style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Lease & License Tracker</h2>
        <table className="file-table">
          <thead>
            <tr>
              <th>Entity</th>
              <th>Item</th>
              <th>Expiry / Renewal</th>
              <th>Days Remaining</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 600 }}>Global Tots @ Mountbatten</td>
              <td>Premises Lease</td>
              <td>Sep 30, 2027</td>
              <td>507</td>
              <td>
                <span className="status-badge attention">Under 18 Months</span>
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600 }}>SDM Childcare (Jurong East)</td>
              <td>Premises Lease</td>
              <td>Dec 31, 2027</td>
              <td>599</td>
              <td>
                <span className="status-badge attention">Under 2 Years</span>
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600 }}>Global Tots @ East Gate</td>
              <td>ECDA License</td>
              <td>Nov 30, 2026</td>
              <td>202</td>
              <td>
                <span className="status-badge critical">Renewal Due</span>
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600 }}>SDM Childcare (Jurong East)</td>
              <td>ECDA License</td>
              <td>Jan 31, 2027</td>
              <td>265</td>
              <td>
                <span className="status-badge attention">Renewal Due</span>
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600 }}>OCBC RCF</td>
              <td>Loan Renewal</td>
              <td>Jun 30, 2026</td>
              <td style={{ color: "#b12b35", fontWeight: 700 }}>49</td>
              <td>
                <span className="status-badge critical">Urgent</span>
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600 }}>SDM International</td>
              <td>ECDA License</td>
              <td>Mar 15, 2027</td>
              <td>308</td>
              <td>
                <span className="status-badge on-track">Active</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bottom-grid">
        <div className="panel">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <div className="section-title" style={{ marginBottom: 0 }}>
              Alert Log
            </div>
            <div className="alert-filters">
              <button
                className={`alert-filter-btn ${alertFilter === "all" ? "active" : ""}`}
                onClick={() => setAlertFilter("all")}
                type="button"
              >
                All
              </button>
              <button
                className={`alert-filter-btn ${alertFilter === "unread" ? "active" : ""}`}
                onClick={() => setAlertFilter("unread")}
                type="button"
              >
                Unread
              </button>
              <button
                className={`alert-filter-btn ${alertFilter === "overdue" ? "active" : ""}`}
                onClick={() => setAlertFilter("overdue")}
                type="button"
              >
                Overdue
              </button>
            </div>
          </div>
          <div id="alert-list">
            {filteredAlerts.length === 0 ? (
              <div style={{ fontSize: 13, color: "#9ca3af", padding: "16px 0" }}>
                No alerts match this filter.
              </div>
            ) : (
              filteredAlerts.map((alert) => (
                <div
                  key={`${alert.time}-${alert.text}`}
                  className={`alert-item ${alert.read ? "read" : ""}`}
                >
                  <div className={`alert-icon ${alert.type}`}>
                    {alert.type === "ok" ? <Check size={14} /> : <AlertTriangle size={14} />}
                  </div>
                  <div>
                    <div className="alert-text">{alert.text}</div>
                    <div className="alert-time">{alert.time}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="panel">
          <div className="section-title">Automation Rules</div>
          {[
            "Monthly Management Report Collection",
            "Monthly Bank Statement Collection",
            "UW Model Version Confirmation",
            "Quarterly Audit Report",
          ].map((title, index) => (
            <div key={title} className="rule-item" style={{ opacity: rules[index] ? 1 : 0.5 }}>
              <div
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <div className="rule-title">{title}</div>
                <label className="toggle-switch">
                  <input
                    checked={rules[index]}
                    onChange={() =>
                      setRules((previous) => {
                        const next = [...previous];
                        next[index] = !next[index];
                        return next;
                      })
                    }
                    type="checkbox"
                  />
                  <span className="toggle-slider" />
                </label>
              </div>
              <div className="rule-detail">
                {index === 0
                  ? "Collect from all entities by 7th of each month. Send reminder on day 3 and day 5 if not received."
                  : index === 1
                    ? "Collect consolidated bank statements by 10th of each month."
                    : index === 2
                      ? "Flag any UW Model version not confirmed as current within 30 days of upload."
                      : "Collect quarterly audit reports from all entities by 15th of month following quarter end."}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
