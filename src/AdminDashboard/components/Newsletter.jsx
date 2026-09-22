import React, { useEffect, useState, useCallback } from "react";
import api from "../../api";
import {
  FaPaperPlane, FaUserPlus, FaTrash, FaHistory, FaUsers,
  FaCheckCircle, FaTimesCircle, FaEye, FaEyeSlash, FaExclamationTriangle,
} from "react-icons/fa";

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
});

const TABS = [
  { key: "compose", label: "Compose", icon: FaPaperPlane },
  { key: "recipients", label: "Recipients", icon: FaUsers },
  { key: "history", label: "History", icon: FaHistory },
];

// Mirrors Backend/Admin/utils/newsletterTemplate.js — used only for the live preview.
function buildPreviewHTML({ subject, type, headline, bodyText, ctaText, ctaLink }) {
  const escapeHTML = (str = "") =>
    str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const eyebrow = type === "generic" ? "Company Update" : "Project Update";

  const paragraphs = bodyText
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const paragraphsHtml = paragraphs.length
    ? paragraphs.map((p) => `<p style="margin:0 0 18px 0;font-size:15px;line-height:1.65;color:#3d4a5c;font-family:'Segoe UI',Arial,sans-serif;">${escapeHTML(p)}</p>`).join("")
    : `<p style="margin:0 0 18px 0;font-size:15px;line-height:1.65;color:#c2c9d3;font-family:'Segoe UI',Arial,sans-serif;">Your message will appear here…</p>`;

  const ctaHtml = ctaText && ctaLink
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:30px 0 6px 0;">
        <tr><td style="border-radius:8px;background-color:#00B5F9;">
          <a href="${escapeHTML(ctaLink)}" style="display:inline-block;padding:13px 30px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px;font-family:'Segoe UI',Arial,sans-serif;">${escapeHTML(ctaText)} &rarr;</a>
        </td></tr>
      </table>`
    : "";

  return `<!DOCTYPE html><html><head><meta charset="utf-8" /></head>
  <body style="margin:0;padding:0;background-color:#eef2f7;font-family:'Segoe UI', Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#eef2f7;">
      <tr><td align="center" style="padding:28px 14px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background-color:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e9eef4;">

          <tr>
            <td align="center" style="background-color:#ffffff;padding:28px 24px 18px;border-bottom:1px solid #eef2f7;">
              <div style="color:#0488f2;font-size:26px;font-weight:800;letter-spacing:0.5px;font-family:'Segoe UI',Arial,sans-serif;">QINTELL</div>
              <div style="color:#0f2647;font-size:10px;letter-spacing:5px;font-weight:600;margin-top:6px;font-family:'Segoe UI',Arial,sans-serif;">QUANTUM</div>
            </td>
          </tr>

          <tr><td style="height:4px;line-height:4px;font-size:0;background-color:#00B5F9;">&nbsp;</td></tr>

          <tr>
            <td style="padding:34px 34px 10px;">
              <p style="margin:0 0 10px 0;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#00B5F9;font-family:'Segoe UI',Arial,sans-serif;">${eyebrow}</p>
              <h1 style="margin:0 0 18px 0;font-size:21px;font-weight:700;color:#0f2647;line-height:1.35;font-family:'Segoe UI',Arial,sans-serif;">${escapeHTML(headline) || '<span style="color:#c2c9d3;">Your headline will appear here</span>'}</h1>
              ${paragraphsHtml}
              ${ctaHtml}
            </td>
          </tr>

          <tr><td style="height:12px;line-height:12px;font-size:0;">&nbsp;</td></tr>
          <tr><td style="padding:0 34px;"><div style="border-top:1px solid #e9eef4;font-size:0;line-height:0;">&nbsp;</div></td></tr>

          <tr>
            <td align="center" style="padding:24px 34px 30px;">
              <p style="margin:0 0 6px 0;font-size:13px;font-weight:600;color:#0f2647;font-family:'Segoe UI',Arial,sans-serif;">QintellQuantum</p>
              <p style="margin:0 0 12px 0;font-size:11px;color:#94a3b8;line-height:1.6;font-family:'Segoe UI',Arial,sans-serif;">
                You're receiving this email because you're part of QintellQuantum's mailing list.
              </p>
              <p style="margin:0;font-size:11px;color:#94a3b8;font-family:'Segoe UI',Arial,sans-serif;">
                <a href="#" style="color:#00B5F9;text-decoration:none;">revamp.qintellquantum.com</a>
                &nbsp;&nbsp;•&nbsp;&nbsp;
                <span style="text-decoration:underline;">Unsubscribe</span>
              </p>
            </td>
          </tr>

        </table>
      </td></tr>
    </table>
  </body></html>`;
}

export default function Newsletter() {
  const [activeTab, setActiveTab] = useState("compose");
  const [counts, setCounts] = useState({ general: 0, client: 0, investor: 0 });

  const fetchCounts = useCallback(async () => {
    try {
      const res = await api.get("/api/admin-newsletter/recipients/counts", authHeaders());
      setCounts(res.data);
    } catch (err) {
      console.error("Failed to fetch recipient counts:", err);
    }
  }, []);

  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  return (
    <div style={{ padding: "28px 28px 40px", backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: "1.45rem", fontWeight: 700, color: "#1a365d", letterSpacing: "-0.3px" }}>
          Newsletter
        </h2>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "#94a3b8" }}>
          Compose and send newsletters to your General, Client, and Investor mailing lists
        </p>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 24, borderBottom: "1px solid #e2e8f0" }}>
        {TABS.map(({ key, label, icon: Icon }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "10px 18px",
                border: "none",
                borderBottom: isActive ? "2px solid #00B5F9" : "2px solid transparent",
                background: "transparent",
                color: isActive ? "#00B5F9" : "#64748b",
                fontWeight: isActive ? 600 : 500,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              <Icon size={13} />
              {label}
            </button>
          );
        })}
      </div>

      {activeTab === "compose" && <ComposeTab counts={counts} onSent={fetchCounts} />}
      {activeTab === "recipients" && <RecipientsTab counts={counts} onChange={fetchCounts} />}
      {activeTab === "history" && <HistoryTab />}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// COMPOSE TAB
// ────────────────────────────────────────────────────────────
function ComposeTab({ counts, onSent }) {
  const [type, setType] = useState("generic");
  const [subject, setSubject] = useState("");
  const [headline, setHeadline] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [ctaLink, setCtaLink] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const audienceCount =
    type === "generic"
      ? counts.general + counts.client + counts.investor
      : counts.client + counts.investor;

  const audienceLabel =
    type === "generic"
      ? "General subscribers, Clients & Investors"
      : "Clients & Investors only";

  const canSend = subject.trim() && headline.trim() && bodyText.trim() && audienceCount > 0;

  const handleSend = async () => {
    setSending(true);
    setFeedback(null);
    try {
      const res = await api.post(
        "/api/admin-newsletter/send",
        { type, subject, headline, bodyText, ctaText, ctaLink },
        authHeaders()
      );
      setFeedback({ type: "success", message: res.data.message });
      setSubject("");
      setHeadline("");
      setBodyText("");
      setCtaText("");
      setCtaLink("");
      onSent();
    } catch (err) {
      setFeedback({
        type: "error",
        message: err.response?.data?.message || "Failed to send newsletter.",
      });
    } finally {
      setSending(false);
      setConfirming(false);
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 280px", gap: 20, alignItems: "start" }}>
      <div style={cardStyle}>
        <label style={labelStyle}>Newsletter Type</label>
        <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
          <TypeOption
            selected={type === "generic"}
            onClick={() => setType("generic")}
            title="Generic Information"
            desc="Sent to everyone — General subscribers, Clients, and Investors."
          />
          <TypeOption
            selected={type === "project_updates"}
            onClick={() => setType("project_updates")}
            title="Updates on Current & Future Projects"
            desc="Sent only to Clients and Investors."
          />
        </div>

        <label style={labelStyle}>Email Subject Line</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g. Onnes Aerospace — Monthly Update, August 2026"
          style={inputStyle}
        />

        <label style={labelStyle}>Headline</label>
        <input
          type="text"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          placeholder="e.g. What's new at Onnes this month"
          style={inputStyle}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, marginBottom: 6 }}>
          <label style={{ ...labelStyle, marginBottom: 0 }}>Message</label>
          <button
            onClick={() => setShowPreview((p) => !p)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "none", border: "1px solid #e2e8f0", borderRadius: 8,
              padding: "5px 10px", fontSize: 12, color: "#475569", cursor: "pointer",
            }}
          >
            {showPreview ? <FaEyeSlash size={11} /> : <FaEye size={11} />}
            {showPreview ? "Edit" : "Preview"}
          </button>
        </div>

        {!showPreview && (
          <textarea
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            placeholder={"Write your update here.\n\nLeave a blank line to start a new paragraph."}
            style={{ ...inputStyle, minHeight: 180, fontSize: 13.5, resize: "vertical" }}
          />
        )}

        {!showPreview && (
          <>
            <label style={labelStyle}>Button Text (optional)</label>
            <input
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              placeholder="e.g. Visit our website"
              style={inputStyle}
            />

            <label style={labelStyle}>Button Link (optional)</label>
            <input
              type="text"
              value={ctaLink}
              onChange={(e) => setCtaLink(e.target.value)}
              placeholder="https://onnesaerospace.com"
              style={inputStyle}
            />
          </>
        )}

        {showPreview && (
          <div style={{ border: "1px solid #e2e8f0", borderRadius: 10, overflow: "hidden", marginTop: 4 }}>
            <iframe
              title="newsletter-preview"
              srcDoc={buildPreviewHTML({ subject, type, headline, bodyText, ctaText, ctaLink })}
              style={{ width: "100%", height: 560, border: "none", display: "block" }}
            />
          </div>
        )}

        {feedback && (
          <div
            style={{
              marginTop: 16,
              padding: "10px 14px",
              borderRadius: 8,
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: feedback.type === "success" ? "#f0fdf4" : "#fef2f2",
              color: feedback.type === "success" ? "#16a34a" : "#dc2626",
              border: `1px solid ${feedback.type === "success" ? "#bbf7d0" : "#fecaca"}`,
            }}
          >
            {feedback.type === "success" ? <FaCheckCircle size={13} /> : <FaTimesCircle size={13} />}
            {feedback.message}
          </div>
        )}

        <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
          {!confirming ? (
            <button
              disabled={!canSend}
              onClick={() => setConfirming(true)}
              style={{
                ...primaryBtnStyle,
                opacity: canSend ? 1 : 0.5,
                cursor: canSend ? "pointer" : "not-allowed",
              }}
            >
              <FaPaperPlane size={12} style={{ marginRight: 8 }} />
              Send Newsletter
            </button>
          ) : (
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10,
              padding: "10px 16px", width: "100%", justifyContent: "space-between",
            }}>
              <span style={{ fontSize: 13, color: "#92400e", display: "flex", alignItems: "center", gap: 8 }}>
                <FaExclamationTriangle size={13} />
                Send to {audienceCount} recipient{audienceCount !== 1 ? "s" : ""}? This can't be undone.
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setConfirming(false)} style={secondaryBtnStyle}>Cancel</button>
                <button onClick={handleSend} disabled={sending} style={primaryBtnStyle}>
                  {sending ? "Sending…" : "Confirm & Send"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={cardStyle}>
        <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 700, color: "#1a365d" }}>Audience</p>
        <p style={{ margin: "0 0 16px", fontSize: 12, color: "#94a3b8" }}>{audienceLabel}</p>

        <SummaryRow label="General" value={counts.general} dim={type !== "generic"} />
        <SummaryRow label="Clients" value={counts.client} />
        <SummaryRow label="Investors" value={counts.investor} />

        <div style={{ borderTop: "1px solid #e2e8f0", marginTop: 12, paddingTop: 12 }}>
          <SummaryRow label="Total recipients" value={audienceCount} bold />
        </div>
      </div>
    </div>
  );
}

function TypeOption({ selected, onClick, title, desc }) {
  return (
    <div
      onClick={onClick}
      style={{
        border: `1.5px solid ${selected ? "#00B5F9" : "#e2e8f0"}`,
        background: selected ? "#e0f7ff" : "#fff",
        borderRadius: 10,
        padding: "12px 14px",
        cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: "#1a365d" }}>{title}</p>
      <p style={{ margin: "3px 0 0", fontSize: 12, color: "#64748b" }}>{desc}</p>
    </div>
  );
}

function SummaryRow({ label, value, dim, bold }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", opacity: dim ? 0.4 : 1 }}>
      <span style={{ fontSize: 13, color: "#475569", fontWeight: bold ? 700 : 400 }}>{label}</span>
      <span style={{ fontSize: 13, color: "#1a365d", fontWeight: bold ? 700 : 600 }}>{value}</span>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// RECIPIENTS TAB (Clients & Investors management)
// ────────────────────────────────────────────────────────────
function RecipientsTab({ onChange }) {
  const [filter, setFilter] = useState("client");
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", category: "client", status: "existing" });
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  const fetchRecipients = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/api/admin-newsletter/recipients?category=${filter}`, authHeaders());
      setRecipients(res.data);
    } catch (err) {
      console.error("Failed to fetch recipients:", err);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchRecipients();
  }, [fetchRecipients]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email.trim()) {
      setError("Email is required.");
      return;
    }
    setAdding(true);
    try {
      await api.post("/api/admin-newsletter/recipients", form, authHeaders());
      setForm({ name: "", email: "", category: filter, status: "existing" });
      fetchRecipients();
      onChange();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add recipient.");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this recipient?")) return;
    try {
      await api.delete(`/api/admin-newsletter/recipients/${id}`, authHeaders());
      fetchRecipients();
      onChange();
    } catch (err) {
      console.error("Failed to delete recipient:", err);
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "320px minmax(0, 1fr)", gap: 20, alignItems: "start" }}>
      <div style={cardStyle}>
        <p style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 700, color: "#1a365d" }}>Add Recipient</p>
        <form onSubmit={handleAdd}>
          <label style={labelStyle}>Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Optional"
            style={inputStyle}
          />

          <label style={labelStyle}>Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="name@company.com"
            style={inputStyle}
          />

          <label style={labelStyle}>Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            style={inputStyle}
          >
            <option value="client">Client</option>
            <option value="investor">Investor</option>
          </select>

          <label style={labelStyle}>Status</label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            style={inputStyle}
          >
            <option value="existing">Existing</option>
            <option value="future">Future</option>
          </select>

          {error && <p style={{ color: "#dc2626", fontSize: 12, margin: "8px 0 0" }}>{error}</p>}

          <button type="submit" disabled={adding} style={{ ...primaryBtnStyle, width: "100%", marginTop: 16, justifyContent: "center" }}>
            <FaUserPlus size={12} style={{ marginRight: 8 }} />
            {adding ? "Adding…" : "Add Recipient"}
          </button>
        </form>
      </div>

      <div style={cardStyle}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {["client", "investor"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                border: "1px solid " + (filter === cat ? "#00B5F9" : "#e2e8f0"),
                background: filter === cat ? "#e0f7ff" : "#fff",
                color: filter === cat ? "#00B5F9" : "#64748b",
                fontSize: 12.5,
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {cat}s
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ fontSize: 13, color: "#94a3b8" }}>Loading…</p>
        ) : recipients.length === 0 ? (
          <p style={{ fontSize: 13, color: "#94a3b8" }}>No {filter}s added yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ textAlign: "left", color: "#94a3b8", fontSize: 12 }}>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}></th>
                </tr>
              </thead>
              <tbody>
                {recipients.map((r) => (
                  <tr key={r._id} style={{ borderTop: "1px solid #eef2f6" }}>
                    <td style={tdStyle}>{r.name || "—"}</td>
                    <td style={tdStyle}>{r.email}</td>
                    <td style={tdStyle}>
                      <span style={{
                        fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 12,
                        background: r.status === "existing" ? "#f0fdf4" : "#eff6ff",
                        color: r.status === "existing" ? "#16a34a" : "#2563eb",
                        textTransform: "capitalize",
                      }}>
                        {r.status}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, textAlign: "right" }}>
                      <button
                        onClick={() => handleDelete(r._id)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: 4 }}
                        title="Remove"
                      >
                        <FaTrash size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// HISTORY TAB
