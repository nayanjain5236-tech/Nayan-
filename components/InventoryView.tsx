
import React from 'react';
import { INITIAL_PRODUCTS, formatCurrency } from '../constants';
import { Package, Plus } from 'lucide-react';

const InventoryView: React.FC = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-800">Master Inventory</h2>
          <p className="text-slate-500">Manage varieties, categories and price rates</p>
        </div>
        <button className="flex items-center space-x-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-amber-600 transition-colors shadow-lg shadow-slate-900/10">
          <Plus size={20} />
          <span>Add Variety</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {INITIAL_PRODUCTS.map(product => (
          <div key={product.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group">
            <div className="h-48 overflow-hidden relative">
              <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm">
                <p className="text-xs font-bold text-amber-600">{formatCurrency(product.price)}</p>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                  {product.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <p className="text-xs text-slate-400 font-medium">In Stock</p>
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-1">{product.name}</h4>
              <p className="text-sm text-slate-500 mb-4">{product.variety}</p>
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <button className="text-xs font-bold text-slate-400 hover:text-amber-500 uppercase tracking-wider">Edit Rates</button>
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200"></div>
                   ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryView;
