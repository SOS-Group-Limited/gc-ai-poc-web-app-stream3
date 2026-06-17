"use client";

import { useMemo, useState } from "react";
import { Check, ChevronDown, ChevronRight, Folder, FolderOpen, AlertTriangle } from "lucide-react";

type FileEntry = {
  name: string;
  ver: string;
  status: string;
  st: string;
  date: string;
  by: string;
  size: string;
  icon: "xls" | "pdf";
};

type FolderEntry = {
  name: string;
  files: FileEntry[];
};

type VersionEntry = {
  ver: string;
  date: string;
  by: string;
  current?: boolean;
};

const folders: Record<string, FolderEntry> = {
  "01": {
    name: "01 Investment",
    files: [
      {
        name: "HD Investment Memo",
        ver: "-",
        status: "current",
        st: "Current",
        date: "Mar 16",
        by: "James Bradley",
        size: "323 KB",
        icon: "xls",
      },
      {
        name: "HD T1a IC Memo (25Feb2026)",
        ver: "-",
        status: "current",
        st: "Current",
        date: "Feb 25",
        by: "Paul",
        size: "502 KB",
        icon: "pdf",
      },
      {
        name: "Crusade Partners DD Checklist",
        ver: "-",
        status: "current",
        st: "Current",
        date: "Mar 11",
        by: "Thomas Budden",
        size: "160 KB",
        icon: "xls",
      },
    ],
  },
  "02": {
    name: "02 Model & Budget",
    files: [
      {
        name: "Ballet UW v5",
        ver: "v5",
        status: "current",
        st: "Current",
        date: "Apr 16",
        by: "Lillian Chow",
        size: "4,452 KB",
        icon: "xls",
      },
      {
        name: "Ballet UW v4.8.6 - APPROVED",
        ver: "v4.8.6",
        status: "approved",
        st: "Approved",
        date: "Apr 16",
        by: "Lillian Chow",
        size: "4,452 KB",
        icon: "xls",
      },
      {
        name: "Ballet UW v4.8.6 - sent to Capital Markets",
        ver: "v4.8.6",
        status: "superseded",
        st: "Superseded",
        date: "Apr 14",
        by: "Lillian Chow",
        size: "2,898 KB",
        icon: "xls",
      },
      {
        name: "Ballet UW v4.8.5",
        ver: "v4.8.5",
        status: "superseded",
        st: "Superseded",
        date: "Apr 2",
        by: "Lillian Chow",
        size: "4,448 KB",
        icon: "xls",
      },
      {
        name: "Ballet UW v4.8.3",
        ver: "v4.8.3",
        status: "superseded",
        st: "Superseded",
        date: "Apr 1",
        by: "Lillian Chow",
        size: "4,449 KB",
        icon: "xls",
      },
      {
        name: "(DraftResults-v2) GawCapital - SDM",
        ver: "-",
        status: "draft",
        st: "Draft",
        date: "Apr 1",
        by: "James Bradley",
        size: "1,404 KB",
        icon: "xls",
      },
      {
        name: "SF 5 years forecast",
        ver: "-",
        status: "current",
        st: "Current",
        date: "Mar 18",
        by: "Lillian Chow",
        size: "307 KB",
        icon: "xls",
      },
      {
        name: "2026 forecast",
        ver: "-",
        status: "current",
        st: "Current",
        date: "Jan 7",
        by: "Lillian Chow",
        size: "78 KB",
        icon: "xls",
      },
      {
        name: "Capex 2026",
        ver: "-",
        status: "current",
        st: "Current",
        date: "Nov 10",
        by: "Spencer",
        size: "25 KB",
        icon: "xls",
      },
      {
        name: "Budget V2",
        ver: "V2",
        status: "current",
        st: "Current",
        date: "Nov 10",
        by: "Spencer",
        size: "42 KB",
        icon: "xls",
      },
    ],
  },
  "08": {
    name: "08 SG Legal",
    files: [
      {
        name: "SDM JE Lease Agreement 2022",
        ver: "-",
        status: "current",
        st: "Current",
        date: "Jun 15",
        by: "Legal",
        size: "2,340 KB",
        icon: "pdf",
      },
      {
        name: "Tinkerland Lease Agreement 2023",
        ver: "-",
        status: "current",
        st: "Current",
        date: "Mar 20",
        by: "Legal",
        size: "1,890 KB",
        icon: "pdf",
      },
      {
        name: "NDA - Hampton Group",
        ver: "-",
        status: "pending",
        st: "Pending",
        date: "May 8",
        by: "Spencer",
        size: "45 KB",
        icon: "pdf",
      },
      {
        name: "NDA - Crusade Partners",
        ver: "-",
        status: "current",
        st: "Current",
        date: "Feb 1",
        by: "Thomas Budden",
        size: "42 KB",
        icon: "pdf",
      },
    ],
  },
  "12": {
    name: "12 SG Finance - Loans",
    files: [
      {
        name: "DBS Term Loan Agreement 2023",
        ver: "-",
        status: "current",
        st: "Current",
        date: "Dec 15",
        by: "Legal",
        size: "4,200 KB",
        icon: "pdf",
      },
      {
        name: "OCBC RCF Agreement 2025",
        ver: "-",
        status: "current",
        st: "Current",
        date: "Jun 30",
        by: "Legal",
        size: "2,890 KB",
        icon: "pdf",
      },
      {
        name: "DBS Capex Facility Agreement 2024",
        ver: "-",
        status: "current",
        st: "Current",
        date: "Mar 31",
        by: "Legal",
        size: "3,100 KB",
        icon: "pdf",
      },
      {
        name: "Covenant Compliance Certificate - Q1 2026",
        ver: "-",
        status: "current",
        st: "Current",
        date: "Apr 20",
        by: "Lillian Chow",
        size: "156 KB",
        icon: "pdf",
      },
    ],
  },
};

