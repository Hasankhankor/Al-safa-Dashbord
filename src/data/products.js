import { supabase } from "@/lib/supabaseClient";

export const fetchProducts = async ({ page = 1, perPage = 10 }) => {
  const offset = (page - 1) * perPage;

  const { data, error, count } = await supabase
    .from("products")
    .select("*", { count: "exact" }) // Fetch all fields and count
    .range(offset, offset + perPage - 1);

  if (error) {
    throw new Error(error.message);
  }

  const pages = Math.ceil(count / perPage); // Calculate total pages
  return { data, pages, total: count };
};
