'use client'
import React from 'react'
import { useState,useEffect } from 'react'
import { MdElectricalServices } from 'react-icons/md'
const EditTodo = ({id,todos,setTodos,setEditId}:{id:number|null,todos:any,setTodos:Function,setEditId:Function}) => {
const[updatedTodo,setUpdatedTodo]=useState<string>("")
const currentTodo=todos.find((t:any)=>t.id===id)
  useEffect(() => {
    if (currentTodo) {
      setUpdatedTodo(currentTodo.title);
    }
  }, [currentTodo]);

async function handleUpdate(e:any)
{
    e.preventDefault();
    if(!updatedTodo||!updatedTodo.trim())
    {
        console.log("kindly fill the required field")
    }
    else
    {console.log(id);
        let response =await fetch(`api/todo/${id}`,{
            method:'PUT',headers:{
                'Accept':'Application/json',
                'content-Type':'Application/json'
            },
            body:JSON.stringify({updatedTodo})
        })

        if(response.status===200)
        {
            console.log("todo updated successfully")
            setEditId(null);
         setTodos((prev:any[])=>
        prev.map((t)=>
        t.id===id?{...t,title:updatedTodo}:t))
        }
   else
        {
            console.log("error in updating todo")
        }
    }

}

  




  return (
   <div    className="flex  gap-2  mb-4 mt-8">

      <input type="text" value={updatedTodo} className ="border border-gray-400 rounded-full px-2 py-2 w-[200px] break-words " onChange={(e)=>setUpdatedTodo(e.target.value)}></input>
        <button onClick={(e)=>handleUpdate(e)} className=" text-white transform transition duration-300 hover:scale-x-110"> Save </button>
          <button onClick={() => setEditId(null)}  className=" text-white transform transition duration-300 hover:scale-x-110">  Cancel </button>
 </div>
  )
}

export default EditTodo;
