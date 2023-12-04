import axios from "axios";
import Image from "next/legacy/image";
import { useState, useEffect } from "react";
import Head from 'next/head'


const Index = ({ orders, products }) => {

  const [productsList, setProductsList] = useState(products);
  const [ordersList, setOrdersList] = useState(orders);
  const fetchData = async () => {
    try {
      const newOrdersRes = await axios.get("https://breeze-res.vercel.app/api/orders");
      const newProductRes = await axios.get("https://breeze-res.vercel.app/api/products");
      setOrdersList(newOrdersRes.data);
      setProductsList(newProductRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchData, 2000); // Refresh every 2 second

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const handleDeleteOrders = async (orderId) => {
    try {
      await axios.delete(`https://breeze-res.vercel.app/api/orders/${orderId}`);
      fetchData(); // Fetch updated data after deletion
    } catch (error) {
      console.error(error);
      alert("Failed to delete order");
    }
  };

  const handleDeleteProducts = async (orderId) => {
    try {
      await axios.delete(`https://breeze-res.vercel.app/api/products/${orderId}`);
      fetchData(); // Fetch updated data after deletion
    } catch (error) {
      console.error(error);
      alert("Failed to delete products");
    }
  };
  
  return (
    <div className="py-28 px-4">
      <Head>
        <title>Breeze Burger</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/imgs/ico.png" />
        {/* <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"></link> */}
        <meta charSet='utf-8' />
      </Head>
      <div className=" overflow-auto scrollbar" >
      <h2 className="font-capriola text-[30px] text-blue-900 text-center">PRODUCTS</h2>
        <table className="basic min-w-[500px]">
          <thead>
            <tr className="">
              <th>Image</th>
              <th className="min-w-[150px]">Descreption</th>
              <th className="min-w-[100px]">Title</th>
              <th className="min-w-[150px]">Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productsList.map((product) => (
              <tr key={product._id} className="">
                <td>
                  <Image src={product.img} alt="" width={50} height={50} />
                </td>
                <td className="text-gray-600">{product.desc}</td>
                <td >{product.title}</td>
                <td >
                  {product.sizesOption.map((size) => (
                    <span key={size._id}>
                      {size.text} ({size.price}){" "}
                    </span>
                  ))}
                </td>
                <td > 
                  <button className="bg-red-700 text-white px-2 py-1 rounded-md" onClick={() => handleDeleteProducts(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-auto scrollbar mt-10">
      <h2 className="font-capriola text-[30px] text-blue-900 text-center">ORDER</h2>
        <table className="basic min-w-[500px]">
          <thead >
            <tr >
              <th className="min-w-[150px]">Customer</th>
              <th className="min-w-[150px]">Address</th>
              <th className="min-w-[150px]">Phone</th>
              <th className="min-w-[150px]">Item</th>
              <th>Quantity</th>
              <th>Extras</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody >
            {ordersList.map((order) => (
              <tr key={order._id} >
                <td><span >{order.customer}</span></td>
                <td><span >{order.address}</span></td>
                <td><span >0{order.phone}</span></td>
                <td>
                  {order.title.map((title, index) => (
                    <div key={index}>({order.size[index]}) {title} </div>
                  ))}
                </td>
                <td>
                  {order.quantity.map((quantity, index) => (
                    <div key={index}>{quantity}</div>
                  ))}
                </td>
                <td>
                  {order.extra.map((extra, index) => (
                    <div key={index}>{extra}</div>
                  ))}
                </td>
                <td><span>{order.total} £</span></td>
                <td>
                  <button className="bg-red-700 text-white px-2 py-1 rounded-md"onClick={() => handleDeleteOrders(order._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> 
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  const productRes = await axios.get("https://breeze-res.vercel.app/api/products");
  const orderRes = await axios.get("https://breeze-res.vercel.app/api/orders");
  return {
    props:{
      orders: orderRes.data,
      products: productRes.data,
    }
  };
};

export default Index;
