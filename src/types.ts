export interface Client {
  id: string;
  name: string;
  monthlyRevenue: number | null;
  contractPlan: string;
  hourlyRevenue: number;
  hourlyRate: number | null;
  outsourcingRateSS: number | null;
  outsourcingRatePartTime: number | null;
  outsourcingRateUrara: number | null;
  overtimeHours: number | null;
  outsourcingHoursSS: number | null;
  outsourcingHoursPartTime: number | null;
  outsourcingHoursUrara: number | null;
}

export interface TotalStats {
  totalMonthlyRevenue: number;
  totalOvertimeCost: number;
  totalOutsourcingCostSS: number;
  totalOutsourcingCostPartTime: number;
  totalOutsourcingCostUrara: number;
}