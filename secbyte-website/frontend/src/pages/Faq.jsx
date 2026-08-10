import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import Seo from "../components/Seo";
import { apiGet } from "../lib/api";
import { faqs as fallbackFaqs } from "../lib/data";

export default function Faq() {
  const [faqs, setFaqs] = useState(fallbackFaqs);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    apiGet("/faqs")
      .then((res) => {
        if (res.data && res.data.length > 0) setFaqs(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <Seo title="FAQ" description="Frequently asked questions about Secbyte Technologies." />
      <SectionHeading eyebrow="faq --all" title="Frequently asked questions" />
      {loading && <p className="mt-8 text-center text-sm text-muted">Loading...</p>}
      <div className="mt-12 space-y-3">
        {faqs.map((f, i) => (
          <div key={f.question} className="rounded-lg border border-border bg-surface">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <span className="font-medium text-ink">{f.question}</span>
              <ChevronDown className={`h-4 w-4 shrink-0 text-accent transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
            </button>
            {openIndex === i && <p className="px-5 pb-4 text-sm text-muted">{f.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}