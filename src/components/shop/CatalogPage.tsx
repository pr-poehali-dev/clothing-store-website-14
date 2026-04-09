import Icon from '@/components/ui/icon';
import { Slider } from '@/components/ui/slider';
import { Product, SIZES, COLORS, MATERIALS, STYLES } from './types';
import ProductCard from './ProductCard';

interface CatalogPageProps {
  products: Product[];
  title: string;
  filterColor: string;
  setFilterColor: (v: string) => void;
  filterMaterial: string;
  setFilterMaterial: (v: string) => void;
  filterStyle: string;
  setFilterStyle: (v: string) => void;
  filterSizes: string[];
  toggleSize: (s: string) => void;
  priceRange: number[];
  setPriceRange: (v: number[]) => void;
  filtersOpen: boolean;
  setFiltersOpen: (v: boolean) => void;
  resetFilters: () => void;
  filteredProducts: (list: Product[]) => Product[];
  addToCart: (p: Product) => void;
  addedId: number | null;
  selectedSize: Record<number, string>;
  setSelectedSize: (fn: (prev: Record<number, string>) => Record<number, string>) => void;
}

export default function CatalogPage({
  products, title,
  filterColor, setFilterColor,
  filterMaterial, setFilterMaterial,
  filterStyle, setFilterStyle,
  filterSizes, toggleSize,
  priceRange, setPriceRange,
  filtersOpen, setFiltersOpen,
  resetFilters, filteredProducts,
  addToCart, addedId,
  selectedSize, setSelectedSize,
}: CatalogPageProps) {
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
