import React , { useState } from 'react'
import axios from "axios";
import {useRouter} from "next/router";

const Add = ({setClose}) => {
   const [file, setFile] = useState(null);
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [sizesOption, setSizesOptions] = useState([]);
    const [sizes, setSizes] = useState(null);
    const [extraOptions, setExtraOptions] = useState([]);
    const [extra, setExtra] = useState(null);


    const handleSizeInput = (e) => {
        setSizes({ ...sizes, [e.target.name]: e.target.value });
      };
    
      const handleSize = (e) => {
        setSizesOptions((prev) => [...prev, sizes]);
      };

    const handleExtraInput = (e) => {
        setExtra({ ...extra, [e.target.name]: e.target.value });
      };
    
      const handleExtra = (e) => {
        setExtraOptions((prev) => [...prev, extra]);
      };

    const handleCreate = async () =>{
        const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dq5bcql29/image/upload",
        data
      );
      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        sizesOption,
        extraOptions,
        img: url,
      };

      await axios.post("https://breeze-res.vercel.app/api/products", newProduct);
      setClose(true);
    } catch (err) {
      console.log(err);
    }
    }
    

  return (
    <div className="bg-blue-900/50 pt-10 fixed h-[100vh] w-[100vw] top-0 right-0 left-0 flex justify-center items-center z-[52]">
        <div className='bg-white py-4 px-4 rounded-lg flex flex-col gap-2'>
            <span onClick={()=>setClose(true)} className="w-6 h-6 absolute top-[-12px] right-[-10px] flex justify-center items-center text-white rounded-full bg-blue-900 cursor-pointer">X</span>
            <h2 className="font-capriola text-[30px] text-blue-900 text-center">NEW <p className="text-green-600 inline">PRODUCT</p></h2>
            <div className='flex flex-col'>
                <label >Choose an image</label>
                <input className='bg-gray-200 rounded-lg overflow-hidden text-blue-900  font-varela file:border-none file:outline-none file:py-1 file:px-2 file:text-white block file:bg-blue-900'  type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div className='flex flex-col'>
          <label >Title</label>
          <input
            className="border-2 border-green-600 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='flex flex-col'>
          <label >Desc</label>
          <textarea
          className="border-2 border-green-600 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div >
          <label >size</label>
          <div  className='flex gap-4'>
            <input
              className={`w-28 border-2 border-green-600 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600 `}
              type="text"
              placeholder="Item"
              name="text"
              onChange={handleSizeInput}
            />
            <input
              className="w-28 border-2 border-green-600 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleSizeInput}
            />
            <button className="bg-blue-900 text-white px-3 py-2 h-fit rounded-md w-[100px]" onClick={handleSize}>
              Add
            </button>
          </div>
          <div className='flex flex-wrap py-1'>
            {sizesOption.map((option) => (
              <span className='py-1 px-4 rounded-lg border-2 border-green-600 ' key={option.text} >
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <div >
          <label >Extra</label>
          <div className='flex gap-4'>
            <input
              className="w-28 border-2 border-green-600 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
              type="text"
              placeholder="Item"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              className="w-28 border-2 border-green-600 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
            />
            <button className="bg-blue-900 text-white px-3 py-2 h-fit rounded-md w-[100px]" onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className='flex flex-wrap py-1'>
            {extraOptions.map((option) => (
              <span className='py-1 px-4 rounded-lg border-2 border-green-600 ' key={option.text} >
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button className="bg-green-600 text-white px-3 py-2 h-fit rounded-md w-[100px]" onClick={handleCreate} >
          Create
        </button> 
        </div>
    </div>
  )
}

export default Add