import React from 'react';
import { Client } from '../types';

interface ClientListProps {
  clients: Client[];
  onClientUpdate: (updatedClient: Client) => void;
}

const ClientList: React.FC<ClientListProps> = ({ clients, onClientUpdate }) => {
  const handleInputChange = (
    clientId: string,
    field: keyof Client,
    value: string
  ) => {
    const updatedClient = clients.find((client) => client.id === clientId);
    if (updatedClient) {
      const newClient = {
        ...updatedClient,
        [field]: value === '' ? null : parseFloat(value) || 0,
      };
      onClientUpdate(newClient);
    }
  };

  const calculateOvertimeCost = (client: Client) => {
    return (client.overtimeHours || 0) * (client.hourlyRate || 0);
  };

  const calculateOutsourcingCostSS = (client: Client) => {
    return (client.outsourcingHoursSS || 0) * (client.outsourcingRateSS || 0);
  };

  const calculateOutsourcingCostPartTime = (client: Client) => {
    return (client.outsourcingHoursPartTime || 0) * (client.outsourcingRatePartTime || 0);
  };

  const calculateOutsourcingCostUrara = (client: Client) => {
    return (client.outsourcingHoursUrara || 0) * (client.outsourcingRateUrara || 0);
  };

  const formatNumber = (num: number | null | undefined) => {
    if (num === null || num === undefined) return '';
    return num.toLocaleString('ja-JP', { maximumFractionDigits: 2 });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 whitespace-nowrap">クライアント名</th>
            <th className="px-4 py-2 whitespace-nowrap">月額料金</th>
            <th className="px-4 py-2 whitespace-nowrap">契約プラン</th>
            <th className="px-4 py-2 whitespace-nowrap">時間あたり売上</th>
            <th className="px-4 py-2 whitespace-nowrap">超過時間</th>
            <th className="px-4 py-2 whitespace-nowrap">超過料金</th>
            <th className="px-4 py-2 whitespace-nowrap">SS時間</th>
            <th className="px-4 py-2 whitespace-nowrap">SSコスト</th>
            <th className="px-4 py-2 whitespace-nowrap">アルバイト時間</th>
            <th className="px-4 py-2 whitespace-nowrap">アルバイトコスト</th>
            <th className="px-4 py-2 whitespace-nowrap">うらら時間</th>
            <th className="px-4 py-2 whitespace-nowrap">うららコスト</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="border px-4 py-2">{client.name}</td>
              <td className="border px-4 py-2">{formatNumber(client.monthlyRevenue)}</td>
              <td className="border px-4 py-2">{client.contractPlan}</td>
              <td className="border px-4 py-2">{formatNumber(client.hourlyRevenue)}</td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={client.overtimeHours || ''}
                  onChange={(e) => handleInputChange(client.id, 'overtimeHours', e.target.value)}
                  className="w-full"
                />
              </td>
              <td className="border px-4 py-2">
                {formatNumber(calculateOvertimeCost(client))}
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={client.outsourcingHoursSS || ''}
                  onChange={(e) => handleInputChange(client.id, 'outsourcingHoursSS', e.target.value)}
                  className="w-full"
                />
              </td>
              <td className="border px-4 py-2">
                {formatNumber(calculateOutsourcingCostSS(client))}
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={client.outsourcingHoursPartTime || ''}
                  onChange={(e) => handleInputChange(client.id, 'outsourcingHoursPartTime', e.target.value)}
                  className="w-full"
                />
              </td>
              <td className="border px-4 py-2">
                {formatNumber(calculateOutsourcingCostPartTime(client))}
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={client.outsourcingHoursUrara || ''}
                  onChange={(e) => handleInputChange(client.id, 'outsourcingHoursUrara', e.target.value)}
                  className="w-full"
                />
              </td>
              <td className="border px-4 py-2">
                {formatNumber(calculateOutsourcingCostUrara(client))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;