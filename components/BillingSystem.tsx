
import React, { useState } from 'react';
import { Product, CartItem, Order, Category } from '../types';
import { INITIAL_PRODUCTS, formatCurrency } from '../constants';
import { getFashionAdvice } from '../geminiService';
import { Search, ShoppingCart, User, Phone, Plus, Minus, Trash2, Sparkles, Receipt, FileText } from 'lucide-react';

interface BillingSystemProps {
  onAddOrder: (order: Order) => void;
}

const BillingSystem: React.FC<BillingSystemProps> = ({ onAddOrder }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [aiAdvice, setAiAdvice] = useState<string>('');
  const [isGeneratingAdvice, setIsGeneratingAdvice] = useState(false);

  const categories: (Category | 'All')[] = ['All', 'Sherwani', 'Coat Suit', 'Shirt Pant', 'Kurta Pajama', 'Jodhpuri'];

  const filteredProducts = INITIAL_PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.variety.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleFetchAdvice = async () => {
    if (cart.length === 0) return;
    setIsGeneratingAdvice(true);
    const advice = await getFashionAdvice(cart.map(i => `${i.name} (${i.category})`));
    setAiAdvice(advice);
    setIsGeneratingAdvice(false);
  };

  const handleCheckout = () => {
    if (!customerName || !customerPhone || cart.length === 0) {
      alert("Please enter customer details and add items to cart.");
      return;
    }

    const newOrder: Order = {
      id: `VV-${Date.now().toString().slice(-6)}`,
      customerName,
      customerPhone,
      items: [...cart],
      totalAmount,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Completed',
      customizationNotes: notes
    };

    onAddOrder(newOrder);
    setCart([]);
    setCustomerName('');
    setCustomerPhone('');
    setNotes('');
    setAiAdvice('');
    alert("Bill Generated for " + customerName);
  };

  return (
    <div className="flex h-[calc(100vh-0px)] overflow-hidden">
      {/* Product Selection Side */}
      <div className="flex-1 flex flex-col bg-white border-r border-slate-200">
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Search by variety or name..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <div 
              key={product.id}
              onClick={() => addToCart(product)}
              className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all hover:border-amber-300 flex flex-col"
            >
              <div className="aspect-[4/5] bg-slate-100 relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-slate-800 truncate">{product.name}</h4>
                <p className="text-[10px] text-amber-600 font-bold uppercase mb-1">{product.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">{formatCurrency(product.price)}</span>
                  <div className="bg-slate-100 p-1 rounded-full group-hover:bg-amber-100 transition-colors">
                    <Plus size={16} className="text-slate-600 group-hover:text-amber-600" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart & Checkout Side */}
      <div className="w-[420px] flex flex-col bg-slate-50 border-l border-slate-200">
        <div className="p-6 border-b border-slate-200 bg-white">
          <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
            <Receipt size={24} className="text-amber-500" />
            <span>Billing Terminal</span>
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Customer Details */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-2">Customer Profile</h4>
            <div className="space-y-3">
              <div className="relative">
                <User size={16} className="absolute left-3 top-3 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Customer Name"
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-3 text-slate-400" />
                <input 
                  type="tel" 
                  placeholder="Mobile Number"
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </div>
              <div className="relative">
                <FileText size={16} className="absolute left-3 top-3 text-slate-400" />
                <textarea 
                  placeholder="Customization notes (measurements, alterations...)"
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-1 focus:ring-amber-500 outline-none transition-all min-h-[80px]"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Cart Items */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Selected Varieties</h4>
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">{cart.length} items</span>
            </div>
            
            {cart.map(item => (
              <div key={item.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-3">
                <img src={item.image} className="w-12 h-12 rounded object-cover border border-slate-100" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">{item.name}</p>
                  <p className="text-xs text-amber-600 font-medium">{formatCurrency(item.price)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center border border-slate-200 rounded bg-slate-50 overflow-hidden">
                    <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 hover:bg-slate-100"><Minus size={12} /></button>
                    <span className="text-xs w-6 text-center font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 hover:bg-slate-100"><Plus size={12} /></button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-rose-500 transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}

            {cart.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                <ShoppingCart className="text-slate-200 mx-auto mb-2" size={32} />
                <p className="text-slate-400 text-sm italic">Listing area empty</p>
              </div>
            )}
          </div>

          {/* AI Advisor */}
          {cart.length > 0 && (
            <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-lg border border-slate-800 relative">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles size={18} className="text-amber-400" />
                <h4 className="text-sm font-bold tracking-wide">Boutique Styling Advice</h4>
              </div>
              {aiAdvice ? (
                <p className="text-xs text-slate-300 leading-relaxed italic">{aiAdvice}</p>
              ) : (
                <button 
                  onClick={handleFetchAdvice}
                  disabled={isGeneratingAdvice}
                  className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-black text-[11px] font-bold rounded-lg transition-colors"
                >
                  {isGeneratingAdvice ? "Fashion AI thinking..." : "Get Designer Suggestions"}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Checkout */}
        <div className="p-6 bg-white border-t border-slate-200 shadow-xl">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Grand Total</p>
              <p className="text-3xl font-bold text-slate-900">{formatCurrency(totalAmount)}</p>
            </div>
          </div>
          <button 
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-100 disabled:text-slate-300 text-white font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center space-x-2 text-lg"
          >
            <Receipt size={20} />
            <span>Process Payment</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingSystem;
