import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Cart from '@/components/Cart';
import HomePage from './HomePage';
import CatalogPage from './CatalogPage';
import FAQPage from './FAQPage';
import ContactsPage from './ContactsPage';
import CheckoutPage from './CheckoutPage';
import AdminPage from './AdminPage';

type Page = 'home' | 'catalog' | 'faq' | 'contacts' | 'checkout' | 'admin';

const PAGES: Page[] = ['home', 'catalog', 'faq', 'contacts', 'checkout', 'admin'];

export default function Index() {
  const [page, setPage] = useState<Page>(() => {
    const hash = window.location.hash.replace('#', '') as Page;
    return PAGES.includes(hash) ? hash : 'home';
  });
  const [cartOpen, setCartOpen] = useState(false);

  const navigate = (p: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(p as Page);
    window.location.hash = p;
  };

  useEffect(() => {
    const handler = () => {
      const hash = window.location.hash.replace('#', '') as Page;
      if (PAGES.includes(hash)) setPage(hash);
    };
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  if (page === 'admin') {
    return <AdminPage />;
  }

  return (
    <div className="relative">
      <Navbar currentPage={page} onNavigate={navigate} onCartOpen={() => setCartOpen(true)} />

      <div key={page} className="page-enter">
        {page === 'home' && <HomePage onNavigate={navigate} />}
        {page === 'catalog' && <CatalogPage onCartOpen={() => setCartOpen(true)} />}
        {page === 'faq' && <FAQPage />}
        {page === 'contacts' && <ContactsPage />}
        {page === 'checkout' && <CheckoutPage onNavigate={navigate} />}
      </div>

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => navigate('checkout')}
      />
    </div>
  );
}
