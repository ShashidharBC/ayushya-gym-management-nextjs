import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AddMemberForm from "./AddMemberForm";
import MembersTable from "./MembersTable";
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

export default function MembersSection({ members, setMembers }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sheetOpen, setSheetOpen] = useState(false);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(members.length / itemsPerPage);

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
              <AddMemberForm
                members={members}
                setMembers={setMembers}
                setSheetOpen={setSheetOpen}
              />
            </SheetContent>
          </Sheet>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <MembersTable
          paginatedMembers={getPaginatedMembers()}
          handleDeleteMember={handleDeleteMember}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </CardContent>
    </Card>
  );
}
