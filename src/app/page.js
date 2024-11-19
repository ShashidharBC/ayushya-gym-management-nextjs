"use client";

import React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Activity,
  ShoppingCart,
  Users,
  Calendar,
  DollarSign,
  Package,
  Settings,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [cart, setCart] = useState([]);

  // Sample data
  const recentMembers = [
    { id: 1, name: "John Doe", plan: "Premium", joinDate: "2024-03-15" },
    { id: 2, name: "Jane Smith", plan: "Basic", joinDate: "2024-03-14" },
  ];

  const shopItems = [
    { id: 1, name: "Protein Shake", price: 29.99, stock: 50 },
    { id: 2, name: "Gym Gloves", price: 19.99, stock: 30 },
    { id: 3, name: "Resistance Band", price: 15.99, stock: 45 },
  ];

  // Handle adding items to cart
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  // Navigation tabs
  const navigationTabs = [
    { id: "dashboard", label: "Dashboard", icon: Activity },
    { id: "members", label: "Members", icon: Users },
    { id: "shop", label: "Shop", icon: ShoppingCart },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NavigationMenu>
            <NavigationMenuList className="flex justify-between h-16">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-bold text-xl">
                  FitHub
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4">
                    <h3 className="font-medium">Welcome to FitHub</h3>
                    <p className="text-sm text-gray-500">
                      Manage your gym efficiently
                    </p>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <div className="flex space-x-4">
                {navigationTabs.map(({ id, label, icon: Icon }) => (
                  <Button
                    key={id}
                    variant={activeTab === id ? "default" : "ghost"}
                    onClick={() => setActiveTab(id)}
                    className="flex items-center"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {label}
                  </Button>
                ))}
              </div>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Total Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,345</div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Monthly Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,345</div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Active Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
              </CardContent>
            </Card>

            {/* Recent Members Table */}
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Recent Members
                </CardTitle>
                <CardDescription>
                  Latest members who joined your gym
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Join Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentMembers.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell className="font-medium">
                            {member.name}
                          </TableCell>
                          <TableCell>{member.plan}</TableCell>
                          <TableCell>{member.joinDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "shop" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shopItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="mr-2 h-5 w-5" />
                    {item.name}
                  </CardTitle>
                  <CardDescription>In Stock: {item.stock}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">${item.price}</span>
                    <Button
                      onClick={() => addToCart(item)}
                      disabled={item.stock === 0}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "members" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Members Management</CardTitle>
                <CardDescription>Manage your gym members</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Members management interface coming soon...
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
