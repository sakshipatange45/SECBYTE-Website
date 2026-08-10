import { useState } from "react";
import { apiPost } from "../lib/api";

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  serviceInterested: "",
  budget: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      await apiPost("/contact", form);
      setStatus("sent");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-border bg-surface p-6">
        <p className="mb-2 font-mono text-xs tracking-wide text-accent">status --last</p>
        <p className="text-ink">
          Thanks — your message is in. Someone from our team will reach out within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-border bg-surface p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Full name" name="fullName" value={form.fullName} onChange={handleChange} required />
        <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} />
        <Field label="Company" name="company" value={form.company} onChange={handleChange} />
        <Field label="Service interested in" name="serviceInterested" value={form.serviceInterested} onChange={handleChange} />
        <Field label="Budget" name="budget" value={form.budget} onChange={handleChange} />
      </div>
      <div>
        <label className="mb-1 block text-xs text-muted">Message</label>
        <textarea
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={handleChange}
          className="w-full rounded-md border border-border bg-surface2 px-3 py-2 text-sm text-ink outline-none focus:border-accent"
        />
      </div>

      {status === "error" && <p className="text-sm text-signal">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-md bg-accent px-5 py-3 font-semibold text-bg hover:bg-accent-dim disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

function Field({ label, name, value, onChange, type = "text", required = false }) {
  return (
    <div>
      <label className="mb-1 block text-xs text-muted">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-md border border-border bg-surface2 px-3 py-2 text-sm text-ink outline-none focus:border-accent"
      />
    </div>
  );
}