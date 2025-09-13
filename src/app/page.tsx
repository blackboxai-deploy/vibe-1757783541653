"use client";

import { useMemo } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ViolationsSection } from "@/components/dashboard/violations-section";
import { ChartsSection } from "@/components/dashboard/charts-section";
import { ReportsTable } from "@/components/dashboard/reports-table";
import { generatePageReports, getViolationStats, getChartData } from "@/lib/data";

export default function Dashboard() {
  const reports = useMemo(() => generatePageReports(18790), []);
  const violationStats = useMemo(() => getViolationStats(reports), [reports]);
  const chartData = useMemo(() => getChartData(reports), [reports]);

  return (
    <div className="min-h-screen">
      <DashboardHeader />
      
      <main className="container mx-auto px-6 py-8">
        {/* Statistics Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            📊 Violations Overview
          </h2>
          <StatsCards stats={violationStats} />
        </section>

        {/* Violations Analysis */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            🔍 Violations Analysis
          </h2>
          <ViolationsSection
            violationsByType={violationStats.violationsByType}
            violationsBySeverity={violationStats.violationsBySeverity}
            totalViolations={violationStats.totalViolations}
          />
        </section>

        {/* Data Visualization */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            📈 Analytics & Trends
          </h2>
          <ChartsSection
            chartData={chartData}
            violationsByType={violationStats.violationsByType}
          />
        </section>

        {/* Detailed Reports */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            📋 Detailed Page Reports
          </h2>
          <ReportsTable reports={reports} />
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center py-8 border-t border-gray-200">
          <div className="text-gray-600">
            <p className="font-semibold">PINKY SHOPCO BY GUS</p>
            <p className="text-sm mt-2">
              META Page Reports Dashboard • Generated on September 13, 2025
            </p>
            <p className="text-xs mt-1 text-gray-500">
              Total Reports: {reports.length.toLocaleString()} • 
              Active Violations: {violationStats.activeViolations} • 
              Compliance Rate: {violationStats.complianceRate}%
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}