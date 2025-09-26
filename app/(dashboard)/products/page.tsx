"use client";
import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { columns } from "@/components/products/ProductColumn";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const router = useRouter()

  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });

      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log("get products error", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if(loading) return <Loader/>

  return <div className="px-10 py-5">
    <div className="flex justify-between items-center">
        <p className="text-heading2-bold text-grey-1">Products</p>
        <Button className="bg-blue-1 text-white cursor-pointer hover:bg-blue-500" onClick={() => router.push("products/new")}>
            <Plus className="h-4 w-4 mr-2"/>
            Create New Product
        </Button>
    </div>
    <Separator className="my-4 bg-grey-1 "/>
    <DataTable columns={columns} data={products} searchKey = "title"/>
  </div>;
};

export default Products;
