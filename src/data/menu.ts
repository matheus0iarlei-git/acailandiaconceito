// Dados oficiais do cardápio (fonte: PDF impresso). Edite aqui nomes, preços e fotos.
const images = import.meta.glob<{ url: string }>("../assets/menu/*.asset.json", {
  eager: true,
  import: "default",
});
const img = (slug: string): string | undefined =>
  images[`../assets/menu/${slug}.webp.asset.json`]?.url;

export type Variation = { label: string; price: number };

export type Product = {
  id: string;
  name: string;
  description?: string | undefined;
  price?: number | undefined;
  variations?: Variation[] | undefined;
  image?: string | undefined;
  /** Definido pela equipe: aparece em "Mais pedidos" */
  featured?: boolean | undefined;
  /** Selo de novidade */
  isNew?: boolean | undefined;
  /** Informação a confirmar antes da publicação */
  needsReview?: boolean | undefined;
};

export type Category = {
  id: string;
  name: string;
  subtitle?: string | undefined;
  /** Lista compacta, sem fotos (adicionais, molhos) */
  compact?: boolean | undefined;
  products: Product[];
};

const p = (id: string, name: string, price: number, description?: string, extra: Partial<Product> = {}): Product => ({
  id,
  name,
  price,
  description,
  image: img(id),
  ...extra,
});