// ────────────────────────────────────────────────────────────
function HistoryTab() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/admin-newsletter/history", authHeaders());
        setHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const statusBadge = (status) => {
    const map = {
      sending: { bg: "#fffbeb", color: "#92400e", label: "Sending" },
      completed: { bg: "#f0fdf4", color: "#16a34a", label: "Completed" },
      completed_with_errors: { bg: "#fff7ed", color: "#c2410c", label: "Completed (errors)" },
      failed: { bg: "#fef2f2", color: "#dc2626", label: "Failed" },
    };
    const s = map[status] || map.sending;
    return (
      <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 12, background: s.bg, color: s.color }}>
        {s.label}
      </span>
    );
  };

  return (
    <div style={cardStyle}>
      {loading ? (
        <p style={{ fontSize: 13, color: "#94a3b8" }}>Loading…</p>
      ) : history.length === 0 ? (
        <p style={{ fontSize: 13, color: "#94a3b8" }}>No newsletters sent yet.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ textAlign: "left", color: "#94a3b8", fontSize: 12 }}>
                <th style={thStyle}>Subject</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Recipients</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h._id} style={{ borderTop: "1px solid #eef2f6" }}>
                  <td style={tdStyle}>{h.subject}</td>
                  <td style={tdStyle}>
                    {h.type === "generic" ? "Generic Information" : "Project Updates"}
                  </td>
                  <td style={tdStyle}>{h.sentCount} / {h.totalRecipients}</td>
                  <td style={tdStyle}>{statusBadge(h.status)}</td>
                  <td style={tdStyle}>{new Date(h.createdAt).toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  borderRadius: 16,
  padding: "22px 24px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
  border: "1px solid #e9eef4",
};

const labelStyle = {
  display: "block",
  fontSize: 12.5,
  fontWeight: 600,
  color: "#475569",
  marginBottom: 6,
  marginTop: 12,
};

const inputStyle = {
  width: "100%",
  padding: "9px 12px",
  border: "1px solid #e2e8f0",
  borderRadius: 8,
  fontSize: 13.5,
  color: "#1a365d",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "'Inter', sans-serif",
};

const primaryBtnStyle = {
  display: "inline-flex",
  alignItems: "center",
  background: "#00B5F9",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "10px 18px",
  fontSize: 13.5,
  fontWeight: 600,
  cursor: "pointer",
};

const secondaryBtnStyle = {
  background: "#fff",
  color: "#475569",
  border: "1px solid #e2e8f0",
  borderRadius: 8,
  padding: "8px 14px",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};

const thStyle = { padding: "8px 10px", fontWeight: 600 };
const tdStyle = { padding: "10px 10px", color: "#334155" };