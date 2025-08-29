
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { todo } from '@/databaseSchema/schema';

export async function DELETE(req:Request,{params}:{params:{id:string}})
{try{
  
const id= Number(params.id)
console.log("id.............",id)
 
  const result = await db.delete(todo).where(eq(todo.id,id))
   if (result[0].affectedRows===0) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    return NextResponse.json({message:"Todo has deleted successfully"},{status:200})
}catch(error)
{
    return NextResponse.json({error:"error in deleting todo"},{status:500})
}
}


export async function PUT(req:Request,context:{params:{id:string}})

{try{
    const body=await req.json();
    const newTodo=body.updatedTodo;
const id=Number(context.params.id)
console.log("newtod",newTodo)
console.log(" updated todo id",id)
const result=await db.update(todo).set({title:newTodo}).where(eq(todo.id,id))
console.log("updated todonnnnnnnnn id")
if(result[0].affectedRows===0)
{
    return NextResponse.json({error:"todo not found for undation"},{status:402})
}
 return NextResponse.json({message:"Todo has updated successfully"},{status:200})
}catch(error)
{
     return NextResponse.json({error:"error in updating todo"},{status:500})
}
}