import React, { useState } from 'react';
import Image from 'next/legacy/image'; // changed 'next/legacy/image' to 'next/image'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/redux/cartSlicelatest';
import Head from 'next/head'
import Link from 'next/link';
import List from '@/components/Listlatest';


const Product = ({ burger, list }) => {
  const [price, setPrice] = useState(burger.sizesOption[0].price);
  if (typeof document !== 'undefined') {
    function hideEmptyDiv() {
      const div = document.querySelector('.my-div');
      if (!div.textContent.trim()) {
        div.classList.add('hide');
      }
    }
    
    document.addEventListener('DOMContentLoaded', hideEmptyDiv);
  }

  // const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [extras, setExtras] = useState([]);
  const dispatch = useDispatch();
  const [CurrentSize, setCurrentSize] = useState(burger.sizesOption[0]);
  

  
  const handleSize = (Index) => {
    const selectedSize = burger.sizesOption[Index];
    setCurrentSize(selectedSize);
    setPrice(selectedSize.price + extras.reduce((total, extra) => total + extra.price, 0));
  };
  ;
  const changeprice = (number) => {
    setPrice(price + number);
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e, option) => {
    const optionText = option.text;
    if (optionText !== 'Cheese' && optionText !== 'D.Cheese') {
      // if the current option is not Cheese or D.cheese, return from the function
      const checked = e.target.checked;
      if (checked){
      changeprice(option.price);
      setExtras((prev) => [...prev, option]);
      }else{
      setExtras((prev) => prev.filter((extra) => extra._id !== option._id));
      setExtras(extras.filter((extra) => extra._id !== option._id));
      setPrice(price - option.price);
      
      //setExtras((prev) => [...prev, option]);
    }
      return;
    }
  
    const checked = e.target.checked;
    const otherOptionText = optionText === 'Cheese' ? 'D.Cheese' : 'Cheese';
    const otherOption = burger.extraOptions.find((o) => o.text === otherOptionText);
    const otherOptionChecked = otherOption ? document.getElementById(otherOption.text).checked : true;
  
    if (checked) {
      if (otherOptionChecked) {
        // if the other option is already checked, uncheck it and deduct its price from the total
        document.getElementById(otherOption.text).checked  = false;
        setExtras((prev) => prev.filter((extra) => extra._id !== otherOption._id));
        setPrice(price - otherOption.price + option.price);
        console.log("dwc");
        setExtras(extras.filter((extra) => extra._id !== otherOption._id));
        setExtras((prev) => [...prev, option]);
      }else{
        setExtras((prev) => [...prev, option]);
        changeprice(option.price);
      }
    } else {
      // remove the current option from extras and deduct its price from the total
      setExtras(extras.filter((extra) => extra._id !== option._id));
      setPrice(price - option.price);
      // setExtras((prev) => [...prev, option]);
    }
  };
  
  
 

  const handleClick = () => {
    dispatch(addProduct({ ...burger, extras, price, quantity, size : CurrentSize }));
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // hide the pop-up after 3 seconds
  };
  


  return (
    <>
    <div className="min-h-[100vh] flex pt-20 font-varela px-6 flex-wrap flex-col md:flex-row">
      <Head>
        <title>Breeze Burger</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/imgs/ico.png" />
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"></link>
        <meta charSet='utf-8' />
      </Head>
      <div className="flex-[2] h-[70%] flex items-center justify-center lg:pt-6 w-[300px]">
        <div className="w-[60%] min-w-[250px] min-h-[170px] md:min-h-[250px] h-fit max-w-[500px] max-h-[500px] relative">
          <Image src={burger.img} layout='fill'  alt=""  />
        </div>
      </div>
      <div className="flex-[3] pt-[70px] pb-5">
        <h1 className="text-[30px] md:text-[40px]  text-blue-900 font-varela"> {CurrentSize.text} {burger.title}</h1>
        <span className="text-gray-400 font-varela">{burger.desc}</span>
        <div className="text-blue-900 font-varela text-xl mt-5 font-bold">Price: {price} <span className='text-green-600'>£</span></div>
        <div className="text-blue-900 mt-7 w-full">
          <h3 className="w-full text-[25px] font-bold">Choose the size</h3>
          
          <div className="flex w-[100%] flex-wrap gap-10 gap-y-5">
            {burger.sizesOption.map((size, index) => (
              <div className="flex w-fit cursor-pointer" key={size._id}>
                <div className="w-fit" onClick={() => handleSize(index)}>
                  <div className={`flex flex-wrap gap-3 px-2 py-1 border-2 ${size.text === CurrentSize.text ? "border-green-600"  : "border-gray-300 "} rounded-lg items-center justify-between`}>
                    <div className='mr-4'>{size.text}</div> <div className="">{size.price} £</div>
                  </div>
                </div> 
              </div>
            ))}
          </div>
        </div>
        <div className="text-blue-90 mt-10 text-blue-900">
                <h3 className="w-full text-[25px] font-bold">Extra</h3>
                <div className=" border-2 border-gray-300 rounded-lg px-4 py-2 max-w-[300px]">
                {burger.extraOptions.map((option) => (
              <div key={option._id}>
                <input type="checkbox"
                  id={option.text}
                  name={option.text}
                  className="mr-2" onChange={(e)=>handleChange(e, option)}/>
                <label htmlFor={option.text}>{option.text} {option.price} £ </label>
              </div>
            ))}
            
                
                </div>
            </div>
            <div className="mt-5">
            <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            defaultValue={1}
            className="border-2 border-blue-900 w-[50px] max-w-fit rounded-lg px-2 "
          />
          <button className="bg-blue-900 text-white px-4 py-1 rounded-md ml-4" onClick={handleClick}>
            Add to Cart
          </button><br/>
          <Link href="/#menu" passHref>
          <button className="bg-blue-900 text-white px-4 py-1 rounded-md mt-2" >
            Menu
          </button></Link>
        </div>
        </div>
        
  <div className={`fixed top-20 right-0 left-0 w-[100vw] flex justify-center duration-500 z-[51] ${showPopup === true ? "top-20" : "top-[-100%]"}`}>
    <p className=' bg-blue-900 text-white w-fit px-4 py-1 rounded-lg'>Product added to cart!</p>
  </div>

    </div>
    <List list={list}/>
    </>
  )
                }

                  
                
export const getServerSideProps = async ({params}, ctx) =>{
  // const myCookie = ctx?.req?.cookies || "";
  //                 let admin = false;
                
  //                 if (myCookie.token === process.env.TOKEN) {
  //                   admin = true;
  //                 }

    const product = await axios.get(`https://breeze-res.vercel.app/api/products/${params.id}`);
    const menu = await axios.get("https://breeze-res.vercel.app/api/products");
    return{
      props:{
        burger: product.data,
        list: menu.data,
        
      }
      
    }
  }
  

export default Product