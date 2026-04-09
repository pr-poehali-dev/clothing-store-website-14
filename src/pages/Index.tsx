import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Slider } from '@/components/ui/slider';

const HERO_IMG = "https://cdn.poehali.dev/projects/b68ae23f-8439-460b-8047-53d42bb625ee/files/1056a531-b3c7-41fe-8c97-31bede9d4625.jpg";
const MAN_IMG = "https://cdn.poehali.dev/projects/b68ae23f-8439-460b-8047-53d42bb625ee/files/2d234d6f-69a0-43c6-b8ad-6c986bc49232.jpg";
const FLATLAY_IMG = "https://cdn.poehali.dev/projects/b68ae23f-8439-460b-8047-53d42bb625ee/files/9259160d-bfb3-4beb-a596-245eb8673b4f.jpg";
const HOODIE_IMG = "https://cdn.poehali.dev/projects/b68ae23f-8439-460b-8047-53d42bb625ee/files/662e5a84-e9c0-476a-839d-f58031ca401d.jpg";

const ALL_PRODUCTS = [
  { id: 1, name: "Бомбер Street Lime", price: 8900, oldPrice: 12000, size: ["S", "M", "L", "XL"], color: "Зелёный", material: "Нейлон", style: "Streetwear", isNew: true, img: HERO_IMG, tag: "Хит" },
  { id: 2, name: "Водолазка Mono", price: 4500, oldPrice: null, size: ["XS", "S", "M", "L"], color: "Чёрный", material: "Хлопок", style: "Минимализм", isNew: false, img: MAN_IMG, tag: null },
  { id: 3, name: "Худи Coral Drop", price: 6200, oldPrice: 7800, size: ["S", "M", "L"], color: "Коралловый", material: "Флис", style: "Casual", isNew: true, img: HOODIE_IMG, tag: "Новинка" },
  { id: 4, name: "Сет Editorial", price: 15900, oldPrice: null, size: ["M", "L", "XL"], color: "Мульти", material: "Хлопок", style: "Streetwear", isNew: true, img: FLATLAY_IMG, tag: "Лимитед" },
  { id: 5, name: "Брюки Wide Camel", price: 7400, oldPrice: 9500, size: ["XS", "S", "M"], color: "Бежевый", material: "Шерсть", style: "Минимализм", isNew: false, img: MAN_IMG, tag: null },
  { id: 6, name: "Куртка Neon Drop", price: 11200, oldPrice: null, size: ["S", "M", "L", "XL", "XXL"], color: "Зелёный", material: "Нейлон", style: "Streetwear", isNew: true, img: HERO_IMG, tag: "Новинка" },
  { id: 7, name: "Свитшот Basic+", price: 3900, oldPrice: 4900, size: ["XS", "S", "M", "L"], color: "Чёрный", material: "Хлопок", style: "Casual", isNew: false, img: HOODIE_IMG, tag: null },
  { id: 8, name: "Сет Flat Mood", price: 13500, oldPrice: 16000, size: ["M", "L"], color: "Мульти", material: "Хлопок", style: "Casual", isNew: true, img: FLATLAY_IMG, tag: "Хит" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const COLORS = ["Все", "Чёрный", "Зелёный", "Бежевый", "Коралловый", "Мульти"];
const MATERIALS = ["Все", "Хлопок", "Нейлон", "Флис", "Шерсть"];
const STYLES = ["Все", "Streetwear", "Минимализм", "Casual"];

const MARQUEE_ITEMS = ["НОВАЯ КОЛЛЕКЦИЯ", "ВЕСНА 2026", "STREETWEAR", "МИНИМАЛИЗМ", "FREE SHIPPING", "ВОЗВРАТ 30 ДНЕЙ", "НОВАЯ КОЛЛЕКЦИЯ", "ВЕСНА 2026", "STREETWEAR", "МИНИМАЛИЗМ", "FREE SHIPPING", "ВОЗВРАТ 30 ДНЕЙ"];

type Page = 'home' | 'catalog' | 'cart' | 'contacts' | 'new';
type Product = typeof ALL_PRODUCTS[0];

interface CartItem {
  product: Product;
  size: string;
  qty: number;
}

export default function Index() {
  const [page, setPage] = useState<Page>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filterColor, setFilterColor] = useState("Все");
  const [filterMaterial, setFilterMaterial] = useState("Все");
  const [filterStyle, setFilterStyle] = useState("Все");
  const [filterSizes, setFilterSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [addedId, setAddedId] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<Record<number, string>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);

  const filteredProducts = (sourceList: Product[]) =>
    sourceList.filter(p => {
      if (filterColor !== "Все" && p.color !== filterColor) return false;
      if (filterMaterial !== "Все" && p.material !== filterMaterial) return false;
      if (filterStyle !== "Все" && p.style !== filterStyle) return false;
      if (filterSizes.length > 0 && !filterSizes.some(s => p.size.includes(s))) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });

  const addToCart = (product: Product) => {
    const size = selectedSize[product.id] || product.size[0];
    setCart(prev => {
      const exists = prev.find(i => i.product.id === product.id && i.size === size);
      if (exists) return prev.map(i => i.product.id === product.id && i.size === size ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, size, qty: 1 }];
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const removeFromCart = (id: number, size: string) => {
    setCart(prev => prev.filter(i => !(i.product.id === id && i.size === size)));
  };

  const toggleSize = (s: string) => {
    setFilterSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const resetFilters = () => {
    setFilterColor("Все");
    setFilterMaterial("Все");
    setFilterStyle("Все");
    setFilterSizes([]);
    setPriceRange([0, 20000]);
  };

  const navLinks: { label: string; id: Page }[] = [
    { label: "Главная", id: "home" },
    { label: "Каталог", id: "catalog" },
    { label: "Новинки", id: "new" },
    { label: "Контакты", id: "contacts" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-body text-white overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#1E1E1E]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => setPage('home')} className="font-display font-bold text-2xl tracking-widest text-white hover:text-[#B8FF3C] transition-colors">
            MODO
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <button
                key={l.id}
                onClick={() => setPage(l.id)}
                className={`font-display text-sm tracking-widest uppercase transition-colors ${page === l.id ? 'text-[#B8FF3C]' : 'text-white/60 hover:text-white'}`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPage('cart')}
              className="relative flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Icon name="ShoppingBag" size={20} className="text-white/70" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#B8FF3C] text-[#0A0A0A] text-xs font-bold flex items-center justify-center font-display">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 hover:bg-white/5 rounded-lg transition" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#111] border-t border-[#1E1E1E] px-4 py-4 flex flex-col gap-4">
            {navLinks.map(l => (
              <button
                key={l.id}
                onClick={() => { setPage(l.id); setMobileMenuOpen(false); }}
                className={`font-display text-base tracking-widest uppercase text-left transition-colors ${page === l.id ? 'text-[#B8FF3C]' : 'text-white/60'}`}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* MARQUEE */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-[#B8FF3C] overflow-hidden h-7 flex items-center">
        <div className="flex animate-marquee whitespace-nowrap">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className="font-display text-[#0A0A0A] text-xs font-semibold tracking-widest uppercase mx-6">
              {item} <span className="mx-2 opacity-50">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="pt-[90px]">

        {/* ===== HOME ===== */}
        {page === 'home' && (
          <div>
            {/* HERO */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
              <div className="absolute inset-0">
                <img src={HERO_IMG} alt="hero" className="w-full h-full object-cover object-center opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              </div>

              <div className="relative max-w-7xl mx-auto px-4 py-20">
                <div className="max-w-2xl animate-fade-in">
                  <div className="tag mb-5 inline-block">Весна / Лето 2026</div>
                  <h1 className="font-display text-6xl md:text-8xl font-bold leading-none mb-6 uppercase">
                    Одевайся<br />
                    <span className="neon-text">Смело.</span><br />
                    Живи ярко.
                  </h1>
                  <p className="text-white/50 text-lg mb-10 max-w-md leading-relaxed">
                    Streetwear и минимализм для тех, кто задаёт тренды — а не следует им.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => setPage('catalog')} className="neon-btn px-8 py-4 rounded-xl text-sm">
                      Смотреть каталог
                    </button>
                    <button onClick={() => setPage('new')} className="px-8 py-4 rounded-xl text-sm border border-white/20 font-display font-semibold tracking-widest uppercase text-white hover:border-white/50 transition-colors">
                      Новинки
                    </button>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-12 right-8 hidden lg:flex flex-col gap-4">
                {[["2 000+", "товаров"], ["48h", "доставка"], ["4.9★", "рейтинг"]].map(([val, label]) => (
                  <div key={label} className="glass-card px-5 py-3 rounded-xl text-right">
                    <div className="font-display text-xl font-semibold text-[#B8FF3C]">{val}</div>
                    <div className="text-xs text-white/40 uppercase tracking-widest">{label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* CATEGORIES */}
            <section className="max-w-7xl mx-auto px-4 py-16">
              <div className="flex items-end justify-between mb-8">
                <h2 className="font-display text-4xl uppercase font-semibold">Стили</h2>
                <button onClick={() => setPage('catalog')} className="text-[#B8FF3C] text-sm font-display tracking-widest uppercase flex items-center gap-2 hover:gap-3 transition-all">
                  Все <Icon name="ArrowRight" size={14} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Streetwear", desc: "Городской стиль без правил", img: HERO_IMG, color: "#B8FF3C" },
                  { label: "Минимализм", desc: "Чисто. Лаконично. Стильно.", img: MAN_IMG, color: "#FF3CAA" },
                  { label: "Casual", desc: "Комфорт каждый день", img: HOODIE_IMG, color: "#3CAAFF" },
                ].map((cat) => (
                  <button
                    key={cat.label}
                    onClick={() => { setFilterStyle(cat.label); setPage('catalog'); }}
                    className="relative overflow-hidden rounded-2xl aspect-[4/5] group"
                  >
                    <img src={cat.img} alt={cat.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                      <div className="text-xs uppercase tracking-widest mb-1" style={{ color: cat.color }}>Стиль</div>
                      <h3 className="font-display text-3xl font-semibold uppercase">{cat.label}</h3>
                      <p className="text-white/50 text-sm mt-1">{cat.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* FEATURED */}
            <section className="max-w-7xl mx-auto px-4 pb-16">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <div className="tag mb-2 inline-block">Популярное</div>
                  <h2 className="font-display text-4xl uppercase font-semibold">Хиты продаж</h2>
                </div>
                <button onClick={() => setPage('catalog')} className="text-[#B8FF3C] text-sm font-display tracking-widest uppercase flex items-center gap-2 hover:gap-3 transition-all">
                  Все <Icon name="ArrowRight" size={14} />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {ALL_PRODUCTS.slice(0, 4).map(p => (
                  <ProductCard key={p.id} product={p} addToCart={addToCart} addedId={addedId} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
                ))}
              </div>
            </section>

            {/* BANNER */}
            <section className="max-w-7xl mx-auto px-4 pb-20">
              <div className="relative overflow-hidden rounded-3xl bg-[#111]">
                <div className="absolute inset-0">
                  <img src={FLATLAY_IMG} alt="" className="w-full h-full object-cover opacity-20" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-[#111]/50 to-transparent" />
                </div>
                <div className="relative px-10 py-16 md:py-20 max-w-xl">
                  <div className="tag-pink tag mb-4 inline-block">Специально</div>
                  <h2 className="font-display text-5xl uppercase font-semibold mb-4 leading-tight">
                    Новая<br />коллекция<br /><span className="neon-text">уже здесь</span>
                  </h2>
                  <p className="text-white/50 mb-8">Лимитированный дроп — только 50 экземпляров каждой позиции.</p>
                  <button onClick={() => setPage('new')} className="neon-btn px-8 py-4 rounded-xl text-sm">
                    Смотреть новинки
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ===== CATALOG / NEW ===== */}
        {(page === 'catalog' || page === 'new') && (
          <CatalogPage
            products={page === 'new' ? ALL_PRODUCTS.filter(p => p.isNew) : ALL_PRODUCTS}
            title={page === 'new' ? 'Новинки' : 'Каталог'}
            filterColor={filterColor} setFilterColor={setFilterColor}
            filterMaterial={filterMaterial} setFilterMaterial={setFilterMaterial}
            filterStyle={filterStyle} setFilterStyle={setFilterStyle}
            filterSizes={filterSizes} toggleSize={toggleSize}
            priceRange={priceRange} setPriceRange={setPriceRange}
            filtersOpen={filtersOpen} setFiltersOpen={setFiltersOpen}
            resetFilters={resetFilters}
            filteredProducts={filteredProducts}
            addToCart={addToCart} addedId={addedId}
            selectedSize={selectedSize} setSelectedSize={setSelectedSize}
          />
        )}

        {/* ===== CART ===== */}
        {page === 'cart' && (
          <CartPage cart={cart} cartTotal={cartTotal} removeFromCart={removeFromCart} setPage={setPage} />
        )}

        {/* ===== CONTACTS ===== */}
        {page === 'contacts' && <ContactsPage />}

      </div>

      {/* FOOTER */}
      <footer className="border-t border-[#1E1E1E] mt-8">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-2xl tracking-widest text-white/80">MODO</div>
          <div className="flex gap-6">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => setPage(l.id)} className="font-display text-xs tracking-widest uppercase text-white/30 hover:text-white/70 transition-colors">
                {l.label}
              </button>
            ))}
          </div>
          <div className="text-white/20 text-xs">© 2026 MODO. Все права защищены.</div>
        </div>
      </footer>
    </div>
  );
}

/* ========== PRODUCT CARD ========== */
function ProductCard({ product, addToCart, addedId, selectedSize, setSelectedSize }: {
  product: Product;
  addToCart: (p: Product) => void;
  addedId: number | null;
  selectedSize: Record<number, string>;
  setSelectedSize: (fn: (prev: Record<number, string>) => Record<number, string>) => void;
}) {
  const isAdded = addedId === product.id;
  const size = selectedSize[product.id] || product.size[0];

  return (
    <div className="product-card group relative rounded-2xl overflow-hidden bg-[#111] border border-[#1E1E1E]">
      <div className="relative overflow-hidden aspect-[3/4]">
        <img src={product.img} alt={product.name} className="product-img w-full h-full object-cover" />
        {product.tag && (
          <div className={`absolute top-3 left-3 tag ${product.tag === 'Новинка' || product.tag === 'Лимитед' ? 'tag-pink' : ''}`}>
            {product.tag}
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex flex-wrap gap-1">
            {product.size.slice(0, 4).map(s => (
              <button
                key={s}
                onClick={() => setSelectedSize((prev: Record<number, string>) => ({ ...prev, [product.id]: s }))}
                className={`text-xs px-2 py-1 rounded-md font-display transition-colors ${size === s ? 'bg-[#B8FF3C] text-[#0A0A0A]' : 'bg-black/60 text-white border border-white/20 hover:border-white/50'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display font-medium text-sm uppercase tracking-wide mb-1 truncate">{product.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#B8FF3C] font-display font-semibold">{product.price.toLocaleString('ru')} ₽</span>
          {product.oldPrice && (
            <span className="text-white/30 text-xs line-through">{product.oldPrice.toLocaleString('ru')} ₽</span>
          )}
        </div>
        <button
          onClick={() => addToCart(product)}
          className={`w-full py-2 rounded-xl text-xs font-display font-semibold tracking-widest uppercase transition-all ${isAdded ? 'bg-[#B8FF3C]/20 text-[#B8FF3C] border border-[#B8FF3C]/40' : 'bg-white/5 text-white border border-white/10 hover:bg-[#B8FF3C] hover:text-[#0A0A0A] hover:border-[#B8FF3C]'}`}
        >
          {isAdded ? '✓ Добавлено' : 'В корзину'}
        </button>
      </div>
    </div>
  );
}

/* ========== CATALOG PAGE ========== */
function CatalogPage({ products, title, filterColor, setFilterColor, filterMaterial, setFilterMaterial, filterStyle, setFilterStyle, filterSizes, toggleSize, priceRange, setPriceRange, filtersOpen, setFiltersOpen, resetFilters, filteredProducts, addToCart, addedId, selectedSize, setSelectedSize }: {
  products: Product[];
  title: string;
  filterColor: string; setFilterColor: (v: string) => void;
  filterMaterial: string; setFilterMaterial: (v: string) => void;
  filterStyle: string; setFilterStyle: (v: string) => void;
  filterSizes: string[]; toggleSize: (s: string) => void;
  priceRange: number[]; setPriceRange: (v: number[]) => void;
  filtersOpen: boolean; setFiltersOpen: (v: boolean) => void;
  resetFilters: () => void;
  filteredProducts: (list: Product[]) => Product[];
  addToCart: (p: Product) => void;
  addedId: number | null;
  selectedSize: Record<number, string>;
  setSelectedSize: (fn: (prev: Record<number, string>) => Record<number, string>) => void;
}) {
  const displayed = filteredProducts(products);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-5xl uppercase font-semibold">{title}</h1>
          <p className="text-white/40 mt-1 text-sm">{displayed.length} товаров</p>
        </div>
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-display text-sm uppercase tracking-widest transition-colors ${filtersOpen ? 'border-[#B8FF3C] text-[#B8FF3C]' : 'border-white/15 text-white/60 hover:border-white/30'}`}
        >
          <Icon name="SlidersHorizontal" size={16} />
          Фильтры
        </button>
      </div>

      {filtersOpen && (
        <div className="glass-card rounded-2xl p-6 mb-8 animate-fade-in grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 border border-[#1E1E1E]">
          {/* Price */}
          <div>
            <div className="font-display text-xs uppercase tracking-widest text-white/40 mb-3">Цена</div>
            <div className="flex justify-between text-sm text-[#B8FF3C] font-display mb-3">
              <span>{priceRange[0].toLocaleString('ru')} ₽</span>
              <span>{priceRange[1].toLocaleString('ru')} ₽</span>
            </div>
            <Slider
              min={0} max={20000} step={500}
              value={priceRange}
              onValueChange={setPriceRange}
              className="w-full"
            />
          </div>

          {/* Size */}
          <div>
            <div className="font-display text-xs uppercase tracking-widest text-white/40 mb-3">Размер</div>
            <div className="flex flex-wrap gap-2">
              {SIZES.map(s => (
                <button
                  key={s}
                  onClick={() => toggleSize(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-display uppercase transition-colors ${filterSizes.includes(s) ? 'bg-[#B8FF3C] text-[#0A0A0A]' : 'border border-white/15 text-white/60 hover:border-white/40'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <div className="font-display text-xs uppercase tracking-widest text-white/40 mb-3">Цвет</div>
            <div className="flex flex-wrap gap-2">
              {COLORS.map(c => (
                <button
                  key={c}
                  onClick={() => setFilterColor(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-display transition-colors ${filterColor === c ? 'bg-[#B8FF3C] text-[#0A0A0A]' : 'border border-white/15 text-white/60 hover:border-white/40'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Material + Style */}
          <div className="flex flex-col gap-4">
            <div>
              <div className="font-display text-xs uppercase tracking-widest text-white/40 mb-3">Материал</div>
              <div className="flex flex-wrap gap-2">
                {MATERIALS.map(m => (
                  <button
                    key={m}
                    onClick={() => setFilterMaterial(m)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-display transition-colors ${filterMaterial === m ? 'bg-[#B8FF3C] text-[#0A0A0A]' : 'border border-white/15 text-white/60 hover:border-white/40'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="font-display text-xs uppercase tracking-widest text-white/40 mb-3">Стиль</div>
              <div className="flex flex-wrap gap-2">
                {STYLES.map(s => (
                  <button
                    key={s}
                    onClick={() => setFilterStyle(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-display transition-colors ${filterStyle === s ? 'bg-[#B8FF3C] text-[#0A0A0A]' : 'border border-white/15 text-white/60 hover:border-white/40'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-4 flex justify-end">
            <button onClick={resetFilters} className="text-white/40 hover:text-white text-sm font-display uppercase tracking-widest flex items-center gap-2 transition-colors">
              <Icon name="RotateCcw" size={13} />
              Сбросить фильтры
            </button>
          </div>
        </div>
      )}

      {displayed.length === 0 ? (
        <div className="text-center py-20 text-white/30">
          <Icon name="SearchX" size={48} className="mx-auto mb-4 opacity-30" />
          <p className="font-display text-2xl uppercase">Ничего не найдено</p>
          <p className="text-sm mt-2">Попробуйте изменить фильтры</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayed.map(p => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} addedId={addedId} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ========== CART PAGE ========== */
function CartPage({ cart, cartTotal, removeFromCart, setPage }: {
  cart: CartItem[];
  cartTotal: number;
  removeFromCart: (id: number, size: string) => void;
  setPage: (p: Page) => void;
}) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-display text-5xl uppercase font-semibold mb-8">Корзина</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <Icon name="ShoppingBag" size={56} className="mx-auto mb-4 text-white/20" />
          <p className="font-display text-2xl uppercase text-white/40">Корзина пуста</p>
          <p className="text-white/30 text-sm mt-2 mb-8">Самое время выбрать что-то стильное</p>
          <button onClick={() => setPage('catalog')} className="neon-btn px-8 py-4 rounded-xl text-sm">
            Перейти в каталог
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cart.map(item => (
              <div key={`${item.product.id}-${item.size}`} className="glass-card rounded-2xl p-4 flex gap-4 border border-[#1E1E1E]">
                <img src={item.product.img} alt={item.product.name} className="w-20 h-24 object-cover rounded-xl flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display uppercase font-medium text-sm tracking-wide">{item.product.name}</h3>
                  <div className="flex gap-3 mt-1 mb-3">
                    <span className="tag text-xs">Размер: {item.size}</span>
                    <span className="tag text-xs">{item.product.color}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#B8FF3C] font-display font-semibold">{(item.product.price * item.qty).toLocaleString('ru')} ₽</span>
                    <div className="flex items-center gap-3">
                      <span className="text-white/40 text-sm">{item.qty} шт.</span>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.size)}
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white"
                      >
                        <Icon name="Trash2" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card rounded-2xl p-6 border border-[#1E1E1E] h-fit sticky top-32">
            <h2 className="font-display text-xl uppercase mb-6">Итого</h2>
            <div className="flex justify-between mb-2 text-white/50 text-sm">
              <span>Товары ({cart.reduce((s, i) => s + i.qty, 0)} шт.)</span>
              <span>{cartTotal.toLocaleString('ru')} ₽</span>
            </div>
            <div className="flex justify-between mb-2 text-white/50 text-sm">
              <span>Доставка</span>
              <span className="text-[#B8FF3C]">Бесплатно</span>
            </div>
            <div className="border-t border-[#1E1E1E] my-4" />
            <div className="flex justify-between mb-6">
              <span className="font-display uppercase font-semibold">Итого</span>
              <span className="font-display font-semibold text-[#B8FF3C] text-xl">{cartTotal.toLocaleString('ru')} ₽</span>
            </div>
            <button className="neon-btn w-full py-4 rounded-xl text-sm mb-3">
              Оформить заказ
            </button>
            <button onClick={() => setPage('catalog')} className="w-full py-3 rounded-xl text-sm border border-white/10 font-display uppercase tracking-widest text-white/50 hover:text-white hover:border-white/30 transition-colors">
              Продолжить покупки
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ========== CONTACTS PAGE ========== */
function ContactsPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-display text-5xl uppercase font-semibold mb-2">Контакты</h1>
      <p className="text-white/40 mb-10">Мы всегда на связи — пишите, звоните, приходите.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          {[
            { icon: "MapPin", label: "Адрес", value: "Москва, ул. Трендовая, 12" },
            { icon: "Phone", label: "Телефон", value: "+7 (800) 555-00-12" },
            { icon: "Mail", label: "Email", value: "hello@modo-shop.ru" },
            { icon: "Clock", label: "Часы работы", value: "Пн–Вс: 10:00 – 21:00" },
          ].map(item => (
            <div key={item.label} className="glass-card rounded-2xl p-5 border border-[#1E1E1E] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#B8FF3C]/10 flex items-center justify-center flex-shrink-0">
                <Icon name={item.icon as any} size={18} className="text-[#B8FF3C]" />
              </div>
              <div>
                <div className="font-display text-xs uppercase tracking-widest text-white/30 mb-0.5">{item.label}</div>
                <div className="text-white/80 font-medium">{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-6 border border-[#1E1E1E]">
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <div className="w-16 h-16 rounded-full bg-[#B8FF3C]/15 flex items-center justify-center mb-4">
                <Icon name="Check" size={28} className="text-[#B8FF3C]" />
              </div>
              <h3 className="font-display text-2xl uppercase mb-2">Отправлено!</h3>
              <p className="text-white/40 text-sm">Мы ответим в течение нескольких часов.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <h3 className="font-display text-xl uppercase mb-2">Написать нам</h3>
              {[
                { key: 'name', label: 'Имя', type: 'text', placeholder: 'Ваше имя' },
                { key: 'email', label: 'Email', type: 'email', placeholder: 'email@example.com' },
              ].map(f => (
                <div key={f.key}>
                  <label className="font-display text-xs uppercase tracking-widest text-white/30 mb-1 block">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={(form as any)[f.key]}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#B8FF3C]/50 transition-colors text-sm"
                    required
                  />
                </div>
              ))}
              <div>
                <label className="font-display text-xs uppercase tracking-widest text-white/30 mb-1 block">Сообщение</label>
                <textarea
                  placeholder="Ваш вопрос или пожелание..."
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#B8FF3C]/50 transition-colors text-sm resize-none"
                  required
                />
              </div>
              <button type="submit" className="neon-btn py-4 rounded-xl text-sm w-full">
                Отправить сообщение
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
