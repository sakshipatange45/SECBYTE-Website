import { useEffect, useState } from "react";
import SectionHeading from "../components/SectionHeading";
import TestimonialCard from "../components/TestimonialCard";
import Seo from "../components/Seo";
import { apiGet } from "../lib/api";
import { testimonials as fallbackTestimonials } from "../lib/data";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/testimonials")
      .then((res) => {
        if (res.data && res.data.length > 0) setTestimonials(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <Seo title="Testimonials" description="What clients say about working with Secbyte Technologies." />
      <SectionHeading eyebrow="clients --reviews --all" title="What clients say" />
      {loading && <p className="mt-8 text-center text-sm text-muted">Loading testimonials...</p>}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <TestimonialCard key={t.clientName} testimonial={t} />
        ))}
      </div>
    </div>
  );
}