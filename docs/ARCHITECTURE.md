# Architecture & Feature Specification

**Project:** Gaw Asset Intelligence Platform (Hackathon MVP)
**Stack:** Next.js 15 (App Router) + Tailwind CSS + shadcn/ui + Vercel
**Date:** 2026-05-12

---

## 1. System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    BROWSER (Client)                      │
│                                                         │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │ Dashboard │  │  Monitoring  │  │  AI Intelligence │  │
│  │ (Screen 1)│  │  (Screen 2)  │  │   (Screen 3)     │  │
│  └─────┬─────┘  └──────┬───────┘  └────────┬─────────┘  │
│        │               │                    │            │
│  ┌─────┴───────────────┴────────────────────┴─────────┐ │
│  │              Shared Layout / Shell                  │ │
│  │         (Sidebar Nav + Top Bar + Auth Gate)         │ │
│  └─────────────────────┬───────────────────────────────┘ │
│                        │                                 │
└────────────────────────┼─────────────────────────────────┘
                         │
                    ┌────┴────┐
                    │ API     │
                    │ Routes  │
                    └────┬────┘
                         │
              ┌──────────┴──────────┐
              │  JSON Seed Data     │
              │  (No Database)      │
              └─────────────────────┘
```

There is no database. All data lives as static JSON in `/data/seed/` and is served via Next.js API routes. This keeps the demo self-contained, fast, and deployable to Vercel with zero infrastructure.

---

## 2. Authentication (Password Gate)

No real auth system. Simple password gate:

- On first visit, user sees a login screen with password input
- Password is checked client-side against an environment variable
- On success, a cookie/localStorage flag is set
- All pages check this flag; if missing, redirect to login
- The login screen doubles as a branded landing page

**Implementation:**
- `app/login/page.tsx` — password input + branding
- `lib/auth.ts` — `isAuthenticated()` check (reads localStorage)
- `components/shared/AuthGate.tsx` — wrapper component that redirects if not authed
- Password stored in `.env.local` as `NEXT_PUBLIC_DEMO_PASSWORD`

---

## 3. App Shell & Navigation

### Layout
- **Sidebar** (left, collapsible): primary navigation
- **Top bar**: project selector (future: switch between projects), user avatar placeholder, notifications bell
- **Main content area**: full width, scrollable

### Sidebar Navigation Items
```
[Logo: Gaw Asset Intelligence]

