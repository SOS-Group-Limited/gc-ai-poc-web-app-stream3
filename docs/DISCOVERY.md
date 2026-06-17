# GAW Capital PE Asset Management Tool - Hackathon Discovery Document

**Date:** 2026-05-12
**Status:** Draft - For Discussion

---

## 1. Context: Who Is This For?

**Gaw Capital Partners** is a PE firm (based in Hong Kong) managing a portfolio of assets across Asia. The team we are building for is the **Asset Management (AM) team**, specifically the **HK PE Team**.

The current reference project is **"Ballet" / "Project Arts"** — a portfolio of **preschool and childcare companies in Singapore** (Global Tots, Tinytots, Sunflower, SDM entities, Tinkerland, etc.). This is representative of how all Gaw AM projects are managed.

**Key stakeholders:**

- **Asset Managers (daily users)** — junior to mid-level team members doing the execution work
- **MPs and MDs (senior stakeholders)** — need visibility into current project state without chasing people
- **External counterparties** — portfolio company teams (e.g., Sharon Chan, Jo Chan) who submit financials and reports
- **Crusade Partners** — appears to be a co-investor or partner entity (spencer@crusade-partners.com manages much of the central folder)

---

## 2. The Three Core Pain Points

_Source: Project Management Prompt v2.docx_

### Pain Point 1: Fragmented Information

The AM team manages multiple projects simultaneously. Each project generates two disconnected streams:

- **Documents**: legal docs, financial models, DD reports, IC memos, monitoring updates
- **Communications**: emails, decisions, instructions, ad-hoc requests

These live in different places, owned by different people. The **authoritative state of any project exists only in the head of whoever last worked on it.**

**Four compounding failures:**

| Failure                        | Description                                                                                                                                                      |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Reconstruction cost**        | Re-engaging with a project requires hours of trawling emails, chasing people, re-reading documents before any productive work. Compounds over time and handoffs. |
| **Junior onboarding friction** | New team members can only learn about a deal through informal knowledge transfer from the senior who owns it. Creates a ceiling on contribution speed.           |
| **Ad-hoc task displacement**   | Urgent requests arrive outside any system and default to immediate handling — displacing planned work without any deliberate prioritization.                     |
| **MP/MD visibility gap**       | Senior stakeholders need current state but the latest version of key documents is wherever the last person saved it.                                             |

### Pain Point 2: Controlling & Monitoring

Tracking deadlines and progress across all active projects is entirely manual and person-dependent.

**Two failure modes:**

| Failure                 | Description                                                                                                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Monitoring as a tax** | Team members spend material bandwidth on administrative tracking rather than value creation — checking submissions, following up on documents, chasing deadlines. Scales linearly with portfolio size. |
| **Silent slippage**     | Missed/delayed deadlines don't surface until someone happens to look. In PE, information lags have material consequences for asset management decisions.                                               |

### Pain Point 3: Active Asset Intelligence

The traditional AM function is structurally passive — receive info, monitor against covenants, react when needed. But exit timelines have lengthened, and the universe of relevant information has expanded beyond what any team can manually process.

**Two failure modes:**

| Failure                           | Description                                                                                                                                                               |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Insight scarcity**              | Strategic analysis is capped by available bandwidth. Potential value creation opportunities (rollup targets, sector tailwinds, competitor moves) may never be considered. |
| **Lack of first-mover advantage** | Human-paced information processing consistently lags behind systematic scanning and synthesis.                                                                            |

---

## 3. Proposed Solution Architecture (from prompt doc)

### Component 1: Structured Document Repository

- Single authoritative project record across entire lifecycle
- Version control with current-state visibility
- Principal-visibility layer for MP/MD access
- Version-stamping + periodic team sign-off (preserves human verification without requiring senior chase)

### Component 2: Decision & Action Log

- What was decided, by whom, when
- Reasoning behind key choices preserved and recoverable
- Makes institutional knowledge explicit (solves junior onboarding)

### Component 3: Task Ledger

- Absorbs both planned workstreams and ad-hoc items
- Each ad-hoc item assessed against existing workload before prioritization
- Prevents automatic displacement of planned work

### Component 4: Automated Alerts

- Monitors deadlines, task status, and external submission requirements across portfolio
- Internal: team prompts for approaching deadlines with escalation
- External: automated reminder emails to portfolio companies when submissions overdue
- Triggered by absence of expected inputs (not human memory)

### Component 5: AI Intelligence Layer

- Synthesizes internal project data with external research
- Organic growth: pricing optimization, expansion opportunities, operational benchmarking
- Inorganic growth: rollup targets, exit timing, early warning signals
- Outputs are inputs to human judgment, not decisions

---

