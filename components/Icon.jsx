import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook , faInstagram, faWhatsapp  } from "@fortawesome/free-brands-svg-icons";

const Icon = () => {
  return (
    <>
    <div className='flex w-[100px] mt-5 justify-between'>
    <a href="#">
    <FontAwesomeIcon icon={faFacebook}   className='w-6 h-6 text-blue-900'/>
    </a>
    <a href="#">
    <FontAwesomeIcon icon={faInstagram} className='w-6 h-6 text-blue-900'/>
    </a>
    <a href="#">
    <FontAwesomeIcon icon={faWhatsapp}  className='w-6 h-6 text-blue-900'/>
    </a>
    
    </div>
    </>
  )
}

export default Icon