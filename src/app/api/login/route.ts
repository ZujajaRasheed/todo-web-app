import {db} from "@/lib/db"
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import {users} from "@/databaseSchema/schema";
import bcrypt from "bcryptjs";





export async function POST(req:Request,resp:Response)
{
   try{ 
const body=await req.json();
const {email,password}=body;
if(!email||!password)
{
    return NextResponse.json({error:"both fields are required "},{status:400})
}

const result= await db.select().from(users).where(eq(users.email,email))

// console.log(User[0].email)
// console.log(User[0].password)
console.log(email)
console.log(password)

if(result.length==0)
{
    return NextResponse.json({error:"email is not valid kindly signup first"},{status:401});

}

const foundUser=result[0];
let validPassword;
try{
 validPassword= await bcrypt.compare(password,foundUser.password)
}catch(error)

    {  console.log("User password:", foundUser.password);
    return NextResponse.json({error:"error in bycrypt connnection"},{status:502}) 
}
if(!validPassword)
{
    return NextResponse.json({error:"Incorrect password"},{status:400})
}

const tokenData ={
  
    email:email

}
console.log("secret key",process.env.SECRET_KEY);
const token =jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'})
const response=NextResponse.json({message:"login successfully"})
response.cookies.set('token',token,{httpOnly:true,secure:true});
return response;




    }catch(error)
    {
        console.log(error);
        return NextResponse.json({error:"something went wrong"},{status:500})
    }
}