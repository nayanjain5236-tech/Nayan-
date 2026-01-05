
import React, { useState } from 'react';
import { Order } from '../types';
import { formatCurrency } from '../constants';
import { Search, UserCircle, History, ExternalLink, Calendar, Mail, Phone, ShoppingBag, ArrowLeft } from 'lucide-react';

interface CustomerViewProps {
  orders: Order[];
}

const CustomerView: React.FC<CustomerViewProps> = ({ orders }) => {
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  // Group orders by customer name
  const customerSummary = orders.reduce((acc: any, order) => {
    if (!acc[order.customerName]) {
      acc[order.customerName] = {
        name: order.customerName,
        phone: order.customerPhone,
        totalSpent: 0,
        orderCount: 0,
        lastOrder: order.date,
        orders: []
      };
    }
    acc[order.customerName].totalSpent += order.totalAmount;
    acc[order.customerName].orderCount += 1;
    acc[order.customerName].orders.push(order);
    return acc;
  }, {});

  const customers = Object.values(customerSummary) as any[];
  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.phone.includes(search)
  );

  if (selectedCustomer) {
    const profile = customerSummary[selectedCustomer];
    return (
      <div className="p-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-right duration-300">
        <button 
          onClick={() => setSelectedCustomer(null)}
          className="flex items-center space-x-2 text-slate-500 hover:text-amber-500 mb-6 transition-colors font-medium"
        >
          <ArrowLeft size={18} />
          <span>Back to Client List</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
              <div className="w-24 h-24 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-3xl">
                {profile.name.charAt(0)}
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900">{profile.name}</h3>
              <p className="text-sm text-slate-500 mb-6">{profile.phone}</p>
              
              <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-6">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Total Spent</p>
                  <p className="text-sm font-bold text-emerald-600">{formatCurrency(profile.totalSpent)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Visits</p>
                  <p className="text-sm font-bold text-amber-600">{profile.orderCount}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800">
              <h4 className="text-sm font-bold uppercase tracking-widest text-amber-400 mb-4 flex items-center">
                <History size={16} className="mr-2" /> Recent Status
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Preferred Category</span>
                  <span className="font-bold">Sherwani</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Membership</span>
                  <span className="text-amber-400 font-bold uppercase tracking-tighter">Elite Club</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order History List */}
          <div className="md:col-span-2">
            <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
              <ShoppingBag size={20} className="mr-2 text-amber-500" />
              Purchase History & Customizations
            </h4>
            
            <div className="space-y-4">
              {profile.orders.map((order: Order) => (
                <div key={order.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Invoice #{order.id}</span>
                      <div className="flex items-center space-x-2 text-slate-500 text-xs mt-1">
                        <Calendar size={12} />
                        <span>{order.date}</span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-slate-900">{formatCurrency(order.totalAmount)}</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center text-sm text-slate-600 bg-slate-50 p-2 rounded-lg">
                        <span className="w-6 font-bold text-slate-400">{item.quantity}x</span>
                        <span className="flex-1 font-medium">{item.name}</span>
                        <span className="text-slate-400 text-xs">{item.variety}</span>
                      </div>
                    ))}
                  </div>

                  {order.customizationNotes && (
                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 border-l-4">
                      <p className="text-[10px] text-amber-700 font-bold uppercase tracking-widest mb-1 flex items-center">
                        Customization Instructions
                      </p>
                      <p className="text-xs text-amber-900 italic leading-relaxed">{order.customizationNotes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-800">Client Profiles</h2>
          <p className="text-slate-500">Search customer history and bespoke preferences</p>
        </div>
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by customer name..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 shadow-sm transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div 
            key={customer.name}
            onClick={() => setSelectedCustomer(customer.name)}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-bold text-xl">
                {customer.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 truncate pr-6">{customer.name}</h4>
                <div className="flex items-center text-xs text-slate-400 mt-0.5">
                  <Phone size={10} className="mr-1" />
                  {customer.phone}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-4">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Visits</p>
                <p className="text-sm font-bold text-slate-900">{customer.orderCount} Times</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Total Bill</p>
                <p className="text-sm font-bold text-amber-600">{formatCurrency(customer.totalSpent)}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span>Last: {customer.lastOrder}</span>
              <span className="text-amber-500 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                View History <ExternalLink size={12} className="ml-1" />
              </span>
            </div>
          </div>
        ))}
        {filteredCustomers.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
             <UserCircle size={48} className="text-slate-200 mx-auto mb-4" />
             <p className="text-slate-400 italic">No customer profiles found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerView;
