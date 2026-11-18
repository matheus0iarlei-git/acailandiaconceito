import { useEffect, useState } from "react";
import { ArrowUp, ImageOff, Search, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatPrice, type Category, type Product } from "@/data/menu";

export function PriceTag({ product }: { product: Product }) {
  if (product.variations?.length) {
    return (
      <span className="font-display text-2xl leading-none text-highlight">
        {product.variations.map((v) => formatPrice(v.price)).join(" · ")}
      </span>
    );
  }
  if (product.price == null) return null;
  return <span className="font-display text-2xl leading-none text-highlight">{formatPrice(product.price)}</span>;
}

function Photo({ product, className }: { product: Product; className: string }) {
  if (!product.image)
    return (
      <div className={`${className} flex flex-col items-center justify-center gap-1 bg-muted text-muted-foreground`}>
        <ImageOff className="h-6 w-6" />
        <span className="text-xs">Foto em breve</span>
      </div>
    );
  return <img src={product.image} alt={product.name} loading="lazy" className={`${className} object-cover`} />;
}

export function ProductCard({ product, onOpen }: { product: Product; onOpen: (p: Product) => void }) {
  return (
    <Button
      variant="product"
      onClick={() => onOpen(product)}
      className="group flex h-auto w-full items-stretch justify-start gap-0 overflow-hidden rounded-lg p-0 text-left whitespace-normal sm:flex-col"
    >
      <Photo product={product} className="w-28 min-h-36 shrink-0 self-stretch sm:aspect-[4/3] sm:w-full sm:min-h-0" />
      <div className="flex min-w-0 flex-1 flex-col p-3.5 sm:p-5">
        <div className="flex items-start gap-2">
          <h3 className="font-display text-2xl leading-tight text-vintage sm:text-3xl">{product.name}</h3>
          {product.isNew && <span className="rounded-sm bg-primary px-1.5 text-[10px] font-bold uppercase text-primary-foreground">Novo</span>}
        </div>
        {product.description && <p className="mt-1 line-clamp-3 text-sm font-normal leading-relaxed text-muted-foreground">{product.description}</p>}
        <div className="mt-auto flex flex-wrap items-end justify-between gap-2 pt-3">
          <PriceTag product={product} />
           <span className="text-xs font-semibold text-muted-foreground transition-colors group-hover:text-primary">Detalhes ↗</span>
        </div>
      </div>
    </Button>
  );
}

export function CompactList({ category }: { category: Category }) {
  return (
    <ul className="divide-y divide-border rounded-lg border border-border bg-card">
      {category.products.map((p) => (
        <li key={p.id} className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
          <span className="text-foreground">{p.name}</span>
          {p.price != null && <span className="font-display text-lg text-highlight">{formatPrice(p.price)}</span>}
        </li>
      ))}
    </ul>
  );
}

export function ProductDialog({ product, onClose }: { product: Product | null; onClose: () => void }) {
  return (
    <Dialog open={!!product} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[92vh] w-[calc(100%-1.5rem)] max-w-md overflow-y-auto border-primary/60 bg-card p-0">
        {product && (
          <>
            <Photo product={product} className="aspect-square w-full rounded-t-lg" />
            <div className="space-y-3 p-5">
              <DialogTitle className="font-display text-3xl text-vintage">{product.name}</DialogTitle>
              {product.description && <DialogDescription className="text-base text-muted-foreground">{product.description}</DialogDescription>}
              {product.variations ? (
                <ul className="space-y-2">
                  {product.variations.map((v) => (
                    <li key={v.label} className="flex justify-between rounded-md border border-border px-3 py-2">
                      <span>{v.label}</span>
                      <span className="font-display text-xl text-highlight">{formatPrice(v.price)}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <PriceTag product={product} />
              )}
              <p className="pt-2 text-xs text-muted-foreground">Faça seu pedido diretamente com a nossa equipe.</p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <label className="relative block">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar no cardápio…"
        aria-label="Buscar produto"
        className="h-12 w-full rounded-md border border-border bg-card pl-12 pr-11 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
      />
      {value && (
        <Button variant="ghost" size="icon" onClick={() => onChange("")} aria-label="Limpar busca" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
          <X className="h-5 w-5" />
        </Button>
      )}
    </label>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <Button
      size="icon"
      aria-label="Voltar ao topo"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-5 right-5 z-40 h-12 w-12 rounded-md border border-primary/40 bg-card text-vintage shadow-garage transition-all ${show ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}
