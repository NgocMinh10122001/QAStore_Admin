"use client";
import { columns } from "@/components/collections/CollectionColumn";
import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  const router = useRouter()

  console.log("check data", collections)

  const getProducts = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });

      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (error) {
      console.log("get collection error", error);
    }
  };

//   useEffect(() => {
//     getProducts();
//   }, []);

  if(loading) return <div className="text-black">Loading ....</div>

  return <div className="px-10 py-5">
    <div className="flex justify-between items-center">
        <p className="text-heading2-bold">Products</p>
        <Button className="bg-blue-1 text-white cursor-pointer hover:bg-blue-500" onClick={() => router.push("products/new")}>
            <Plus className="h-4 w-4 mr-2"/>
            Create New Product
        </Button>
    </div>
    <Separator className="my-4 bg-grey-1 "/>
    {/* <DataTable columns={columns} data={collections} searchKey = "title"/> */}
  </div>;
};

export default Products;
