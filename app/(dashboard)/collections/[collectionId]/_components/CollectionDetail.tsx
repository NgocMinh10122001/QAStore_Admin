"use client";
import CollectionForm from "@/components/collections/CollectionForm";
import Loader from "@/components/custom ui/Loader";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ICollectionDetail {
  id: string;
}

const CollectionDetail = ({ id }: ICollectionDetail) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState<CollectionType | null>(null);

  const getCollectionDetail = async () => {
    try {
      const res = await fetch(`/api/collections/${id}`, {
        method: "GET",
      });

      const data = await res.json();

      setCollection(data);

      setLoading(false);
    } catch (error) {
      console.log("Something went wrong, please try again!", error);
      toast.error("get collection failed");
      router.push("/products");
    }
  };

  useEffect(() => {
    getCollectionDetail();
  });

  if (loading) return <Loader />;

  return <CollectionForm intialData={collection} />;
};

export default CollectionDetail;
