import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Instagram, Wifi } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { allergens, categories, searchProducts, type Product } from "@/data/menu";
import { BackToTop, CompactList, ProductCard, ProductDialog, SearchBar } from "@/components/menu/MenuParts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cardápio — Açaílândia Garage Club House" },
      { name: "description", content: "Cardápio digital da Açaílândia Garage: burgers artesanais, smash, hot dogs, porções, nitro shakes e sucos." },
      { property: "og:title", content: "Cardápio — Açaílândia Garage" },
      { property: "og:description", content: "Seu próximo favorito está aqui. Confira o cardápio da Açaílândia Garage." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Product | null>(null);
  const results = useMemo(() => searchProducts(query), [query]);
  const featured = categories.flatMap((c) => c.products).filter((p) => p.featured);

  const go = (id: string) => {
    setQuery("");
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="relative px-5 pb-6 pt-8 text-center">
        <div className="absolute inset-x-0 top-0 h-64 bg-glow" aria-hidden />
        <img src={logo.url} alt="Açaílândia Club House — Since 2014" width={128} height={128} className="relative mx-auto h-32 w-32 drop-shadow-neon" />
        <p className="relative mt-3 font-display text-4xl leading-none tracking-wide">
          Açaílândia <span className="text-primary">Garage</span>
        </p>
        <h1 className="relative mt-3 text-lg text-muted-foreground">Seu próximo favorito está aqui.</h1>
        <div className="relative mx-auto mt-5 max-w-xl">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </header>

      <nav className="sticky top-0 z-30 border-y border-border bg-background/90 backdrop-blur" aria-label="Categorias">
        <div className="no-scrollbar mx-auto flex max-w-3xl gap-2 overflow-x-auto px-4 py-3">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => go(c.id)}
              className="shrink-0 rounded-full border border-border px-4 py-2 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {c.name}
            </button>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-4 pb-16">
        {!query && featured.length > 0 && (
          <section className="pt-8">
            <SectionTitle title="Mais pedidos" />
            <div className="grid gap-3 sm:grid-cols-2">
              {featured.map((p) => <ProductCard key={p.id} product={p} onOpen={setOpen} />)}
            </div>
          </section>
        )}

        {results.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">Nenhum produto encontrado para “{query}”.</p>
        )}

        {results.map((c) => (
          <section key={c.id} id={c.id} className="scroll-mt-20 pt-8">
            <SectionTitle title={c.name} subtitle={c.subtitle} />
            {c.compact ? (
              <CompactList category={c} />
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {c.products.map((p) => <ProductCard key={p.id} product={p} onOpen={setOpen} />)}
              </div>
            )}
          </section>
        ))}
      </main>

      <footer className="border-t border-border px-5 py-10 text-center text-sm text-muted-foreground">
        <div className="checker mx-auto mb-6 h-3 max-w-3xl" aria-hidden />
        <a href="https://instagram.com/acailandiaoficial_" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-foreground hover:text-primary">
          <Instagram className="h-5 w-5" /> @acailandiaoficial_
        </a>
        <p className="mt-3 inline-flex w-full items-center justify-center gap-2">
          <Wifi className="h-4 w-4 text-primary" /> Wi-Fi: <strong className="text-foreground">Açaílândia saboroso</strong>
        </p>
        <p className="mt-4">Pode conter: {allergens.join(", ")}. Consulte a equipe.</p>
        <p className="mt-4 font-display text-lg tracking-widest text-foreground">Club House · Since 2014</p>
      </footer>

      <ProductDialog product={open} onClose={() => setOpen(null)} />
      <BackToTop />
    </div>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string | undefined }) {
  return (
    <div className="mb-4">
      <div className="checker mb-3 h-2 w-24" aria-hidden />
      <h2 className="font-display text-4xl leading-none tracking-wide">
        {title} {subtitle && <span className="text-xl text-highlight">{subtitle}</span>}
      </h2>
    </div>
  );
}
