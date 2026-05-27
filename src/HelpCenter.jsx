import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  MessageCircle,
  Search,
  Sparkles,
  ScanFace,
  CalendarDays,
  BarChart3,
  User,
  Bell,
  Smartphone,
  Users,
  Wrench,
  Lock,
  FileText,
  LifeBuoy,
  X
} from "lucide-react";
import { HELP_CATEGORIES, POPULAR_TOPICS } from "./helpData";

const smoothEase = [0.23, 1, 0.32, 1];

const CATEGORY_ICONS = {
  "getting-started": Sparkles,
  "attendance": ScanFace,
  "events": CalendarDays,
  "reports": BarChart3,
  "account": User,
  "notifications": Bell,
  "mobile-app": Smartphone,
  "roles": Users,
  "troubleshooting": Wrench,
  "privacy": Lock,
  "privacy-policy": FileText,
  "terms": FileText,
  "contact": MessageCircle
};

const renderBody = (paragraphs) =>
  paragraphs.map((p, i) => {
    const segments = p.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="mt-5 text-[15px] leading-[1.75] text-zinc-300 first:mt-0 md:text-base">
        {segments.map((seg, j) => {
          if (seg.startsWith("**") && seg.endsWith("**")) {
            return <strong key={j} className="font-semibold text-white">{seg.slice(2, -2)}</strong>;
          }
          return <React.Fragment key={j}>{seg}</React.Fragment>;
        })}
      </p>
    );
  });

const TopBar = ({ onBack, onSearchFocus }) => (
  <div className="sticky top-0 z-30 border-b border-zinc-900 bg-black/85 backdrop-blur-md">
    <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4 md:py-5">
      <button
        onClick={onBack}
        className="group flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
        aria-label="Back to Aura home"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" strokeWidth={1.8} />
        <span className="hidden sm:inline">Back to Aura</span>
      </button>
      <div className="ml-auto flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
        <LifeBuoy className="h-3.5 w-3.5" />
        Help Center
      </div>
    </div>
  </div>
);

const HeroSearch = ({ value, onChange, inputRef, onTopicClick }) => (
  <section className="relative overflow-hidden border-b border-zinc-900 bg-gradient-to-b from-zinc-950 to-black">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_55%)]" />
    <div className="relative mx-auto max-w-3xl px-6 py-16 text-center md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: smoothEase }}
        className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-300"
      >
        <Sparkles className="h-3.5 w-3.5 text-zinc-400" />
        Aura Help Center
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05, ease: smoothEase }}
        className="mt-6 text-4xl font-black tracking-tight text-white md:text-6xl"
      >
        How can we help?
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: smoothEase }}
        className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed text-zinc-400 md:text-lg"
      >
        Browse the topics below, or search for what you're stuck on.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: smoothEase }}
        className="mx-auto mt-10 max-w-xl"
      >
        <div className="group relative">
          <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-white" strokeWidth={1.8} />
          <input
            ref={inputRef}
            type="text"
            inputMode="search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search articles…"
            className="w-full rounded-full border border-zinc-800 bg-zinc-950/80 py-4 pl-14 pr-14 text-base text-white placeholder:text-zinc-500 transition-colors focus:border-zinc-600 focus:outline-none focus:ring-0"
          />
          {value && (
            <button
              onClick={() => onChange("")}
              className="absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-900 hover:text-white"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
        className="mt-6 flex flex-wrap items-center justify-center gap-2"
      >
        <span className="text-xs uppercase tracking-[0.18em] text-zinc-600">Popular</span>
        {POPULAR_TOPICS.map((t) => (
          <button
            key={`${t.categoryId}-${t.articleId}`}
            onClick={() => onTopicClick(t.categoryId, t.articleId)}
            className="rounded-full border border-zinc-800 bg-zinc-950/60 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-all hover:border-zinc-600 hover:bg-zinc-900 hover:text-white"
          >
            {t.label}
          </button>
        ))}
      </motion.div>
    </div>
  </section>
);

const Sidebar = ({ activeId, onSelect, articleCounts }) => (
  <aside className="md:sticky md:top-32 md:self-start">
    <div className="px-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">Topics</div>
    <nav className="mt-3 flex flex-row gap-2 overflow-x-auto pb-2 md:flex-col md:gap-0.5 md:overflow-visible md:pb-0">
      {HELP_CATEGORIES.map((cat) => {
        const Icon = CATEGORY_ICONS[cat.id] || Sparkles;
        const isActive = cat.id === activeId;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`group flex flex-shrink-0 items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-all md:flex-shrink ${
              isActive
                ? "bg-white/[0.06] text-white"
                : "text-zinc-400 hover:bg-white/[0.03] hover:text-white"
            }`}
          >
            <Icon
              className={`h-4 w-4 flex-shrink-0 ${isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"}`}
              strokeWidth={1.6}
            />
            <span className="whitespace-nowrap text-sm font-medium md:whitespace-normal">{cat.label}</span>
            <span className={`ml-auto hidden text-xs tabular-nums md:inline ${isActive ? "text-zinc-400" : "text-zinc-600"}`}>
              {articleCounts[cat.id]}
            </span>
          </button>
        );
      })}
    </nav>
  </aside>
);

