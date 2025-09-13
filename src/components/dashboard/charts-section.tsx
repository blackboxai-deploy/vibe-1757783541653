"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

interface ChartsSectionProps {
  chartData: {
    monthlyViolations: Array<{
      month: string;
      violations: number;
      resolved: number;
      active: number;
    }>;
    performanceData: Array<{
      name: string;
      views: number;
      engagement: number;
      violations: number;
    }>;
  };
  violationsByType: Record<string, number>;
}

export function ChartsSection({ chartData, violationsByType }: ChartsSectionProps) {
  const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'];
  
  const pieData = Object.entries(violationsByType).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Monthly Violations Trend */}
      <Card className="border-2 hover:border-pink-200 transition-colors">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
            📈 Monthly Violations Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.monthlyViolations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="violations" fill="#ef4444" name="Total" />
              <Bar dataKey="resolved" fill="#22c55e" name="Resolved" />
              <Bar dataKey="active" fill="#f97316" name="Active" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Page Performance vs Violations */}
      <Card className="border-2 hover:border-pink-200 transition-colors">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
            📊 Performance vs Violations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line 
                yAxisId="left" 
                type="monotone" 
                dataKey="views" 
                stroke="#3b82f6" 
                name="Views"
                strokeWidth={3}
              />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="violations" 
                stroke="#ef4444" 
                name="Violations"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Violations Distribution */}
      <Card className="border-2 hover:border-pink-200 transition-colors">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
            🥧 Violations Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Engagement Metrics */}
      <Card className="border-2 hover:border-pink-200 transition-colors">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
            💡 Engagement Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="engagement" 
                stroke="#22c55e" 
                name="Engagement Rate"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}