import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { PRODUCTS, type Product } from '@/data/products';

const ADMIN_LOGIN = 'stmercer';
const ADMIN_PASSWORD = 's200791dimr';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
}

interface Order {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  comment: string;
  items: OrderItem[];
  total: number;
  created_at: string;
  status: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  orders_count: number;
  is_banned: boolean;
  created_at: string;
}

type Tab = 'dashboard' | 'products' | 'orders' | 'users';

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('mercer_admin') === '1');
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [loginErr, setLoginErr] = useState(false);
  const [tab, setTab] = useState<Tab>('dashboard');
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    Promise.all([
      fetch('https://functions.poehali.dev/7e687870-0a6e-47a2-a884-9b711b75be45', {
        headers: { 'X-Admin-Token': 'mercer_admin_token' }
      }).then(r => r.json()).catch(() => ({ orders: [], users: [] }))
    ]).then(([data]) => {
      if (data.orders) setOrders(data.orders);
      if (data.users) setUsers(data.users);
      setLoading(false);
    });
  }, [authed]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login === ADMIN_LOGIN && pass === ADMIN_PASSWORD) {
      sessionStorage.setItem('mercer_admin', '1');
      setAuthed(true);
    } else {
      setLoginErr(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('mercer_admin');
    setAuthed(false);
  };

  const handlePriceChange = (id: number, price: number) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, price } : p));
  };

  const handleToggleAvailable = (id: number) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, isAvailable: !p.isAvailable } : p));
  };

  const handleBanUser = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, is_banned: !u.is_banned } : u));
  };

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const totalItems = products.reduce((s) => s + 1, 0);
  const activeProducts = products.filter(p => p.isAvailable).length;

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0eeeb] px-6">
        <div className="w-full max-w-sm fade-in-up">
          <div className="text-center mb-10">
            <p className="font-display text-4xl tracking-[0.2em] mb-2">MERCER</p>
            <p className="text-xs tracking-[0.2em] uppercase opacity-40">Панель управления</p>
          </div>

          <form onSubmit={handleLogin} className="bg-white p-8 space-y-6">
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase opacity-50 mb-2">Логин</label>
              <input
                type="text"
                value={login}
                onChange={e => { setLogin(e.target.value); setLoginErr(false); }}
                className="w-full border-b border-black/20 bg-transparent pb-3 text-sm font-light focus:outline-none focus:border-black transition-colors"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase opacity-50 mb-2">Пароль</label>
              <input
                type="password"
                value={pass}
                onChange={e => { setPass(e.target.value); setLoginErr(false); }}
                className="w-full border-b border-black/20 bg-transparent pb-3 text-sm font-light focus:outline-none focus:border-black transition-colors"
                autoComplete="current-password"
              />
            </div>
            {loginErr && <p className="text-xs text-red-500 tracking-wide">Неверный логин или пароль</p>}
            <button
              type="submit"
              className="w-full bg-black text-white py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-black/80 transition-colors"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Дашборд', icon: 'LayoutDashboard' },
    { id: 'products', label: 'Товары', icon: 'Package' },
    { id: 'orders', label: 'Заказы', icon: 'ShoppingBag' },
    { id: 'users', label: 'Клиенты', icon: 'Users' },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f3] flex">
      
      {/* Sidebar */}
      <aside className="w-56 bg-black text-white flex flex-col flex-shrink-0">
        <div className="px-6 py-8 border-b border-white/10">
          <p className="font-display text-xl tracking-[0.2em]">MERCER</p>
          <p className="text-[11px] text-white/30 tracking-widest uppercase mt-1">Admin</p>
        </div>
        <nav className="flex-1 py-6 px-3">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs tracking-[0.12em] uppercase transition-all duration-150 mb-1 ${
                tab === t.id
                  ? 'bg-white text-black font-medium'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon name={t.icon} size={14} />
              {t.label}
            </button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="px-6 py-5 border-t border-white/10 flex items-center gap-2 text-white/30 hover:text-white text-xs tracking-widest uppercase transition-colors"
        >
          <Icon name="LogOut" size={14} />
          Выйти
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          
          {/* Dashboard */}
          {tab === 'dashboard' && (
            <div className="fade-in">
              <h2 className="font-display text-3xl font-light mb-8">Дашборд</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 stagger">
                {[
                  { label: 'Выручка', value: `${totalRevenue.toLocaleString('ru-RU')} ₽`, icon: 'TrendingUp' },
                  { label: 'Заказов', value: orders.length.toString(), icon: 'ShoppingBag' },
                  { label: 'Товаров', value: `${activeProducts}/${totalItems}`, icon: 'Package' },
                  { label: 'Клиентов', value: users.length.toString(), icon: 'Users' },
                ].map((s, i) => (
                  <div key={i} className="bg-white p-6 fade-in-up">
                    <div className="flex items-start justify-between mb-4">
                      <p className="text-[11px] tracking-[0.15em] uppercase opacity-40">{s.label}</p>
                      <Icon name={s.icon} size={16} className="opacity-30" />
                    </div>
                    <p className="text-2xl font-medium">{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Recent orders */}
              <div className="bg-white">
                <div className="flex items-center justify-between p-6 border-b border-black/8">
                  <p className="text-sm font-medium tracking-wide">Последние заказы</p>
                  <button onClick={() => setTab('orders')} className="text-xs opacity-40 hover:opacity-100 hover-underline">
                    Все заказы
                  </button>
                </div>
                {orders.length === 0 ? (
                  <div className="p-8 text-center text-sm opacity-30">Заказов пока нет</div>
                ) : (
                  <div className="divide-y divide-black/5">
                    {orders.slice(0, 5).map(order => (
                      <div key={order.id} className="flex items-center justify-between px-6 py-4">
                        <div>
                          <p className="text-sm font-medium">{order.name}</p>
                          <p className="text-xs opacity-40 mt-0.5">{order.email} · {new Date(order.created_at).toLocaleDateString('ru-RU')}</p>
                        </div>
                        <p className="text-sm font-medium">{order.total.toLocaleString('ru-RU')} ₽</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Products */}
          {tab === 'products' && (
            <div className="fade-in">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-3xl font-light">Товары</h2>
                <p className="text-xs opacity-40">{activeProducts} активных из {totalItems}</p>
              </div>
              <div className="bg-white divide-y divide-black/5">
                {products.map(product => (
                  <div key={product.id} className={`flex items-center gap-4 px-6 py-4 transition-opacity ${!product.isAvailable ? 'opacity-50' : ''}`}>
                    <div className="w-12 h-14 bg-[#eeecea] flex-shrink-0 overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <p className="text-xs opacity-40 mt-0.5">{product.category}</p>
                    </div>
                    {editingProduct?.id === product.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={editingProduct.price}
                          onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                          className="w-28 border-b border-black/30 bg-transparent text-sm pb-1 focus:outline-none focus:border-black text-right"
                        />
                        <span className="text-sm opacity-40">₽</span>
                        <button
                          onClick={() => { handlePriceChange(product.id, editingProduct.price); setEditingProduct(null); }}
                          className="bg-black text-white text-xs px-3 py-1.5 hover:bg-black/70"
                        >
                          ✓
                        </button>
                        <button onClick={() => setEditingProduct(null)} className="text-xs opacity-40 hover:opacity-100 px-2 py-1.5">✕</button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium w-28 text-right">{product.price.toLocaleString('ru-RU')} ₽</span>
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="text-[11px] tracking-wide opacity-40 hover:opacity-100 transition-opacity border border-black/20 px-2 py-1"
                        >
                          Изменить
                        </button>
                      </div>
                    )}
                    <button
                      onClick={() => handleToggleAvailable(product.id)}
                      className={`text-[11px] tracking-[0.1em] uppercase px-3 py-1.5 border transition-all ${
                        product.isAvailable
                          ? 'border-black/20 text-black/50 hover:bg-black hover:text-white hover:border-black'
                          : 'bg-black/10 text-black/40 border-black/10'
                      }`}
                    >
                      {product.isAvailable ? 'Скрыть' : 'Показать'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders */}
          {tab === 'orders' && (
            <div className="fade-in">
              <h2 className="font-display text-3xl font-light mb-8">Заказы</h2>
              {loading ? (
                <div className="text-center py-20 opacity-30 text-sm">Загрузка...</div>
              ) : orders.length === 0 ? (
                <div className="bg-white p-16 text-center">
                  <Icon name="ShoppingBag" size={40} className="opacity-10 mx-auto mb-4" />
                  <p className="text-sm opacity-30 tracking-wide">Заказов пока нет</p>
                </div>
              ) : (
                <div className="bg-white divide-y divide-black/5">
                  {orders.map(order => (
                    <div key={order.id} className="px-6 py-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-sm font-medium">{order.name}</p>
                          <p className="text-xs opacity-40 mt-0.5">{order.email} · {order.phone}</p>
                          <p className="text-xs opacity-40">{order.city}, {order.address}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{order.total.toLocaleString('ru-RU')} ₽</p>
                          <p className="text-[11px] opacity-40 mt-1">{new Date(order.created_at).toLocaleString('ru-RU')}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {order.items.map((item, i) => (
                          <span key={i} className="text-[11px] bg-black/5 px-2 py-1 tracking-wide">
                            {item.name} · {item.size} · {item.quantity}шт.
                          </span>
                        ))}
                      </div>
                      {order.comment && (
                        <p className="text-xs opacity-40 mt-2 italic">{order.comment}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Users */}
          {tab === 'users' && (
            <div className="fade-in">
              <h2 className="font-display text-3xl font-light mb-8">Клиенты</h2>
              {loading ? (
                <div className="text-center py-20 opacity-30 text-sm">Загрузка...</div>
              ) : users.length === 0 ? (
                <div className="bg-white p-16 text-center">
                  <Icon name="Users" size={40} className="opacity-10 mx-auto mb-4" />
                  <p className="text-sm opacity-30 tracking-wide">Клиентов пока нет</p>
                </div>
              ) : (
                <div className="bg-white divide-y divide-black/5">
                  {users.map(user => (
                    <div key={user.id} className={`flex items-center gap-4 px-6 py-4 ${user.is_banned ? 'opacity-40' : ''}`}>
                      <div className="w-8 h-8 bg-black/10 flex items-center justify-center flex-shrink-0 text-xs font-medium">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs opacity-40 mt-0.5">{user.email}</p>
                      </div>
                      <div className="text-right mr-4">
                        <p className="text-xs opacity-40">Заказов</p>
                        <p className="text-sm font-medium">{user.orders_count}</p>
                      </div>
                      <p className="text-xs opacity-30 mr-4">{new Date(user.created_at).toLocaleDateString('ru-RU')}</p>
                      <button
                        onClick={() => handleBanUser(user.id)}
                        className={`text-[11px] tracking-[0.1em] uppercase px-3 py-1.5 border transition-all ${
                          user.is_banned
                            ? 'bg-black text-white border-black hover:bg-black/70'
                            : 'border-red-300 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500'
                        }`}
                      >
                        {user.is_banned ? 'Разбанить' : 'Бан'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}