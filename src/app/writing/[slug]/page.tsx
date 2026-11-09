import { notFound } from "next/navigation";
import { PageLayout } from "@/components/page/PageLayout";
import { pageMetadata, abs, ids } from "@/lib/seo";
import { posts } from "@/data/writing";

export const dynamicParams = false;

export function generateStaticParams() {
  // Next needs at least one entry for a static export; the placeholder 404s.
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "_" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { robots: { index: false } };
  return { ...pageMetadata({ path: `/writing/${post.slug}`, title: post.title, description: post.description }), openGraph: { type: "article", publishedTime: post.published, url: `/writing/${post.slug}`, title: post.title, description: post.description } };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const path = `/writing/${post.slug}`;
  return (
    <PageLayout
      path={path}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Writing", path: "/writing" },
        { name: post.title, path },
      ]}
      eyebrow={`${post.topic} · ${post.published}`}
      title={post.title}
      lede={<p>{post.description}</p>}
      description={post.description}
      extraSchema={[
        {
          "@type": "Article",
          headline: post.title,
          description: post.description,
          datePublished: post.published,
          dateModified: post.updated ?? post.published,
          author: { "@id": ids.person },
          publisher: { "@id": ids.person },
          mainEntityOfPage: abs(path),
        },
      ]}
    >
      <div className="prose-site max-w-2xl">
        {post.body.map((para, i) => (para.startsWith("## ") ? <h2 key={i} className="t-head text-[2rem] text-ink">{para.slice(3)}</h2> : <p key={i}>{para}</p>))}
      </div>
    </PageLayout>
  );
}
