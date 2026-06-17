"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Lease = {
  entity: string;
  type: string;
  address: string;
  expiry: string;
  daysLeft: number;
  landlord: string;
  monthlyRent: string;
  file: string;
};

type License = {
  entity: string;
  type: string;
  number: string;
  expiry: string;
  daysLeft: number;
};

type Loan = {
  name: string;
  bank: string;
  amount: string;
  drawn: string;
  rate: string;
  maturity: string;
  daysLeft: number;
  covenants: string;
  file: string;
};

type Entity = {
  name: string;
  type: string;
  rev: string;
  enroll: string;
  pct: number;
  updated: string;
  status: "on-track" | "attention" | "critical";
  statusText: string;
};

const leases: Lease[] = [
  {
    entity: "SDM Childcare (Jurong East)",
    type: "Lease",
    address: "Blk 135 Jurong East St 13",
    expiry: "Dec 31, 2027",
    daysLeft: 599,
    landlord: "HDB",
    monthlyRent: "S$18,500",
    file: "SDM_JE_Lease_Agreement_2022.pdf",
  },
  {
    entity: "Tinkerland",
    type: "Lease",
    address: "10 Winstedt Rd",
    expiry: "Mar 15, 2028",
    daysLeft: 673,
    landlord: "URA",
    monthlyRent: "S$22,800",
    file: "Tinkerland_Lease_2023.pdf",
  },
  {
    entity: "SDM International",
    type: "Lease",
    address: "321 Alexandra Rd",
    expiry: "Jun 30, 2029",
    daysLeft: 1145,
    landlord: "JTC Corporation",
    monthlyRent: "S$35,200",
    file: "SDM_Intl_Lease_2024.pdf",
  },
  {
    entity: "Global Tots @ East Gate",
    type: "Lease",
    address: "20 East Coast Rd",
    expiry: "Feb 28, 2028",
    daysLeft: 657,
    landlord: "Private",
    monthlyRent: "S$14,600",
    file: "GTEG_Lease_2023.pdf",
  },
  {
    entity: "Global Tots @ Mountbatten",
    type: "Lease",
    address: "15 Mountbatten Rd",
    expiry: "Sep 30, 2027",
    daysLeft: 507,
    landlord: "Private",
    monthlyRent: "S$16,900",
    file: "GTMB_Lease_2022.pdf",
  },
  {
    entity: "Sunflower Preschool",
    type: "Lease",
    address: "88 Bukit Timah Rd",
    expiry: "Aug 31, 2028",
    daysLeft: 842,
    landlord: "SLA",
    monthlyRent: "S$19,700",
    file: "Sunflower_Lease_2023.pdf",
  },
];

const licenses: License[] = [
  {
    entity: "SDM Childcare (Jurong East)",
    type: "ECDA License",
    number: "CC-2024-0892",
    expiry: "Jan 31, 2027",
    daysLeft: 265,
  },
  {
    entity: "SDM International",
    type: "ECDA License",
    number: "PS-2024-0341",
    expiry: "Mar 15, 2027",
    daysLeft: 308,
  },
  {
    entity: "Global Tots @ East Gate",
    type: "ECDA License",
    number: "CC-2023-1205",
    expiry: "Nov 30, 2026",
    daysLeft: 202,
  },
];

const loans: Loan[] = [
  {
    name: "Term Loan Facility",
    bank: "DBS Bank",
    amount: "S$18.5M",
    drawn: "S$18.5M",
    rate: "SORA + 2.25%",
    maturity: "Dec 15, 2028",
    daysLeft: 948,
    covenants: "DSCR > 1.2x, LTV < 65%",
    file: "Ballet_DBS_TermLoan_2023.pdf",
  },
  {
    name: "Revolving Credit Facility",
    bank: "OCBC",
    amount: "S$3.0M",
    drawn: "S$1.8M",
    rate: "SORA + 1.85%",
    maturity: "Jun 30, 2026",
    daysLeft: 49,
    covenants: "Annual review",
    file: "Ballet_OCBC_RCF_2025.pdf",
  },
  {
    name: "Capex Facility",
    bank: "DBS Bank",
    amount: "S$5.0M",
    drawn: "S$3.2M",
    rate: "SORA + 2.50%",
    maturity: "Mar 31, 2029",
    daysLeft: 1054,
    covenants: "Tied to SDM International build-out",
    file: "Ballet_DBS_Capex_2024.pdf",
  },
];

