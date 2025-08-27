


import { NextResponse } from "next/server";




export async function GET()
{
try{
    const response=NextResponse.json({message:"logout successfully"},{status:200})
    console.log("logout")
    response.cookies.set("token","",{expires:new Date(0)})
    return response;

}catch(error)
{ console.log("log out failed")
return NextResponse.json({error:"error in logging out "},{status:400})
}
}