const ArticleRow = ({ article, onClick, index }) => (
  <motion.button
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.03, ease: smoothEase }}
    onClick={onClick}
    className="group flex w-full items-start justify-between gap-6 border-b border-zinc-900 px-2 py-6 text-left transition-colors last:border-b-0 hover:bg-white/[0.02] md:px-4"
  >
    <div className="flex-1">
      <h4 className="text-base font-medium text-white transition-colors md:text-[17px]">
        {article.title}
      </h4>
      {article.excerpt && (
        <p className="mt-1 text-sm leading-relaxed text-zinc-500">{article.excerpt}</p>
      )}
    </div>
    <ChevronRight className="mt-1 h-4 w-4 flex-shrink-0 text-zinc-600 transition-all group-hover:translate-x-0.5 group-hover:text-white" strokeWidth={1.8} />
  </motion.button>
);

const CategoryView = ({ category, onOpenArticle }) => (
  <div>
    <div className="mb-8 md:mb-10">
      <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{category.label}</h2>
      <p className="mt-2 text-base font-light leading-relaxed text-zinc-400 md:text-lg">{category.blurb}</p>
    </div>
    <div className="border-t border-zinc-900">
      {category.articles.map((article, i) => (
        <ArticleRow
          key={article.id}
          article={article}
          index={i}
          onClick={() => onOpenArticle(article.id)}
        />
      ))}
    </div>
  </div>
);

const ArticleView = ({ category, article, onBack, onOpenArticle }) => {
  const related = useMemo(
    () => category.articles.filter((a) => a.id !== article.id).slice(0, 4),
    [category, article]
  );
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: smoothEase }}
    >
      <button
        onClick={onBack}
        className="group mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" strokeWidth={1.8} />
        {category.label}
      </button>

      <h2 className="text-3xl font-bold tracking-tight text-white md:text-[2.5rem] md:leading-[1.1]">
        {article.title}
      </h2>
      {article.excerpt && (
        <p className="mt-3 text-base font-light leading-relaxed text-zinc-400 md:text-lg">{article.excerpt}</p>
      )}

      <div className="mt-10 max-w-2xl border-t border-zinc-900 pt-10">
        {renderBody(article.body)}
      </div>

      {related.length > 0 && (
        <div className="mt-16 border-t border-zinc-900 pt-10">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">More in {category.label}</h3>
          <div className="mt-4">
            {related.map((r, i) => (
              <ArticleRow
                key={r.id}
                article={r}
                index={i}
                onClick={() => onOpenArticle(r.id)}
              />
            ))}
          </div>
        </div>
      )}
    </motion.article>
  );
};

