"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import ProductsTable from "./Table";
import TableSkeleton from "@/components/shared/TableSkeleton";
import TableError from "@/components/shared/TableError";
import { createClient } from "@supabase/supabase-js";
import ProductActions from "./../ProductActions"; // Import ProductActions

// Supabase client initialization
const supabase = createClient(
  "https://suhnugrgknvbpoqanlgh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1aG51Z3Jna252YnBvcWFubGdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzNzUyMTMsImV4cCI6MjA0Nzk1MTIxM30.oKPH92aETDbzAqHfvtYdFFmLvQVI4Sk6QCzQqrWwsZM"
);

// Fetch products from Supabase
const fetchProducts = async ({ page, perPage }: { page: number; perPage: number }) => {
  const from = (page - 1) * perPage;
  const to = page * perPage - 1;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .range(from, to);

  if (error) {
    console.error("Error fetching products:", error.message);
    throw new Error(error.message);
  }

  const { data: totalData, error: totalError } = await supabase
    .from("products")
    .select("*", { count: "exact" });

  if (totalError) {
    console.error("Error fetching total count:", totalError.message);
    throw new Error(totalError.message);
  }

  const total = totalData?.length || 0;

  return {
    data,
    pages: Math.ceil(total / perPage),
    total,
  };
};

export default function AllProducts({ perPage = 10 }: { perPage?: number }) {
  const productsPage = useSearchParams().get("page");
  const page = Math.trunc(Number(productsPage)) || 1;

  // React Query to fetch products data
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProducts({ page, perPage }),
    // Adding cacheTime and staleTime to ensure proper data fetching
    cacheTime: 1000 * 60 * 5,  // Cache for 5 minutes
    staleTime: 1000 * 30,      // Data is considered fresh for 30 seconds
  });

  // Loading state
  if (isLoading) {
    return <TableSkeleton perPage={perPage} columns={["name", "category"]} />;
  }

  // Error state
  if (isError || !data) {
    return <TableError errorMessage="Failed to fetch products" refetch={refetch} />;
  }

  // Check if data is being returned
  console.log("Fetched Products Data:", data);

  const columns = [
    { accessorKey: "name", header: "Product Name" },
    { accessorKey: "category", header: "Category" },
  ];

  return (
    <div>
      {/* Product Actions Component */}
      <ProductActions refetch={refetch} />

      <div className="mt-4">
        {/* Additional Buttons for Other Actions */}
        {/* Keep separate from ProductActions to avoid duplication */}
        <button className="btn btn-primary">Another Action</button> {/* Example of another action */}
        <button className="btn btn-danger ml-2">Delete Selected</button> {/* Example of delete button */}
      </div>

      {/* Displaying the Product Table */}
      {data.data.length > 0 ? (
        <ProductsTable
          data={data.data}
          columns={columns}
          pagination={{ page, pages: data.pages }}
        />
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}