── Dashboard           (overview of the project)
── Documents           (folder browser + version control)
── Monitoring          (deadline tracker + alert log)
── Intelligence        (AI chat + research)
── Tasks               (task ledger — planned vs ad-hoc)
── Settings            (placeholder)
```

### Responsive Behavior
- Desktop: sidebar always visible
- Tablet: sidebar collapsible
- Mobile: bottom nav or hamburger (low priority for demo)

---

## 4. Screen Specifications

### Screen 1: Dashboard (`/`)

**Purpose:** Single authoritative view of the project. First thing leadership sees.

#### Components:

**A. Project Header**
- Project name: "Project Arts — Ballet"
- Description: "Singapore Preschool Portfolio"
- Status badge: "Active — Hold Year 3"
- Key metrics row: Investment Amount | Current NAV | Projected IRR | Hold Period

**B. Entity Overview Cards** (grid of 4-6 cards)
Each card represents a portfolio entity:
- Entity name (e.g., "Global Tots East Gate")
- Revenue (latest month or YTD)
- Enrollment/occupancy metric
- Status indicator (on track / attention needed / critical)
- Last updated date
- Click → opens entity detail (future, not in MVP)

Entities to seed:
1. SDM Childcare Centre (Jurong East)
2. Tinkerland
3. SDM Ichiban Preschool
4. SDM Childcare Centre
5. SDM International Pre-school
6. Global Tots @ Mountbatten

**C. Key Documents Panel**
- Shows 3-5 most important documents with:
  - Document name + version badge (e.g., "UW Model v5")
  - Status: "Confirmed Current" / "Draft" / "Under Review"
  - Last modified date + by whom
  - Quick-view button
- "View all documents →" link to Documents screen

**D. Recent Activity Feed** (right side or below)
- Timeline of recent events:
  - "UW Model v5 uploaded by Lillian Chow — Apr 16"
  - "March Management Report received from Global Tots East Gate — Apr 8"
  - "IC Memo approved by Paul — Feb 25"
  - "Budget V2 submitted for review — Nov 10"
- Filterable by category (Documents, Decisions, Tasks, Communications)

**E. Upcoming Deadlines Widget**
- Next 5 upcoming deadlines
- Color-coded: green (on track), yellow (approaching), red (overdue)
- Links to Monitoring screen

---

### Screen 2: Documents (`/documents`)

**Purpose:** Structured document repository with version control. Replaces the OneDrive folder chaos.

#### Components:

**A. Folder Browser** (left panel, ~30% width)
- Tree view mirroring Ballet Drive structure:
  ```
  📁 01 Investment
  📁 02 Model & Budget
  📁 03 Gaw Communication
  📁 04 Gaw Finance & Comsec
  📁 05 Pitchbook & Marketing Memo
  📁 08 Receivership
  📁 09 Takeover Process
  📁 10 HoldCos
  📁 11 Schools
  📁 12 Piccadilly
  📁 13 Sunflower
  📁 14 Tinytots
  📁 15 Hampton
  📁 16 Audit Reports
  📁 17 SG Operations
  📁 18 SG Finance
  📁 19 Bank Admin
  📁 20 Blue Oak Management
  📁 21 Ballet Finance Matters
  📁 22 Sales
  ```
- Expandable subfolders (at least 2 levels deep for key folders)
- Click folder → shows contents in right panel

**B. File List** (right panel, ~70% width)
- Table view of files in selected folder:
  - Name | Version | Status | Modified | Modified By | Size
- Status badges: Current, Draft, Archived, Under Review
- Sort by any column
- Search/filter bar at top

**C. Document Detail Modal** (on file click)
- Document metadata: name, type, size, created date
- **Version history timeline**: shows all versions with date, author, status
- **Version confirmation**: "Is this the latest version?" with confirm/deny buttons
- **Related documents**: links to other documents in the same workflow
- Download button (simulated)

**D. Version Control Banner**
- At top of file list, when a document has a confirmed-current version:
  - "✓ UW Model v5 — Confirmed current as of Apr 16, 2026 by Lillian Chow"
- When overdue for confirmation:
  - "⚠ UW Model v5 — Last confirmed 45 days ago. Confirm?"

---

### Screen 3: Monitoring (`/monitoring`)

**Purpose:** Deadline tracking and submission monitoring. Replaces manual chasing.

#### Components:

**A. File Tracker Matrix** (main content, full width)
- Table layout:
  - Rows: document types that are expected regularly (Monthly Management Report, Monthly Cashflow, Bank Statements, GST Filing, Payroll Summary)
  - Sub-rows: per entity (Global Tots East Gate, Tinkerland, SDM Childcare, etc.)
  - Columns: months (Jan 2025 → current month)
  - Cells: ✓ received (green) | ⏳ pending (yellow) | ✗ overdue (red) | — not expected (gray)
- Click a cell → shows document details if received, shows overdue info if not
- Sticky first column (document name) and header row (months)

**B. Deadline Panel** (right sidebar or below matrix)
- Upcoming deadlines in next 30 days:
  - "Apr Management Report — Global Tots East Gate — Due May 7"
  - "Q1 2026 Audit Report — All entities — Due May 15"
  - "Capex Forecast Update — Due May 20"
- Status: on track / at risk / overdue
- Assignee shown

**C. Alert Log** (expandable section below)
- History of alerts sent:
  - "May 8 — Alert: March Management Report from Global Tots East Gate is 5 days overdue. Notification sent to AM team."
  - "May 3 — Reminder: March Management Report due from Global Tots East Gate in 4 days."
  - "Apr 10 — Alert: February financials received from Tinkerland. Auto-filed to 18 SG Finance/FS."
- Filter by entity, alert type, date range

**D. Automation Rules Panel** (collapsible)
- Shows configured rules:
  - "Collect Monthly Management Report from all entities by 7th of each month"
  - "Collect Bank Statements from all entities by 10th of each month"
  - "Flag any UW Model not confirmed within 30 days"
- Each rule shows: trigger, action, last fired, status

---

### Screen 4: Intelligence (`/intelligence`)

**Purpose:** AI-powered insights. The "this is the future" screen.

#### Components:

**A. Chat Interface** (main content, ~65% width)
- Message input at bottom with send button
- Chat history with user/AI message bubbles
- AI responses include:
  - Rich text formatting
  - Inline data tables when answering financial queries
  - Source citations ("Based on UW Model v5, Sheet: Returns")
  - Action suggestions ("Would you like me to schedule a quarterly update?")

**Pre-seeded conversations / suggested prompts:**
1. "What's the current projected IRR for Project Arts?"
2. "Summarize the financial performance of Global Tots East Gate for 2025"
3. "Which management reports are overdue this month?"
4. "What are the key trends in Singapore's preschool market?"
5. "What rollup targets should we consider for the schools portfolio?"
6. "Prepare an executive summary of Project Arts for the MP briefing"

**B. Research Panel** (right sidebar, ~35% width)
- **Saved Insights**: pre-generated research cards
  - "Singapore Childcare Market Overview — Q1 2026"
  - "Competitor Analysis: Major Pre-school Operators in SG"
  - "Exit Timing Analysis: Education Sector M&A Activity"
- Each card shows: title, date generated, summary preview, click to expand
- **Scheduled Prompts**: shows recurring AI research tasks
  - "Quarterly: Singapore childcare market update" — Next run: Jul 2026
  - "Monthly: Competitor pricing changes" — Next run: Jun 2026

**C. Context Indicator** (top of chat)
- Shows what data the AI has access to:
  - "Connected to: Project Arts — Ballet"
  - "Data sources: UW Model v5, Management Accounts (Dec 2025), Monitoring Data"
- Visual indicator that the AI is grounded in project data, not hallucinating

---

### Screen 5: Tasks (`/tasks`)

**Purpose:** Task ledger that absorbs both planned work and ad-hoc requests.

#### Components:

**A. Task Board** (Kanban-style or list view, toggleable)
- Columns: To Do | In Progress | Blocked | Done
- Each task card shows:
  - Title
  - Priority badge (P1/P2/P3)
  - Category tag (Finance, Legal, Operations, DD)
  - Due date
  - Assignee
  - Source badge: "Planned" (blue) or "Ad-hoc" (orange)

**B. Quick Add** (top bar)
- "Add task" button opens modal with:
  - Title, description, due date, assignee, category, priority
  - Explicit "Planned vs Ad-hoc" toggle

**C. Workload View** (secondary tab)
- Shows current task load per team member
- When an ad-hoc task is added, highlights the impact:
  - "Adding this task will push [other task] past its deadline. Proceed?"
- This is the deliberate prioritization the prompt doc describes

**Seeded tasks:**
- P1: Finalize UW Model v5 for Capital Markets submission (Planned, Due May 15)
- P1: Review March Management Accounts — all entities (Planned, Due May 10)
- P2: Prepare Q1 Investor Report (Planned, Due May 30)
- P2: Update capex forecast for 2026 (Planned, Due May 20)
- P3: Collect signed NDA from Hampton (Ad-hoc, Due May 12)
- P3: Translate Thai corporate documents for DD checklist (Ad-hoc, Due May 18)

---

## 5. Data Model

### Core Types

```typescript
// Project
interface Project {
  id: string;
  name: string;           // "Project Arts — Ballet"
  description: string;    // "Singapore Preschool Portfolio"
  status: "active" | "closing" | "exited";
  holdPeriod: number;     // years
  investmentAmount: number;
  currency: string;
  currentNAV: number;
  projectedIRR: number;
  entities: Entity[];
}

