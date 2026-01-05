
import React, { useState } from 'react';
import { Order } from '../types';
import { formatCurrency } from '../constants';
import { Search, ChevronRight, User, Calendar, Tag, Printer, Filter } from 'lucide-react';

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(o => 
    o.customerName.toLowerCase().includes(search.toLowerCase()) ||
    o.id.toLowerCase().includes(search.toLowerCase())
  ).reverse();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-800">Order History</h2>
          <p className="text-slate-500">Track and manage all customer purchases</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search customers..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Order ID</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Customer</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Items</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Total</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 text-sm font-medium text-amber-600">{order.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <User size={14} className="text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{order.customerName}</p>
                      <p className="text-xs text-slate-400">{order.customerPhone}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{order.date}</td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                    {order.items.length} variety
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900">{formatCurrency(order.totalAmount)}</td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-emerald-100 text-emerald-700">
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="p-2 text-slate-400 hover:text-amber-500 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center">
                    <Tag size={48} className="text-slate-200 mb-4" />
                    <p className="text-slate-400 italic">No orders found matching your search.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200 shadow-2xl">
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-slate-800">Invoice Details</h3>
                  <p className="text-amber-600 font-medium">#{selectedOrder.id}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                  <Printer size={24} className="text-slate-400" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-slate-100">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                    <User size={12} className="mr-1" /> Customer
                  </p>
                  <p className="font-bold text-slate-800">{selectedOrder.customerName}</p>
                  <p className="text-sm text-slate-500">{selectedOrder.customerPhone}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-end">
                    <Calendar size={12} className="mr-1" /> Order Date
                  </p>
                  <p className="font-bold text-slate-800">{selectedOrder.date}</p>
                  <p className="text-sm text-emerald-600 font-medium italic">Payment Success</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ordered Items</h4>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded overflow-hidden">
                        <img src={item.image} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.variety} • Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-slate-800">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="bg-slate-900 text-white p-6 rounded-2xl flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Total Bill Amount</p>
                  <p className="text-3xl font-bold font-serif">{formatCurrency(selectedOrder.totalAmount)}</p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full font-bold transition-colors"
                >
                  Close View
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
