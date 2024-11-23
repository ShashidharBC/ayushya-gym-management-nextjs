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
  SheetClose,
  SheetContent,
  SheetFooter,
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
  Menu,
  Plus,
  Trash2,
  LayoutDashboard,
  Users,
  ShoppingBag,
  DollarSign,
  Activity,
} from "lucide-react";

const shopItems = [
  {
    id: "AT-1435626",
    name: "Tormaline OFG-19 Eng",
    warehouse: "Jakarta",
    quantity: 152,
  },
  {
    id: "AT-1435627",
    name: "Tormaline OFG-19 Eng",
    warehouse: "Jakarta",
    quantity: 262,
  },
  {
    id: "AT-1435628",
    name: "Tormaline OFG-19 Eng",
    warehouse: "Jakarta",
    quantity: 205,
  },
  {
    id: "AT-1435629",
    name: "Tormaline OFG-19 Eng",
    warehouse: "Jakarta",
    quantity: 183,
  },
  {
    id: "MN-1435630",
    name: "Pxeto Jarvis Kursi Ka",
    warehouse: "Jakarta",
    quantity: 152,
  },
  {
    id: "MN-1435631",
    name: "Pxeto Jarvis Kursi Ka",
    warehouse: "Jakarta, Bandung",
    quantity: 83,
  },
  {
    id: "SR-1435632",
    name: "Oxihom Ft-3 Kursi Ka",
    warehouse: "Jakarta, Bandung",
    quantity: 241,
  },
  {
    id: "SR-1435633",
    name: "Oxihom Ft-3 Kursi Ka",
    warehouse: "Jakarta, Bandung",
    quantity: 377,
  },
  {
    id: "PL-1435634",
    name: "Dell Office Chair / Ku",
    warehouse: "Bandung",
    quantity: 236,
  },
  {
    id: "PL-1435635",
    name: "Dell Office Chair / Ku",
    warehouse: "Bandung",
    quantity: 124,
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(members.length / itemsPerPage);

  useEffect(() => {
    const storedMembers = JSON.parse(
      localStorage.getItem("gymMembers") || "[]"
    );
    setMembers(storedMembers);
  }, []);

  const handleDeleteMember = (memberId) => {
    const updatedMembers = members.filter((member) => member.id !== memberId);
    setMembers(updatedMembers);
    localStorage.setItem("gymMembers", JSON.stringify(updatedMembers));
  };

  const getPaginatedMembers = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return members.slice(startIndex, endIndex);
  };

  const Sidebar = () => (
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
              setIsSidebarOpen(!isSidebarOpen);
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
              setIsSidebarOpen(!isSidebarOpen);
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
              setIsSidebarOpen(!isSidebarOpen);
            }}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Shop
          </Button>
        </nav>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{members.length}</div>
            <p className="text-xs text-muted-foreground">
              +20% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$15,234</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Classes
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 new classes this week
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Members</CardTitle>
          <CardDescription>Latest members who joined your gym</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.slice(0, 5).map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.plan}</TableCell>
                  <TableCell>{member.joinDate}</TableCell>
                  <TableCell>{member.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const MembersSection = () => {
    const [sheetOpen, setSheetOpen] = useState(false);
    const [memberForm, setMemberForm] = useState({
      name: "",
      email: "",
      plan: "Basic",
      status: "Active",
    });

    const handleAddMemberSubmit = (e) => {
      e.preventDefault();
      const memberToAdd = {
        ...memberForm,
        id: Date.now(),
        joinDate: new Date().toISOString().split("T")[0],
      };

      const updatedMembers = [...members, memberToAdd];
      setMembers(updatedMembers);
      localStorage.setItem("gymMembers", JSON.stringify(updatedMembers));

      setMemberForm({
        name: "",
        email: "",
        plan: "Basic",
        status: "Active",
      });
      setSheetOpen(false);
    };

    return (
      <Card className="border-0 shadow-sm">
        <CardHeader className="space-y-1 px-4 py-3 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-lg">Members Management</CardTitle>
              <CardDescription>Manage your gym members</CardDescription>
            </div>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Member
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Add New Member</SheetTitle>
                </SheetHeader>
                <form
                  onSubmit={handleAddMemberSubmit}
                  className="space-y-4 mt-4"
                >
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={memberForm.name}
                      onChange={(e) =>
                        setMemberForm({
                          ...memberForm,
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
                      value={memberForm.email}
                      onChange={(e) =>
                        setMemberForm({
                          ...memberForm,
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
                      value={memberForm.plan}
                      onValueChange={(value) =>
                        setMemberForm({ ...memberForm, plan: value })
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
                      value={memberForm.status}
                      onValueChange={(value) =>
                        setMemberForm({ ...memberForm, status: value })
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
                  <SheetFooter>
                    <Button type="submit" className="w-full">
                      Add Member
                    </Button>
                  </SheetFooter>
                </form>
              </SheetContent>
            </Sheet>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead className="min-w-[200px]">Email</TableHead>
                  <TableHead className="w-[150px]">Plan</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getPaginatedMembers().map((member) => (
                  <TableRow key={member.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.plan}</TableCell>
                    <TableCell>{member.status}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Member</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete {member.name}?
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                              variant="destructive"
                              onClick={() => handleDeleteMember(member.id)}
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
          </div>
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-8"
                    >
                      {page}
                    </Button>
                  )
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const ShopSection = () => (
    <Card className="border-0 shadow-sm">
      <CardHeader className="space-y-1 px-4 py-3 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="text-lg">Shop Inventory</CardTitle>
            <CardDescription>
              Manage your shop items and inventory
            </CardDescription>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add New Item</SheetTitle>
              </SheetHeader>
              {/* Add item form would go here */}
            </SheetContent>
          </Sheet>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="w-[150px]">Product ID</TableHead>
                <TableHead className="min-w-[200px]">Name</TableHead>
                <TableHead className="w-[150px]">Warehouse</TableHead>
                <TableHead className="w-[100px] text-right">Quantity</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shopItems.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.warehouse}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />

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
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "members" && <MembersSection />}
          {activeTab === "shop" && <ShopSection />}
        </main>
      </div>
    </div>
  );
}