type FolderNavItem = {
  id: string;
  name: string;
  subs?: string[];
};

const allFolders: FolderNavItem[] = [
  { id: "01", name: "01 Investment" },
  { id: "02", name: "02 Model & Budget", subs: ["School Submitted Budget", "Archive"] },
  { id: "03", name: "03 Gaw Communication" },
  { id: "04", name: "04 Gaw Finance & Comsec" },
  { id: "05", name: "05 Pitchbook & Marketing" },
  { id: "08", name: "08 SG Legal", subs: ["Lease Agreements", "NDAs", "Corporate"] },
  { id: "09", name: "09 Takeover Process" },
  { id: "10", name: "10 HoldCos" },
  { id: "11", name: "11 Schools", subs: ["Licenses", "Enrollment", "Staff"] },
  { id: "12", name: "12 SG Finance - Loans", subs: ["Term Loan", "RCF", "Capex"] },
  { id: "13", name: "13 Sunflower" },
  { id: "14", name: "14 Tinytots" },
  { id: "16", name: "16 Audit Reports" },
  { id: "17", name: "17 SG Operations" },
  { id: "18", name: "18 SG Finance", subs: ["Management Accounts", "Tax", "Payroll"] },
  { id: "19", name: "19 Bank Admin" },
  { id: "22", name: "22 Sales" },
];

const fileDetails: Record<string, { sheets: string; versions: VersionEntry[] }> = {
  "Ballet UW v5": {
    sheets:
      "Front, Consolidated Monthly CF, Returns, DCF, Consolidated Yearly CF, Comps, Schools Monthly CF, Schools Yearly CF, Schools HQ, Tinytots Yearly CF, +8 more",
    versions: [
      { ver: "v5", date: "Apr 16, 2026", by: "Lillian Chow", current: true },
      { ver: "v4.8.6 - Approved", date: "Apr 16, 2026", by: "Lillian Chow" },
      { ver: "v4.8.5", date: "Apr 2, 2026", by: "Lillian Chow" },
      { ver: "v4.8.3", date: "Apr 1, 2026", by: "Lillian Chow" },
      { ver: "v4.6", date: "Mar 31, 2026", by: "Lillian Chow" },
      { ver: "v4.1", date: "Mar 26, 2026", by: "Lillian Chow" },
      { ver: "v4", date: "Mar 25, 2026", by: "Lillian Chow" },
    ],
  },
};

