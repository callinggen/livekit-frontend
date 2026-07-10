import React, { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { Contact } from "./types";
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal";
import DataTable, { Column } from "@/components/shared/DataTable";
import Badge, { BadgeVariant } from "@/components/shared/Badge";
import { Button } from "@/components/ui/button";

interface ContactsTableProps {
  contacts: Contact[];
  onDeleteContact?: (id: number) => void;
}

export default function ContactsTable({ contacts, onDeleteContact }: ContactsTableProps) {
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<number | null>(null);

  const confirmDelete = () => {
    if (deleteConfirmationId !== null && onDeleteContact) {
      onDeleteContact(deleteConfirmationId);
      setDeleteConfirmationId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const variantMap: Record<string, BadgeVariant> = {
      completed: "success",
      calling: "info",
      pending: "neutral",
      failed: "error",
      "no-answer": "neutral",
    };
    return <Badge variant={variantMap[status] || "neutral"}>{status.replace("-", " ")}</Badge>;
  };

  const columns: Column<Contact>[] = [
    { key: "name", label: "Name", sortable: true },
    { key: "phone", label: "Phone Number", sortable: true, render: (c) => <span className="font-mono text-xs">{c.phone}</span> },
    { key: "status", label: "Status", sortable: true, render: (c) => getStatusBadge(c.status) },
    { key: "response", label: "Response", sortable: true, render: (c) => c.response || "—" },
    { key: "datetime", label: "Date & Time", sortable: true, render: (c) => <span className="text-xs text-zinc-500">{c.datetime || "—"}</span> },
    { 
      key: "actions", 
      label: "Actions", 
      render: (c) => (
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300">
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-zinc-400 hover:text-red-600 dark:hover:text-red-400"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteConfirmationId(c.id);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  const uniqueStatuses = Array.from(new Set(contacts.map(c => c.status)));

  return (
    <div className="flex flex-col h-[600px]">
      <DataTable 
        data={contacts}
        columns={columns}
        searchableKeys={["name", "phone"]}
        filters={[
          { key: "status", label: "Status", options: uniqueStatuses.map(s => ({ label: s.replace("-", " "), value: s })) }
        ]}
        exportFileName="campaign_contacts.xlsx"
      />
      
      <DeleteConfirmationModal
        isOpen={deleteConfirmationId !== null}
        title="Delete Contact"
        description="Are you sure you want to delete this contact? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirmationId(null)}
      />
    </div>
  );
}
