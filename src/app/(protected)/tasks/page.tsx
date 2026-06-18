"use client";

import { useMemo, useState } from "react";

type TaskStatus = "todo" | "progress" | "blocked" | "done";

type Task = {
  id: number;
  pri: "p1" | "p2" | "p3";
  source: "planned" | "adhoc";
  title: string;
  cat: string;
  due: string;
  dueClass: "" | "soon" | "overdue";
  assignee: "LC" | "JB" | "SW";
  status: TaskStatus;
};

const seedTasks: Task[] = [
  {
    id: 1,
    pri: "p1",
    source: "planned",
    title: "Finalize UW Model v5 for Capital Markets submission",
    cat: "Finance",
    due: "May 15",
    dueClass: "soon",
    assignee: "LC",
    status: "progress",
  },
  {
    id: 2,
    pri: "p1",
    source: "planned",
    title: "Review March Management Accounts - all entities",
    cat: "Finance",
    due: "May 10",
    dueClass: "overdue",
    assignee: "JB",
    status: "progress",
  },
  {
    id: 3,
    pri: "p3",
    source: "adhoc",
    title: "Collect signed NDA from Hampton",
    cat: "Legal",
    due: "May 12",
    dueClass: "overdue",
    assignee: "SW",
    status: "progress",
  },
  {
    id: 4,
    pri: "p2",
    source: "planned",
    title: "Prepare Q1 Investor Report",
    cat: "Reporting",
    due: "May 30",
    dueClass: "",
    assignee: "LC",
    status: "todo",
  },
  {
    id: 5,
    pri: "p2",
    source: "planned",
    title: "Update capex forecast for 2026",
    cat: "Finance",
    due: "May 20",
    dueClass: "",
    assignee: "SW",
    status: "todo",
  },
  {
    id: 6,
    pri: "p3",
    source: "adhoc",
    title: "Translate Thai corporate documents for DD checklist",
    cat: "Operations",
    due: "May 18",
    dueClass: "soon",
    assignee: "LC",
    status: "todo",
  },
  {
    id: 7,
    pri: "p1",
    source: "planned",
    title: "Follow up GTEG March management report - waiting on Sharon Chan",
    cat: "Finance",
    due: "May 7",
    dueClass: "overdue",
    assignee: "JB",
    status: "blocked",
  },
  {
    id: 8,
    pri: "p1",
    source: "planned",
    title: "Submit UW v4.8.6 to Capital Markets",
    cat: "Finance",
    due: "Apr 14",
    dueClass: "",
    assignee: "LC",
    status: "done",
  },
  {
    id: 9,
    pri: "p1",
    source: "planned",
    title: "IC Memo approval for 25Feb tranche",
    cat: "Legal",
    due: "Feb 25",
    dueClass: "",
    assignee: "JB",
    status: "done",
  },
  {
    id: 10,
    pri: "p2",
    source: "adhoc",
    title: "Crusade Partners DD checklist review",
    cat: "DD",
    due: "Mar 11",
    dueClass: "",
    assignee: "SW",
    status: "done",
  },
  {
    id: 11,
    pri: "p2",
    source: "planned",
    title: "Budget V2 final review and submission",
    cat: "Finance",
    due: "Nov 10",
    dueClass: "",
    assignee: "SW",
    status: "done",
  },
];

