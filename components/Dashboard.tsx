
import React from 'react';
import { Order } from '../types';
import { formatCurrency } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, ShoppingBag, Users, IndianRupee } from 'lucide-react';

interface DashboardProps {
  orders: Order[];
}

const Dashboard: React.FC<DashboardProps> = ({ orders }) => {
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  // Chart Data preparation
  const categorySales = orders.reduce((acc: any, order) => {
    order.items.forEach(item => {
      acc[item.category] = (acc[item.category] || 0) + item.quantity;
    });
    return acc;
  }, {});

  const chartData = Object.keys(categorySales).map(cat => ({
    name: cat,
    value: categorySales[cat],
  }));

  const COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6'];

  return (
    <div className="p-8">
      <header className="mb-8">
        <h2 className="text-3xl font-serif font-bold text-slate-800">Store Overview</h2>
        <p className="text-slate-500">Real-time performance metrics</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="Total Revenue" 
          value={formatCurrency(totalRevenue)} 
          icon={<IndianRupee className="text-emerald-600" />}
          trend="+12% from last month"
          trendUp={true}
        />
        <StatCard 
          title="Total Orders" 
          value={totalOrders.toString()} 
          icon={<ShoppingBag className="text-amber-600" />}
          trend="+5 today"
          trendUp={true}
        />
        <StatCard 
          title="Avg. Order Value" 
          value={formatCurrency(averageOrderValue)} 
          icon={<TrendingUp className="text-blue-600" />}
          trend="-2% vs avg"
          trendUp={false}
        />
        <StatCard 
          title="Active Customers" 
          value="48" 
          icon={<Users className="text-indigo-600" />}
          trend="+8 new this week"
          trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales by Category */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Units Sold by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Recent Orders</h3>
          <div className="space-y-4">
            {orders.slice(-5).reverse().map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-200">
                    <ShoppingBag size={18} className="text-slate-400" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{order.customerName}</p>
                    <p className="text-xs text-slate-500">{order.items.length} items • {order.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">{formatCurrency(order.totalAmount)}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${
                    order.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <div className="text-center py-10 text-slate-400 italic">No recent orders found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendUp }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</span>
      <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
    </div>
    <div className="flex items-end justify-between">
      <div>
        <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
        <p className={`text-xs mt-1 font-medium ${trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
          {trend}
        </p>
      </div>
    </div>
  </div>
);

export default Dashboard;
