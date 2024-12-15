"use client";
import React, { useEffect, useState } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import DataTable from "@/components/shared/DataTable";
import { Product } from "@/types/product";
import { DataTableProps } from "@/types/data-table";

export default function ProductsTable({
  data,
  columns,
  pagination,
}: DataTableProps<Product>) {
  const [rowSelection, setRowSelection] = useState({});

  // Make sure columns and data are available before initializing the table
  const table = useReactTable({
    data,
    columns, // Ensure columns are correctly passed down
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  if (!data || !columns) {
    return <div>Loading...</div>; // Render loading until data and columns are available
  }

  return <DataTable table={table} pagination={pagination} />;
}
