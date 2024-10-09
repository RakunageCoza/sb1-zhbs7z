import React from 'react';
import { TotalStats } from '../types';

interface TotalStatsProps {
  stats: TotalStats;
}

const TotalStatsComponent: React.FC<TotalStatsProps> = ({ stats }) => {
  const formatNumber = (num: number) => {
    return num.toLocaleString('ja-JP', { maximumFractionDigits: 2 });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">統計</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">合計月額売上</p>
          <p className="text-lg">{formatNumber(stats.totalMonthlyRevenue)}</p>
        </div>
        <div>
          <p className="font-semibold">合計超過費用</p>
          <p className="text-lg">{formatNumber(stats.totalOvertimeCost)}</p>
        </div>
        <div>
          <p className="font-semibold">合計外注費用 (SS)</p>
          <p className="text-lg">{formatNumber(stats.totalOutsourcingCostSS)}</p>
        </div>
        <div>
          <p className="font-semibold">合計外注費用 (アルバイト)</p>
          <p className="text-lg">{formatNumber(stats.totalOutsourcingCostPartTime)}</p>
        </div>
        <div>
          <p className="font-semibold">合計外注費用 (うらら)</p>
          <p className="text-lg">{formatNumber(stats.totalOutsourcingCostUrara)}</p>
        </div>
      </div>
    </div>
  );
};

export default TotalStatsComponent;