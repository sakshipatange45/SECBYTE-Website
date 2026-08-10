import { Helmet } from "react-helmet-async";

export default function Seo({ title, description }) {
  const fullTitle = title ? `${title} | Secbyte Technologies` : "Secbyte Technologies | Cybersecurity, Software & AI";
  const desc =
    description ||
    "Secbyte Technologies builds secure websites, software, mobile apps, cloud infrastructure, and AI solutions.";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}