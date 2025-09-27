import Collection from "@/lib/models/Collections";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req : NextRequest) => {
  try {

  const { searchParams } = new URL(req.url);
    
    // Lấy giá trị của parameter 'data'
    const data = searchParams.get('productIds');
    if(data === "undefined"){
         return new NextResponse("Not found", { status: 404 });
    }

    const favoriteProductIds = data?.split(',')

    await connectToDB();

    const products = await Product.find({
        _id: { $in: favoriteProductIds }
    })
      .sort({ createdAt: "desc" })
      .populate({ path: "collections", model: Collection });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log("products_GET", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
