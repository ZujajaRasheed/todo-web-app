
'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
const Logout = () => {


const router=useRouter();
async function handleLogout(e:any)
{e.preventDefault();
  console.log("dash")
  let response=await fetch("http://localhost:3000/api/logout")
  let data=await response.json()
    console.log("dashhhhhhhhh")
if(response.status===200)
{
  router.push("/")
  console.log("logged out successfully")
 
}
else
{
   console.log("error in logging out")
}
}







  return (
    <div>

      
      <button onClick={(e)=>handleLogout(e)}className="px-4 py-6  rounded-full bg-red-500  text-xs   hover:bg-red-300 ">Logout</button>
    </div>
  )
}

export default Logout
