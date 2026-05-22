import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { PRODUCTS, CATEGORIES, SIZES, COLORS, type Product } from '@/data/products';
import { cartStore } from '@/store/cartStore';

interface CatalogPageProps {
  onCartOpen: () => void;
}

export default function CatalogPage({ onCartOpen }: CatalogPageProps) {
  const [category, setCategory] = useState('Все');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState(30000);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [addedId, setAddedId] = useState<number | null>(null);

  const filtered = PRODUCTS.filter(p => {
    if (category !== 'Все' && p.category !== category) return false;
    if (selectedSizes.length && !selectedSizes.some(s => p.sizes.includes(s))) return false;
    if (selectedColors.length && !selectedColors.some(c => p.colors.includes(c))) return false;
    if (p.price > priceMax) return false;
    return true;
  });

  const toggleSize = (s: string) =>
    setSelectedSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const toggleColor = (c: string) =>
    setSelectedColors(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  const handleAddToCart = () => {
    if (!selectedProduct || !selectedSize || !selectedColor) return;
    cartStore.addItem({
      productId: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image,
      size: selectedSize,
      color: selectedColor,
    });
    setAddedId(selectedProduct.id);
    setTimeout(() => { setAddedId(null); setSelectedProduct(null); }, 1500);
  };

  useEffect(() => {
    if (selectedProduct) {
      setSelectedSize('');
      setSelectedColor('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedProduct]);

  const resetFilters = () => {
    setCategory('Все');
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceMax(30000);
  };

  const hasFilters = category !== 'Все' || selectedSizes.length > 0 || selectedColors.length > 0 || priceMax < 30000;

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 lg:py-16 border-b border-black/10">
        <div className="flex items-end justify-between">
          <div className="fade-in-up">
            <p className="text-xs tracking-[0.3em] uppercase opacity-40 mb-2">Mercer</p>
            <h1 className="font-display text-5xl lg:text-7xl font-light">Каталог</h1>
          </div>
          <p className="text-xs text-black/40 tracking-wide fade-in">{filtered.length} товаров</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">
        <div className="flex gap-8 lg:gap-12">

          {/* Sidebar filters — desktop */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-28 space-y-8">
              {hasFilters && (
                <button onClick={resetFilters} className="text-[11px] tracking-[0.15em] uppercase text-black/40 hover:text-black transition-colors hover-underline">
                  Сбросить фильтры
                </button>
              )}

              {/* Category */}
              <div>
                <p className="text-[11px] tracking-[0.2em] uppercase font-medium mb-3 opacity-50">Категория</p>
                <div className="space-y-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`block text-sm tracking-wide transition-all duration-150 ${
                        category === cat ? 'font-medium' : 'text-black/40 hover:text-black'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <p className="text-[11px] tracking-[0.2em] uppercase font-medium mb-3 opacity-50">Размер</p>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map(s => (
                    <button
                      key={s}
                      onClick={() => toggleSize(s)}
                      className={`w-9 h-9 text-xs border transition-all duration-150 ${
                        selectedSizes.includes(s)
                          ? 'bg-black text-white border-black'
                          : 'border-black/20 hover:border-black text-black/60 hover:text-black'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <p className="text-[11px] tracking-[0.2em] uppercase font-medium mb-3 opacity-50">Цвет</p>
                <div className="space-y-2">
                  {COLORS.map(c => (
                    <button
                      key={c.value}
                      onClick={() => toggleColor(c.value)}
                      className="flex items-center gap-3 group"
                    >
                      <div className={`w-5 h-5 border-2 transition-all ${
                        c.value === 'black' ? 'bg-black' : 'bg-white border-black/30'
                      } ${selectedColors.includes(c.value) ? 'ring-2 ring-black ring-offset-1' : ''}`} />
                      <span className={`text-sm tracking-wide transition-colors ${selectedColors.includes(c.value) ? 'font-medium' : 'text-black/40 group-hover:text-black'}`}>
                        {c.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <p className="text-[11px] tracking-[0.2em] uppercase font-medium mb-3 opacity-50">Цена</p>
                <input
                  type="range"
                  min={0}
                  max={30000}
                  step={500}
                  value={priceMax}
                  onChange={e => setPriceMax(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-black/50 mt-2">до {priceMax.toLocaleString('ru-RU')} ₽</p>
              </div>
            </div>
          </aside>

          {/* Mobile filters button */}
          <div className="lg:hidden mb-4 w-full">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase border border-black/20 px-4 py-2"
              >
                <Icon name="SlidersHorizontal" size={14} />
                Фильтры {hasFilters && <span className="bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{(category !== 'Все' ? 1 : 0) + selectedSizes.length + selectedColors.length}</span>}
              </button>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {CATEGORIES.slice(0, 4).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`text-[11px] tracking-[0.1em] uppercase px-3 py-1.5 border whitespace-nowrap transition-all ${
                      category === cat ? 'bg-black text-white border-black' : 'border-black/20 text-black/50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile filter panel */}
            {filtersOpen && (
              <div className="mt-4 p-4 border border-black/10 bg-white fade-in space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[11px] tracking-[0.2em] uppercase font-medium mb-2 opacity-50">Размер</p>
                    <div className="flex flex-wrap gap-1.5">
                      {SIZES.map(s => (
                        <button
                          key={s}
                          onClick={() => toggleSize(s)}
                          className={`w-8 h-8 text-xs border transition-all ${
                            selectedSizes.includes(s) ? 'bg-black text-white border-black' : 'border-black/20 text-black/60'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] tracking-[0.2em] uppercase font-medium mb-2 opacity-50">Цвет</p>
                    {COLORS.map(c => (
                      <button
                        key={c.value}
                        onClick={() => toggleColor(c.value)}
                        className="flex items-center gap-2 mb-2"
                      >
                        <div className={`w-4 h-4 border ${c.value === 'black' ? 'bg-black' : 'bg-white border-black/30'} ${selectedColors.includes(c.value) ? 'ring-1 ring-black ring-offset-1' : ''}`} />
                        <span className="text-xs">{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.2em] uppercase font-medium mb-2 opacity-50">Цена до {priceMax.toLocaleString('ru-RU')} ₽</p>
                  <input type="range" min={0} max={30000} step={500} value={priceMax} onChange={e => setPriceMax(Number(e.target.value))} className="w-full" />
                </div>
                {hasFilters && (
                  <button onClick={resetFilters} className="text-xs tracking-wider uppercase underline opacity-50">Сбросить</button>
                )}
              </div>
            )}
          </div>

          {/* Products grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 gap-4">
                <p className="text-sm tracking-[0.15em] uppercase opacity-30">Нет товаров</p>
                <button onClick={resetFilters} className="text-xs underline opacity-50">Сбросить фильтры</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 stagger">
                {filtered.map((product, i) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="group text-left fade-in-up"
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    <div className="img-zoom bg-[#eeecea] mb-3 aspect-[3/4] relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />
                      <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <span className="bg-white text-black text-[10px] tracking-[0.15em] uppercase px-4 py-2 font-medium shadow-sm">
                          Выбрать
                        </span>
                      </div>
                    </div>
                    <p className="text-sm font-medium tracking-wide">{product.name}</p>
                    <p className="text-xs text-black/40 mt-0.5 tracking-wide">{product.category}</p>
                    <p className="text-sm mt-1.5 font-medium">{product.price.toLocaleString('ru-RU')} ₽</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[90] flex items-end lg:items-center justify-center">
          <div className="absolute inset-0 bg-black/50 overlay-in" onClick={() => setSelectedProduct(null)} />
          <div className="relative z-10 bg-[#f8f8f8] w-full max-w-3xl max-h-[90vh] overflow-y-auto cart-slide lg:fade-in">
            <div className="grid lg:grid-cols-2">
              {/* Image */}
              <div className="aspect-square lg:aspect-auto bg-[#eeecea]">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Info */}
              <div className="p-6 lg:p-10 flex flex-col">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="self-end hover:opacity-50 transition-opacity mb-4"
                >
                  <Icon name="X" size={18} />
                </button>

                <p className="text-xs tracking-[0.2em] uppercase text-black/40 mb-2">{selectedProduct.category}</p>
                <h2 className="font-display text-3xl lg:text-4xl font-light mb-2">{selectedProduct.name}</h2>
                <p className="text-xl font-medium mb-4">{selectedProduct.price.toLocaleString('ru-RU')} ₽</p>
                <p className="text-sm text-black/60 leading-relaxed mb-6">{selectedProduct.description}</p>

                {/* Color */}
                <div className="mb-4">
                  <p className="text-xs tracking-[0.15em] uppercase font-medium mb-3 opacity-60">
                    Цвет {selectedColor && <span className="opacity-100">— {selectedColor === 'black' ? 'Чёрный' : 'Белый'}</span>}
                  </p>
                  <div className="flex gap-3">
                    {selectedProduct.colors.map(c => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`w-8 h-8 border-2 transition-all ${
                          c === 'black' ? 'bg-black' : 'bg-white border-black/30'
                        } ${selectedColor === c ? 'ring-2 ring-black ring-offset-2' : ''}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div className="mb-8">
                  <p className="text-xs tracking-[0.15em] uppercase font-medium mb-3 opacity-60">
                    Размер {selectedSize && <span className="opacity-100">— {selectedSize}</span>}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes.map(s => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`w-10 h-10 text-xs border transition-all ${
                          selectedSize === s
                            ? 'bg-black text-white border-black'
                            : 'border-black/20 hover:border-black text-black/60 hover:text-black'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize || !selectedColor}
                  className={`w-full py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-200 ${
                    addedId === selectedProduct.id
                      ? 'bg-black/70 text-white'
                      : selectedSize && selectedColor
                      ? 'bg-black text-white hover:bg-black/80'
                      : 'bg-black/10 text-black/30 cursor-not-allowed'
                  }`}
                >
                  {addedId === selectedProduct.id ? '✓ Добавлено' : 'В корзину'}
                </button>

                {(!selectedSize || !selectedColor) && (
                  <p className="text-[11px] text-center mt-2 opacity-40">
                    {!selectedColor ? 'Выберите цвет' : 'Выберите размер'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
