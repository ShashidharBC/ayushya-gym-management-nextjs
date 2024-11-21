"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Activity,
  ShoppingCart,
  Users,
  Calendar,
  DollarSign,
  Package,
  Menu,
  Plus,
  Trash2,
  X,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [cart, setCart] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Members State
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    plan: "Basic",
    status: "Active",
  });
  const [memberFilter, setMemberFilter] = useState({
    plan: "All",
    status: "All",
  });

  // Sample data for shop and other sections
  const shopItems = [
    { id: 1, name: "Protein Shake", price: 29.99, stock: 50 },
    { id: 2, name: "Gym Gloves", price: 19.99, stock: 30 },
    { id: 3, name: "Resistance Band", price: 15.99, stock: 45 },
  ];

  // Load members from localStorage on component mount
  useEffect(() => {
    const storedMembers = JSON.parse(
      localStorage.getItem("gymMembers") || "[]"
    );
    setMembers(storedMembers);
  }, []);

  // Handle adding items to cart
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  // Handle adding a new member
  const handleAddMember = (e) => {
    e.preventDefault();
    const memberToAdd = {
      ...newMember,
      id: Date.now(), // Unique identifier
      joinDate: new Date().toISOString().split("T")[0],
    };

    const updatedMembers = [...members, memberToAdd];
    setMembers(updatedMembers);

    // Save to localStorage
    localStorage.setItem("gymMembers", JSON.stringify(updatedMembers));

    // Reset form
    setNewMember({
      name: "",
      email: "",
      plan: "Basic",
      status: "Active",
    });
  };

  // Handle member deletion
  const handleDeleteMember = (memberId) => {
    const updatedMembers = members.filter((member) => member.id !== memberId);
    setMembers(updatedMembers);
    localStorage.setItem("gymMembers", JSON.stringify(updatedMembers));
  };

  // Filter members based on plan and status
  const filteredMembers = members.filter(
    (member) =>
      (memberFilter.plan === "All" || member.plan === memberFilter.plan) &&
      (memberFilter.status === "All" || member.status === memberFilter.status)
  );

  // Navigation tabs
  const navigationTabs = [
    { id: "dashboard", label: "Dashboard", icon: Activity },
    { id: "members", label: "Members", icon: Users },
    { id: "shop", label: "Shop", icon: ShoppingCart },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-64 bg-white">
          <SheetHeader>
            <SheetTitle className="flex items-center">
              <X
                className="mr-2 h-5 w-5 cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              />
              FitHub
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-2">
            {navigationTabs.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeTab === id ? "default" : "ghost"}
                onClick={() => {
                  setActiveTab(id);
                  setIsSidebarOpen(false);
                }}
                className="w-full justify-start"
              >
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <nav className="bg-white shadow-sm sticky top-0 z-50 md:hidden">
          <div className="flex justify-between items-center p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu />
            </Button>
            <span className="font-bold text-xl">FitHub</span>
            <div></div>
          </div>
        </nav>

        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 bg-white border-r">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-6">FitHub</h2>
            {navigationTabs.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeTab === id ? "default" : "ghost"}
                onClick={() => setActiveTab(id)}
                className="w-full justify-start mb-2"
              >
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
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
                  <div className="text-2xl font-bold">{members.length}</div>
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
            </div>
          )}

          {activeTab === "shop" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {shopItems.map((item) => (
                <Card
                  key={item.id}
                  className="hover:shadow-lg transition-shadow"
                >
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
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Members Management</CardTitle>
                    <CardDescription>Manage your gym members</CardDescription>
                  </div>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Member
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                      <SheetHeader>
                        <SheetTitle>Add New Member</SheetTitle>
                      </SheetHeader>
                      <form
                        onSubmit={handleAddMember}
                        className="space-y-4 mt-4"
                      >
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={newMember.name}
                            onChange={(e) =>
                              setNewMember({
                                ...newMember,
                                name: e.target.value,
                              })
                            }
                            required
                            placeholder="Enter member name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newMember.email}
                            onChange={(e) =>
                              setNewMember({
                                ...newMember,
                                email: e.target.value,
                              })
                            }
                            required
                            placeholder="Enter email address"
                          />
                        </div>
                        <div>
                          <Label>Plan</Label>
                          <Select
                            value={newMember.plan}
                            onValueChange={(value) =>
                              setNewMember({ ...newMember, plan: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Plan" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Basic">Basic</SelectItem>
                              <SelectItem value="Premium">Premium</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Status</Label>
                          <Select
                            value={newMember.status}
                            onValueChange={(value) =>
                              setNewMember({ ...newMember, status: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="Inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button type="submit" className="w-full">
                          Add Member
                        </Button>
                      </form>
                    </SheetContent>
                  </Sheet>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4 mb-4">
                    <Select
                      value={memberFilter.plan}
                      onValueChange={(value) =>
                        setMemberFilter({ ...memberFilter, plan: value })
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Plans</SelectItem>
                        <SelectItem value="Basic">Basic</SelectItem>
                        <SelectItem value="Premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={memberFilter.status}
                      onValueChange={(value) =>
                        setMemberFilter({ ...memberFilter, status: value })
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Statuses</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {filteredMembers.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No members found. Add a new member to get started.
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Plan</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Join Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredMembers.map((member) => (
                          <TableRow key={member.id}>
                            <TableCell>{member.name}</TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  member.plan === "Premium"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {member.plan}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  member.status === "Active"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {member.status}
                              </span>
                            </TableCell>
                            <TableCell>{member.joinDate}</TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="destructive" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Delete Member</DialogTitle>
                                    <DialogDescription>
                                      Are you sure you want to delete{" "}
                                      {member.name}? This action cannot be
                                      undone.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <Button variant="ghost">Cancel</Button>
                                    </DialogClose>
                                    <Button
                                      variant="destructive"
                                      onClick={() =>
                                        handleDeleteMember(member.id)
                                      }
                                    >
                                      Delete
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
