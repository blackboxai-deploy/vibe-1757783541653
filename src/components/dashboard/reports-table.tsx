"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageReport } from "@/lib/data";

interface ReportsTableProps {
  reports: PageReport[];
}

export function ReportsTable({ reports }: ReportsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterViolations, setFilterViolations] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 20;

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.pageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.pageUrl.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || report.category === filterCategory;
    const matchesViolations = filterViolations === "all" || 
                             (filterViolations === "with-violations" && report.violations.length > 0) ||
                             (filterViolations === "no-violations" && report.violations.length === 0);
    
    return matchesSearch && matchesCategory && matchesViolations;
  });

  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);
  const startIndex = (currentPage - 1) * reportsPerPage;
  const displayedReports = filteredReports.slice(startIndex, startIndex + reportsPerPage);

  const getViolationSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-100 text-red-800 border-red-200";
      case "High": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const categories = [...new Set(reports.map(r => r.category))];

  return (
    <Card className="border-2 hover:border-pink-200 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
          📋 Page Reports Details
        </CardTitle>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <Input
            placeholder="Search pages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:w-1/3"
          />
          
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="md:w-1/4">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={filterViolations} onValueChange={setFilterViolations}>
            <SelectTrigger className="md:w-1/4">
              <SelectValue placeholder="Violations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pages</SelectItem>
              <SelectItem value="with-violations">With Violations</SelectItem>
              <SelectItem value="no-violations">No Violations</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="text-sm text-gray-600 mb-4">
          Showing {displayedReports.length} of {filteredReports.length} reports
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left p-3 font-semibold">Page Name</th>
                <th className="text-left p-3 font-semibold">Category</th>
                <th className="text-left p-3 font-semibold">Views</th>
                <th className="text-left p-3 font-semibold">Engagement</th>
                <th className="text-left p-3 font-semibold">Load Time</th>
                <th className="text-left p-3 font-semibold">Violations</th>
                <th className="text-left p-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedReports.map((report) => (
                <tr key={report.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-3">
                    <div>
                      <div className="font-medium text-gray-900 truncate max-w-48">
                        {report.pageName}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-48">
                        {report.pageUrl}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <Badge variant="outline" className="text-xs">
                      {report.category}
                    </Badge>
                  </td>
                  <td className="p-3 font-medium">
                    {report.views.toLocaleString()}
                  </td>
                  <td className="p-3">
                    <span className="text-sm font-medium">
                      {report.engagementRate}%
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`text-sm font-medium ${
                      report.loadTime > 3 ? 'text-red-600' : 
                      report.loadTime > 2 ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      {report.loadTime}s
                    </span>
                  </td>
                  <td className="p-3">
                    {report.violations.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {report.violations.slice(0, 2).map((violation, idx) => (
                          <Badge
                            key={idx}
                            className={`text-xs ${getViolationSeverityColor(violation.severity)}`}
                          >
                            {violation.severity}
                          </Badge>
                        ))}
                        {report.violations.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{report.violations.length - 2}
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        Clean
                      </Badge>
                    )}
                  </td>
                  <td className="p-3">
                    <Badge className={
                      report.status === 'Active' 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                    }>
                      {report.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}