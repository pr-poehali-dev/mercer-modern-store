import { useState } from 'react';
import { useCart } from '@/store/cartStore';
import Icon from '@/components/ui/icon';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

export default function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { items, total, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', comment: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch((window as Record<string, unknown>)['func2url']?.['send-order'] as string || '/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, items, total }),
      });
      const data = await res.json();
      if (data.ok) {
        setSuccess(true);
        clear();
      } else {
        setError('Ошибка отправки. Попробуйте ещё раз.');
      }
    } catch {
      setError('Ошибка соединения. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-6">
        <div className="text-center max-w-md fade-in-up">
          <div className="w-16 h-16 border-2 border-black flex items-center justify-center mx-auto mb-6">
            <Icon name="Check" size={24} />
          </div>
          <h2 className="font-display text-4xl font-light mb-3">Заказ принят</h2>
          <p className="text-sm text-black/50 font-light mb-2">
            Мы отправили подтверждение на <strong>{form.email}</strong>
          </p>
          <p className="text-sm text-black/50 font-light mb-8">
            Свяжемся с вами в ближайшее время для уточнения деталей.
          </p>
          <button
            onClick={() => onNavigate('catalog')}
            className="border border-black px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors"
          >
            Продолжить покупки
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 lg:py-16 border-b border-black/10">
        <div className="fade-in-up">
          <p className="text-xs tracking-[0.3em] uppercase opacity-40 mb-2">Оформление</p>
          <h1 className="font-display text-5xl lg:text-7xl font-light">Заказ</h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 lg:py-16">
        <div className="grid lg:grid-cols-[1fr,400px] gap-12 lg:gap-20">
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8 fade-in-up">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase opacity-40 mb-6">Контактные данные</p>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { key: 'name', label: 'Имя и фамилия', type: 'text', required: true },
                  { key: 'email', label: 'Email', type: 'email', required: true },
                  { key: 'phone', label: 'Телефон', type: 'tel', required: true },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-[11px] tracking-[0.15em] uppercase opacity-50 mb-2">{f.label}</label>
                    <input
                      type={f.type}
                      required={f.required}
                      value={form[f.key as keyof typeof form]}
                      onChange={e => setForm({...form, [f.key]: e.target.value})}
                      className="w-full border-b border-black/20 bg-transparent pb-3 text-sm font-light placeholder:text-black/25 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] uppercase opacity-40 mb-6">Адрес доставки</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] tracking-[0.15em] uppercase opacity-50 mb-2">Город</label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={e => setForm({...form, city: e.target.value})}
                    className="w-full border-b border-black/20 bg-transparent pb-3 text-sm font-light focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] tracking-[0.15em] uppercase opacity-50 mb-2">Адрес (улица, дом, квартира)</label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={e => setForm({...form, address: e.target.value})}
                    className="w-full border-b border-black/20 bg-transparent pb-3 text-sm font-light focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase opacity-50 mb-2">Комментарий к заказу</label>
              <textarea
                value={form.comment}
                onChange={e => setForm({...form, comment: e.target.value})}
                rows={3}
                className="w-full border-b border-black/20 bg-transparent pb-3 text-sm font-light focus:outline-none focus:border-black transition-colors resize-none placeholder:text-black/25"
                placeholder="Пожелания, особенности доставки..."
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || items.length === 0}
              className="w-full bg-black text-white py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-black/80 transition-colors disabled:opacity-40"
            >
              {loading ? 'Оформляем...' : `Оформить заказ — ${total.toLocaleString('ru-RU')} ₽`}
            </button>
          </form>

          {/* Order summary */}
          <div className="fade-in-up" style={{ animationDelay: '0.15s' }}>
            <p className="text-xs tracking-[0.2em] uppercase opacity-40 mb-6">Ваш заказ</p>
            
            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-sm opacity-40 tracking-wide mb-4">Корзина пуста</p>
                <button onClick={() => onNavigate('catalog')} className="text-xs underline opacity-50">
                  В каталог
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4">
                    <div className="w-16 h-20 bg-[#eeecea] flex-shrink-0 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-black/40 mt-0.5">{item.color === 'black' ? 'Чёрный' : 'Белый'} · {item.size} · {item.quantity} шт.</p>
                      <p className="text-sm mt-1">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</p>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t border-black/10 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="opacity-50">Товары</span>
                    <span>{total.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-50">Доставка</span>
                    <span>{total >= 5000 ? 'Бесплатно' : '490 ₽'}</span>
                  </div>
                  <div className="flex justify-between text-base font-medium pt-2 border-t border-black/10">
                    <span>Итого</span>
                    <span>{(total >= 5000 ? total : total + 490).toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
