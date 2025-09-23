"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MuiltiText from "../custom ui/MuiltiText";
import MultiSelect from "../custom ui/MultiSelect";
import Loader from "../custom ui/Loader";

const formSchema = z.object({
  title: z.string().min(2).max(40),
  description: z.string().min(2).max(500).trim(),
  media: z.array(z.string()).min(1),
  category: z.string().min(1),
  collections: z.array(z.string()).min(1),
  tags: z.array(z.string()),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  price: z.number().min(0.1),
  expense: z.number().min(0.1),
});

interface IProductFormProps {
  intialData?: ProductType | null;
}

const ProductForm: React.FC<IProductFormProps> = ({ intialData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState<CollectionType[]>([]);
  

  const getCollections = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/collections", { method: "GET" });

      if (res.ok) {
        const data = await res.json();
        setCollections(data);
        setLoading(false);
      }
    } catch (error) {
      console.log("get collection from form product is failed!", error);
      toast.error("Something went wrong, please try again !");
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: intialData
      ? {...intialData, collections:intialData.collections.map((item) => item._id)}
      : {
          title: "",
          description: "",
          media: [],
          category: "",
          collections: [],
          tags: [],
          sizes: [],
          colors: [],
          price: 0.1,
          expense: 0.1,
        },
  });

  const handleKeyEnter = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // toast.success("success submit")
    // console.log(values);
    try {
      const url = intialData
        ? `/api/products/${intialData?._id}`
        : "/api/products";

      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast.success(`Product ${intialData ? "updated" : "created"}`);
        // window.location.href = "/products";
        router.push("/products")
      }
    } catch (error) {
      console.log("[Product Form Submit Error]", error);
      toast.error("Somthing went wrong, please try a gain");
    }
  };

  if(loading) return <Loader/>

  return (
    <div className="p-10 text-grey-1">
      <p className="text-heading2-bold text-grey-1">
        {intialData ? "Update Product" : "Create Product"}
      </p>
      <Separator className="my-4 bg-grey-1" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title"
                    {...field}
                    onKeyDown={handleKeyEnter}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description"
                    {...field}
                    rows={5}
                    onKeyDown={handleKeyEnter}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="media"
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={(urls) => {
                        return field.onChange(urls);
                      }}
                      options={{
                        multiple: true,
                        maxFiles: 10,
                      }}
                      onRemove={(url) =>
                        field.onChange(
                          [...field.value].filter((image) => {
                            if (image !== url) return image;
                          })
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="md:grid md:grid-cols-3 gap-8 items-start">
            <FormField
              control={form.control}
              name="price"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      onKeyDown={handleKeyEnter}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expense"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expense($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Expense"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      onKeyDown={handleKeyEnter}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Category"
                      {...field}
                      onKeyDown={handleKeyEnter}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <MuiltiText
                      placeholder="Tags"
                      value={field.value}
                      onChange={(tag) => field.onChange([...field.value, tag])}
                      onRemove={(tagToRemove) =>
                        field.onChange(
                          [...field.value].filter((item) => {
                            if (item !== tagToRemove) return item;
                          })
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {collections && collections.length > 0 && (<FormField
              control={form.control}
              name="collections"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ColleTagsctions</FormLabel>
                  <FormControl>
                    <MultiSelect
                      placeholder="Select Collections"
                      collections={collections}
                      value={field.value}
                      onChange={(_id) => field.onChange([...field.value, _id])}
                      onRemove={(idToRemove) =>
                        field.onChange(
                          [...field.value].filter((collectionId) => {
                            if (collectionId !== idToRemove)
                              return collectionId;
                          })
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />)}
            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colors</FormLabel>
                  <FormControl>
                    <MuiltiText
                      placeholder="Colors"
                      value={field.value}
                      onChange={(color) =>
                        field.onChange([...field.value, color])
                      }
                      onRemove={(colorToRemove) =>
                        field.onChange(
                          [...field.value].filter((item) => {
                            if (item !== colorToRemove) return item;
                          })
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sizes</FormLabel>
                  <FormControl>
                    <MuiltiText
                      placeholder="Sizes"
                      value={field.value}
                      onChange={(size) =>
                        field.onChange([...field.value, size])
                      }
                      onRemove={(sizeToRemove) =>
                        field.onChange(
                          [...field.value].filter((item) => {
                            if (item !== sizeToRemove) return item;
                          })
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4">
            <Button
              type="submit"
              className="bg-blue-1 text-white cursor-pointer hover:bg-blue-500"
            >
              Submit
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/products")}
              className="bg-blue-1 text-white cursor-pointer hover:bg-blue-500"
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
