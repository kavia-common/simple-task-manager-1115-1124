import React, { useState, useEffect, useRef } from "react";
import "./App.css";

/**
 * PUBLIC_INTERFACE
 * Main App component for the Todo application.
 * Provides CRUD todo management, filtering, styled UI, and API-ready logic.
 */
function App() {
  // Todo object: { id, text, completed }
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all"); // 'all' | 'active' | 'completed'
  const [editId, setEditId] = useState(null); // id of todo being edited
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef(null);

  // Focus add-todo input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handler to add new todo
  // PUBLIC_INTERFACE
  function handleAddTodo(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    const newTodo = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setInput("");
    inputRef.current?.focus();
    // Here, integrate with backend API to persist new todo
  }

  // PUBLIC_INTERFACE
  function handleToggleCompleted(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    // Here, integrate with backend API to update completed status
  }

  // PUBLIC_INTERFACE
  function handleDeleteTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    // Backend API for deletion here
  }

  // PUBLIC_INTERFACE
  function handleEditTodo(id, text) {
    setEditId(id);
    setEditValue(text);
  }

  // PUBLIC_INTERFACE
  function handleEditChange(e) {
    setEditValue(e.target.value);
  }

  // PUBLIC_INTERFACE
  function handleEditSubmit(id) {
    const trimmed = editValue.trim();
    if (!trimmed) return;
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: trimmed } : todo
      )
    );
    setEditId(null);
    setEditValue("");
    // Backend API for update here
  }

  // PUBLIC_INTERFACE
  function handleFilterChange(status) {
    setFilter(status);
  }

  // PUBLIC_INTERFACE
  function handleClearCompleted() {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
    // Optionally API to batch-delete
  }

  // Filtered todo list
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  // Theme color (light) setup: override CSS vars for accent
  useEffect(() => {
    document.documentElement.style.setProperty("--kavia-accent", "#ff9800");
    document.documentElement.style.setProperty("--kavia-primary", "#1976d2");
    document.documentElement.style.setProperty("--kavia-secondary", "#424242");
    // The rest is in App.css and index.css
  }, []);

  return (
    <div className="todo-app-container" style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <header className="todo-header" style={{ background: "var(--kavia-primary)", color: "#fff" }}>
        <h1 className="todo-title" style={{ margin: "0", fontWeight: 700, fontSize: "2rem", letterSpacing: ".04em" }}>
          <span style={{ color: "var(--kavia-accent)" }}>•</span> Simple Todo App
        </h1>
        <p className="todo-subtitle" style={{ fontSize: "1rem", color: "#e3f2fd", margin: "0.2em 0 0.8em" }}>
          Manage your tasks efficiently in style
        </p>
      </header>
      <main className="todo-main">
        {/* Add Todo input */}
        <form onSubmit={handleAddTodo} className="add-todo-form">
          <input
            ref={inputRef}
            type="text"
            className="add-todo-input"
            placeholder="What needs to be done?"
            value={input}
            aria-label="Add todo"
            onChange={(e) => setInput(e.target.value)}
            maxLength={120}
            style={{
              background: "var(--bg-secondary)",
              border: `1px solid var(--kavia-secondary)`,
              borderRadius: "8px",
              padding: "0.7em 1em",
              fontSize: "1.1rem",
              outline: "none",
              marginRight: "1em",
              width: "60%",
              color: "var(--text-primary)",
              boxShadow: "0 2px 4px rgba(0,0,0,0.01)",
            }}
          />
          <button
            type="submit"
            className="btn-add"
            style={{
              background: "var(--kavia-accent)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "0.7em 1.5em",
              fontWeight: 600,
              fontSize: "1.1rem",
              cursor: "pointer",
              boxShadow: "0 1px 4px rgba(0,0,0,0.09)",
              transition: "background 0.23s",
            }}
            disabled={!input.trim()}
          >
            Add
          </button>
        </form>
        {/* Filters Bar */}
        <div className="filter-bar" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1em",
          margin: "2em 0 1.2em"
        }}>
          <FilterButton active={filter === "all"} onClick={() => handleFilterChange("all")} label="All" />
          <FilterButton active={filter === "active"} onClick={() => handleFilterChange("active")} label="Active" />
          <FilterButton active={filter === "completed"} onClick={() => handleFilterChange("completed")} label="Completed" />
          <button
            className="btn-clear"
            type="button"
            style={{
              background: "var(--kavia-secondary)",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "0.4em 1.3em",
              fontWeight: 500,
              fontSize: "0.99rem",
              cursor: "pointer",
              opacity: todos.some((t) => t.completed) ? 1 : 0.6,
              marginLeft: "1.9em"
            }}
            onClick={handleClearCompleted}
            disabled={!todos.some((t) => t.completed)}
            aria-label="Clear completed todos"
          >
            Clear Completed
          </button>
        </div>
        {/* Todo List */}
        <section className="todos-list-section">
          {filteredTodos.length === 0 ? (
            <div style={{ color: "var(--kavia-secondary)", fontSize: "1.04rem", marginTop: "3em" }}>
              <em>No todos {filter !== "all" && `(${filter})`} yet.</em>
            </div>
          ) : (
            <ul className="todo-list" style={{
              listStyle: "none",
              padding: 0,
              margin: "0 auto",
              maxWidth: 480,
            }}>
              {filteredTodos.map((todo) => (
                <li key={todo.id} className="todo-item" style={{
                  background: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border-color, #ececec)",
                  borderLeft: `4px solid ${todo.completed ? "var(--kavia-accent)" : "var(--kavia-primary)"}`,
                  borderRadius: "8px",
                  marginBottom: "1em",
                  padding: "0.9em 1em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: todo.completed ? "0 2px 8px 0 rgba(255,152,0,0.03)" : "0 2px 8px 0 rgba(25,118,210,0.06)"
                }}>
                  <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleCompleted(todo.id)}
                      aria-label={todo.completed ? "Mark as active" : "Mark as completed"}
                      style={{
                        accentColor: "var(--kavia-accent)",
                        width: 22,
                        height: 22,
                        marginRight: "1.2em",
                        cursor: "pointer"
                      }}
                    />
                    {editId === todo.id ? (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleEditSubmit(todo.id);
                        }}
                        style={{ width: "100%" }}
                      >
                        <input
                          type="text"
                          value={editValue}
                          onChange={handleEditChange}
                          onBlur={() => setEditId(null)}
                          autoFocus
                          className="edit-todo-input"
                          style={{
                            width: "100%",
                            fontSize: "1rem",
                            border: `1px solid var(--kavia-primary)`,
                            borderRadius: "6px",
                            padding: "0.2em 0.6em",
                            background: "#fff",
                            color: "var(--kavia-secondary)",
                          }}
                          maxLength={120}
                        />
                      </form>
                    ) : (
                      <span
                        tabIndex={0}
                        className={`todo-text${todo.completed ? " completed" : ""}`}
                        style={{
                          textDecoration: todo.completed ? "line-through" : "none",
                          color: todo.completed ? "var(--kavia-secondary)" : "inherit",
                          fontSize: "1.17em",
                          outline: "none",
                          marginTop: 2,
                          opacity: todo.completed ? 0.72 : 1,
                          wordBreak: "break-word",
                          transition: "color 0.22s",
                          cursor: "pointer",
                        }}
                        aria-label={`Todo: ${todo.text}${todo.completed ? " (completed)" : ""}`}
                        onDoubleClick={() => handleEditTodo(todo.id, todo.text)}
                        title="Double-click to edit"
                      >
                        {todo.text}
                      </span>
                    )}
                  </div>
                  <div className="todo-actions" style={{ marginLeft: "1.35em", display: "flex", gap: "0.5em" }}>
                    <ActionButton
                      label="Edit"
                      icon="✏️"
                      onClick={() => handleEditTodo(todo.id, todo.text)}
                      style={{
                        background: "var(--kavia-primary)",
                        marginRight: 0,
                        opacity: editId === todo.id ? 0.39 : 1,
                        pointerEvents: editId === todo.id ? "none" : "auto"
                      }}
                      ariaDisabled={editId === todo.id}
                    />
                    <ActionButton
                      label="Delete"
                      icon="🗑️"
                      onClick={() => handleDeleteTodo(todo.id)}
                      style={{ background: "var(--kavia-accent)" }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
          <footer style={{ margin: "2.5em auto 0.5em", textAlign: "center", color: "#666" }}>
            <small>
              {todos.length} total | {todos.filter((t) => !t.completed).length} active |{" "}
              {todos.filter((t) => t.completed).length} completed
            </small>
          </footer>
        </section>
      </main>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Renders a filter button for the todos filter bar.
 */
function FilterButton({ active, onClick, label }) {
  return (
    <button
      type="button"
      className="filter-btn"
      style={{
        color: active ? "#fff" : "var(--kavia-primary)",
        background: active ? "var(--kavia-primary)" : "#fff",
        border: `1.5px solid var(--kavia-primary)`,
        borderRadius: "7px",
        padding: "0.42em 1.25em",
        fontWeight: 500,
        fontSize: ".99rem",
        cursor: "pointer",
        transition: "all 0.17s",
        boxShadow: active ? "0 2px 8px rgba(25, 118, 210, 0.08)" : "none"
      }}
      aria-pressed={active}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

/**
 * PUBLIC_INTERFACE
 * General purpose action button (edit/delete) for a todo row.
 */
function ActionButton({ label, icon, onClick, style, ariaDisabled }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="todo-action-btn"
      style={{
        color: "#fff",
        background: "var(--kavia-accent)",
        border: "none",
        borderRadius: "5px",
        padding: "0.32em 0.75em",
        fontSize: "1.15em",
        cursor: "pointer",
        opacity: ariaDisabled ? 0.4 : 1,
        ...style,
      }}
      onClick={onClick}
      disabled={ariaDisabled}
      tabIndex={0}
    >
      <span style={{ marginRight: 3 }}>{icon}</span>
      <span className="btn-label" style={{ display: "none" }}>{label}</span>
    </button>
  );
}

export default App;
