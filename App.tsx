
import React, { useState } from 'react';
import { View, Order } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import BillingSystem from './components/BillingSystem';
import OrderList from './components/OrderList';
import InventoryView from './components/InventoryView';
import CustomerView from './components/CustomerView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [orders, setOrders] = useState<Order[]>([]);

  const handleAddOrder = (order: Order) => {
    setOrders(prev => [...prev, order]);
    setCurrentView('orders');
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard orders={orders} />;
      case 'billing':
        return <BillingSystem onAddOrder={handleAddOrder} />;
      case 'orders':
        return <OrderList orders={orders} />;
      case 'customers':
        return <CustomerView orders={orders} />;
      case 'inventory':
        return <InventoryView />;
      default:
        return <Dashboard orders={orders} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 ml-64 min-h-screen overflow-x-hidden">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