// Portfolio Entity
interface Entity {
  id: string;
  name: string;           // "Global Tots @ East Gate"
  type: string;           // "childcare_centre"
  location: string;       // "Singapore"
  status: "on_track" | "attention" | "critical";
  revenue: { ytd: number; lastMonth: number };
  enrollment: { current: number; capacity: number };
  lastUpdated: string;    // ISO date
}

// Folder / File Structure
interface Folder {
  id: string;
  name: string;           // "02 Model & Budget"
  parentId: string | null;
  children: (Folder | Document)[];
}

interface Document {
  id: string;
  name: string;           // "Ballet UW v5"
  type: "excel" | "pdf" | "word" | "powerpoint";
  size: string;           // "4,452 KB"
  currentVersion: string; // "v5"
  status: "current" | "draft" | "under_review" | "archived";
  confirmedBy: string | null;
  confirmedAt: string | null;
  versions: DocumentVersion[];
  folderId: string;
}

interface DocumentVersion {
  version: string;
  uploadedAt: string;
  uploadedBy: string;
  sourceEmail: string | null;
  status: "current" | "superseded" | "draft";
  size: string;
}

// Monitoring
interface MonitoringRule {
  id: string;
  documentType: string;   // "Monthly Management Report"
  entities: string[];     // which entities must submit
  frequency: "monthly" | "quarterly" | "annual";
  dueDay: number;         // day of month/quarter
  reminderDays: number[]; // days before due to remind
}

