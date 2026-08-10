import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Seo from "../components/Seo";
import { apiGet } from "../lib/api";
import { blogPosts as fallbackPosts } from "../lib/data";

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(() => fallbackPosts.find((p) => p.slug === slug) || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet(`/blog/${slug}`)
      .then((res) => {
        if (res.data) setPost(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <p className="mx-auto max-w-3xl px-6 py-24 text-center text-sm text-muted">Loading...</p>;
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="text-ink">Post not found.</p>
        <Link to="/blog" className="mt-4 inline-block text-accent">Back to blog</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <Seo title={post.title} description={post.excerpt} />
      <p className="mb-4 font-mono text-xs tracking-wide text-accent">blog/{post.slug}</p>
      <h1 className="font-display text-4xl font-semibold text-ink">{post.title}</h1>
      <p className="mt-4 text-lg text-muted">{post.excerpt}</p>

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="mt-8 h-72 w-full rounded-xl border border-border object-cover"
        />
      )}

      <div className="mt-10 space-y-4 border-t border-border pt-8 text-muted">
        <p>{post.content}</p>
        <p>
          Category: <span className="text-ink">{post.category}</span>
        </p>
      </div>

      <Link to="/blog" className="mt-10 inline-block text-sm text-accent">
        ← Back to all posts
      </Link>
    </div>
  );
}