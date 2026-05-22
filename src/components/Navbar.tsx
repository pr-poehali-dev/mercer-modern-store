import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { cartStore } from '@/store/cartStore';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onCartOpen: () => void;
}

export default function Navbar({ currentPage, onNavigate, onCartOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsub = cartStore.subscribe(() => setCartCount(cartStore.getCount()));
    return unsub;
  }, []);

  const links = [
    { id: 'home', label: 'Главная' },
    { id: 'catalog', label: 'Каталог' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contacts', label: 'Контакты' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#f8f8f8]/95 backdrop-blur-sm border-b border-black/8' : 'bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="font-display text-2xl lg:text-3xl tracking-[0.2em] font-light hover:opacity-70 transition-opacity duration-200"
          >
            MERCER
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-10">
            {links.map(link => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`text-xs tracking-[0.15em] uppercase font-medium hover-underline transition-opacity duration-200 ${
                  currentPage === link.id ? 'opacity-100' : 'opacity-50 hover:opacity-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={onCartOpen}
              className="relative p-2 hover:opacity-70 transition-opacity duration-200"
            >
              <Icon name="ShoppingBag" size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full font-medium">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 hover:opacity-70 transition-opacity duration-200"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-[#f8f8f8] border-t border-black/10 fade-in">
            <div className="px-6 py-6 flex flex-col gap-6">
              {links.map(link => (
                <button
                  key={link.id}
                  onClick={() => { onNavigate(link.id); setMenuOpen(false); }}
                  className={`text-left text-sm tracking-[0.15em] uppercase font-medium transition-opacity duration-200 ${
                    currentPage === link.id ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
