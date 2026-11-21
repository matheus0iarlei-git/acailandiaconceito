import { createFileRoute, Link } from "@tanstack/react-router";
import { Bike, Instagram, MapPin, MessageCircle, NotebookText, Star } from "lucide-react";

import logo from "@/assets/logo.png.asset.json";

const ANOTA_AI_URL = "https://pedido.anota.ai/loja/acailandia-4";
const WHATSAPP_URL = "https://wa.me/5585989356156?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20uma%20reserva%20na%20A%C3%A7a%C3%ADl%C3%A2ndia%20Garage.";
const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJg5oc4WJIxwcRplm5vP_ZISs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Açaílândia Garage — Club House" },
      { name: "description", content: "Açaílândia Garage Club House: cardápio digital, pedido online e reservas. Montese, Fortaleza." },
      { property: "og:title", content: "Açaílândia Garage — Club House" },
      { property: "og:description", content: "Cardápio, pedido online e reservas da Açaílândia Garage. Seu próximo favorito está aqui." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Hub,
});

function Hub() {
  return (
    <div className="garage-header flex min-h-screen flex-col items-center bg-background px-5 py-10 text-foreground sm:py-14">
      <div className="relative flex w-full max-w-md flex-1 flex-col items-center">
        <img src={logo.url} alt="Açaílândia Club House — Since 2014" width={160} height={160} className="h-36 w-36 object-contain sm:h-40 sm:w-40" />
        <p className="mt-5 text-xs font-semibold uppercase text-muted-foreground">Club House · Since 2014</p>
        <h1 className="mt-1 text-center font-display text-5xl leading-none text-vintage sm:text-6xl">
          Açaílândia <span className="italic text-primary">Garage</span>
        </h1>
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" /> Montese · Fortaleza
        </p>

        <div className="mt-9 flex w-full flex-col gap-3.5">
          <Link
            to="/cardapio"
            className="group flex items-center gap-4 rounded-lg border border-primary/50 bg-card px-5 py-4 shadow-garage transition-colors hover:border-primary"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <NotebookText className="h-6 w-6" />
            </span>
            <span className="min-w-0 flex-1 text-left">
              <span className="block font-display text-2xl leading-none tracking-wide text-vintage">Ver Cardápio</span>
              <span className="mt-1 block text-xs text-muted-foreground">Burgers, shakes, porções e mais</span>
            </span>
            <span aria-hidden className="font-mono text-[10px] text-primary">01</span>
          </Link>

          <a
            href={ANOTA_AI_URL}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 rounded-lg border border-border bg-card px-5 py-4 transition-colors hover:border-primary"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-highlight">
              <Bike className="h-6 w-6" />
            </span>
            <span className="min-w-0 flex-1 text-left">
              <span className="block font-display text-2xl leading-none tracking-wide text-vintage">Pedido Online</span>
              <span className="mt-1 block text-xs text-muted-foreground">Delivery pelo Anota AI</span>
            </span>
            <span aria-hidden className="font-mono text-[10px] text-primary">02</span>
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 rounded-lg border border-border bg-card px-5 py-4 transition-colors hover:border-primary"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-highlight">
              <MessageCircle className="h-6 w-6" />
            </span>
            <span className="min-w-0 flex-1 text-left">
              <span className="block font-display text-2xl leading-none tracking-wide text-vintage">Fazer Reserva</span>
              <span className="mt-1 block text-xs text-muted-foreground">Fale com a gente no WhatsApp</span>
            </span>
            <span aria-hidden className="font-mono text-[10px] text-primary">03</span>
          </a>
        </div>

        <div className="mt-auto flex w-full flex-col items-center gap-4 pt-10 text-sm text-muted-foreground">
          <div className="checker h-2 w-24" aria-hidden />
          <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary">
            <span className="flex gap-0.5" aria-hidden>
              {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-4 w-4 fill-highlight text-highlight" />)}
            </span>
            Avalie a gente no Google
          </a>
          <a href="https://instagram.com/acailandiaoficial_" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary">
            <Instagram className="h-4 w-4" /> @acailandiaoficial_
          </a>
        </div>
      </div>
    </div>
  );
}
