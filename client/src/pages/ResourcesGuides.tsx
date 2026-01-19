import { BaseLayout } from "@/layouts/BaseLayout";
import { Button } from "@/components/Button";
import { Link, useSearch } from "wouter";
import { useEffect, useState, useMemo } from "react";
import { guides, categories } from "@/data/resourcesData";

export default function ResourcesGuides() {
  const searchParams = useSearch();
  const urlParams = new URLSearchParams(searchParams);
  const initialCategory = urlParams.get("category") || "All";
  const initialQuery = urlParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<"Newest" | "Featured">("Newest");

  useEffect(() => {
    document.title = "Guides — CloudVerse";
  }, []);

  const filtered = useMemo(() => {
    let result = guides.filter((guide) => {
      const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           guide.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || guide.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === "Featured") {
      result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else {
      result = [...result].sort((a, b) => {
        if (!a.date || !b.date) return 0;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <BaseLayout>
      {/* Header */}
      <section className="py-cv-sec-lg">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="max-w-[760px] mx-auto text-center space-y-4">
            <h1 className="cv-h1">Guides</h1>
            <p className="text-sm text-cv-muted">
              Playbooks and best practices for Finance, Engineering, and platform teams.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8 border-b border-cv-line">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="w-full md:w-80">
              <input
                type="text"
                placeholder="Search guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-lg border border-cv-line bg-cv-surface2 text-cv-ink placeholder:text-cv-muted/50 focus:outline-none focus:ring-1 focus:ring-primary"
                data-testid="input-search-guides"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-cv-muted">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "Newest" | "Featured")}
                className="px-3 py-2 text-sm rounded-lg border border-cv-line bg-cv-surface2 text-cv-ink focus:outline-none focus:ring-1 focus:ring-primary"
                data-testid="select-sort"
              >
                <option value="Newest">Newest</option>
                <option value="Featured">Featured</option>
              </select>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 mt-6">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
                selectedCategory === "All"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-cv-line bg-cv-surface2 text-cv-muted hover:bg-cv-line/30"
              }`}
              data-testid="filter-category-all"
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
                  selectedCategory === category
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-cv-line bg-cv-surface2 text-cv-muted hover:bg-cv-line/30"
                }`}
                data-testid={`filter-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-cv-sec-lg">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          {filtered.length === 0 ? (
            <p className="text-sm text-cv-muted text-center py-12">
              No guides found matching your criteria.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/resources/guides/${guide.slug}`}
                  className="block rounded-xl border border-cv-line bg-cv-surface2 p-6 hover:bg-cv-line/30 transition-colors"
                  data-track="resources_guide_open"
                  data-testid={`card-guide-${guide.slug}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium px-2 py-1 rounded border border-cv-line bg-cv-surface text-cv-muted">
                      {guide.category}
                    </span>
                    {guide.featured && (
                      <span className="text-xs font-medium px-2 py-1 rounded border border-primary/20 bg-primary/10 text-primary">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-cv-ink mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-cv-muted mb-4 line-clamp-2">
                    {guide.summary}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-cv-muted/70">
                    {guide.readingTime && <span>{guide.readingTime}</span>}
                    {guide.date && (
                      <>
                        <span>•</span>
                        <span>{new Date(guide.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-cv-sec-lg border-t border-cv-line">
        <div className="max-w-[760px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="cv-h2 mb-3">Need help with implementation?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
            <a href="https://meetings-na2.hubspot.com/cloudverse" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto">
                Book a demo
              </Button>
            </a>
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Contact sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
