import React from 'react'



type inputprop={
    name:string,
    type:string,
  
    label:string,
    value?:string,
    onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void

}






const Input = (props:inputprop) => {
  return (
    <div>
       
      <label htmlFor={props.name} className="block mb-2 mt-2 font-semibold">{props.label}</label>
      <input type={props.type} name={props.name} id={props.name} className="px-8 py-2 border-b border-b-white   text-center focus:outline-none  "
      {...(props.onChange!==undefined? {onChange:props.onChange}:{}) } 
      {...(props.value!==undefined? {value:props.value}:{})}></input>
    </div>
  )
}

export default Input
