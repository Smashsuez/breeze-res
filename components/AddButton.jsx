import React from 'react'
import styles from "../styles/AddButton.module.css"

const AddButton = ({setClose}) => {
  return (
    <div className="bg-gray-200 flex justify-center">
    <div className="bg-green-600 w-fit text-white cursor-pointer px-3 py-1 rounded-b-md" onClick={()=> setClose(false)} >Add New</div>
    </div>
  )
}

export default AddButton