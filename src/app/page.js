"use client";

import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/layout/Sidebar";
import Dashboard from "@/components/dashboard/Dashboard";
import MembersSection from "@/components/members/MembersSection";
import ShopSection from "@/components/shop/ShopSection";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [members, setMembers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const storedMembers = JSON.parse(
      localStorage.getItem("gymMembers") || "[]"
    );
    setMembers(storedMembers);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="lg:pl-64">
        <nav className="bg-white shadow-sm sticky top-0 z-40">
          <div className="flex justify-between items-center px-4 py-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <span className="font-bold text-lg">FitHub</span>
            <div className="w-8"></div>
          </div>
        </nav>

        <main className="p-4">
          {activeTab === "dashboard" && <Dashboard members={members} />}
          {activeTab === "members" && (
            <MembersSection members={members} setMembers={setMembers} />
          )}
          {activeTab === "shop" && <ShopSection />}
        </main>
      </div>
    </div>
  );
}