## 4. Current Folder Structure (Real Example: Ballet Drive)

### Top-Level Project Folder ("Ballet Drive")

This is the centralized folder for the Ballet/Project Arts portfolio:

```
01 Investment
02 Model & Budget          <-- MOST USED (financial models)
03 Gaw Communication
04 Gaw Finance & Comsec
05 Pitchbook & Marketing Memo
08 Receivership
09 Takeover Process
10 HoldCos
11 Schools
12 Piccadilly
13 Sunflower
14 Tinytots
15 Hampton
16 Audit Reports
17 SG Operations
18 SG Finance              <-- MOST USED (management accounts & financials)
19 Bank Admin
20 Blue Oak Management
21 Ballet Finance Matters - Shared Folder
22 Sales
```

### Folder 02: Model & Budget (Most Used)

Contains the financial underwriting models. Key observations:

- **Heavy versioning**: Ballet UW v1 -> v3.2 -> v4 -> v4.1 -> v4.6 -> v4.8.3 -> v4.8.5 -> v4.8.6 -> v5
- **Version naming is inconsistent**: "v4.8.6 - APPROVED", "v4.8.6 - sent to Capital Markets"
- **Multiple related files**: forecasts, budgets, capex, draft results
- File sizes range from 12 KB (Cashflow) to 4,452 KB (Ballet UW v5)
- Contains a "School Submitted Budget" subfolder and "Archive" folder

### Folder 18: SG Finance (Most Used)

Contains operational finance data from Singapore entities:

```
Backup - SG Finance
Bank
External Filing
Financing & Loan
Forecast
FS (Financial Statements)
General_Ledger_Detail (JAN-JUNE 2025)
GST
HR
Invoices to SG
Letters
Management Accounts      <-- Contains monthly P&L and balance sheets
Management Cashflow
Management Reports
Payment Policy
Payroll
Signature
Signed Forms
Student Deposits
Vendors
General_Ledger_Detail (JAN-JUNE 2025) [second instance]
```

### Central Folder (Deal/Investment Structure)

For each deal/investment, there is a standardized folder hierarchy:

```
_001 Corporate
    _01 Corporate Structure
    _02 Emp. Org. Chart & Key Emp
    _03 IP and TM
    _04 Intro Deck
    _05 SHA, SSA, CT
    _06 CN & Share Issuance
    _07 Incorporation Docs
    _08 BOD

_002 Debt
    _01 Mgt. Financials
    _03 CF In_Out
    _04 Top Partners
    _05 Top Suppliers
    _06 AR and AP
    _07 Bank Statements

_003 Financials
    [Financial statements, audit reports, etc.]

_004 Additional Request
    _11 Company Details
    _15 Receivables & Payables
    _30 FDD_LDD Report
    _31 Investor Report
    _32 Audit Report

_005 Closing Legal Docs
    Conditional Assignment on Bank Account
    Corporate Guarantee - Thailand
    Debenture - HK
    Loan Agreement
    Personal Guarantee
    Termsheet
    Crusade - Funded Risk Participation Agreement
    Intercreditor Deed
    Proposal for Crusade Partners

Also at root level:
    05 HD Investment Memo.xlsx
    05 HD T1a IC Memo (25Feb2026).pdf
    25.12 Crusade Partners DD Checklist
```

---

## 5. Financial Model Structure (Ballet UW v5)

The UW (underwriting) model is the core analytical artifact. Sheet structure:

| Sheet                       | Purpose                                                                                      |
| --------------------------- | -------------------------------------------------------------------------------------------- |
| **Front**                   | Cover/summary page                                                                           |
| **Consolidated Monthly CF** | Monthly cash flows across all entities, SGD-denominated                                      |
| **Returns**                 | Project-level IRR/returns: investment inflows, bridge loans, exit proceeds                   |
| **DCF**                     | Discounted cash flow forecast (S&P approach) with WACC calculation                           |
| **Consolidated Yearly CF**  | Annual roll-up of cash flows                                                                 |
| **Comps**                   | Comparable company analysis (Refinitiv template) — EV/EBITDA, EV/Revenue                     |
| **Schools Monthly CF**      | Entity-level monthly cash flows for school portfolio                                         |
| **Schools Yearly CF**       | Entity-level annual cash flows — revenue by fee type (infant, childcare, enrichment), grants |
| **Schools HQ**              | Headquarter expense allocation for valuation                                                 |
| **Tinytots Yearly CF**      | Tinytots entity annual cash flows                                                            |
| **Sunflower Yrly/Mthly CF** | Sunflower entity cash flows                                                                  |
| **SFWT Loan sch**           | Sunflower loan schedules                                                                     |
| **SF Loan sub-schedules**   | Individual property loan details                                                             |

