'use client'
import React from 'react'
import { useEffect,useState } from 'react'
import{FaEdit} from 'react-icons/fa'
import {MdDelete} from 'react-icons/md'
import DeleteTodo from '../components/DeleteTodo'
import EditTodo from '../components/EditTodo'



const ShowTodo = ({todos,setTodos}:{todos:any[],setTodos:Function}) => {



const[editId,setEditId]=useState<number|null>(null)

    const [selectedId,setSelectedId]=useState<number|null>(null)
async function showTodo()
{
  let response=await fetch("http://localhost:3000/api/todo")
  let result=await response.json();
  if(response.status===200)
  {
    console.log("result",result);
    setTodos(result.todos);
console.log(todos);
    console.log("fetching data")
  }
  else{
    console.log("error in fetching data ")
  }
}
useEffect(()=>
{
showTodo();

},[])



console.log(todos);




  return (
    <div className="mt-16 " >
       <hr className="border-b border-dashed border-gray-300 border-0.5"></hr>

       {
        todos.length>0 &&  
todos.map((t:any,index:number)=>(
<div key={index}>
 {  editId===t.id?(
<EditTodo   id={editId} todos={todos} setTodos={setTodos} setEditId={setEditId} />
):
(
    <div  className="flex  gap-4  mb-4 mt-12" >
    <label className ="border border-gray-400 rounded-full px-4 py-4 w-[350px] break-words ">{t.title}</label>
   <button className=" text-white transform transition duration-300 hover:scale-x-110" onClick={()=>setEditId(t.id)} ><FaEdit/></button>
  <button className=" text-white transform transition duration-300 hover:scale-x-110" onClick={ ()=> setSelectedId(t.id)}><MdDelete/></button>
 </div>
)
}
       
</div>
))
}
  {selectedId? (
  <DeleteTodo id={selectedId} todos={todos} setTodos={setTodos}/>):null}

    </div>
  )
}

export default ShowTodo;
