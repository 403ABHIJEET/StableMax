import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {

    const id = params.id;

    if(!id) {
        return new Response('Missing id parameter', { status: 400 });
    }

    try {

        await prisma.post.delete({
            where: {
                id: id
            }
        });

        return NextResponse.json({ message: "successfuly" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 401 })
    }

}