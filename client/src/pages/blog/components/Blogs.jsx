"use client";
import { useMemo, useState } from "react";
import { Link } from "wouter";

const truncateWords = (value = "", wordLimit = 7) => {
  const words = value.trim().split(/\s+/);
  if (words.length <= wordLimit) return value;
  return `${words.slice(0, wordLimit).join(" ")}...`;
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
            <article
              className="h-full rounded-2xl border border-cv-line bg-cv-surface2 p-6 transition-colors hover:bg-cv-line/20"
              key={item.id}
            >
              <div className="flex h-full flex-col">
                <h2 className="text-lg  text-cv-ink leading-snug mb-8">
                  {item.title}
                </h2>
                <Link
                  href={item.path}
                  className="mt-auto inline-flex w-fit items-center rounded-full border-2 border-cv-line px-5 py-2 text-base font-medium text-cv-ink hover:border-primary hover:text-primary transition-colors"
                >
                  Read More
                </Link>
              </div>
            </article>
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
