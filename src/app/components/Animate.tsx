'use client'

import React, { ReactNode } from 'react'
import {useEffect,useState} from 'react'
import { usePathname } from 'next/navigation';

import { AnimatePresence,motion } from 'framer-motion';
type animateprop={
    children:ReactNode
}
const Animation = ({children}:animateprop) => {

const pathname=usePathname();



  return (
    <AnimatePresence mode="wait">
        <motion.div
            key={pathname}
            initial={{y: -300,opacity :0}}
            animate={{y:0,opacity:1}}
            //  exit={{y:100,opacity:0}}
            transition={{duration:1.2 ,ease:"easeIn"}}
            >{children}
        </motion.div>
    </AnimatePresence>
  )
}

export default Animation