interface SubmissionRecord {
  id: string;
  ruleId: string;
  entityId: string;
  period: string;         // "2025-12" or "Q1-2026"
  status: "received" | "pending" | "overdue";
  receivedAt: string | null;
  receivedFrom: string | null;
  documentId: string | null;
}

interface Alert {
  id: string;
  type: "reminder" | "overdue" | "received" | "confirmation_needed";
  message: string;
  timestamp: string;
  ruleId: string;
  entityId: string;
  read: boolean;
}

// Tasks
interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "blocked" | "done";
  priority: "P1" | "P2" | "P3";
  category: "finance" | "legal" | "operations" | "dd" | "reporting";
  source: "planned" | "adhoc";
  dueDate: string;
  assignee: string;
  createdAt: string;
  projectId: string;
}

// Activity Log
interface ActivityEntry {
  id: string;
  type: "document_upload" | "decision" | "task_update" | "alert" | "communication";
  title: string;
  description: string;
  timestamp: string;
  actor: string;
  projectId: string;
  linkedDocumentId?: string;
  linkedTaskId?: string;
}

// AI Chat
interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  sources?: string[];     // document references cited
}

interface SavedInsight {
  id: string;
  title: string;
  summary: string;
  fullContent: string;
  generatedAt: string;
  category: "market" | "competitor" | "exit" | "operational";
  projectId: string;
}
```

---

## 6. API Routes

All routes serve from static JSON seed data. No database.

```
GET  /api/project                    → Project with entities
GET  /api/documents?folderId=x       → Documents in folder
GET  /api/documents/:id              → Document detail with versions
GET  /api/folders                    → Full folder tree
GET  /api/monitoring/matrix          → Submission tracker matrix data
GET  /api/monitoring/deadlines       → Upcoming deadlines
GET  /api/monitoring/alerts          → Alert log
GET  /api/tasks                      → All tasks
POST /api/tasks                      → Create task (writes to in-memory store)
PATCH /api/tasks/:id                 → Update task status
GET  /api/activity                   → Activity feed entries
POST /api/chat                       → Chat endpoint (returns pre-seeded responses)
GET  /api/insights                   → Saved research insights
```

---

## 7. File Structure

```
gaw-hack/
├── docs/
│   ├── DISCOVERY.md
│   ├── ARCHITECTURE.md
│   └── DESIGN.md                    # Visual design system
│
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout with sidebar + auth gate
│   │   ├── page.tsx                 # Dashboard
│   │   ├── login/
│   │   │   └── page.tsx             # Password gate
│   │   ├── documents/
│   │   │   └── page.tsx             # Document browser
│   │   ├── monitoring/
│   │   │   └── page.tsx             # Monitoring matrix + alerts
│   │   ├── intelligence/
│   │   │   └── page.tsx             # AI chat + research
│   │   ├── tasks/
│   │   │   └── page.tsx             # Task ledger
│   │   └── api/
│   │       ├── project/route.ts
│   │       ├── documents/route.ts
│   │       ├── folders/route.ts
│   │       ├── monitoring/route.ts
│   │       ├── tasks/route.ts
│   │       ├── activity/route.ts
│   │       ├── chat/route.ts
│   │       └── insights/route.ts
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── TopBar.tsx
│   │   │   └── AuthGate.tsx
│   │   ├── dashboard/
│   │   │   ├── ProjectHeader.tsx
│   │   │   ├── EntityCard.tsx
│   │   │   ├── KeyDocuments.tsx
│   │   │   ├── ActivityFeed.tsx
│   │   │   └── DeadlineWidget.tsx
│   │   ├── documents/
│   │   │   ├── FolderTree.tsx
│   │   │   ├── FileList.tsx
│   │   │   └── DocumentDetail.tsx
│   │   ├── monitoring/
│   │   │   ├── TrackerMatrix.tsx
│   │   │   ├── DeadlinePanel.tsx
│   │   │   ├── AlertLog.tsx
│   │   │   └── AutomationRules.tsx
│   │   ├── intelligence/
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   ├── ResearchPanel.tsx
│   │   │   └── InsightCard.tsx
│   │   ├── tasks/
│   │   │   ├── TaskBoard.tsx
│   │   │   ├── TaskCard.tsx
│   │   │   └── TaskModal.tsx
│   │   └── ui/                      # shadcn/ui components
│   │
│   ├── data/
│   │   └── seed/
│   │       ├── project.json
│   │       ├── entities.json
│   │       ├── folders.json
│   │       ├── documents.json
│   │       ├── submissions.json
│   │       ├── monitoring-rules.json
│   │       ├── alerts.json
│   │       ├── tasks.json
│   │       ├── activity.json
│   │       ├── chat-responses.json
│   │       └── insights.json
│   │
│   ├── lib/
│   │   ├── types.ts                 # All TypeScript interfaces
│   │   ├── auth.ts                  # Password gate logic
│   │   ├── data.ts                  # Data loading helpers
│   │   └── utils.ts                 # Shared utilities
│   │
│   └── styles/
│       └── globals.css              # Tailwind + custom styles
│
├── public/
│   └── logo.svg                     # Gaw-inspired logo
│
├── .env.local                       # NEXT_PUBLIC_DEMO_PASSWORD
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 8. Build Order (Priority Sequence)

