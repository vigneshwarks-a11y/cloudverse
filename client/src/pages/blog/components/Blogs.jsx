"use client";
import { useMemo, useState } from "react";
import { Link } from "wouter";

const formatDisplayDate = (value = "") => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const Blogs = ({ blogData }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleBlogs = useMemo(() => {
    if (showAll) return blogData;
    return blogData.slice(0, 12);
  }, [blogData, showAll]);

  const showLoadMore = !showAll && blogData.length > 12;

  return (
    <section className="pt-6 pb-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleBlogs.map((item) => (
            <Link
              href={item.path}
              key={item.id}
              className="h-full rounded-2xl border border-cv-line bg-cv-surface2 p-6 transition-colors hover:bg-cv-line/20 block"
            >
              <div className="flex h-full flex-col">
                <h2 className="text-lg text-cv-ink leading-snug mb-3 line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-sm text-cv-muted mb-6 line-clamp-4">{item.desc}</p>
                <div className="mt-auto flex items-center justify-between text-xs text-cv-muted/80">
                  <span>{item.name || "CloudVerse Team"}</span>
                  <span>{formatDisplayDate(item.date)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {showLoadMore ? (
          <div className="pt-16 text-center">
            <button
              className="inline-flex items-center rounded-full border-2 border-cv-line px-8 py-3  text-cv-ink hover:border-primary hover:text-primary transition-colors"
              onClick={() => setShowAll(true)}
            >
              Read More Posts
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Blogs;
