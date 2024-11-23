import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { shopItems } from "@/lib/data/constants";

export default function ShopSection() {
  return (
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
}
