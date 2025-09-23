import Collection from "@/lib/models/Collections";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) => {
  try {
    await connectToDB();
    const { productId } = await params;
    const product = await Product.findById(productId).populate({
      path: "collections",
      model: Collection,
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("products_[productId]_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { productId } = await params;
    await connectToDB();

    const product = await Product.findById(productId);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await req.json();

    if (
      !title ||
      !description ||
      !media ||
      !category ||
      !price ||
      !expense ||
      !collections
    ) {
      return new NextResponse("Not enough data to create a new product", {
        status: 400,
      });
    }

    // Chuyển đổi sang string để so sánh đúng
    const currentCollections = product.collections.map((id: string) =>
      id.toString()
    );
    const newCollections = collections.map((id: string) => id.toString());

    // Tìm collections được thêm và bỏ
    const addedCollections = newCollections.filter(
      (collectionId: string) => !currentCollections.includes(collectionId)
    );

    const removedCollections = currentCollections.filter(
      (collectionId: string) => !newCollections.includes(collectionId)
    );

    // Update collections
    await Promise.all([
      // Thêm product vào collections mới
      ...addedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $addToSet: { products: product._id }, // Dùng $addToSet để tránh trùng lặp
        })
      ),

      // Xóa product khỏi collections cũ
      ...removedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: product._id },
        })
      ),
    ]);

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      {
        title,
        description,
        media,
        category,
        collections,
        tags,
        sizes,
        colors,
        price,
        expense,
      },
      { new: true }
    ).populate({ path: "collections", model: Collection });

    await updatedProduct.save();

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.log("products_[productId]_POST", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) => {
  try {
    const { userId } = await auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { productId } = await params;

    await connectToDB();

    if (!productId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return new NextResponse("Product not found", { status: 404 });
    }

    if (deletedProduct.collections) {
      for (const collectionId of deletedProduct.collections) {
        const collection = await Collection.findById(collectionId);
        if (collection) {
          collection.products = collection.products.filter(
            (prodId: string) => prodId.toString() !== productId
          );
          await collection.save();
        }
      }
    }

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("products_DELETE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
