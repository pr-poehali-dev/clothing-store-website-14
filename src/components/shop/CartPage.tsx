import Icon from '@/components/ui/icon';
import { CartItem, Page } from './types';

interface CartPageProps {
  cart: CartItem[];
  cartTotal: number;
  removeFromCart: (id: number, size: string) => void;
  setPage: (p: Page) => void;
}

export default function CartPage({ cart, cartTotal, removeFromCart, setPage }: CartPageProps) {
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
