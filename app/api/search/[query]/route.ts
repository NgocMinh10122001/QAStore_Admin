import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ query: string }> }) => {
    try {
        const { query } = await params;
        console.log("check query", query);

        await connectToDB();

        const searchProducts = await Product.find({
            $or: [
                { title: { $regex: query, $options: "i" } }, // Sửa thành $options
                { category: { $regex: query, $options: "i" } }, // Sửa thành $options
                { tags: { $in: [new RegExp(query, "i")] } }
            ]
        });

        return NextResponse.json(searchProducts, { status: 200 });

    } catch (error) {
        console.log("products_[productId]_POST", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};