import Link from "next/link";

export const Sidebar = ({ sections, activeSection }) => (
  <div
    className="bg-white rounded-2xl border border-gray-100 p-2 space-y-1 shadow-md"
    style={{
      boxShadow:
        "0px 3.34px 5px -3.34px #0000001A, 0px 8.34px 12.51px -2.5px #0000001A",
    }}
  >
    {sections.map((section) => {
      const isActive = activeSection === section.id;
      return (
        <Link
          key={section.id}
          href={`/faq/${section.id}`}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive
              ? "[background:linear-gradient(180deg,#3A7BD5_0%,#2563EB_100%)] text-white shadow-md"
              : "text-[#4B5563] hover:bg-gray-50"
          }`}
        >
          <span className="font-normal text-xs">{section.title}</span>
        </Link>
      );
    })}
  </div>
);
