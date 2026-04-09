import { useState } from 'react';
import Icon from '@/components/ui/icon';
import {
  ALL_PRODUCTS, MARQUEE_ITEMS,
  HERO_IMG, MAN_IMG, FLATLAY_IMG, HOODIE_IMG,
  Page, Product, CartItem,
} from '@/components/shop/types';
import ProductCard from '@/components/shop/ProductCard';
import CatalogPage from '@/components/shop/CatalogPage';
import CartPage from '@/components/shop/CartPage';
import ContactsPage from '@/components/shop/ContactsPage';

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
