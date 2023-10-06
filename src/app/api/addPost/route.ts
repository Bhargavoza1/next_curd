import type { NextApiRequest, NextApiResponse } from 'next'
import {Request} from "next/dist/compiled/@edge-runtime/primitives";
import clientPromise from "@/lib/mongodb";
import connectMongoDB from "@/lib/mongodb";
import Topic from "@/models/topic";
import {NextResponse} from "next/server";

type ResponseData = {
    message: string
}


export async function POST(request ) {

        const {title, description} = await request.json();
        await connectMongoDB();
        await Topic.create({title, description});
        return  NextResponse.json({message:'connect'},{status:201});

}

export async function GET() {
        await connectMongoDB();
        const topics =  await Topic.find();
        return  NextResponse.json({topics});
}

export async function DELETE(request) {
        const id = request.nextUrl.searchParams.get("id");
        await connectMongoDB();
        const topics =  await Topic.findByIdAndDelete(id);
        return  NextResponse.json({message:'Topic deleted'},{status:201});
}

export async function PUT(request) {
        const id = request.nextUrl.searchParams.get("id");
        const title = request.nextUrl.searchParams.get("title");
        const description = request.nextUrl.searchParams.get("description");
        await connectMongoDB();
        const topics =  await Topic.findByIdAndUpdate(id,{title: title, description : description} );
        return  NextResponse.json({topics},{status:201});
}