const entities: Entity[] = [
  {
    name: "SDM Childcare Centre (Jurong East)",
    type: "Childcare Centre",
    rev: "S$1,493,672",
    enroll: "142 / 160",
    pct: 89,
    updated: "May 10, 2026",
    status: "on-track",
    statusText: "On Track",
  },
  {
    name: "Tinkerland Private Limited",
    type: "Preschool",
    rev: "S$1,829,672",
    enroll: "165 / 180",
    pct: 92,
    updated: "May 8, 2026",
    status: "on-track",
    statusText: "On Track",
  },
  {
    name: "SDM International Pre-school",
    type: "International Preschool",
    rev: "S$3,450,900",
    enroll: "198 / 220",
    pct: 90,
    updated: "May 9, 2026",
    status: "attention",
    statusText: "Attention",
  },
  {
    name: "Global Tots @ Mountbatten",
    type: "Childcare Centre",
    rev: "S$1,670,550",
    enroll: "88 / 100",
    pct: 88,
    updated: "May 6, 2026",
    status: "on-track",
    statusText: "On Track",
  },
  {
    name: "Global Tots @ East Gate",
    type: "Childcare Centre",
    rev: "S$892,340",
    enroll: "54 / 72",
    pct: 75,
    updated: "Apr 28, 2026",
    status: "critical",
    statusText: "March Report Overdue",
  },
  {
    name: "Sunflower Preschool",
    type: "Preschool",
    rev: "S$2,104,800",
    enroll: "175 / 200",
    pct: 88,
    updated: "May 5, 2026",
    status: "on-track",
    statusText: "On Track",
  },
];

type ContractModal =
  | { mode: "contract"; title: string; details: Lease }
  | { mode: "loan"; title: string; details: Loan }
  | null;

function statusForDays(daysLeft: number): string {
  if (daysLeft < 180) return "critical";
  if (daysLeft < 365) return "attention";
  return "on-track";
}

