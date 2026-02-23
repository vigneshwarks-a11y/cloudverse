import { notFound } from "next/navigation";
import { faqCategories, getFaqCategoryBySlug } from "../data";
import { Sidebar } from "../components/Sidebar";

export const dynamicParams = false;

export function generateStaticParams() {
  return faqCategories.map((category) => ({
    slug: category.slug,
  }));
}

export function generateMetadata({ params }) {
  const category = getFaqCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: "FAQ | Ken42",
      description: "Explore higher education FAQ categories from Ken42.",
    };
  }

  const categoryTitle = category.heading || `${category.label} FAQs`;
  const categoryDescription =
    category.intro ||
    `${category.label} frequently asked questions for higher education institutions.`;

  return {
    title: `${categoryTitle} | Ken42`,
    description: categoryDescription,
    alternates: {
      canonical: `/faq/${category.slug}`,
    },
  };
}

export default function FaqCategoryPage({ params }) {
  const category = getFaqCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="mt-20">
      <div className="relative bg-gradient-to-r from-[#005b97] to-[#363795]">
        <div className="blog-bg">
          <div className="section-width 2xl:pt-44 xl:pt-40 lg:pt-36 md:pt-32 pt-28 pb-16">
            <h1 className="mb-0 text-center text-white xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-semibold leading-tight">
              FAQ
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-[#f4f8ff] via-white to-[#f7fbff] py-14 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-start md:gap-8 lg:gap-12 lg:px-8">
          <aside className="w-full md:w-[300px] md:shrink-0 lg:w-[320px] md:sticky md:top-40">
            <Sidebar
              sections={faqCategories.map((tab) => ({
                id: tab.slug,
                title: tab.label,
              }))}
              activeSection={category.slug}
            />
          </aside>


          <section className="flex-1 space-y-5">
            <div className="rounded-2xl border border-[#d7e5ff] bg-white p-6 shadow-[0_10px_30px_rgba(17,125,250,0.06)] sm:p-8">
              <h2 className="mb-0 text-left text-2xl font-semibold text-[#0a1f63]">
                {category.label} 
              </h2>
            </div>

            <div className="space-y-4">
              {category.questions.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-[#d7e5ff] bg-white p-6 shadow-[0_10px_25px_rgba(17,125,250,0.06)] sm:p-8"
                >
                  <h3 className="mb-4 text-left text-xl font-semibold text-[#0a1f63] sm:text-2xl">
                    {item.question}
                  </h3>

                  <div className="space-y-3">
                    {item.answer.map((paragraph, index) => (
                      <p
                        key={`${item.id}-answer-${index}`}
                        className="text-sm leading-relaxed text-[#344054] sm:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <p className="mt-5 inline-flex rounded-full  text-xs font-semibold uppercase tracking-wide text-[#117DFA]">
                    {item.tag}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