const SearchResults = ({ query, results, onOpen }) => (
  <div>
    <div className="mb-8 md:mb-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
        {results.length} {results.length === 1 ? "result" : "results"} for
      </p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">"{query}"</h2>
    </div>
    {results.length === 0 ? (
      <div className="border-t border-zinc-900 py-12 text-center">
        <p className="text-base text-zinc-400">No articles match your search.</p>
        <p className="mt-2 text-sm text-zinc-600">Try a shorter query or browse a topic from the left.</p>
      </div>
    ) : (
      <div className="border-t border-zinc-900">
        {results.map((r, i) => (
          <motion.button
            key={`${r.categoryId}-${r.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.03, ease: smoothEase }}
            onClick={() => onOpen(r.categoryId, r.id)}
            className="group flex w-full items-start justify-between gap-6 border-b border-zinc-900 px-2 py-6 text-left transition-colors last:border-b-0 hover:bg-white/[0.02] md:px-4"
          >
            <div className="flex-1">
              <div className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">{r.categoryLabel}</div>
              <h4 className="mt-1 text-base font-medium text-white md:text-[17px]">{r.title}</h4>
              {r.excerpt && <p className="mt-1 text-sm leading-relaxed text-zinc-500">{r.excerpt}</p>}
            </div>
            <ChevronRight className="mt-1 h-4 w-4 flex-shrink-0 text-zinc-600 transition-all group-hover:translate-x-0.5 group-hover:text-white" strokeWidth={1.8} />
          </motion.button>
        ))}
      </div>
    )}
  </div>
);

const ContactCard = () => (
  <div className="mt-16 rounded-3xl border border-zinc-900 bg-zinc-950/60 p-8 md:mt-20 md:p-10">
    <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-black">
          <MessageCircle className="h-5 w-5" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Still stuck?</h3>
          <p className="mt-1 max-w-md text-sm leading-relaxed text-zinc-400">
            Most issues are fastest to resolve via your campus admin. We're an email away when you need us.
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
        <a
          href="mailto:auraautomessage@gmail.com?subject=Aura%20Help%20Request"
          className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
        >
          <MessageCircle className="h-4 w-4" />
          Email support
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  </div>
);

export default function HelpCenter({ goToHome, initialCategoryId, initialArticleId }) {
  const resolvedInitialCategory = useMemo(() => {
    if (initialCategoryId && HELP_CATEGORIES.some((c) => c.id === initialCategoryId)) return initialCategoryId;
    return HELP_CATEGORIES[0].id;
  }, [initialCategoryId]);
  const resolvedInitialArticle = useMemo(() => {
    if (!initialArticleId) return null;
    const cat = HELP_CATEGORIES.find((c) => c.id === resolvedInitialCategory);
    if (cat && cat.articles.some((a) => a.id === initialArticleId)) return initialArticleId;
    return null;
  }, [resolvedInitialCategory, initialArticleId]);

  const [activeCategoryId, setActiveCategoryId] = useState(resolvedInitialCategory);
  const [activeArticleId, setActiveArticleId] = useState(resolvedInitialArticle);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const contentRef = useRef(null);

  // React to prop changes (e.g., user navigates via hash from another page)
  useEffect(() => {
    setActiveCategoryId(resolvedInitialCategory);
    setActiveArticleId(resolvedInitialArticle);
  }, [resolvedInitialCategory, resolvedInitialArticle]);

  const activeCategory = useMemo(
    () => HELP_CATEGORIES.find((c) => c.id === activeCategoryId) || HELP_CATEGORIES[0],
    [activeCategoryId]
  );
  const activeArticle = useMemo(
    () => activeCategory.articles.find((a) => a.id === activeArticleId) || null,
    [activeCategory, activeArticleId]
  );

  const articleCounts = useMemo(
    () => HELP_CATEGORIES.reduce((acc, c) => ({ ...acc, [c.id]: c.articles.length }), {}),
    []
  );

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;
    const matches = [];
    for (const c of HELP_CATEGORIES) {
      for (const a of c.articles) {
        const haystack = `${a.title} ${a.excerpt || ""} ${(a.body || []).join(" ")}`.toLowerCase();
        if (haystack.includes(q)) {
          matches.push({
            categoryId: c.id,
            categoryLabel: c.label,
            id: a.id,
            title: a.title,
            excerpt: a.excerpt
          });
        }
      }
    }
    return matches;
  }, [searchQuery]);

  const syncHash = (categoryId, articleId) => {
    if (typeof window === "undefined") return;
    let next = "#help";
    if (categoryId) next += `/${categoryId}`;
    if (articleId) next += `/${articleId}`;
    if (window.location.hash !== next) {
      window.history.replaceState(null, "", next);
    }
  };

  const openCategory = (id) => {
    setSearchQuery("");
    setActiveCategoryId(id);
    setActiveArticleId(null);
    syncHash(id, null);
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openArticle = (categoryId, articleId) => {
    setSearchQuery("");
    setActiveCategoryId(categoryId);
    setActiveArticleId(articleId);
    syncHash(categoryId, articleId);
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const backToCategory = () => {
    setActiveArticleId(null);
    syncHash(activeCategoryId, null);
  };

  // Keyboard shortcut: "/" focuses search
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape" && searchQuery) {
        setSearchQuery("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-black pb-20 text-zinc-200">
      <TopBar onBack={(e) => goToHome && goToHome(e)} />
      <HeroSearch
        value={searchQuery}
        onChange={setSearchQuery}
        inputRef={searchInputRef}
        onTopicClick={openArticle}
      />

      <div ref={contentRef} className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[260px_1fr] md:gap-16">
          <Sidebar activeId={activeCategoryId} onSelect={openCategory} articleCounts={articleCounts} />

          <main className="min-w-0">
            <AnimatePresence mode="wait">
              {searchResults ? (
                <motion.div
                  key="search"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: smoothEase }}
                >
                  <SearchResults query={searchQuery} results={searchResults} onOpen={openArticle} />
                </motion.div>
              ) : activeArticle ? (
                <ArticleView
                  key={`${activeCategoryId}-${activeArticleId}`}
                  category={activeCategory}
                  article={activeArticle}
                  onBack={backToCategory}
                  onOpenArticle={(id) => openArticle(activeCategoryId, id)}
                />
              ) : (
                <motion.div
                  key={`cat-${activeCategoryId}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: smoothEase }}
                >
                  <CategoryView category={activeCategory} onOpenArticle={(id) => openArticle(activeCategoryId, id)} />
                </motion.div>
              )}
            </AnimatePresence>

            <ContactCard />
          </main>
        </div>
      </div>
    </div>
  );
}