### Phase 1: Foundation (Day 1, first half)
1. `npx create-next-app` with TypeScript, Tailwind, App Router
2. Install shadcn/ui, set up theme
3. Auth gate (login page + AuthGate wrapper)
4. App shell (Sidebar + TopBar + layout)
5. TypeScript types (`lib/types.ts`)

### Phase 2: Data + Dashboard (Day 1, second half)
6. Seed data files (all JSON)
7. API routes
8. Dashboard page with all components

### Phase 3: Documents + Monitoring (Day 2, first half)
9. Folder browser + file list
10. Document detail modal with version history
11. Monitoring matrix
12. Deadline panel + alert log

### Phase 4: Intelligence + Tasks (Day 2, second half)
13. Chat interface with pre-seeded responses
14. Research panel with insight cards
15. Task board (kanban view)

### Phase 5: Polish (Day 3)
16. Animations and transitions
17. Mobile responsiveness (basic)
18. Demo data tuning
19. Deploy to Vercel
20. Record 1-minute video

---

## 9. Demo Password

For the demo account, we use a simple approach:
- Password: configured via `NEXT_PUBLIC_DEMO_PASSWORD` env var
- The login page shows the Gaw-branded splash with a single password field
- Once entered correctly, user gets full access to all screens
- No user accounts, no sessions, no tokens — just localStorage flag

---

## 10. Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| No database | Self-contained demo, zero infrastructure, instant deploys |
| JSON seed data | Easy for interns to edit and extend |
| Pre-seeded AI responses | Reliable demo — no API keys needed, no hallucination risk |
| shadcn/ui | Professional components, consistent design, fast to build |
| 5 screens not 3 | Separating Documents and Tasks from Dashboard gives each pain point room to breathe |
| Password gate not auth | Minimum viable access control for demo viewers |
| Client-side state | No server state management complexity |

---

## 11. MVP-to-Production Roadmap: OneDrive Integration

The production version of this tool is fundamentally an **intelligent wrapper around OneDrive/SharePoint** — not a replacement for it. The AM team already stores everything in OneDrive. The tool adds structure, tracking, and intelligence on top.

