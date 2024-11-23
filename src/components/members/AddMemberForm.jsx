import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SheetFooter } from "@/components/ui/sheet";

export default function AddMemberForm({ members, setMembers, setSheetOpen }) {
  const [memberForm, setMemberForm] = useState({
    name: "",
    email: "",
    plan: "Basic",
    status: "Active",
  });

  const handleSubmit = (e) => {
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
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
  );
}
