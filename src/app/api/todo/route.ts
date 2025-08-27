
import { NextResponse } from "next/server"
import {db} from '@/lib/db'
import jwt from 'jsonwebtoken'
import { todo } from "@/databaseSchema/schema"
import { eq } from "drizzle-orm"







export async function POST(req:any,res:Response)
{

try{
let token =req.cookies.get("token")?.value;
if(!token)
{
return NextResponse.json({error:"Not Auttenticated"},{status:400})
}
let decoded
try{
      console.log("Email from token:", process.env.SECRET_KEY);
 decoded=jwt.verify(token, process.env.SECRET_KEY)as { email: string };
  console.log("Email from token:", decoded.email);

}catch(error)
{
    
    return NextResponse.json({error:"Invalid or expired token"},{status:401})
}


const body=await req.json()
console.log("usertodo",body.todo);
console.log("error1")


const [result]=await db.insert(todo).values({title:body.todo,email:decoded.email});
console.log(result.insertId);
let id=result.insertId;
const newTodo=await db.select().from(todo).where(eq(todo.id,id))
console.log("bbb",newTodo);
    return NextResponse.json({message :"Todo added successfully",todo:newTodo},{status:200})
}
catch(error)
{
   console.log("something went wrong in adding todo",error) 
    return NextResponse.json({error :"something went wrong"},{status:500})
}
}


export async function GET(req:any,resp:Response)
{
try{
let token =req.cookies.get("token")?.value;
if(!token)
{
return NextResponse.json({error:"Not Auttenticated"},{status:400})
}
let decoded
try{
 decoded=jwt.verify(token, process.env.SECRET_KEY)as { email: string };
  console.log("Email from token:", decoded.email);

}catch(error)
{
    
    return NextResponse.json({error:"Invalid or expired token"},{status:401})
}
let usertodo=await db.select().from(todo).where(eq(todo.email,decoded.email))
console.log("USER",usertodo)
return NextResponse.json({message:"data loaded successfully",todos:usertodo},{status:200})
}catch(error)
{
    console.log("error in fetching todos...")
return NextResponse.json({error:"error in fetching todos..."})
}
}