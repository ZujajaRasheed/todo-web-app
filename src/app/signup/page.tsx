'use client'

import React from 'react';
import Link from 'next/link';
import { useActionState , useState,useEffect} from 'react';
// import Animation from '../components/Animate';
import {useRouter } from 'next/navigation'
import Input from '../components/Input';

const page = () => {




    const router=useRouter();
const [name,setName]=useState<string>("")
const [age,setAge]=useState<string>("")
const [email,setEmail]=useState<string>("")
const [password1,setPassword1]=useState<string>("")
const [password2,setPassword2]=useState<string>("")


async function handleForm( previousData:any,formData:FormData)
{
  let name=formData.get("name") as string;
   let password1=formData.get("password1")as string;
      let password2=formData.get("password2")as string;
         let age=formData.get("age")as string;
            let email=formData.get("email")as string;
   if(!name||!age||!email||!password1||!password2)
   {
    return {error:"fill all the required fields"}
   }

    else if(password1!==password2){
 return {error:"passwords donot match"}
 setPassword1("");
  setPassword1("");
   }

   else if(password1.length<8){
      setPassword1("");
  setPassword2("");
 return {error:"password must contain atleast 8 letters"}
   }


   else {
let response=await fetch("/api/signup",{method:'POST',
    headers:{
        'Accept':'Application/json',
        'Content-Type':'Application/json'
    },
    body:JSON.stringify({name,age,email,password1})}

)
let data=await response.json();
if(!response.ok)
{setEmail("");
    return {error:data.error}
}
else{
console.log(response);
   setName("");
   setPassword1("");
   setPassword2("");
   setAge("");
   setEmail("");

    return {message:data.message}
   }
   }

 
}
const[data,action,pending]=useActionState(handleForm,undefined)


useEffect(()=>
{
if(data?.message)
{
    const timeout=setTimeout(()=>
    {
        router.push("/")
    },300);
    return ()=>clearTimeout(timeout)
}
},[data,router])

  return (





    <div className="h-screen bg-gray-200 flex justify-center items-center ">
      {/* <Animation> */}
        <div className="bg-[rgb(0,107,99)] px-30 pt-20 pb-20  text-[20px] text-white">
                <h1 className="text-7xl mb-8  text-center">Register!</h1>
           
        
      <form action={action} className="flex flex-col justify-center items-center gap-4">
        {data?.error &&<span className="text-red-500">{data.error}</span>}
            {data?.message &&<span className="text-green-500">{data.message}</span>}
       
<Input   name="name" type="text" label="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}/>
<Input   name="age" type="text" label="Enter Age" value={age} onChange={(e)=>setAge(e.target.value)}/>
<Input  name="email" type="email" label="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

<Input  name="password1" type="password" label="Enter Password" value={password1} onChange={(e)=>setPassword1(e.target.value)}/>
<Input  name="password2" type="password" label="Re-enter Password" value={password2} onChange={(e)=>setPassword2(e.target.value)}/>
       <button disabled={pending} className="px-10 py-2 mt-4 mb-4 text-[rgb(0,107,99)] rounded-md bg-white transform transition duration-300 hover:scale-x-110 ">{pending?"Processing...":"Signup"} </button>
        <div className="block px-2"><span>Already have an account?</span>
   <Link href="/" className="hover:underline"> Login</Link></div>
      </form>
      </div>
      {/* </Animation> */}
    </div>
  )
}

export default page
