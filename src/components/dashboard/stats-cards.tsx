"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StatsCardsProps {
  stats: {
    totalViolations: number;
    activeViolations: number;
    resolvedViolations: number;
    criticalViolations: number;
    complianceRate: number;
    pagesWithViolations: number;
    cleanPages: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Compliance Rate",
      value: `${stats.complianceRate}%`,
      description: "Pages without violations",
      trend: stats.complianceRate >= 85 ? "positive" : stats.complianceRate >= 70 ? "neutral" : "negative",
      icon: "📊"
    },
    {
      title: "Total Violations",
      value: stats.totalViolations.toLocaleString(),
      description: "Across all pages",
      trend: "neutral",
      icon: "⚠️"
    },
    {
      title: "Active Violations",
      value: stats.activeViolations.toLocaleString(),
      description: "Requiring immediate attention",
      trend: "negative",
      icon: "🔴"
    },
    {
      title: "Resolved Violations",
      value: stats.resolvedViolations.toLocaleString(),
      description: "Successfully addressed",
      trend: "positive",
      icon: "✅"
    },
    {
      title: "Critical Issues",
      value: stats.criticalViolations.toLocaleString(),
      description: "High priority violations",
      trend: stats.criticalViolations === 0 ? "positive" : "negative",
      icon: "🚨"
    },
    {
      title: "Clean Pages",
      value: stats.cleanPages.toLocaleString(),
      description: "No violations detected",
      trend: "positive",
      icon: "🟢"
    }
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "positive": return "text-green-600";
      case "negative": return "text-red-600";
      default: return "text-blue-600";
    }
  };

  const getTrendBadgeColor = (trend: string) => {
    switch (trend) {
      case "positive": return "bg-green-100 text-green-800";
      case "negative": return "bg-red-100 text-red-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-pink-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {card.title}
            </CardTitle>
            <span className="text-2xl">{card.icon}</span>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold mb-2 ${getTrendColor(card.trend)}`}>
              {card.value}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {card.description}
              </p>
              <Badge className={getTrendBadgeColor(card.trend)}>
                {card.trend === "positive" ? "Good" : card.trend === "negative" ? "Alert" : "Info"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}