export default function DocumentsPage() {
  const [activeFolder, setActiveFolder] = useState("02");
  const [selectedFile, setSelectedFile] = useState("Ballet UW v5");
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmState, setConfirmState] = useState<"none" | "yes" | "no">("none");

  const activeFolderData = folders[activeFolder] ?? folders["02"];

  const selectedFileData =
    activeFolderData.files.find((entry) => entry.name === selectedFile) ??
    activeFolderData.files[0];

  const selectedDetail = fileDetails[selectedFileData.name];

  const visibleFolders = useMemo(() => {
    return allFolders.filter(
      (folder) =>
        searchTerm.length === 0 || folder.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  return (
    <div className="content no-pad">
      <div className="docs-layout" id="docs-layout">
        <div className="folder-panel">
          <h2>Project Folders</h2>
          <input
            className="search-box"
            id="folder-search"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search folders..."
            type="text"
            value={searchTerm}
          />
          <ul className="folder-tree">
            {visibleFolders.map((folder) => {
              const isActive = folder.id === activeFolder;
              return (
                <li key={folder.id}>
                  <button
                    className={`folder ${isActive ? "active" : ""}`}
                    data-folder={folder.id}
                    onClick={() => {
                      if (folders[folder.id]) {
                        setActiveFolder(folder.id);
                        setSelectedFile(folders[folder.id].files[0]?.name ?? "");
                        setConfirmState("none");
                      }
                    }}
                    type="button"
                  >
                    <span className="chevron">
                      {folder.subs && isActive ? (
                        <ChevronDown size={12} />
                      ) : (
                        <ChevronRight size={12} />
                      )}
                    </span>
                    <span className="icon">
                      {isActive ? <FolderOpen size={15} /> : <Folder size={15} />}
                    </span>
                    {folder.name}
                  </button>
                  {folder.subs && isActive ? (
                    <ul className="sub">
                      {folder.subs.map((sub) => (
                        <li key={sub}>
                          <div className="folder">
                            <span className="chevron">&nbsp;</span>
                            <span className="icon">
                              <Folder size={15} />
                            </span>
                            {sub}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="file-panel">
          <div className="file-header">
            <h2>{activeFolderData.name}</h2>
            <div className="breadcrumb">Project Arts › {activeFolderData.name}</div>
          </div>
          {activeFolder === "02" ? (
            <div className="version-banner">
              <Check size={14} /> Ballet UW v5 - Confirmed current as of Apr 16, 2026 by Lillian
              Chow
            </div>
          ) : null}
          <table className="file-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Version</th>
                <th>Status</th>
                <th>Modified</th>
                <th>Modified By</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              {activeFolderData.files.map((file) => (
                <tr
                  key={file.name}
                  className={`file-row ${file.name === selectedFile ? "selected-row" : ""}`}
                  data-file={file.name}
                  onClick={() => {
                    setSelectedFile(file.name);
                    setConfirmState("none");
                  }}
                >
                  <td>
                    <div className="fname">
                      <div className={`ficon ${file.icon}`}>{file.icon.toUpperCase()}</div>
                      {file.name}
                    </div>
                  </td>
                  <td>{file.ver}</td>
                  <td>
                    <span className={`status-badge ${file.status}`}>{file.st}</span>
                  </td>
                  <td>{file.date}</td>
                  <td>{file.by}</td>
                  <td>{file.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="detail-panel">
          <h3>{selectedFileData.name}</h3>
          <div className="detail-meta">
            Microsoft {selectedFileData.icon === "pdf" ? "PDF" : "Excel"} - {selectedFileData.size}
          </div>

          {selectedDetail ? (
            <>
              <div className="detail-section">
                <div className="label">Sheets</div>
                <div style={{ fontSize: 12, color: "#4b4b4b", lineHeight: 1.8 }}>
                  {selectedDetail.sheets}
                </div>
              </div>
              <div className="detail-section">
                <div className="label">Version History</div>
                <div className="version-timeline">
                  {selectedDetail.versions.map((version) => (
                    <div
                      key={version.ver}
                      className={`vt-item ${version.current ? "current" : ""}`}
                    >
                      <div className="vt-ver">{version.ver}</div>
                      <div className="vt-meta">
                        {version.date} - {version.by}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="confirm-bar" id="confirm-bar">
                {confirmState === "none" ? (
                  <>
                    <div className="q">Is {selectedFileData.ver} the latest version?</div>
                    <div className="confirm-btns">
                      <button
                        className="btn-yes"
                        id="confirm-yes"
                        onClick={() => setConfirmState("yes")}
                        type="button"
                      >
                        <Check size={14} /> Yes
                      </button>
                      <button
                        className="btn-no"
                        id="confirm-no"
                        onClick={() => setConfirmState("no")}
                        type="button"
                      >
                        No
                      </button>
                    </div>
                  </>
                ) : null}
                {confirmState === "yes" ? (
                  <div
                    style={{
                      color: "#16a34a",
                      fontSize: 13,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Check size={14} /> Confirmed as current version
                  </div>
                ) : null}
                {confirmState === "no" ? (
                  <div
                    style={{
                      color: "#b12b35",
                      fontSize: 13,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <AlertTriangle size={14} /> Flagged for review - notification sent to team
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <div className="detail-section">
                <div className="label">File Info</div>
                <div style={{ fontSize: 12, color: "#4b4b4b", lineHeight: 1.8 }}>
                  Modified: {selectedFileData.date}
                  <br />
                  By: {selectedFileData.by}
                  <br />
                  Status: {selectedFileData.st}
                </div>
              </div>
              <div className="detail-section">
                <div className="label">Version History</div>
                <div className="version-timeline">
                  <div className="vt-item current">
                    <div className="vt-ver">
                      {selectedFileData.ver === "-" ? "v1" : selectedFileData.ver}
                    </div>
                    <div className="vt-meta">
                      {selectedFileData.date} - {selectedFileData.by}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
