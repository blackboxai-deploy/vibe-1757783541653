"use client";

import { Card } from "@/components/ui/card";

export function DashboardHeader() {
  return (
    <div className="w-full bg-gradient-to-r from-pink-600 via-pink-500 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              PINKY SHOPCO
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-pink-100 mt-2">
              BY GUS
            </p>
            <p className="text-sm text-pink-200 mt-1">
              META Page Reports Dashboard
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4">
              <div className="text-2xl font-bold text-white">
                September 13, 2025
              </div>
              <div className="text-sm text-pink-100 mt-1">
                Report Generation Date
              </div>
            </Card>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 text-center">
            <div className="text-3xl font-bold text-white">18,790</div>
            <div className="text-sm text-pink-100">Total Page Reports</div>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 text-center">
            <div className="text-3xl font-bold text-yellow-200">META</div>
            <div className="text-sm text-pink-100">Platform Analytics</div>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 text-center">
            <div className="text-3xl font-bold text-green-200">ACTIVE</div>
            <div className="text-sm text-pink-100">System Status</div>
          </Card>
        </div>
      </div>
    </div>
  );
}