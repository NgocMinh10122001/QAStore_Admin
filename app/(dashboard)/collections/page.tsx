"use client";
import { columns } from "@/components/collections/CollectionColumn";
import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Collections = () => {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const router = useRouter()

  const getCollections = async () => {
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

  useEffect(() => {
    getCollections();
  }, []);

  if(loading) return <Loader/>

  return <div className="px-10 py-5">
    <div className="flex justify-between items-center max-sm:flex-wrap max-sm:gap-4">
        <p className="text-heading2-bold text-grey-1">Collection</p>
        <Button className="bg-blue-1 text-white cursor-pointer hover:bg-blue-500" onClick={() => router.push("collections/new")}>
            <Plus className="h-4 w-4 mr-2"/>
            Create New Collection
        </Button>
    </div>
    <Separator className="my-4 bg-grey-1 "/>
    <DataTable columns={columns} data={collections} searchKey = "title"/>
  </div>;
};

export default Collections;
