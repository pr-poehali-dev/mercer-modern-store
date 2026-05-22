import { useState } from 'react';
import Icon from '@/components/ui/icon';

export default function ContactsPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 lg:py-16 border-b border-black/10">
        <div className="fade-in-up">
          <p className="text-xs tracking-[0.3em] uppercase opacity-40 mb-2">Связаться</p>
          <h1 className="font-display text-5xl lg:text-7xl font-light">Контакты</h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Info */}
          <div className="space-y-12 fade-in-up">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase opacity-40 mb-6">Наши контакты</p>
              <div className="space-y-6">
                {[
                  { icon: "Mail", label: "Электронная почта", value: "info@mercer.ru" },
                  { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
                  { icon: "MapPin", label: "Адрес шоурума", value: "Москва, ул. Кузнецкий Мост, 7\n(открывается в 2025)" },
                  { icon: "Clock", label: "Время работы", value: "Пн–Пт: 10:00 – 19:00\nСб: 11:00 – 17:00" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <div className="w-10 h-10 border border-black/15 flex items-center justify-center flex-shrink-0 group-hover:bg-black group-hover:border-black transition-all duration-200">
                      <Icon name={item.icon} size={14} className="group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-[11px] tracking-[0.2em] uppercase opacity-40 mb-1">{item.label}</p>
                      <p className="text-sm font-light whitespace-pre-line">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <p className="text-xs tracking-[0.2em] uppercase opacity-40 mb-4">Соцсети</p>
              <div className="flex gap-4">
                {['Instagram', 'Telegram', 'VK'].map(s => (
                  <button
                    key={s}
                    className="border border-black/15 px-4 py-2 text-xs tracking-[0.1em] hover:bg-black hover:text-white hover:border-black transition-all duration-200"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="fade-in-up" style={{ animationDelay: '0.15s' }}>
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center gap-4">
                <div className="w-16 h-16 border-2 border-black flex items-center justify-center">
                  <Icon name="Check" size={24} />
                </div>
                <p className="font-display text-2xl font-light">Сообщение отправлено</p>
                <p className="text-sm text-black/50 font-light">Мы ответим в течение нескольких часов</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 text-xs tracking-[0.15em] uppercase hover-underline opacity-50"
                >
                  Написать ещё раз
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <p className="text-xs tracking-[0.2em] uppercase opacity-40 mb-6">Написать нам</p>

                <div>
                  <label className="block text-[11px] tracking-[0.15em] uppercase opacity-50 mb-2">Имя</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    required
                    placeholder="Ваше имя"
                    className="w-full border-b border-black/20 bg-transparent pb-3 text-sm font-light placeholder:text-black/25 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-[0.15em] uppercase opacity-50 mb-2">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    required
                    placeholder="your@email.com"
                    className="w-full border-b border-black/20 bg-transparent pb-3 text-sm font-light placeholder:text-black/25 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-[0.15em] uppercase opacity-50 mb-2">Сообщение</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    required
                    rows={5}
                    placeholder="Ваш вопрос или сообщение..."
                    className="w-full border-b border-black/20 bg-transparent pb-3 text-sm font-light placeholder:text-black/25 focus:outline-none focus:border-black transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-black/80 transition-colors duration-200 disabled:opacity-50"
                >
                  {loading ? 'Отправляем...' : 'Отправить'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}