const columns: { key: TaskStatus; label: string }[] = [
  { key: "todo", label: "To Do" },
  { key: "progress", label: "In Progress" },
  { key: "blocked", label: "Blocked" },
  { key: "done", label: "Done" },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(seedTasks);
  const [viewMode, setViewMode] = useState<"board" | "list" | "workload">("board");
  const [showAddModal, setShowAddModal] = useState(false);
  const [draggingTaskId, setDraggingTaskId] = useState<number | null>(null);
  const [dragTargetStatus, setDragTargetStatus] = useState<TaskStatus | null>(null);
  const [title, setTitle] = useState("");
  const [pri, setPri] = useState<Task["pri"]>("p2");
  const [source, setSource] = useState<Task["source"]>("planned");
  const [cat, setCat] = useState("Finance");
  const [assignee, setAssignee] = useState<Task["assignee"]>("LC");
  const [due, setDue] = useState("May 25");

  const people = useMemo(
    () => ({ LC: "Lillian Chow", JB: "James Bradley", SW: "Spencer Wong" }),
    [],
  );

  const moveTask = (id: number, next: TaskStatus) => {
    setTasks((previous) =>
      previous.map((task) => (task.id === id ? { ...task, status: next } : task)),
    );
  };

  const addTask = () => {
    if (!title.trim()) return;
    setTasks((previous) => [
      {
        id: Date.now(),
        pri,
        source,
        title: title.trim(),
        cat,
        due,
        dueClass: "",
        assignee,
        status: "todo",
      },
      ...previous,
    ]);
    setShowAddModal(false);
    setTitle("");
  };

  const draggingTask = useMemo(
    () => tasks.find((task) => task.id === draggingTaskId) ?? null,
    [tasks, draggingTaskId],
  );

  const onDropToColumn = (nextStatus: TaskStatus) => {
    if (draggingTaskId === null) return;
    moveTask(draggingTaskId, nextStatus);
    setDraggingTaskId(null);
    setDragTargetStatus(null);
  };

  return (
    <div className="content">
      <div className="tasks-header">
        <h1>Task Ledger</h1>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div className="view-toggle" id="view-toggle">
            {(["board", "list", "workload"] as const).map((view) => (
              <button
                key={view}
                className={viewMode === view ? "active" : ""}
                data-view={view}
                onClick={() => setViewMode(view)}
                type="button"
              >
                {view === "board" ? "Board" : view === "list" ? "List" : "Workload"}
              </button>
            ))}
          </div>
          <button
            className="add-btn"
            id="add-task-btn"
            onClick={() => setShowAddModal(true)}
            type="button"
          >
            + Add Task
          </button>
        </div>
      </div>

      <div className="impact-banner">
        <div>
          <strong>Workload Alert:</strong> Adding &quot;Translate Thai corporate docs&quot; (ad-hoc,
          due May 18) will push &quot;Prepare Q1 Investor Report&quot; past its May 30 deadline for
          Lillian. Review prioritization?
        </div>
      </div>

      <div className="workload-bar">
        {(Object.keys(people) as (keyof typeof people)[]).map((key) => {
          const count = tasks.filter(
            (task) => task.assignee === key && task.status !== "done",
          ).length;
          const pct = Math.min(count * 16, 100);
          const cls = pct >= 90 ? "over" : pct >= 70 ? "warn" : "ok";
          return (
            <div key={key} className="wl-person">
              <div className="wl-name">{people[key]}</div>
              <div className="wl-meter">
                <div className={`fill ${cls}`} style={{ width: `${pct}%` }} />
              </div>
              <div className="wl-tasks">
                {count} active tasks · {pct}% capacity
              </div>
            </div>
          );
        })}
      </div>

      {viewMode === "board" ? (
        <div className="kanban">
          {columns.map((column) => (
            <div key={column.key} className="kanban-col">
              <div className="col-header">
                <div className="col-title">{column.label}</div>
                <div className="col-count">
                  {tasks.filter((task) => task.status === column.key).length}
                </div>
              </div>
              <div
                className="col-cards"
                data-col={column.key}
                onDragLeave={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    setDragTargetStatus((current) => (current === column.key ? null : current));
                  }
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragTargetStatus(column.key);
                }}
                onDrop={() => onDropToColumn(column.key)}
              >
                {draggingTask &&
                dragTargetStatus === column.key &&
                draggingTask.status !== column.key ? (
                  <div
                    className="task-card"
                    style={{
                      borderStyle: "dashed",
                      borderColor: "#b12b35",
                      background: "#fef6f7",
                      opacity: 0.85,
                      pointerEvents: "none",
                    }}
                  >
                    <div className="tc-top">
                      <span className={`priority ${draggingTask.pri}`}>
                        {draggingTask.pri.toUpperCase()}
                      </span>
                      <span className={`status-badge ${draggingTask.source}`}>
                        {draggingTask.source === "adhoc" ? "Ad-hoc" : "Planned"}
                      </span>
                    </div>
                    <div className="tc-title">{draggingTask.title}</div>
                    <div className="tc-category">{draggingTask.cat}</div>
                    <div className="tc-footer">
                      <span className="tc-due">Drop to move to {column.label}</span>
                      <span className="tc-assignee">{draggingTask.assignee}</span>
                    </div>
                  </div>
                ) : null}
                {tasks
                  .filter((task) => task.status === column.key)
                  .map((task) => (
                    <div
                      key={task.id}
                      className={`task-card ${task.status === "done" ? "done" : ""}`}
                      data-id={task.id}
                      draggable={task.status !== "done"}
                      onDragEnd={() => {
                        setDraggingTaskId(null);
                        setDragTargetStatus(null);
                      }}
                      onDragStart={() => {
                        setDraggingTaskId(task.id);
                        setDragTargetStatus(null);
                      }}
                    >
                      <div className="tc-top">
                        <span className={`priority ${task.pri}`}>{task.pri.toUpperCase()}</span>
                        <span className={`status-badge ${task.source}`}>
                          {task.source === "adhoc" ? "Ad-hoc" : "Planned"}
                        </span>
                      </div>
                      <div className="tc-title">{task.title}</div>
                      <div className="tc-category">{task.cat}</div>
                      <div className="tc-footer">
                        <span className={`tc-due ${task.dueClass}`}>
                          {task.status === "done"
                            ? `Completed ${task.due}`
                            : task.dueClass === "overdue"
                              ? `Overdue (${task.due})`
                              : `Due ${task.due}`}
                        </span>
                        <span className="tc-assignee">{task.assignee}</span>
                      </div>
                      {task.status !== "done" ? (
                        <div className="task-actions">
                          {columns
                            .filter((columnOption) => columnOption.key !== task.status)
                            .map((columnOption) => (
                              <button
                                key={columnOption.key}
                                className="task-move-btn"
                                data-task={task.id}
                                data-to={columnOption.key}
                                onClick={() => moveTask(task.id, columnOption.key)}
                                type="button"
                              >
                                {columnOption.label}
                              </button>
                            ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {viewMode === "list" ? (
        <>
          <div className="panel" style={{ marginBottom: 16 }}>
            <table className="file-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Priority</th>
                  <th>Source</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Due</th>
                  <th>Assignee</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {tasks
                  .filter((task) => task.status !== "done")
                  .map((task) => (
                    <tr key={task.id} className="task-list-row" data-id={task.id}>
                      <td style={{ fontWeight: 600 }}>{task.title}</td>
                      <td>
                        <span className={`priority ${task.pri}`}>{task.pri.toUpperCase()}</span>
                      </td>
                      <td>
                        <span className={`status-badge ${task.source}`}>
                          {task.source === "adhoc" ? "Ad-hoc" : "Planned"}
                        </span>
                      </td>
                      <td>
                        <span className="tc-category" style={{ margin: 0 }}>
                          {task.cat}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`status-badge ${task.status === "blocked" ? "overdue" : task.status === "progress" ? "attention" : "info"}`}
                        >
                          {columns.find((column) => column.key === task.status)?.label}
                        </span>
                      </td>
                      <td>
                        <span className={`tc-due ${task.dueClass}`}>
                          {task.dueClass === "overdue" ? `Overdue (${task.due})` : task.due}
                        </span>
                      </td>
                      <td>
                        <span className="tc-assignee">{task.assignee}</span>
                      </td>
                      <td>
                        <select
                          className="status-select"
                          data-task={task.id}
                          onChange={(event) => moveTask(task.id, event.target.value as TaskStatus)}
                          value={task.status}
                        >
                          {columns.map((column) => (
                            <option key={column.key} value={column.key}>
                              {column.label}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <details>
            <summary
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#9ca3af",
                cursor: "pointer",
                marginBottom: 8,
              }}
            >
              Completed ({tasks.filter((task) => task.status === "done").length})
            </summary>
            <div className="panel" style={{ opacity: 0.6 }}>
              <table className="file-table">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Priority</th>
                    <th>Category</th>
                    <th>Completed</th>
                    <th>Assignee</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks
                    .filter((task) => task.status === "done")
                    .map((task) => (
                      <tr key={`done-${task.id}`}>
                        <td>{task.title}</td>
                        <td>
                          <span className={`priority ${task.pri}`}>{task.pri.toUpperCase()}</span>
                        </td>
                        <td>{task.cat}</td>
                        <td>{task.due}</td>
                        <td>
                          <span className="tc-assignee">{task.assignee}</span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </details>
        </>
      ) : null}

      {viewMode === "workload" ? (
        <>
          {(Object.keys(people) as (keyof typeof people)[]).map((key) => {
            const personTasks = tasks.filter(
              (task) => task.assignee === key && task.status !== "done",
            );
            return (
              <div key={`workload-${key}`} className="panel" style={{ marginBottom: 16 }}>
                <div className="section-title">
                  {people[key]}{" "}
                  <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 400 }}>
                    ({personTasks.length} active)
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {personTasks.map((task) => (
                    <div
                      key={`workload-task-${task.id}`}
                      className="task-card"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 16px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span className={`priority ${task.pri}`}>{task.pri.toUpperCase()}</span>
                        <span style={{ fontSize: 13, fontWeight: 500 }}>{task.title}</span>
                      </div>
                      <span className={`tc-due ${task.dueClass}`}>
                        {task.dueClass === "overdue" ? "Overdue" : `Due ${task.due}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </>
      ) : null}

      <div id="add-modal" className={`modal-overlay ${showAddModal ? "" : "hidden"}`}>
        <div className="modal-card">
          <div className="modal-header">
            <h3>Add New Task</h3>
            <button
              className="drawer-close"
              id="modal-close"
              onClick={() => setShowAddModal(false)}
              type="button"
            >
              ×
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Title</label>
              <input
                className="form-input"
                id="new-title"
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Task title"
                type="text"
                value={title}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Priority</label>
                <select
                  className="form-input"
                  id="new-pri"
                  onChange={(event) => setPri(event.target.value as Task["pri"])}
                  value={pri}
                >
                  <option value="p1">P1 - Critical</option>
                  <option value="p2">P2 - Important</option>
                  <option value="p3">P3 - Normal</option>
                </select>
              </div>
              <div className="form-group">
                <label>Source</label>
                <select
                  className="form-input"
                  id="new-source"
                  onChange={(event) => setSource(event.target.value as Task["source"])}
                  value={source}
                >
                  <option value="planned">Planned</option>
                  <option value="adhoc">Ad-hoc</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select
                  className="form-input"
                  id="new-cat"
                  onChange={(event) => setCat(event.target.value)}
                  value={cat}
                >
                  <option>Finance</option>
                  <option>Legal</option>
                  <option>Operations</option>
                  <option>DD</option>
                  <option>Reporting</option>
                </select>
              </div>
              <div className="form-group">
                <label>Assignee</label>
                <select
                  className="form-input"
                  id="new-assignee"
                  onChange={(event) => setAssignee(event.target.value as Task["assignee"])}
                  value={assignee}
                >
                  <option value="LC">Lillian Chow</option>
                  <option value="JB">James Bradley</option>
                  <option value="SW">Spencer Wong</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Due Date</label>
              <input
                className="form-input"
                id="new-due"
                onChange={(event) => setDue(event.target.value)}
                placeholder="e.g. May 25"
                type="text"
                value={due}
              />
            </div>
            <button
              className="add-btn"
              id="save-task"
              onClick={addTask}
              style={{ width: "100%", marginTop: 8 }}
              type="button"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
