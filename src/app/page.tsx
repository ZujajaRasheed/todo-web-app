'use client'

import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation'
import { useActionState ,useEffect} from 'react';
import Input from './components/Input';
import Animation from './components/Animate';

const page = () => {
const router=useRouter();
async function handleForm( previousData:any,formData:FormData)
{

  let email=(formData.get("email") as string);
   let password=(formData.get("password")as string);
   console.log("email",email)
      console.log("password",password)
   if(!email||!password)
   {
    return {error:"fill all the required fields"}
   }

   else if(password.length<8)
    {
 return {error:"password must contain atleast 8 letters"}
   }


   else{
    let response = await fetch("/api/login",{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email,password
      })
    });
let data=await response.json()
console.log("status:", data);
console.log("ok:", response.ok);
console.log("data:", data);
if (!response.ok) {

  return { error:data.error||"could not login! try again,response.error" };
}

else{
  console.log(response)
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
 router.push("/home")
    },200)
    
  }
},[data])


  return (

 <div className="h-screen bg-gray-200 flex justify-center items-center">
  <Animation>
 <div className="bg-[rgb(0,107,99)] px-16 pt-8 pb-12  text-white">
 <h1 className="text-3xl mb-8  text-center ">Welcome!</h1>
 <form action={action}  className="flex flex-col items-center justify-center gap-4">
  {data?.error &&<span className="text-red-500">{data.error}</span>}
  {data?.message&&<span className="text-green-600">{data.message}</span> }

<Input   name="email" type="text" label="Email" />
<Input  name="password" type="password" label="Password"/>

  <button disabled={pending}className="px-10 py-2 rounded-md bg-white mt-4 mb-4 text-[rgb(0,107,99)] transform transition duration-300 hover:scale-x-110">{pending?"Processing...":"Login"} </button>
   <div className="block px-2"><span>Don't have an account?</span>
   <Link href="/signup" className="hover:underline"> Signup</Link></div>
    </form>
    </div>
    </Animation>
    </div>
  )
}

export default page
