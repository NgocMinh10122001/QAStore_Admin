import Collection from "@/lib/models/Collections";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req : NextRequest, {params} : {params : {collectionId : string}}) => {

    try {
        
        await connectToDB()

        const collection = await Collection.findById(params.collectionId)

        if(!collection) return new NextResponse(JSON.stringify({message : "collection is not found!"}), {status:404})

        return NextResponse.json(collection, {status:200})

    } catch (error) {
        console.log("collectionID_GetCollectionByID",error)
        return new NextResponse("Internal Err", {status:500})
    }

}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = await auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    await connectToDB();

    await Collection.findByIdAndDelete(params.collectionId);

    return new NextResponse("Collection is deleted", { status: 200 });
  } catch (error) {
    console.log("[collectionID_Delete]", error);
    return new NextResponse("Internal Err", { status: 500 });
  }
};


export const POST = async (req:NextRequest, {params} : {params : {
    collectionId:string
}}) => {

    try {

       const {userId} = await auth()
       if(!userId) return new NextResponse("Unauthorized", {status: 401})

        await connectToDB()

        const {title, description, image} = await req.json()

        if(!title || !image) return new NextResponse("title and image are required!", {status:400})

        const collection = await Collection.findByIdAndUpdate(params.collectionId, {title, description, image},{new:true})

        if(!collection) return NextResponse.json({message : "Collection is not found!"},{status: 404})

        return NextResponse.json({message : "Collection is updated!"},{status: 200})

        
    } catch (error) {
        console.log("[collectionID_POST]", error);
        return new NextResponse("Internal err", {status:500})
    }

}
