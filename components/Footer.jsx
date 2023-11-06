import React, { useState } from 'react'

import Icon from './Icon'
import Image from 'next/image'
import Link from 'next/link'


const Footer = () => {
  const [team, setTeam] = useState(false)
  return (
    <div>
    <div className='flex flex-wrap items-center  w-[100vw] min-h-[100vh] px-4' >
      <div className='flex flex-wrap w-[100vw] items-center gap-10 lg:justify-evenly'>
        <div className='text-blue-900 text-[40px] font-capriola lg:w-[40%]'>
          Your Burger Destination<br/>For <p className='text-green-600 inline'> Perfect </p> Flavor

        </div>
        <div >
          <ul className='text-[30px] text-blue-900'>            
                        <li><Link   href="/">Home</Link></li>
                        <li><Link  href="/#menu">Menu</Link></li>
                        <li><Link   href="/#location">Location</Link></li>
                        <li><Link   href="/#reviews">Reviews</Link></li>
                        <li><Link   href="/cart">Cart</Link></li>
          </ul>
          
        </div>
      </div>
      <button onClick={()=>setTeam(true)} className='font-capriola text-lg w-[100vw] h-fit text-center flex items-center justify-center'>
        Powered By <p className='text-blue-600 inline-flex items-center font-bold'>&nbsp;Breeze &nbsp;<span className='inline-block w-[50px] h-[50px] border-2 border-blue-600 rounded-full overflow-hidden'><Image alt='' src="/imgs/Breeze.jpg" width={60} height={60}/></span></p>
      </button>
      {team && 
        <div className='bg-blue-900/50 fixed h-[100vh] w-[100vw] top-0 right-0 left-0 flex justify-center items-center'>
          <div className="flex flex-col gap-3 relative bg-white p-3 pt-9 w-[90vw] md:w-[65vw] min-w-[250px] h-fit min-h-[450px] max-w-[400px] rounded-lg">
            <span onClick={()=>setTeam(false)} className="w-6 h-6 absolute top-[-12px] right-[-10px] flex justify-center items-center text-white rounded-full bg-blue-900 cursor-pointer">X</span>
            <h2 className="font-capriola text-[30px] text-blue-900 text-center">TEAM <p className="text-green-600 inline">MEMBER</p></h2>
            <div className='flex flex-col font-varela'>
              <span>1) Mohamed Ahmed Gameel</span>
              <span>2) Ahmed Yasser Mahmoud</span>
              <span>3) Karim Mohamed </span>
              <span>4) Ahmed Mohamed Ibrahem</span>
              <span>5) Omar Wael</span>
            </div>
          </div>
        </div>
      }
    </div>
    </div>
  )
}

export default Footer