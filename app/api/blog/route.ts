import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function main(){
    try{
        await prisma.$connect();
    }catch(err){
        return Error("Datebase Connection Unsuccessfull")
    }
}

export const GET = async (req:Request, res:NextResponse)=>{
   try {
    await main()
    const posts = await prisma.post.findMany();
    return NextResponse.json({message:"success",posts},{status:200})
   } catch (error) {
    return NextResponse.json({message:"Error", error}, {status:500})
   }finally{
    await prisma.$disconnect()
   }
}

export const POST = async (req:Request, res:NextResponse)=>{
    try {
        const {title,description} = await req.json();
        await main()
        const post = await prisma.post.create({data:{description,title}})
        return NextResponse.json({message:"Success",post},{status:201})
    } catch (error) {
        return NextResponse.json({message:"Error",error},{status:500});
    }finally{
        await prisma.$disconnect();
    }
}