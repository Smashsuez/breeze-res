import { useState } from "react";
// import styles from "../styles/orderDetail.module.css";
import emailjs from '@emailjs/browser';

const OrderDetail = ({ total, createOrder, quantity, extra, title, size, setCash, }) => {
  const [customer, setCustomer] = useState("");  
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const sendEmail = (e) => {
    // e.preventDefault();

    // emailjs.sendForm(
    //   'service_voin4q9', // Replace with your service ID
    //   'template_5dexk3l', // Replace with your email template ID
    //   e.target,
    //   'Ro_eFq8rhrK6vhPck' // Replace with your user ID
    // ).then((result) => {
    //     console.log(result.text);
    //   }, (error) => {
    //     console.log(error.text);
    //   });
      

      createOrder({ customer, address, total, phone, quantity, extra, title, size });
  };

  return (
    <div className="bg-blue-900/50 fixed h-[100vh] w-[100vw] top-0 right-0 left-0 flex justify-center items-center">
      <div className="flex flex-col relative bg-white p-3 pt-9 w-[90vw] md:w-[65vw] min-w-[250px] h-fit min-h-[450px] max-w-[400px] rounded-lg ">
      <span onClick={()=>setCash(false)} className="w-6 h-6 absolute top-[-12px] right-[-10px] flex justify-center items-center text-white rounded-full bg-blue-900 cursor-pointer">X</span>
      <h2 className="font-capriola text-[30px] text-blue-900 text-center">ORDER <p className="text-green-600 inline">DETAIL</p></h2>
        <p className="text-blue-900 font-bold text-center">You will pay {total} £</p>
        <form className="flex flex-col flex-1 gap-5 justify-center" onSubmit={sendEmail}>
          <div className="flex flex-col gap-2">
            <label  className="">Name Surname</label>
            <input
              placeholder="Full Name"
              type="text"
              className="border-2 border-green-600 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label >Phone Number</label >
            <input
              type="text"
              placeholder="Phone Number"
              className="border-2 border-green-600 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600 "
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Address</label>
            <textarea
              rows={1}
              placeholder="Address"
              type="text"
              className="border-2 border-green-600 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600 "
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <input type="hidden" name="customer_name" value={customer} />
          <input type="hidden" name="customer_address" value={address} />
          <input type="hidden" name="customer_phone" value={phone} />
          <input type="hidden" name="order_total" value={total} />
          <input type="hidden" name="order_quantity" value={quantity} />
          <input type="hidden" name="order_extra" value={extra} />
          <input type="hidden" name="order_title" value={title} />
          <input type="hidden" name="order_size" value={size} />
          <button type="submit" className="bg-green-600 text-white px-3 py-1 w-fit rounded-md justify-self-end" >
            Order
          </button>
          
          
        </form>
      </div>
    </div>
  );
};

export default OrderDetail;
