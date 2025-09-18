import Collection from "@/lib/models/Collections";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// post collection
export const POST = async (req: NextRequest) => {
    try {
        const {userId} = await auth()
        
        console.log("check userId",userId)

        if(!userId) {
            return new NextResponse("Unauthorized", {status : 403})
        }

        await connectToDB()

        const {title, description, image} = await req.json()

        const existingCollection = await Collection.findOne({title})

        if(existingCollection) {
            return new NextResponse("collection is already exists", {status: 400})
        }

        if(!image || !title) {
            return new NextResponse("title and image are required!", {status: 400})
        }

        const newCollection = await Collection.create({title, description, image})

        await newCollection.save()

        return NextResponse.json(newCollection,{status:200})

    } catch (error) {
        console.log("[collections__POST] ",error);
        return new NextResponse("Internal Server Error", {status:500})
    }
}


// get collections

export const GET = async (req: NextRequest) => {
    try {

        const {userId} = await auth()
        
        if(!userId) {
            return new NextResponse("Unauthorized", {status : 403})
        }

        await connectToDB()


        const collections = await Collection.find().sort({createdAt : "desc"})

        return NextResponse.json(collections, {status:200})

    } catch (error) {
        console.log("[collections__GET] ",error);
        return new NextResponse("Internal Server Error", {status:500})
    }
}