// client/src/components/ProductQAWidget.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useProductQA } from "../hooks/useProductQA";

export default function ProductQAWidget({ productId, apiBase = "" }) {
  const [q, setQ] = useState("");
  const [history, setHistory] = useState([]); // [{q, a}]
  const { loading, answer, error, ask, reset } = useProductQA({
    baseUrl: apiBase,
  });
  const textareaRef = useRef(null);

  const askedRef = useRef(""); // last asked question

  // When answer changes, push to history
  useEffect(() => {
    if (answer) {
      setHistory((h) => [...h, { q: askedRef.current, a: answer }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer]);

  // Auto-focus UX
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const canAsk = useMemo(() => q.trim().length > 0 && !loading, [q, loading]);

  async function onAsk() {
    if (!canAsk) return;
    const asked = q.trim();
    askedRef.current = asked; // snapshot store
    reset();
    setQ(""); // clear UI
    await ask({ productId, question: asked });
  }

  function onKeyDown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      onAsk();
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        Hi, I am Mr Dululu your personal Assistant.
      </div>

      {/* History */}
      <div style={styles.history}>
        {history.length === 0 && (
          <div style={styles.placeholder}>
            Aap mujhse Product ke baare me koi bhi sawal puch sakte ho. Short,
            specific questions best rehte hain.
          </div>
        )}
        {history.map((item, idx) => (
          <div key={idx} style={styles.pair}>
            <div style={styles.userLabel}>Question</div>
            <div style={styles.userBubble}>{item.q}</div>
            <div style={styles.aiLabel}>Answer</div>
            <div style={styles.aiBubble}>{item.a}</div>
          </div>
        ))}
        {loading && <div style={styles.thinking}>🤔Thinking...</div>}
        {error && <div style={styles.error}>Error:😥 {error}</div>}
      </div>

      {/* Input */}
      <div style={styles.inputRow}>
        <textarea
          ref={textareaRef}
          rows={3}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type your question…  (Press Ctrl/Cmd + Enter to send)"
          style={styles.textarea}
        />
        <button
          onClick={onAsk}
          disabled={!canAsk}
          style={{ ...styles.button, opacity: canAsk ? 1 : 0.6 }}
        >
          Ask
        </button>
      </div>

      <div style={styles.hint}>
        Tip: Short questions give faster, clearer answers. Use Ctrl/Cmd + Enter
        to submit.
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 12,
    background: "#fff",
    color: "#000",
  },
  header: { fontWeight: 700, marginBottom: 10, fontSize: 16 },
  history: {
    maxHeight: 280,
    overflowY: "auto",
    border: "1px solid #f1f5f9",
    borderRadius: 8,
    padding: 10,
    background: "#fafafa",
    color: "#000",
  },
  placeholder: { color: "#6b7280", fontSize: 13 },
  pair: { marginBottom: 12 },
  userLabel: { fontSize: 11, color: "#6b7280", marginBottom: 4 },
  userBubble: {
    background: "#e5f0ff",
    padding: 8,
    borderRadius: 8,
    whiteSpace: "pre-wrap",
  },
  aiLabel: { fontSize: 11, color: "#6b7280", marginTop: 8, marginBottom: 4 },
  aiBubble: {
    background: "#eefcf3",
    padding: 8,
    borderRadius: 8,
    whiteSpace: "pre-wrap",
  },
  thinking: { marginTop: 8, fontSize: 13, color: "#6b7280" },
  error: { marginTop: 8, color: "#ef4444" },
  inputRow: { display: "flex", gap: 8, marginTop: 10 },
  textarea: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    resize: "vertical",
  },
  button: {
    padding: "8px 14px",
    borderRadius: 8,
    border: "2px solid #AA7454",
    background: "#FF8C42",
    color: "#fff",
    cursor: "pointer",
  },
  hint: { marginTop: 8, fontSize: 12, color: "#6b7280" },
};
