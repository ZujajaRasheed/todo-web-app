
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import  bcryptjs from "bcryptjs"
import { users } from "@/databaseSchema/schema";
import { eq } from "drizzle-orm";
export async function POST(req:Request)
{try{

let body = await req.json();
let name=body.name;
let age=body.age;
let email=body.email;
let password=body.password1;
if(!name||!age||!email||!password)
{
    return NextResponse.json({error:"required fields are missing "},{status:400});
}
const existingUser = await db.select().from(users).where(eq(users.email,email))
 console.log(existingUser)
// console.log(User.password)

if(existingUser.length)
{
    return NextResponse.json({error:"email already exist, login or use different email"},{status:400});
}
else
{
   let salt=await bcryptjs.genSalt(12);
const hashPassword=await bcryptjs.hash(password,salt);
await db.insert(users).values({name,age,email,password:hashPassword});


return NextResponse.json({message:"logged in successfully"},{status:200})

}








}
catch(error)
{console.log("error",error)
    return NextResponse.json ({error:"something went wrong while signing up"},{status :500})
}
}