import React from "react";
import { LayoutDashboard, Users, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Sidebar({
  activeTab,
  setActiveTab,
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:translate-x-0`}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">FitHub</h2>
        <nav className="space-y-2">
          <Button
            variant={activeTab === "dashboard" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => {
              setActiveTab("dashboard");
              setIsSidebarOpen(false);
            }}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant={activeTab === "members" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => {
              setActiveTab("members");
              setIsSidebarOpen(false);
            }}
          >
            <Users className="mr-2 h-4 w-4" />
            Members
          </Button>
          <Button
            variant={activeTab === "shop" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => {
              setActiveTab("shop");
              setIsSidebarOpen(false);
            }}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Shop
          </Button>
        </nav>
      </div>
    </div>
  );
}
