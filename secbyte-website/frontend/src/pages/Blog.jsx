import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Search,
  ShieldCheck,
  Cloud,
  BrainCircuit,
  Code2,
} from "lucide-react";
import Seo from "../components/Seo";
import { apiGet } from "../lib/api";
import { blogPosts as fallbackPosts } from "../lib/data";
import blogHeroImg from "../assets/Blogs/bloghero2.png"; // <-- apli image ithe taka

const CATEGORY_ICONS = {
  "AI": BrainCircuit,
  "Cyber Security": ShieldCheck,
  "Web Development": Code2,
  "Software Engineering": Code2,
  "Technology": Cloud,
};

export default function Blog() {
  const [posts, setPosts] = useState(fallbackPosts);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    apiGet("/blog")
      .then((res) => {
        if (res.data?.length) setPosts(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(posts.map((post) => post.category))];

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCategory = category === "All" || post.category === category;
      const matchSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [posts, search, category]);

  const featuredPost = posts[0];
  const FeaturedIcon = featuredPost
    ? CATEGORY_ICONS[featuredPost.category] || ShieldCheck
    : ShieldCheck;

  return (
    <div className="bg-bg min-h-screen">
      <Seo title="Blog" description="Articles from Secbyte Technologies" />

      <style>{`
        .blog-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 35px -18px rgba(0,0,0,0.18);
        }
        .blog-card:hover .cover-img { transform: scale(1.08); }
        .cover-img { transition: transform 0.5s ease; }
        .blog-card { transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s ease both; }

        @media (prefers-reduced-motion: reduce) {
          .fade-up { animation: none; }
        }
      `}</style>

      {/* ================= HERO ================= */}
      <section className="relative mx-auto max-w-7xl px-6 pt-10">
        <div className="relative h-[420px] w-full overflow-hidden rounded-3xl md:h-[480px]">
          <img
            src={blogHeroImg}
            alt="Secbyte Blog"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Headline over image */}
          <div className="absolute left-8 top-8 max-w-md md:left-12 md:top-12">
            <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
              Secbyte Insights
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-white md:text-5xl">
              Sharp ideas for builders
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/80">
              AI, cybersecurity, web development, and engineering notes from
              the Secbyte team.
            </p>
          </div>

          {/* Floating featured post card */}
          {featuredPost && (
            <Link
              to={`/blog/${featuredPost.slug}`}
              className="absolute bottom-6 right-6 w-64 rounded-2xl border border-border bg-surface2/95 p-4 shadow-xl backdrop-blur transition hover:-translate-y-1 md:bottom-8 md:right-8"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">
                <FeaturedIcon size={11} />
                {featuredPost.category}
              </span>
              <h3 className="mt-2 text-sm font-bold leading-snug text-ink line-clamp-2">
                {featuredPost.title}
              </h3>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                Know more <ArrowUpRight size={12} />
              </span>
            </Link>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* ================= RECENT POSTS HEADER ================= */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-ink">
            Recent Posts
          </h2>
          <button
            onClick={() => setCategory("All")}
            className="flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all"
          >
            View all <ArrowRight size={15} />
          </button>
        </div>

        {/* ================= SEARCH + FILTERS ================= */}
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface2 py-3 pl-11 pr-4 text-sm text-ink outline-none transition focus:border-primary"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-xl border px-4 py-2 text-xs font-medium transition ${
                    isActive
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-surface2 text-muted hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= LOADING ================= */}
        {loading && (
          <p className="py-20 text-center text-sm text-muted">
            Loading articles…
          </p>
        )}

        {/* ================= BLOG GRID ================= */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, i) => {
            const image = post.coverImage || post.image;
            const CategoryIcon = CATEGORY_ICONS[post.category] || ShieldCheck;

            return (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="blog-card fade-up group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface2 hover:border-primary/40"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {image && (
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={image}
                      alt={post.title}
                      className="cover-img h-full w-full object-cover"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-bg/90 px-3 py-1 text-[11px] font-medium text-primary">
                      <CategoryIcon size={12} />
                      {post.category}
                    </span>
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-xl font-bold leading-snug text-ink line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="mt-3 flex-1 text-sm text-muted line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-all group-hover:gap-2.5">
                    Read article
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ================= EMPTY ================= */}
        {!loading && filteredPosts.length === 0 && (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-bold text-ink">No articles found</h2>
            <p className="mt-2 text-sm text-muted">
              Try another search term or category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}