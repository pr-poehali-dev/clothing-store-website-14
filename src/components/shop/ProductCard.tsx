import Icon from '@/components/ui/icon';
import { Product } from './types';

interface ProductCardProps {
  product: Product;
  addToCart: (p: Product) => void;
  addedId: number | null;
  selectedSize: Record<number, string>;
  setSelectedSize: (fn: (prev: Record<number, string>) => Record<number, string>) => void;
}

export default function ProductCard({ product, addToCart, addedId, selectedSize, setSelectedSize }: ProductCardProps) {
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
