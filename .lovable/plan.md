# Cardápio Digital — Açaílândia Garage

Cardápio só para consulta, mobile-first, aberto pelo QR Code da mesa. Sem carrinho, login, pedidos ou pagamento.

## Visual
- Fundo preto, magenta/roxo neon da logo como destaque, branco nos textos, amarelo só em detalhes (preços, selos) — igual ao cardápio impresso.
- Detalhe de bandeira quadriculada (tema Garage) como divisor entre seções.
- Títulos em fonte condensada forte (Bebas Neue / Barlow Condensed), textos em Barlow.
- Logo enviada usada como está, sem distorção (recortada só no círculo).

## Página inicial (única página)
1. Cabeçalho fixo com logo e "Açaílândia Garage".
2. Frase "Seu próximo favorito está aqui." + busca instantânea.
3. Barra horizontal de categorias (rola e fica fixa; tocar leva à seção).
4. Destaques (lista editável pela equipe — começa vazia/oculta até definirem).
5. Seções por categoria com cards: foto, nome, descrição, preço, "Ver detalhes".
6. Janela de detalhes com foto maior, descrição, preço, variações (ex.: 10 ou 20 unidades) e ícones de alergênicos.
7. Rodapé com Instagram @acailandiaoficial_, Wi-Fi "Açaílândia saboroso" e ícones de alergênicos explicados.
8. Botão voltar ao topo.

## Categorias (fiéis ao PDF — o cardápio não tem açaí na tigela, então essa categoria não será criada)
- Nitro Shakes (400ml) — 5 itens
- Combustível Natural (sucos 500ml) — 9 itens
- Full Tank (vitaminas 500ml) — 3 itens
- Combustível Maromba — 4 itens
- Burgers Artesanais — 7 itens
- Smash — 4 itens
- Hot Dogs — 2 itens
- Pneus de Batata (porções) — 4 itens
- Pit Stop de Sabor (petiscos) — 3 itens com variações
- Largada Premiada / Combos (Grid Hot, Grid Smash, Pit Stop, Box Completo)
- Upgrade Turbinado (adicionais) e Escolha sua Graxa (molhos) — em lista compacta, sem fotos

Todos os nomes, preços e descrições copiados do PDF. Itens com texto pouco legível serão marcados internamente como "a confirmar" e listados para você revisar.

## Fotos
As fotos do PDF são reais da loja: recorto cada produto das páginas em alta resolução e uso nos cards. Molhos/adicionais sem foto individual ficam em lista. Onde não der para recortar bem, uso um espaço reservado "Foto em breve".

## Detalhes técnicos
- Dados em `src/data/menu.ts` (tipos `Product`, `Category`, variações, alergênicos, flags `featured`/`isNew`), separados dos componentes.
- Componentes: Header, SearchBar, CategoryNav, ProductCard, ProductDialog, Section, BackToTop.
- Busca/filtro no cliente, sem banco de dados.
- Imagens recortadas com Python do PDF, comprimidas em WebP e enviadas como assets de CDN; logo também.
- Tokens de cor em `src/styles.css`; metadados (título/descrição/og) em PT-BR na rota `/`.
