import connectMongoDB from "@/lib/mongodb";
import Topic from "@/models/topic";
import {NextResponse} from "next/server";


export async function POST(request ) {
        const {title, description} = await request.json();
        await connectMongoDB();
        await Topic.create({title, description});
        return  NextResponse.json({message:'Topic added'},{status:201});
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
        console.log(request.nextUrl)
        const id = request.nextUrl.searchParams.get("id");
        const currentTopic =  await Topic.findById(id)

        const title = request.nextUrl.searchParams.get("title");

        const description = request.nextUrl.searchParams.get("description")

        await connectMongoDB();

        const topics =  await Topic.findByIdAndUpdate(id,{title: title != null ? title : currentTopic.title
                                                        , description : description != null ?  description : currentTopic.description} );
        return  NextResponse.json({topics},{status:201});
}

