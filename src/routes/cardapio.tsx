import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Bike, Instagram, Star, Wifi } from "lucide-react";

const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJg5oc4WJIxwcRplm5vP_ZISs";
const ANOTA_AI_URL = "https://pedido.anota.ai/loja/acailandia-4";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png.asset.json";
import { allergens, categories, searchProducts, type Product } from "@/data/menu";
import { BackToTop, CompactList, ProductCard, ProductDialog, SearchBar } from "@/components/menu/MenuParts";

export const Route = createFileRoute("/cardapio")({
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
  component: Cardapio,
});

function Cardapio() {
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
      <header className="garage-header relative px-5 pb-6 pt-7 text-center sm:pb-8 sm:pt-10">
        <Link to="/" className="absolute left-4 top-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-muted-foreground transition-colors hover:text-primary sm:left-6 sm:top-6">
          <ArrowLeft className="h-4 w-4" /> Início
        </Link>
        <div className="relative mx-auto flex max-w-3xl items-center justify-center gap-4 sm:gap-6">
          <img src={logo.url} alt="Açaílândia Club House — Since 2014" width={128} height={128} className="h-24 w-24 shrink-0 object-contain sm:h-32 sm:w-32" />
          <div className="text-left">
            <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Club House · Since 2014</p>
            <h1 className="font-display text-4xl leading-none text-vintage sm:text-6xl">
              Açaílândia <span className="block italic text-primary">Garage</span>
            </h1>
          </div>
        </div>
        <p className="relative mt-5 text-base text-muted-foreground">Seu próximo favorito está aqui.</p>
        <div className="relative mx-auto mt-4 max-w-xl">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </header>

      <nav className="sticky top-0 z-30 border-y border-border bg-background/90 backdrop-blur" aria-label="Categorias">
        <div className="no-scrollbar mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 py-3">
          {categories.map((c, i) => (
            <Button
              variant="category"
              key={c.id}
              onClick={() => go(c.id)}
              className="h-10 shrink-0 rounded-sm px-3 text-sm font-semibold uppercase"
            >
              <span aria-hidden className="font-mono text-[10px] text-primary">{String(i + 1).padStart(2, "0")}</span>
              {c.name}
            </Button>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
        {!query && featured.length > 0 && (
          <section className="pt-8">
            <SectionTitle title="Mais pedidos" />
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {featured.map((p) => <ProductCard key={p.id} product={p} onOpen={setOpen} />)}
            </div>
          </section>
        )}

        {results.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">Nenhum produto encontrado para “{query}”.</p>
        )}

        {results.map((c) => (
          <section key={c.id} id={c.id} className="scroll-mt-20 pt-8 sm:pt-10">
            <SectionTitle title={c.name} subtitle={c.subtitle} number={categories.findIndex((category) => category.id === c.id) + 1} />
            {c.compact ? (
              <CompactList category={c} />
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                {c.products.map((p) => <ProductCard key={p.id} product={p} onOpen={setOpen} />)}
              </div>
            )}
          </section>
        ))}
      </main>

      <footer className="border-t border-border px-5 py-10 text-center text-sm text-muted-foreground">
        <div className="checker mx-auto mb-6 h-2 w-24" aria-hidden />
        <a href={ANOTA_AI_URL} target="_blank" rel="noreferrer" className="mx-auto mb-8 flex max-w-xs items-center justify-center gap-3 rounded-lg border border-primary/50 bg-primary px-5 py-4 text-primary-foreground shadow-garage transition-colors hover:bg-primary/90">
          <Bike className="h-6 w-6" />
          <span className="text-left">
            <span className="block font-display text-xl leading-none tracking-wide">Peça no Anota AI</span>
            <span className="mt-0.5 block text-xs opacity-80">Delivery rápido na sua casa</span>
          </span>
        </a>
        <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noreferrer" className="mx-auto mb-8 flex max-w-xs flex-col items-center gap-2 rounded-lg border border-border px-5 py-4 text-foreground transition-colors hover:border-primary">
          <span className="font-display text-xl tracking-wide text-vintage">Curtiu? Avalie a gente</span>
          <span className="flex gap-1" aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-6 w-6 fill-highlight text-highlight" />)}
          </span>
          <span className="text-sm underline underline-offset-4">Deixar avaliação no Google</span>
        </a>
        <a href="https://instagram.com/acailandiaoficial_" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-foreground hover:text-primary">
          <Instagram className="h-5 w-5" /> @acailandiaoficial_
        </a>
        <p className="mt-3 inline-flex w-full items-center justify-center gap-2">
          <Wifi className="h-4 w-4 text-primary" /> Wi-Fi: <strong className="text-foreground">Açaílândia saboroso</strong>
        </p>
        <p className="mt-4">Pode conter: {allergens.join(", ")}. Consulte a equipe.</p>
        <p className="mt-4 font-display text-lg text-vintage">Club House · Since 2014</p>
      </footer>

      <ProductDialog product={open} onClose={() => setOpen(null)} />
      <BackToTop />
    </div>
  );
}

function SectionTitle({ title, subtitle, number }: { title: string; subtitle?: string | undefined; number?: number }) {
  return (
    <div className="garage-section mb-4 flex items-center gap-3 sm:mb-5">
      {number && <span aria-hidden className="garage-number flex h-10 w-10 shrink-0 items-center justify-center rounded-sm font-display text-2xl text-vintage">{String(number).padStart(2, "0")}</span>}
      <div className="min-w-0">
        <h2 className="font-display text-3xl leading-none text-vintage sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-1 text-xs font-semibold uppercase text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="ml-auto hidden flex-1 items-center gap-3 sm:flex" aria-hidden>
        <div className="h-px flex-1 bg-border" />
        <div className="checker h-2 w-8 shrink-0" />
      </div>
    </div>
  );
}
