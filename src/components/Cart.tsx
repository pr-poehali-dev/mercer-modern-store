import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { useCart } from '@/store/cartStore';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function Cart({ isOpen, onClose, onCheckout }: CartProps) {
  const { items, removeItem, updateQuantity, total } = useCart();
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => { setClosing(false); onClose(); }, 300);
  };

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen && !closing) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 overlay-in"
        onClick={handleClose}
      />

      {/* Drawer */}
      <div className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#f8f8f8] flex flex-col shadow-2xl ${closing ? 'cart-slide-out' : 'cart-slide'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-black/10">
          <span className="text-sm tracking-[0.15em] uppercase font-medium">
            Корзина {items.length > 0 && `(${items.length})`}
          </span>
          <button onClick={handleClose} className="hover:opacity-50 transition-opacity">
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-8">
              <Icon name="ShoppingBag" size={40} className="opacity-20" />
              <p className="text-sm tracking-widest uppercase opacity-40">Корзина пуста</p>
            </div>
          ) : (
            <div className="divide-y divide-black/8">
              {items.map((item, i) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 p-6 fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="w-20 h-24 bg-black/5 flex-shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium tracking-wide truncate">{item.name}</p>
                    <p className="text-xs text-black/40 mt-1 tracking-wide">
                      {item.color === 'black' ? 'Чёрный' : 'Белый'} · {item.size}
                    </p>
                    <p className="text-sm mt-2 font-medium">{item.price.toLocaleString('ru-RU')} ₽</p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3 border border-black/15">
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-black/5 transition-colors text-sm"
                        >−</button>
                        <span className="text-sm w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-black/5 transition-colors text-sm"
                        >+</button>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId, item.size, item.color)}
                        className="hover:opacity-50 transition-opacity p-1"
                      >
                        <Icon name="Trash2" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-black/10 p-8">
            <div className="flex justify-between mb-6">
              <span className="text-sm tracking-[0.1em] uppercase opacity-60">Итого</span>
              <span className="text-lg font-medium">{total.toLocaleString('ru-RU')} ₽</span>
            </div>
            <button
              onClick={() => { onCheckout(); handleClose(); }}
              className="w-full bg-black text-white py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-black/80 transition-colors duration-200"
            >
              Оформить заказ
            </button>
            <p className="text-xs text-center mt-3 opacity-40 tracking-wide">
              Бесплатная доставка от 5 000 ₽
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