export default function DashboardPage() {
  const [selectedEntityIndex, setSelectedEntityIndex] = useState<number | null>(null);
  const [contractModal, setContractModal] = useState<ContractModal>(null);

  const selectedEntity =
    selectedEntityIndex !== null && selectedEntityIndex >= 0 ? entities[selectedEntityIndex] : null;

  const selectedLease = useMemo(() => {
    if (!selectedEntity) return null;
    return leases.find((lease) =>
      selectedEntity.name
        .toLowerCase()
        .includes(lease.entity.split(" (")[0].split(" @")[0].toLowerCase()),
    );
  }, [selectedEntity]);

  return (
    <div className="content">
      <div className="project-header">
        <h1>Project Arts - Ballet</h1>
        <div className="subtitle">Singapore Preschool Portfolio - Gaw Capital Partners</div>
        <div className="status">Active - Hold Year 3</div>
      </div>

      <div className="metrics-row">
        <div className="metric-card">
          <div className="value">$25.0M</div>
          <div className="label">Investment Amount</div>
        </div>
        <div className="metric-card">
          <div className="value">$31.2M</div>
          <div className="label">Current NAV</div>
        </div>
        <div className="metric-card">
          <div className="value red">18.4%</div>
          <div className="label">Projected IRR</div>
        </div>
        <div className="metric-card">
          <div className="value">3.2 yrs</div>
          <div className="label">Hold Period</div>
        </div>
      </div>

      <div className="section-title">Portfolio Entities</div>
      <div className="grid-3" id="entity-grid">
        {entities.map((entity, index) => (
          <button
            key={entity.name}
            className={`entity-card ${selectedEntityIndex === index ? "selected" : ""}`}
            onClick={() => setSelectedEntityIndex(index)}
            type="button"
          >
            <div className="name">{entity.name}</div>
            <div className="type">{entity.type} - Singapore</div>
            <div className="metric-row">
              <span className="k">YTD Revenue</span>
              <span className="v">{entity.rev}</span>
            </div>
            <div className="metric-row">
              <span className="k">Enrollment</span>
              <span className="v">{entity.enroll}</span>
            </div>
            <div className="metric-row">
              <span className="k">Last Updated</span>
              <span className="v">{entity.updated}</span>
            </div>
            <div className={`status-badge ${entity.status}`}>{entity.statusText}</div>
          </button>
        ))}
      </div>

      <div id="entity-drawer" className={`entity-drawer ${selectedEntity ? "" : "hidden"}`}>
        <div className="drawer-header">
          <h3 id="drawer-title">{selectedEntity?.name}</h3>
          <button
            className="drawer-close"
            id="drawer-close"
            onClick={() => setSelectedEntityIndex(null)}
            type="button"
          >
            ×
          </button>
        </div>
        {selectedEntity ? (
          <div id="drawer-body">
            <div className="drawer-meta">{selectedEntity.type} - Singapore</div>
            <div className="drawer-stats">
              <div className="drawer-stat">
                <div className="drawer-stat-val">{selectedEntity.rev}</div>
                <div className="drawer-stat-lbl">YTD Revenue</div>
              </div>
              <div className="drawer-stat">
                <div className="drawer-stat-val">{selectedEntity.enroll}</div>
                <div className="drawer-stat-lbl">Enrollment</div>
              </div>
              <div className="drawer-stat">
                <div className="drawer-stat-val">{selectedEntity.pct}%</div>
                <div className="drawer-stat-lbl">Occupancy</div>
                <div className="occupancy-bar">
                  <div
                    className={`occupancy-fill ${selectedEntity.pct >= 85 ? "ok" : selectedEntity.pct >= 75 ? "warn" : "low"}`}
                    style={{ width: `${selectedEntity.pct}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="drawer-section">
              <div className="drawer-section-title">Lease Details</div>
              {selectedLease ? (
                <>
                  <div style={{ fontSize: 12, marginBottom: 4 }}>
                    <strong>Address:</strong> {selectedLease.address}
                  </div>
                  <div style={{ fontSize: 12, marginBottom: 4 }}>
                    <strong>Landlord:</strong> {selectedLease.landlord}
                  </div>
                  <div style={{ fontSize: 12, marginBottom: 4 }}>
                    <strong>Rent:</strong> {selectedLease.monthlyRent}/mo
                  </div>
                  <div style={{ fontSize: 12 }}>
                    <strong>Expiry:</strong>{" "}
                    <span className={`tc-due ${selectedLease.daysLeft < 365 ? "soon" : ""}`}>
                      {selectedLease.expiry} ({selectedLease.daysLeft} days)
                    </span>
                  </div>
                </>
              ) : (
                <div style={{ fontSize: 12, color: "#9ca3af" }}>No lease data</div>
              )}
            </div>
          </div>
        ) : null}
      </div>

      <div className="grid-2">
        <div className="panel">
          <div className="section-title">Key Documents</div>
          <div className="doc-row">
            <div className="doc-info">
              <div className="doc-icon excel">XLS</div>
              <div>
                <div className="doc-name">Ballet UW v5</div>
                <div className="doc-meta">Apr 16, 2026 - Lillian Chow - 4,452 KB</div>
              </div>
            </div>
            <div className="status-badge current">Confirmed</div>
          </div>
          <Link className="view-all" href="/documents">
            View all documents →
          </Link>
        </div>
        <div>
          <div className="panel" style={{ marginBottom: 24 }}>
            <div className="section-title">Upcoming Deadlines</div>
            <div className="deadline-item">
              <div className="deadline-info">
                <div className="dl-title">Apr Management Report</div>
                <div className="dl-entity">Global Tots East Gate</div>
              </div>
              <div className="dl-date overdue">Overdue</div>
            </div>
            <Link className="view-all" href="/monitoring">
              View all →
            </Link>
          </div>
        </div>
      </div>

      <div className="panel" style={{ marginBottom: 24 }}>
        <div className="section-title">Contracts & Leases</div>
        <table className="file-table">
          <thead>
            <tr>
              <th>Entity</th>
              <th>Type</th>
              <th>Address / Details</th>
              <th>Expiry</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {leases.map((lease) => (
              <tr key={lease.file} className="lease-row">
                <td style={{ fontWeight: 600 }}>{lease.entity}</td>
                <td>
                  <span className="status-badge info">{lease.type}</span>
                </td>
                <td style={{ fontSize: 12, color: "#5d6567" }}>{lease.address}</td>
                <td>
                  <span
                    className={`tc-due ${lease.daysLeft < 365 ? "soon" : ""} ${lease.daysLeft < 180 ? "overdue" : ""}`}
                  >
                    {lease.expiry}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${statusForDays(lease.daysLeft)}`}>
                    {lease.daysLeft < 180
                      ? "Expiring Soon"
                      : lease.daysLeft < 365
                        ? "Under 1 Year"
                        : "Active"}
                  </span>
                </td>
                <td>
                  <button
                    className="view-contract-btn"
                    onClick={() =>
                      setContractModal({
                        mode: "contract",
                        title: `${lease.entity} - ${lease.type}`,
                        details: lease,
                      })
                    }
                    type="button"
                  >
                    View PDF
                  </button>
                </td>
              </tr>
            ))}
            {licenses.map((license) => (
              <tr key={license.number} className="lease-row">
                <td style={{ fontWeight: 600 }}>{license.entity}</td>
                <td>
                  <span className="status-badge approved">{license.type}</span>
                </td>
                <td style={{ fontSize: 12, color: "#5d6567" }}>{license.number}</td>
                <td>
                  <span className={`tc-due ${license.daysLeft < 365 ? "soon" : ""}`}>
                    {license.expiry}
                  </span>
                </td>
                <td>
                  <span
                    className={`status-badge ${license.daysLeft < 365 ? "attention" : "on-track"}`}
                  >
                    {license.daysLeft < 365 ? "Renewal Due" : "Active"}
                  </span>
                </td>
                <td />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="panel" style={{ marginBottom: 24 }}>
        <div className="section-title">Project Loan Details</div>
        <div className="loans-grid">
          {loans.map((loan) => (
            <div key={loan.file} className="loan-card">
              <div className="loan-header">
                <div>
                  <div className="loan-name">{loan.name}</div>
                  <div className="loan-bank">{loan.bank}</div>
                </div>
                <span className={`status-badge ${statusForDays(loan.daysLeft)}`}>
                  {loan.daysLeft < 90
                    ? "Due Soon"
                    : loan.daysLeft < 365
                      ? "Under 1 Year"
                      : "Active"}
                </span>
              </div>
              <div className="loan-details">
                <div className="loan-detail">
                  <span className="loan-label">Facility</span>
                  <span className="loan-val">{loan.amount}</span>
                </div>
                <div className="loan-detail">
                  <span className="loan-label">Drawn</span>
                  <span className="loan-val">{loan.drawn}</span>
                </div>
                <div className="loan-detail">
                  <span className="loan-label">Rate</span>
                  <span className="loan-val">{loan.rate}</span>
                </div>
                <div className="loan-detail">
                  <span className="loan-label">Maturity</span>
                  <span className="loan-val">{loan.maturity}</span>
                </div>
              </div>
              <button
                className="view-contract-btn"
                onClick={() =>
                  setContractModal({
                    mode: "loan",
                    title: `${loan.name} - ${loan.bank}`,
                    details: loan,
                  })
                }
                style={{ marginTop: 12 }}
                type="button"
              >
                View Loan Agreement
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={`modal-overlay ${contractModal ? "" : "hidden"}`} id="contract-modal">
        <div className="modal-card" style={{ width: 560 }}>
          <div className="modal-header">
            <h3 id="contract-modal-title">{contractModal?.title ?? "Contract Details"}</h3>
            <button
              className="drawer-close"
              id="contract-modal-close"
              onClick={() => setContractModal(null)}
              type="button"
            >
              ×
            </button>
          </div>
          <div className="modal-body" id="contract-modal-body">
            {contractModal?.mode === "contract" ? (
              <div className="contract-detail-grid">
                <div className="contract-field">
                  <div className="contract-field-label">Property Address</div>
                  <div className="contract-field-val">{contractModal.details.address}</div>
                </div>
                <div className="contract-field">
                  <div className="contract-field-label">Landlord</div>
                  <div className="contract-field-val">{contractModal.details.landlord}</div>
                </div>
                <div className="contract-field">
                  <div className="contract-field-label">Monthly Rent</div>
                  <div className="contract-field-val">{contractModal.details.monthlyRent}</div>
                </div>
                <div className="contract-field">
                  <div className="contract-field-label">Lease Expiry</div>
                  <div className="contract-field-val">{contractModal.details.expiry}</div>
                </div>
              </div>
            ) : null}
            {contractModal?.mode === "loan" ? (
              <div className="contract-detail-grid">
                <div className="contract-field">
                  <div className="contract-field-label">Facility Amount</div>
                  <div className="contract-field-val">{contractModal.details.amount}</div>
                </div>
                <div className="contract-field">
                  <div className="contract-field-label">Amount Drawn</div>
                  <div className="contract-field-val">{contractModal.details.drawn}</div>
                </div>
                <div className="contract-field">
                  <div className="contract-field-label">Interest Rate</div>
                  <div className="contract-field-val">{contractModal.details.rate}</div>
                </div>
                <div className="contract-field">
                  <div className="contract-field-label">Maturity Date</div>
                  <div className="contract-field-val">{contractModal.details.maturity}</div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