### Architecture Shift

```
MVP (Current)                       Production
─────────────                       ──────────
JSON seed data ──→ UI               OneDrive/SharePoint ──→ Microsoft Graph API ──→ Backend ──→ UI
                                    Outlook/Exchange   ──→ Microsoft Graph API ──↗
```

### Microsoft Graph API Integration Points

| Feature | Graph API Endpoint | What It Enables |
|---------|-------------------|-----------------|
| **Folder browsing** | `/drives/{id}/root/children` | Real-time folder tree from the actual Ballet Drive |
| **File metadata** | `/drives/{id}/items/{id}` | Name, size, modified date, modified by — live data |
| **Version history** | `/drives/{id}/items/{id}/versions` | Real version timeline, not manually tracked |
| **File change webhooks** | `/subscriptions` | Real-time notifications when files are uploaded/changed |
| **Email monitoring** | `/users/{id}/messages` | Detect when portfolio companies send reports via email |
| **Email attachments** | `/messages/{id}/attachments` | Auto-extract attachments and match to expected submissions |
| **User profiles** | `/users` | Real team member names, avatars, roles |
| **Calendar/deadlines** | `/users/{id}/calendar/events` | Sync deadlines with Outlook calendars |

### Integration Layers (Build Order for Production)

**Layer 1: Read-only file mirror (Week 1-2)**
- Connect to OneDrive via Microsoft Graph
- Mirror the folder structure in real-time
- Display actual file metadata (replaces seed data)
- No write operations — purely observational

**Layer 2: Smart file classification (Week 2-3)**
- Watch for new files via Graph webhooks
- Auto-classify by document type based on folder location + filename patterns
- Detect version sequences (e.g., "UW v4" → "UW v4.1" → "UW v5")
- Learn the taxonomy from historical closed deals (as described in the prompt doc)

**Layer 3: Email integration (Week 3-4)**
- Monitor incoming emails for expected submissions
- Match attachments to monitoring rules (e.g., "Monthly Management Report from Sharon Chan")
- Auto-file to correct OneDrive folder
- Update submission tracker automatically

**Layer 4: Alert system (Week 4-5)**
- Deadline engine based on monitoring rules
- Internal notifications (in-app + email)
- Escalation logic (reminder → overdue → escalated)
- Integration with Outlook calendar for deadline visibility

**Layer 5: AI layer (Week 5-6)**
- RAG pipeline over the actual project documents
- Parse Excel files (UW models, management accounts) for structured data extraction
- Connect to external market data APIs
- Real-time chat grounded in actual project data

### Infrastructure Requirements for Production

| Component | Purpose | Options |
|-----------|---------|---------|
| **Auth** | Microsoft SSO via Azure AD | MSAL.js + Azure AD app registration |
| **Database** | Store metadata, monitoring rules, tasks, alerts | PostgreSQL (Vercel Marketplace) |
| **File processing** | Parse Excel/PDF for data extraction | Python serverless functions or dedicated service |
| **Background jobs** | Webhook handlers, scheduled deadline checks, email polling | Vercel Crons + Queues |
| **AI inference** | Chat, document analysis, research | Claude API via Vercel AI Gateway |
| **Caching** | File metadata cache, reduce Graph API calls | Redis (Vercel Marketplace) |

### Key Architectural Decision: Wrapper, Not Repository

The tool should **never become the canonical location for files**. Files stay in OneDrive. The tool:
- Reads from OneDrive (source of truth for documents)
- Writes metadata to its own database (monitoring status, version confirmations, tasks, decisions)
- Sends notifications via Outlook (alerts, reminders)
- Never duplicates or moves files

This means adoption is zero-friction: the team keeps working exactly as they do today, and the tool adds value on top without requiring behavior change.

### Azure AD App Registration Requirements

To access Microsoft Graph API, the production app needs:
- Azure AD app registration in Gaw Capital's tenant
- Delegated permissions: `Files.Read.All`, `Mail.Read`, `Calendars.Read`, `User.Read.All`
- Admin consent from Gaw IT
- OAuth 2.0 authorization code flow for user login