export const categories: Category[] = [
  {
    id: "burgers",
    name: "Burgers Artesanais",
    products: [
      p("pneu-de-doritos", "Pneu de Doritos", 39.9, "Pão brioche, blend 150g, queijo cheddar, Doritos, alface e tomate."),
      p("alinhamento-perfeito", "Alinhamento Perfeito", 37.9, "Pão brioche, blend de 150g, queijo prato, cebola crispy, picles, alface e tomate."),
      p("corte-de-giro", "Corte de Giro", 38.9, "Pão brioche, blend de 150g, queijo cheddar, fatia de bacon, cebola caramelizada, picles, alface e tomate."),
      p("po-de-pista", "Pó de Pista", 38.9, "Pão brioche, blend de 150g, farofa de bacon, rúcula, tomate seco, alface e tomate."),
      p("stage-1", "Açaílândia Stage 1", 33.9, "Pão brioche, blend de 150g, fatia de bacon, queijo cheddar, picles, alface e tomate."),
      p("acailandia-box", "Açaílândia Box", 34.9, "Pão brioche, blend de 150g, queijo prato, farofa de bacon, alface e tomate."),
      p("turbinado", "Turbinado Açaílândia", 47.9, "Pão brioche, 2 blend de 150g, queijo cheddar, fatia de bacon, picles, alface e tomate."),
    ],
  },
  {
    id: "smash",
    name: "Smash",
    products: [
      p("smash-rodao", "Smash Rodão", 27.9, "Pão brioche, blend de 80g, queijo cheddar, alface e tomate."),
      p("smash-marcha-lenta", "Smash Marcha Lenta", 26.9, "Pão brioche, blend de 80g, queijo cheddar, onion rings, alface e tomate."),
      p("smash-embreagem", "Smash Embreagem", 22.9, "Pão brioche, blend de 80g, queijo cheddar e cebola caramelizada."),
      p("smash-mini-piloto", "Smash Mini Piloto", 22.9, "Pão brioche, blend de 80g e queijo cheddar."),
    ],
  },
  {
    id: "hot-dogs",
    name: "Hot Dog's",
    products: [
      p("pit-stop-dog", "Pit Stop Dog", 27.9, "Pão hot dog brioche, duas salsichas, mussarela gratinada, cheddar cremoso, cebola crispy e maionese de bacon."),
      p("garagem-raiz", "Garagem Raiz", 32.9, "Pão hot dog brioche, duas salsichas, batata palha, mussarela gratinada, farofa de bacon e maionese de ervas finas."),
    ],
  },
  {
    id: "batatas",
    name: "Pneus de Batata",
    subtitle: "Porções",
    products: [
      p("pneu-liso", "Pneu Liso", 22.9, "300g de batata frita."),
      p("pneu-largo", "Pneu Largo", 25.9, "300g de batata frita com creme de cheddar e farofa de bacon."),
      p("torre-de-pneus", "Torre de Pneus", 33.9, "400g de batata frita, creme de cheddar e bacon."),
      p("kit-suspensao", "Kit Suspensão Completa", 37.9, "300g de batata frita, com carne do sol, bacon, queijo coalho ralado e cream cheese."),
    ],
  },
  {
    id: "petiscos",
    name: "Pit Stop de Sabor",
    subtitle: "Petiscos",
    products: [
      { id: "borracha-de-queijo", name: "Borracha de Queijo", description: "Bolinhas de queijo.", image: img("borracha-de-queijo"), variations: [{ label: "10 bolinhas", price: 16.9 }, { label: "20 bolinhas", price: 28.9 }] },
      { id: "peca-de-frango", name: "Peça de Frango", description: "Coxinhas de frango.", image: img("peca-de-frango"), variations: [{ label: "10 coxinhas", price: 16.9 }, { label: "20 coxinhas", price: 28.9 }] },
      p("parafuso-recheado", "Parafuso Recheado", 37.9, "12 pastéis de carne ou queijo."),
    ],
  },
  {
    id: "combos",
    name: "Largada Premiada",
    subtitle: "Combos",
    products: [
      p("combo-pit-stop", "Pit Stop", 44.9, "10 coxinhas ou bolinhas de queijo + batata 300g com cheddar e 1 refrigerante lata."),
      p("box-completo", "Box Completo", 64.9, "20 coxinhas ou bolinhas de queijo + 300g de batata com cheddar e bacon + 2 refrigerantes lata."),
      p("grid-hot", "Grid Hot — 10 pessoas", 349.9, "50 salgadinhos, 10 hot dogs 15cm, 10 batata frita (100g) e 10 refrigerantes em lata."),
      p("grid-smash", "Grid Smash — 10 pessoas", 459.9, "50 salgadinhos, 10 Açaílândia Smash, 10 batata frita (100g) e 10 refrigerantes em lata."),
    ],
  },
  {
    id: "nitro-shakes",
    name: "Nitro Shakes",
    subtitle: "400ml",
    products: [
      p("nitro-oreo", "Nitro Oreo", 24.9),
      p("nitro-morango", "Nitro Morango", 26.9),
      p("nitro-morango-nutella", "Nitro Morango com Nutella", 29.9),
      p("nitro-ovomaltine", "Nitro Ovomaltine", 27.9),
      p("nitro-ninho", "Nitro Ninho com Nutella", 28.9),
    ],
  },
  {
    id: "sucos",
    name: "Combustível Natural",
    subtitle: "Sucos 500ml",
    products: [
      p("fuel-maracuja", "Fuel Maracujá", 13.9),
      p("fuel-acerola", "Fuel Acerola", 13.9),
      p("fuel-goiaba", "Fuel Goiaba", 12.9),
      p("fuel-abacaxi-hortela", "Fuel Abacaxi com Hortelã", 13.9),
      p("fuel-laranja", "Fuel Laranja", 13.9),
      p("fuel-laranja-morango", "Fuel Laranja com Morango", 13.9),
      p("fuel-limao", "Fuel Limão", 13.9),
      p("fuel-abacaxi", "Fuel Abacaxi", 13.9),
      p("fuel-citrico", "Fuel Cítrico", 13.9, "Laranja, limão e acerola."),
    ],
  },
  {
    id: "vitaminas",
    name: "Full Tank",
    subtitle: "Vitaminas 500ml",
    products: [
      p("pit-stop-recovery", "Pit Stop Recovery", 32.9, "Açaí com banana e leite.", { image: img("full-tank") }),
      p("revisao-geral", "Revisão Geral", 32.9, "Açaí com morango e leite.", { image: img("full-tank") }),
      p("sprint-tropical", "Sprint Tropical", 32.9, "Maracujá.", { image: img("full-tank") }),
    ],
  },
  {
    id: "maromba",
    name: "Combustível Maromba",
    products: [
      p("banana-turbo", "Banana Turbo", 19.9, "Banana, amendoim torrado, 1 dose de whey."),
      p("pre-turbo", "Pré Turbo", 26.9, "Açaí fit, 1 banana, 1 dose de whey e aveia."),
      p("pos-turbo", "Pós Turbo", 29.9, "Açaí fit, 1 banana, pasta de amendoim, 1 dose de whey."),
      p("nitro-whey", "Nitro Whey", 25.9, "Açaí fit, 1 banana, 1 dose de whey."),
    ],
  },
  {
    id: "adicionais",
    name: "Upgrade Turbinado",
    subtitle: "Adicionais",
    compact: true,
    products: [
      p("ad-carne-80", "Carne 80g", 10),
      p("ad-carne-150", "Carne 150g", 15),
      p("ad-ovo", "Ovo", 3),
      p("ad-calabresa", "Calabresa", 5),
      p("ad-frango", "Frango desfiado", 5),
      p("ad-bacon", "Fatia de bacon", 5),
      p("ad-queijo", "Fatia de queijo", 5),
      p("ad-carne-sol", "Carne do sol", 12),
      p("ad-farofa", "Farofa de bacon", 5),
      p("ad-maio-bacon", "Maionese de bacon", 3),
      p("ad-maio-ervas", "Maionese de ervas finas", 3),
      p("ad-molho-casa", "Molho da casa", 3),
      p("ad-molho-picante", "Molho picante", 3),
      p("ad-maio-lemon", "Maionese de lemon pepper", 3),
    ],
  },
  {
    id: "molhos",
    name: "Escolha sua Graxa",
    subtitle: "Molhos",
    compact: true,
    products: ["Molho picante", "Molho da casa", "Maionese de ervas finas", "Maionese de lemon pepper", "Maionese de bacon", "Molho agridoce"].map(
      (name, i) => ({ id: `molho-${i}`, name }),
    ),
  },
];

export const allergens = ["Soja", "Lactose", "Ovos", "Glúten", "Corantes", "Castanhas"];

export const formatPrice = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const normalize = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function searchProducts(query: string, list: Category[] = categories) {
  const q = normalize(query.trim());
  if (!q) return list;
  return list
    .map((c) => ({
      ...c,
      products: c.products.filter((p) => normalize(`${p.name} ${p.description ?? ""}`).includes(q)),
    }))
    .filter((c) => c.products.length > 0);
}
