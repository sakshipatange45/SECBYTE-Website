import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Seo from "../components/Seo";
import { apiGet } from "../lib/api";
import { careers as fallbackCareers } from "../lib/data";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function CareerDetail() {
  const { slug } = useParams();
  const [job, setJob] = useState(() => fallbackCareers.find((j) => j.slug === slug) || null);
  const [loadingJob, setLoadingJob] = useState(true);

  const [form, setForm] = useState({ fullName: "", email: "", phone: "", coverLetter: "" });
  const [resume, setResume] = useState(null);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    apiGet(`/careers/${slug}`)
      .then((res) => {
        if (res.data) setJob(res.data);
      })
      .catch(() => {})
      .finally(() => setLoadingJob(false));
  }, [slug]);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      setStatus("error");
      setErrorMsg("Please attach your resume (PDF/DOC).");
      return;
    }
    setStatus("sending");
    setErrorMsg("");

    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      data.append("resume", resume);

      const res = await fetch(`${API_URL}/careers/${slug}/apply`, { method: "POST", body: data });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Application failed");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  if (loadingJob) {
    return <p className="mx-auto max-w-3xl px-6 py-24 text-center text-sm text-muted">Loading...</p>;
  }

  if (!job) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="text-ink">Job not found.</p>
        <Link to="/careers" className="mt-4 inline-block text-accent">Back to careers</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <Seo title={job.title} description={job.description || `${job.title} at Secbyte Technologies`} />
      <p className="mb-4 font-mono text-xs tracking-wide text-accent">careers/{job.slug}</p>
      <h1 className="font-display text-4xl font-semibold text-ink">{job.title}</h1>
      <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted">
        <span>{job.type}</span>
        <span>{job.department}</span>
        <span>{job.location}</span>
      </div>

      <div className="mt-8 space-y-3 text-muted">
        <p>{job.description || "We're looking for someone who cares about clean, secure code as much as shipping fast."}</p>
        <p>Send your resume below and we'll get back to you within a week.</p>
      </div>

      <h2 className="mt-12 font-display text-xl font-semibold text-ink">Apply now</h2>

      {status === "sent" ? (
        <div className="mt-4 rounded-lg border border-border bg-surface p-6">
          <p className="text-ink">Application received! We'll review it and reach out by email.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 rounded-lg border border-border bg-surface p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-muted">Full name</label>
              <input
                name="fullName"
                required
                value={form.fullName}
                onChange={handleChange}
                className="w-full rounded-md border border-border bg-surface2 px-3 py-2 text-sm text-ink outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted">Email</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-md border border-border bg-surface2 px-3 py-2 text-sm text-ink outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-md border border-border bg-surface2 px-3 py-2 text-sm text-ink outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted">Resume (PDF/DOC)</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
                className="w-full text-sm text-muted file:mr-3 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-2 file:text-bg"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted">Cover letter (optional)</label>
            <textarea
              name="coverLetter"
              rows={4}
              value={form.coverLetter}
              onChange={handleChange}
              className="w-full rounded-md border border-border bg-surface2 px-3 py-2 text-sm text-ink outline-none focus:border-accent"
            />
          </div>

          {status === "error" && <p className="text-sm text-signal">{errorMsg}</p>}

          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-md bg-accent px-5 py-3 font-semibold text-bg hover:bg-accent-dim disabled:opacity-60"
          >
            {status === "sending" ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      )}
    </div>
  );
}