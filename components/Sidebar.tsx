
import React from 'react';
import { View } from '../types';
import { LayoutDashboard, ReceiptText, ListOrdered, PackageSearch, Users } from 'lucide-react';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'billing', label: 'New Billing', icon: ReceiptText },
    { id: 'orders', label: 'Order History', icon: ListOrdered },
    { id: 'customers', label: 'Customer Profiles', icon: Users },
    { id: 'inventory', label: 'Inventory', icon: PackageSearch },
  ];

  return (
    <div className="h-screen w-64 bg-slate-900 text-white flex flex-col fixed left-0 top-0 z-10">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-serif font-bold tracking-tight text-amber-400 leading-tight">VAR VADHU EXCLUSIVE</h1>
        <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">Boutique Management</p>
      </div>
      
      <nav className="flex-1 mt-6 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as View)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center space-x-3 px-4 py-2">
          <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center font-bold text-xs">VV</div>
          <div>
            <p className="text-sm font-medium">Store Admin</p>
            <p className="text-xs text-slate-500 uppercase tracking-tighter">Premium Access</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
