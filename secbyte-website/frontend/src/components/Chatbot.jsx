import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, UserRoundPlus, Headset } from "lucide-react";
import { apiPost } from "../lib/api";

function getVisitorId() {
  let id = window.__secbyteVisitorId;
  if (!id) {
    id = `visitor-${Math.random().toString(36).slice(2)}-${Date.now()}`;
    window.__secbyteVisitorId = id;
  }
  return id;
}

const initialMessages = [
  { sender: "bot", text: "Hi! I'm the Secbyte assistant. Ask me about our services, or use the buttons below." },
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [mode, setMode] = useState("chat"); // chat | lead-form | escalated
  const [leadForm, setLeadForm] = useState({ name: "", email: "", phone: "", interestedService: "" });
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, mode]);

  const pushMessage = (sender, text) => setMessages((m) => [...m, { sender, text }]);

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    pushMessage("user", text);
    setInput("");
    setSending(true);

    try {
      const res = await apiPost("/chatbot/message", { visitorId: getVisitorId(), message: text });
      pushMessage("bot", res.reply);
    } catch (err) {
      pushMessage("bot", "I couldn't reach the server just now — please try the Contact page instead.");
    } finally {
      setSending(false);
    }
  };

  const handleEscalate = async () => {
    pushMessage("user", "Talk to a human");
    setSending(true);
    try {
      const res = await apiPost("/chatbot/escalate", { visitorId: getVisitorId(), reason: "user requested human support" });
      pushMessage("agent", res.message);
      setMode("escalated");
    } catch {
      pushMessage("bot", "Couldn't reach the server — please use the Contact page instead.");
    } finally {
      setSending(false);
    }
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await apiPost("/chatbot/lead", { visitorId: getVisitorId(), ...leadForm });
      pushMessage("bot", `Thanks ${leadForm.name}! Our team will reach out at ${leadForm.email} shortly.`);
      setMode("chat");
      setLeadForm({ name: "", email: "", phone: "", interestedService: "" });
    } catch {
      pushMessage("bot", "Couldn't save your details — please try the Contact page instead.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-4 flex h-[70vh] max-h-[30rem] w-[calc(100vw-3rem)] max-w-80 flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-xl">
          <div className="bg-accent flex items-center justify-between px-4 py-3">
            <p className="text-sm font-semibold text-white">Secbyte Assistant</p>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-white/80 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  m.sender === "user"
                    ? "ml-auto bg-accent text-white"
                    : m.sender === "agent"
                    ? "border border-accent/40 bg-accent/10 text-ink"
                    : "bg-surface2 text-ink"
                }`}
              >
                {m.text}
              </div>
            ))}

            {mode === "lead-form" && (
              <form onSubmit={handleLeadSubmit} className="space-y-2 rounded-lg border border-border bg-surface2 p-3">
                <p className="text-xs font-semibold text-ink">Leave your details, we'll reach out:</p>
                <input
                  required
                  placeholder="Name"
                  value={leadForm.name}
                  onChange={(e) => setLeadForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-md border border-border bg-surface px-2 py-1.5 text-sm text-ink outline-none focus:border-accent"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={leadForm.email}
                  onChange={(e) => setLeadForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full rounded-md border border-border bg-surface px-2 py-1.5 text-sm text-ink outline-none focus:border-accent"
                />
                <input
                  placeholder="Phone"
                  value={leadForm.phone}
                  onChange={(e) => setLeadForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full rounded-md border border-border bg-surface px-2 py-1.5 text-sm text-ink outline-none focus:border-accent"
                />
                <input
                  placeholder="Interested service (optional)"
                  value={leadForm.interestedService}
                  onChange={(e) => setLeadForm((f) => ({ ...f, interestedService: e.target.value }))}
                  className="w-full rounded-md border border-border bg-surface px-2 py-1.5 text-sm text-ink outline-none focus:border-accent"
                />
                <div className="flex gap-2">
                  <button type="submit" disabled={sending} className="btn-primary flex-1 !px-3 !py-1.5 text-xs">
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("chat")}
                    className="btn-secondary flex-1 !px-3 !py-1.5 text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div ref={endRef} />
          </div>

          {mode === "chat" && (
            <div className="flex gap-2 border-t border-border px-3 py-2">
              <button
                onClick={() => setMode("lead-form")}
                className="flex flex-1 items-center justify-center gap-1 rounded-md border border-border px-2 py-1.5 text-xs text-muted hover:border-accent hover:text-accent"
              >
                <UserRoundPlus className="h-3.5 w-3.5" /> Get a callback
              </button>
              <button
                onClick={handleEscalate}
                className="flex flex-1 items-center justify-center gap-1 rounded-md border border-border px-2 py-1.5 text-xs text-muted hover:border-accent hover:text-accent"
              >
                <Headset className="h-3.5 w-3.5" /> Talk to a human
              </button>
            </div>
          )}

          {mode !== "lead-form" && (
            <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-border p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-md border border-border bg-surface2 px-3 py-2 text-sm text-ink outline-none focus:border-accent"
              />
              <button type="submit" disabled={sending} className="bg-accent rounded-md p-2 text-white disabled:opacity-60" aria-label="Send">
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="bg-accent flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}