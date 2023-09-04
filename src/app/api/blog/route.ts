import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// DB接続
export async function main() {
    try {
        await prisma.$connect();
    } catch(err) {
        return Error("Failed to connect database");
    }
}

// ブログ全記事取得用API
export const GET = async (req: Request, res: NextResponse) => {
    try {
        await main();
        const posts = await prisma.post.findMany();
        return NextResponse.json({ message: "Success", posts }, { status: 200 });
    } catch(err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

// ブログ記事投稿用API
export const POST = async (req: Request, res: NextResponse) => {
    try {
        const { title, description } = await req.json();
        await main();
        const post = await prisma.post.create({ data: { title, description }});
        return NextResponse.json({ message: "success", post }, { status: 201 });
    } catch(err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};
