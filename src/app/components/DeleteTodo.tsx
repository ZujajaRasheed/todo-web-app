'use client'
import React from 'react'
import { useEffect } from 'react';
const DeleteTodo = ({id ,todos,setTodos}:{id:number,todos:any,setTodos:Function}) => {
    console.log("deletetodo2")
        console.log("id,,,",id)

async function deleteTodos()
{
let response=await fetch(`http://localhost:3000/api/todo/${id}`,{
    method:"DELETE",
});
let data=await response.json();
if(response.status==200)
{console.log(data.message)
    console.log("selected todo has deleted")
    setTodos(prev=>prev.filter((todo:any)=>todo.id!==id))
} 
else{
    console.log(data.error)
    console.log("error in deleting todo")
}
}
useEffect(()=>
{
    console.log("deletetodo2")
deleteTodos();
console.log("deletetodo3")
},[id])


  return (
    <div>
      
    </div>
  )
}

export default DeleteTodo
