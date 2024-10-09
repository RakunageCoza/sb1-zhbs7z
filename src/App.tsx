import React, { useState, useEffect } from 'react';
import { Client, TotalStats } from './types';
import ClientList from './components/ClientList';
import TotalStatsComponent from './components/TotalStats';
import ClientDatabase from './components/ClientDatabase';

const App: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [totalStats, setTotalStats] = useState<TotalStats>({
    totalMonthlyRevenue: 0,
    totalOvertimeCost: 0,
    totalOutsourcingCostSS: 0,
    totalOutsourcingCostPartTime: 0,
    totalOutsourcingCostUrara: 0,
  });
  const [activeTab, setActiveTab] = useState<'dashboard' | 'database'>('dashboard');

  useEffect(() => {
    const storedClients = localStorage.getItem('clients');
    if (storedClients) {
      setClients(JSON.parse(storedClients));
    }
  }, []);

  useEffect(() => {
    const newTotalStats: TotalStats = {
      totalMonthlyRevenue: clients.reduce((sum, client) => sum + client.monthlyRevenue, 0),
      totalOvertimeCost: clients.reduce((sum, client) => sum + (client.overtimeHours * client.hourlyRate), 0),
      totalOutsourcingCostSS: clients.reduce((sum, client) => sum + (client.outsourcingHoursSS * client.outsourcingRateSS), 0),
      totalOutsourcingCostPartTime: clients.reduce((sum, client) => sum + (client.outsourcingHoursPartTime * client.outsourcingRatePartTime), 0),
      totalOutsourcingCostUrara: clients.reduce((sum, client) => sum + (client.outsourcingHoursUrara * client.outsourcingRateUrara), 0),
    };
    setTotalStats(newTotalStats);
  }, [clients]);

  const updateClient = (updatedClient: Client) => {
    const newClients = clients.map((client) =>
      client.id === updatedClient.id ? updatedClient : client
    );
    setClients(newClients);
    localStorage.setItem('clients', JSON.stringify(newClients));
  };

  const updateClients = (updatedClients: Client[]) => {
    setClients(updatedClients);
    localStorage.setItem('clients', JSON.stringify(updatedClients));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">売上と原価の管理システム</h1>
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${
            activeTab === 'dashboard' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('dashboard')}
        >
          ダッシュボード
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'database' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('database')}
        >
          データベース
        </button>
      </div>
      {activeTab === 'dashboard' ? (
        <>
          <ClientList clients={clients} onClientUpdate={updateClient} />
          <div className="mt-8">
            <TotalStatsComponent stats={totalStats} />
          </div>
        </>
      ) : (
        <ClientDatabase clients={clients} onClientUpdate={updateClients} />
      )}
    </div>
  );
};

export default App;