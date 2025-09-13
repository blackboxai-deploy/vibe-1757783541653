"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ViolationType, ViolationSeverity } from "@/lib/data";

interface ViolationsSectionProps {
  violationsByType: Record<ViolationType, number>;
  violationsBySeverity: Record<ViolationSeverity, number>;
  totalViolations: number;
}

export function ViolationsSection({ 
  violationsByType, 
  violationsBySeverity, 
  totalViolations 
}: ViolationsSectionProps) {
  const getSeverityColor = (severity: ViolationSeverity) => {
    switch (severity) {
      case "Critical": return "bg-red-500";
      case "High": return "bg-orange-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getSeverityBadgeColor = (severity: ViolationSeverity) => {
    switch (severity) {
      case "Critical": return "bg-red-100 text-red-800 border-red-200";
      case "High": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: ViolationType) => {
    switch (type) {
      case "Policy": return "📋";
      case "Content": return "📝";
      case "Advertising": return "📢";
      case "Privacy": return "🔒";
      case "Safety": return "🛡️";
      default: return "📊";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Violations by Type */}
      <Card className="border-2 hover:border-pink-200 transition-colors">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
            📊 Violations by Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(violationsByType).map(([type, count]) => {
              const percentage = totalViolations > 0 ? (count / totalViolations) * 100 : 0;
              return (
                <div key={type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getTypeIcon(type as ViolationType)}</span>
                      <span className="font-medium text-gray-700">{type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{count}</span>
                      <Badge variant="outline" className="text-xs">
                        {percentage.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                  <Progress 
                    value={percentage} 
                    className="h-2"
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Violations by Severity */}
      <Card className="border-2 hover:border-pink-200 transition-colors">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
            🚨 Violations by Severity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(violationsBySeverity).map(([severity, count]) => {
              const percentage = totalViolations > 0 ? (count / totalViolations) * 100 : 0;
              return (
                <div key={severity} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getSeverityColor(severity as ViolationSeverity)}`}></div>
                      <span className="font-medium text-gray-700">{severity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{count}</span>
                      <Badge className={getSeverityBadgeColor(severity as ViolationSeverity)}>
                        {percentage.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                  <Progress 
                    value={percentage} 
                    className="h-2"
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}