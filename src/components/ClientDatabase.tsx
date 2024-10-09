import React, { useState, useEffect } from 'react';
import { Client } from '../types';

interface ClientDatabaseProps {
  clients: Client[];
  onClientUpdate: (updatedClients: Client[]) => void;
}

const ClientDatabase: React.FC<ClientDatabaseProps> = ({ clients, onClientUpdate }) => {
  const [localClients, setLocalClients] = useState<Client[]>(clients);
  const [commonOutsourcingRateSS, setCommonOutsourcingRateSS] = useState<number | null>(null);
  const [commonOutsourcingRatePartTime, setCommonOutsourcingRatePartTime] = useState<number | null>(null);
  const [commonOutsourcingRateUrara, setCommonOutsourcingRateUrara] = useState<number | null>(null);

  useEffect(() => {
    setLocalClients(clients);
    if (clients.length > 0) {
      setCommonOutsourcingRateSS(clients[0].outsourcingRateSS);
      setCommonOutsourcingRatePartTime(clients[0].outsourcingRatePartTime);
      setCommonOutsourcingRateUrara(clients[0].outsourcingRateUrara);
    }
  }, [clients]);

  const handleInputChange = (
    clientId: string,
    field: keyof Client,
    value: string
  ) => {
    const updatedClients = localClients.map((client) => {
      if (client.id === clientId) {
        const updatedClient = { ...client, [field]: field === 'name' || field === 'contractPlan' ? value : value === '' ? null : parseFloat(value) || 0 };
        if (field === 'monthlyRevenue' || field === 'contractPlan') {
          updatedClient.hourlyRevenue = updatedClient.contractPlan && updatedClient.monthlyRevenue
            ? updatedClient.monthlyRevenue / parseFloat(updatedClient.contractPlan)
            : 0;
        }
        return updatedClient;
      }
      return client;
    });
    setLocalClients(updatedClients);
  };

  const handleCommonRateChange = (field: 'outsourcingRateSS' | 'outsourcingRatePartTime' | 'outsourcingRateUrara', value: string) => {
    const rate = value === '' ? null : parseFloat(value) || 0;
    if (field === 'outsourcingRateSS') {
      setCommonOutsourcingRateSS(rate);
    } else if (field === 'outsourcingRatePartTime') {
      setCommonOutsourcingRatePartTime(rate);
    } else {
      setCommonOutsourcingRateUrara(rate);
    }
    const updatedClients = localClients.map((client) => ({
      ...client,
      [field]: rate
    }));
    setLocalClients(updatedClients);
  };

  const handleSave = () => {
    onClientUpdate(localClients);
  };

  const addClient = () => {
    const newClient: Client = {
      id: Date.now().toString(),
      name: `クライアント ${localClients.length + 1}`,
      monthlyRevenue: null,
      contractPlan: '',
      hourlyRevenue: 0,
      hourlyRate: null,
      outsourcingRateSS: commonOutsourcingRateSS,
      outsourcingRatePartTime: commonOutsourcingRatePartTime,
      outsourcingRateUrara: commonOutsourcingRateUrara,
      overtimeHours: null,
      outsourcingHoursSS: null,
      outsourcingHoursPartTime: null,
      outsourcingHoursUrara: null,
    };
    setLocalClients([...localClients, newClient]);
  };

  const formatNumber = (num: number | null | undefined) => {
    if (num === null || num === undefined) return '';
    return num.toLocaleString('ja-JP', { maximumFractionDigits: 2 });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">クライアント情報</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 whitespace-nowrap">クライアント名</th>
                <th className="px-4 py-2 whitespace-nowrap">月額料金</th>
                <th className="px-4 py-2 whitespace-nowrap">契約プラン</th>
                <th className="px-4 py-2 whitespace-nowrap">時間あたり売上</th>
              </tr>
            </thead>
            <tbody>
              {localClients.map((client) => (
                <tr key={client.id}>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      value={client.name}
                      onChange={(e) => handleInputChange(client.id, 'name', e.target.value)}
                      className="w-full"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      value={client.monthlyRevenue || ''}
                      onChange={(e) => handleInputChange(client.id, 'monthlyRevenue', e.target.value)}
                      className="w-full"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      value={client.contractPlan}
                      onChange={(e) => handleInputChange(client.id, 'contractPlan', e.target.value)}
                      className="w-full"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    {formatNumber(client.hourlyRevenue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={addClient}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          クライアント追加
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">共通原価情報</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">SS時給</label>
            <input
              type="number"
              value={commonOutsourcingRateSS || ''}
              onChange={(e) => handleCommonRateChange('outsourcingRateSS', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">アルバイト時給</label>
            <input
              type="number"
              value={commonOutsourcingRatePartTime || ''}
              onChange={(e) => handleCommonRateChange('outsourcingRatePartTime', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">うらら時給</label>
            <input
              type="number"
              value={commonOutsourcingRateUrara || ''}
              onChange={(e) => handleCommonRateChange('outsourcingRateUrara', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          保存
        </button>
      </div>
    </div>
  );
};

export default ClientDatabase;