**Key financial data points tracked:**

- Revenue by entity and fee type (school fees by segment: infant, childcare, international)
- Grants (taxable and non-taxable)
- Capex
- FCFE (Free Cash Flow to Equity)
- DCF valuation with WACC (13.5% indicated)
- FX assumptions (SGD/USD at 1.29)
- Investment of $25M USD
- Hold period analysis with monthly/yearly granularity

## 6. Management Accounts Structure (Global Tots East Gate)

Representative of what portfolio companies submit monthly:

**P&L Statement** (monthly columns Jan-Dec 2025):

- Trading Income: School Fees (by segment), Enrichment, Registration, Grants
- Expenses: Staff costs, rent, utilities, etc.
- Monthly and YTD totals

**Balance Sheet** (point-in-time):

- Bank balances
- Current Assets: AR, intercompany balances
- Fixed Assets
- Liabilities

---

## 7. Dashboard Mockups (from Showcase pptx)

### Main Dashboard

- **Per-project cards** showing: upcoming tasks with deadlines, category tags (Finance, Lease, MGMT Report), latest email/task status
- **Cross-project timeline** showing all upcoming tasks in chronological order
- **Category-based file organization** with tagging (#Finance, #Lease, #Forecast)

### Monitoring Dashboard

- **File tracker matrix**: rows = document types (e.g., Monthly Management Report), columns = months, cells = received/pending
- **Automation rules**: "Send reminder email to [person] if file is not received by [date rule]"
- **Conversation record**: log of automated reminders sent
- **Links to past files** with metadata (date received, from whom, email link)

### Document Version Control

- **Version list** with metadata (date, author, source email)
- **"Is this the latest version?" confirmation** workflow
- **Auto-save to Central Drive** functionality
- **AI chat interface**: "Give me the UW model for Project A" -> returns latest confirmed version

### AI Intelligence

- **Chat interface** connected to project context
- **Automated prompt scheduling** (e.g., quarterly market research generation)
- **Research auto-saved** to project folders
- **Cross-references** internal project status with external market data

### Additional Functions

- **Translation**: Thai, Arabic, Japanese (languages where Gaw has investments)
- **File format handling**: PDF, JPEG extraction
- **NDA and standardized document auto-fill**

---

## 8. Aligned Scope Decisions

Decisions made 2026-05-12:

| Decision                     | Answer                                                                             |
| ---------------------------- | ---------------------------------------------------------------------------------- |
| **MVP Focus**                | Vertical slice across all 3 pain points — go shallow but show the full narrative   |
| **Deliverable Type**         | Hybrid — some features working (AI chat), others mocked/simulated                  |
| **Primary Audience**         | Gaw leadership (MPs/MDs) — realism and relevance to their workflow                 |
| **Timeline**                 | 2-3 days                                                                           |
| **Data**                     | Synthetic but realistic — mirror Ballet structure with anonymized/modified figures |
| **AI Scope**                 | Full vision: project data queries + external research + strategic recommendations  |
| **File Source (real world)** | OneDrive/SharePoint                                                                |
| **Tech Stack**               | Next.js + Vercel                                                                   |
| **Integrations**             | Self-contained — no external API dependencies for demo                             |
| **Alerts**                   | Internal team only                                                                 |
| **Project Count**            | Start with 1, nail the UX, expand later                                            |
| **Project Model**            | Mirror Ballet/Project Arts structure (preschool portfolio in Singapore)            |
| **Demo Takeaway**            | "This is the future" — vision-driven, AI intelligence layer is the wow-factor      |
| **Demo Format**              | 1-minute video pitch + live demo accessible via password-locked demo account       |
| **Auth**                     | No real auth — simple password gate to protect core features for demo viewers      |
| **Team**                     | Jayce (PM) working directly with interns building it — fast feedback cycles        |

---

## 9. MVP Build Plan

### Concept: "Gaw Asset Intelligence Platform"

A vertical slice through one project (Ballet/Project Arts) demonstrating how all three pain points are solved in a single unified platform. The demo narrative is: **"This is what PE asset management looks like when it's powered by intelligence, not spreadsheets."**

### Screen 1: Project Dashboard (Pain Point 1 — Fragmented Information)

**What it shows:** Single authoritative view of the Ballet project

- **Project header**: Project Arts / Ballet — Singapore Preschool Portfolio
- **Entity overview cards**: Schools, Sunflower, Tinytots, Hampton with key metrics (revenue, enrollment, status)
- **Recent activity feed**: simulated log of recent document uploads, decisions, status changes
- **Key documents section**: latest UW model (v5), latest Management Accounts, IC Memo — with version badges and "confirmed current" stamps
- **Folder browser**: mirrors the real Ballet Drive structure (01 Investment through 22 Sales) — clickable but contents are illustrative
- **Decision & action log**: timeline of key decisions with who/when/why

**Working vs. mocked:**

- Folder structure browser: working (navigable)
- Document metadata and version history: working (from seeded data)
- Activity feed: seeded/static
- Decision log: seeded/static

### Screen 2: Monitoring & Alerts (Pain Point 2 — Controlling & Monitoring)

**What it shows:** Deadline tracking and submission monitoring across the portfolio

- **File tracker matrix**: Monthly Management Reports — rows per entity (Global Tots East Gate, Sunflower, Tinytots, etc.), columns per month, cells showing received/pending/overdue
- **Upcoming deadlines panel**: next 30 days of deadlines with status indicators
- **Alert log**: simulated history of internal notifications ("March GTEG Management Report is 5 days overdue — notification sent to AM team")
- **Task ledger**: planned vs. ad-hoc items with prioritization

**Working vs. mocked:**

- Tracker matrix: working (interactive, status toggleable)
- Deadline calculations: working (based on seeded date rules)
- Alert log: seeded/static but realistic
- Task prioritization: UI works, logic is simulated

### Screen 3: AI Intelligence (Pain Point 3 — Active Asset Intelligence)

**What it shows:** Chat interface that connects internal project knowledge with external market intelligence

- **Chat interface**: conversational AI that can answer questions like:
  - "What's the current projected IRR for Ballet?" (pulls from seeded UW model data)
  - "Which management reports are overdue this month?" (pulls from tracker data)
  - "What are the key trends in Singapore's preschool market?" (simulated research)
  - "What rollup targets should we consider for the schools portfolio?" (simulated strategic rec)
  - "Summarize the current state of Project Arts for an MP briefing" (synthesizes all data)
- **Automated prompt panel**: shows scheduled research queries (e.g., "Quarterly: Singapore childcare market update")
- **Research output cards**: pre-generated insight cards that look like AI-generated research saved to the project

**Working vs. mocked:**

- Chat interface: working UI with pre-seeded responses for key queries (no live AI API in demo)
- Prompt scheduling: UI only
- Research cards: seeded/static

### Data to Seed

For the Ballet project, we need synthetic versions of:

1. **Project metadata**: name, entities, hold period, investment amount, current status
2. **Folder structure**: mirror real Ballet Drive (22 folders)
3. **UW model summary data**: IRR, revenue projections, DCF outputs, returns — modified from real figures
4. **Management accounts status**: which entities have submitted for which months
5. **Deadline schedule**: recurring monthly submissions, one-off legal/compliance deadlines
6. **Activity log entries**: ~20 realistic entries (document uploads, decisions, emails received)
7. **Decision log entries**: ~10 key decisions with reasoning
8. **AI chat responses**: 8-10 pre-crafted responses for demo queries

### Tech Architecture

```
Next.js 15 (App Router)
├── app/
│   ├── page.tsx                    # Dashboard (Screen 1)
│   ├── monitoring/page.tsx         # Monitoring (Screen 2)
│   ├── intelligence/page.tsx       # AI Chat (Screen 3)
│   ├── api/                        # API routes for data
│   └── layout.tsx                  # Shared nav/shell
├── components/
│   ├── dashboard/                  # Project cards, folder browser, activity feed
│   ├── monitoring/                 # Tracker matrix, deadline panel, alert log
│   ├── intelligence/               # Chat interface, research cards
│   └── shared/                     # Nav, layout, common UI
├── data/
│   └── seed/                       # All synthetic project data as JSON
└── lib/
    └── types.ts                    # TypeScript types for project data model
```

**UI Framework:** Tailwind CSS + shadcn/ui for polished components
**Deployment:** Vercel
**State:** Client-side (no database needed for demo)

### Demo Flow (3-minute pitch)

1. **Open on Dashboard** (30s): "This is Ballet — everything about this project in one place. No more trawling emails or chasing people."
2. **Click into a document** (20s): Show version history, confirmed-current badge. "The latest UW model is always here, version-stamped, signed off."
3. **Navigate to Monitoring** (40s): Show the tracker matrix. Point to overdue items. "March management report from Global Tots East Gate — the system flagged it 5 days ago. No one had to remember to check."
4. **Navigate to AI Intelligence** (60s): Ask it questions. "What's our projected IRR?" / "What should we be thinking about for exit timing?" Show it synthesize internal data with market context. **This is the "future" moment.**
5. **Close** (30s): "This is one project. Imagine this across every asset in the portfolio. Every document findable. Every deadline tracked. Every strategic insight surfaced before you even think to ask."

---

_Next step: Begin building. Start with the data model and seed data, then screens in order._
