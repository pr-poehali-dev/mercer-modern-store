interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen">
      
      {/* Hero */}
      <section className="relative min-h-screen flex items-end pb-16 lg:pb-24 overflow-hidden bg-[#f0eeeb]">
        {/* Background image */}
        <div className="absolute inset-0 img-zoom">
          <img
            src="https://cdn.poehali.dev/projects/bd2eaed0-5d6d-4805-b3d5-b15d5dd37361/files/487ea13a-f0dd-4abd-8970-23a22c48d757.jpg"
            alt="Mercer Hero"
            className="w-full h-full object-cover object-top opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-2xl">
            <p className="text-white/60 text-xs tracking-[0.3em] uppercase mb-4 fade-in-up" style={{ animationDelay: '0.1s' }}>
              Коллекция 2025
            </p>
            <h1 className="font-display text-white text-6xl lg:text-8xl xl:text-[120px] font-light leading-[0.9] fade-in-up" style={{ animationDelay: '0.2s' }}>
              MERCER
            </h1>
            <p className="text-white/70 text-sm lg:text-base tracking-wider mt-6 mb-10 font-light max-w-md fade-in-up" style={{ animationDelay: '0.35s' }}>
              Минималистичная одежда для тех, кто ценит форму и качество материала
            </p>
            <div className="flex gap-4 fade-in-up" style={{ animationDelay: '0.45s' }}>
              <button
                onClick={() => onNavigate('catalog')}
                className="bg-white text-black px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-black hover:text-white transition-colors duration-300"
              >
                Смотреть каталог
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-12 hidden lg:flex flex-col items-center gap-2 fade-in" style={{ animationDelay: '1s' }}>
          <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase rotate-90 mb-6">Scroll</span>
          <div className="w-px h-12 bg-white/30 relative overflow-hidden">
            <div className="absolute top-0 w-full h-1/2 bg-white/60 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="border-y border-black/10 py-5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap justify-between gap-4 text-center lg:text-left">
            {[
              { icon: "Package", label: "Бесплатная доставка", sub: "от 5 000 ₽" },
              { icon: "RotateCcw", label: "Возврат 14 дней", sub: "без вопросов" },
              { icon: "Shield", label: "Гарантия качества", sub: "натуральные ткани" },
              { icon: "CreditCard", label: "Безопасная оплата", sub: "банковские карты" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 flex-1 min-w-[180px] justify-center lg:justify-start fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-8 h-8 border border-black/20 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {f.icon === 'Package' && <><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></>}
                    {f.icon === 'RotateCcw' && <><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></>}
                    {f.icon === 'Shield' && <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>}
                    {f.icon === 'CreditCard' && <><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></>}
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium tracking-wide">{f.label}</p>
                  <p className="text-[11px] text-black/40 tracking-wide">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="py-20 lg:py-32 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase opacity-40 mb-2">Новинки</p>
            <h2 className="font-display text-4xl lg:text-6xl font-light">Сезон 2025</h2>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="hidden lg:flex items-center gap-2 text-xs tracking-[0.15em] uppercase hover-underline opacity-60 hover:opacity-100 transition-opacity"
          >
            Все товары
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 stagger">
          {[
            { name: "Пальто оверсайз", price: "28 900 ₽", img: "https://cdn.poehali.dev/projects/bd2eaed0-5d6d-4805-b3d5-b15d5dd37361/files/487ea13a-f0dd-4abd-8970-23a22c48d757.jpg" },
            { name: "Водолазка", price: "6 900 ₽", img: "https://cdn.poehali.dev/projects/bd2eaed0-5d6d-4805-b3d5-b15d5dd37361/files/fe79087e-f401-44dd-880f-7bbddfece06d.jpg" },
            { name: "Платье миди", price: "14 500 ₽", img: "https://cdn.poehali.dev/projects/bd2eaed0-5d6d-4805-b3d5-b15d5dd37361/files/abc4d96e-7c91-4454-8f5c-bbb5f8c825c1.jpg" },
            { name: "Прямые брюки", price: "9 800 ₽", img: "https://cdn.poehali.dev/projects/bd2eaed0-5d6d-4805-b3d5-b15d5dd37361/files/880c2e72-db72-4bdb-ab68-75bc2317f977.jpg" },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => onNavigate('catalog')}
              className="group text-left fade-in-up"
            >
              <div className="img-zoom bg-[#eeecea] mb-3 aspect-[3/4]">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover object-top" />
              </div>
              <p className="text-sm font-medium tracking-wide group-hover:opacity-60 transition-opacity">{item.name}</p>
              <p className="text-sm text-black/50 mt-1">{item.price}</p>
            </button>
          ))}
        </div>

        <div className="mt-10 text-center lg:hidden">
          <button
            onClick={() => onNavigate('catalog')}
            className="border border-black px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors duration-200"
          >
            Смотреть все
          </button>
        </div>
      </section>

      {/* Brand story */}
      <section className="bg-black text-white py-24 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div className="fade-in-up">
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-4">О бренде</p>
            <h2 className="font-display text-5xl lg:text-7xl font-light leading-tight mb-8">
              Одежда,<br />лишённая<br />лишнего
            </h2>
            <p className="text-white/60 text-sm lg:text-base leading-relaxed font-light max-w-md">
              Mercer — это одежда, созданная для тех, кто ценит качество материала, 
              точность кроя и силу минималистичной формы. Каждая вещь — результат 
              внимательной работы с пропорциями.
            </p>
            <button
              onClick={() => onNavigate('catalog')}
              className="mt-8 border border-white/30 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors duration-300"
            >
              Каталог
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="img-zoom aspect-[3/4] bg-white/10">
              <img
                src="https://cdn.poehali.dev/projects/bd2eaed0-5d6d-4805-b3d5-b15d5dd37361/files/fe79087e-f401-44dd-880f-7bbddfece06d.jpg"
                alt=""
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            <div className="img-zoom aspect-[3/4] bg-white/10 mt-12">
              <img
                src="https://cdn.poehali.dev/projects/bd2eaed0-5d6d-4805-b3d5-b15d5dd37361/files/880c2e72-db72-4bdb-ab68-75bc2317f977.jpg"
                alt=""
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 py-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row justify-between gap-8">
          <div>
            <p className="font-display text-2xl tracking-[0.2em] mb-3">MERCER</p>
            <p className="text-xs text-black/40 tracking-wide max-w-xs">
              Минималистичный бренд одежды.<br />Качество. Форма. Материал.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase font-medium mb-4">Магазин</p>
              {['catalog', 'faq', 'contacts'].map((p, i) => (
                <button key={i} onClick={() => onNavigate(p)} className="block text-xs text-black/50 hover:text-black transition-colors mb-2 tracking-wide hover-underline text-left">
                  {p === 'catalog' ? 'Каталог' : p === 'faq' ? 'FAQ' : 'Контакты'}
                </button>
              ))}
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase font-medium mb-4">Помощь</p>
              {['Доставка и оплата', 'Возврат', 'Размерная сетка'].map((t, i) => (
                <p key={i} className="text-xs text-black/50 mb-2 tracking-wide">{t}</p>
              ))}
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase font-medium mb-4">Контакты</p>
              <p className="text-xs text-black/50 mb-2 tracking-wide">info@mercer.ru</p>
              <p className="text-xs text-black/50 tracking-wide">+7 (495) 000-00-00</p>
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mt-10 pt-6 border-t border-black/8">
          <p className="text-[11px] text-black/30 tracking-widest">© 2025 MERCER. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
