
'use client'

import React from 'react'
// import { useRouter } from 'next/navigation'
import Logout from '../components/Logout'
import Animation from '../components/Animate'
import Image from 'next/image'
import Input from '../components/Input'
import { useActionState ,useState} from 'react'
import ShowTodo from '../components/ShowTodo'


const page = () => {

const[todos,setTodos]=useState<any[]>([])
// const router=useRouter();
async function handleTodo(prevData:any,formData:FormData)

{
 
let todo=formData.get("todo")as String
let response =await fetch("/api/todo",
  {
    method:'POST',headers:{
      'Accept':'Application/json',
'content-Type':'Application/json'
    },
    credentials:"include"
    ,body:JSON.stringify({todo})
  }
)
let data=await response.json();
 
if(response.status===200)
{console.log("home",data.todo);
setTodos(prev=>[data.todo[0] ,...prev])
  console.log("todo added successfully")
 return {message:data.message}
}
else
{
   console.log("error in adding todo")
    return {error:data.error}
}
}


const [data,action,pending]=useActionState(handleTodo,undefined)







  return (
     <div className="h-screen w-full  ">
        <Image
        src="/image.png"
        alt="background"
        fill
        priority
        style={{ objectFit: "cover", zIndex: -1 }}
       
      /> 
       
     
   <div className="h-screen flex justify-center items-center relative ">   
     <div className="absolute top-3 right-2 ">
        <Logout />
      </div>
  <Animation>
 <div className="bg-[rgb(0,107,99)] px-16 pt-8 pb-8  text-white flex flex-col  items-center">
  {data?.error&& <span className="text-red-500">{data.error}</span>}
  {data?.message&&<span className="text-green-500">{data.message}</span>}
 <h1 className="text-3xl mb-8  text-center ">ToDo List</h1>
 <form action={action} className="flex flex-col items-center justify-center gap-4">
 
<div className="flex ">
<input type="text" name="todo" placeholder="Add your task" className="rounded-2xl px-5 border-[0.5px] border-white py-2 text-center mr-1 focus:outline-none"></input>


  <button type="submit" className="px-2 rounded-full bg-white  text-[rgb(0,107,99)] transform transition duration-300 hover:scale-x-110" disabled={pending}>{pending?"processing..":"Add "}</button>
</div>
   
    </form>
    <ShowTodo todos={todos} setTodos={setTodos}/>
    </div>
   
    </Animation>
    
    </div>
 
 </div>
 
  
  )
}

export default page
