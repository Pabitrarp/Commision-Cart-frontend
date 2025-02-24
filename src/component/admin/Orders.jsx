import React, { useEffect, useState } from 'react'
import { Layout } from './adminconponent/Layout'
import { Adminaxios, baseurlforimg } from '../../axios'
import axios from 'axios'
import { toast } from 'react-toastify'


export const Orders = () => {
    const [Orders, setOrders] = useState([])
    const [data,setdata]=useState();
    useEffect(() => {
       const fetch=async()=>{
        try {
             const data=await Adminaxios.get("/allcompliteorder");
            setOrders(data.data)
            console.log(data.data)
        } catch (error) {
            console.log(error)
        }
       }
       fetch();
    }, [])
    const Submitdata=()=>{
       const encodeddata=encodeURIComponent(JSON.stringify(data))
       window.open(`/invoice.html?data=${encodeddata}`,"_blank")
    }
    const changepaymentstatus=async(status,id)=>{
      try {
         if(status=="Verify")return;
         else{
             const res=await Adminaxios.put("/updatepaymentstatus",{id});
              res.status==200&&toast.success(res.data.message);
         }
      } catch (error) {
        console.log(error)
      }
    }
  return (
     <Layout>
    <div className="overflow-auto h-[85vh]">
  <table className="w-full rounded-2xl border">
    {/* Table Header */}
    <thead>
      <tr className="text-lg capitalize font-semibold text-center bg-gray-600 text-white">
        {["Name", "Phone", "Address to Deliver", "Product", "Price", "Quantity", "Payment Proof", "Order Status", "Action"].map(
          (heading) => (
            <th key={heading} className="p-2 border-2 border-r-white border-l-white border-t-orange-500 border-b-green-500">
              {heading}
            </th>
          )
        )}
      </tr>
    </thead>

    {/* Table Body */}
    <tbody>
      {Orders.map((data, orderIndex) =>(
           
        data.products.map((d, productIndex) => (
          <tr key={`${data._id}-${productIndex}`} className="capitalize text-center bg-gray-100 border-b border-black">
            {/* Show User Details only for the first product of each order */}
            {productIndex === 0 && (
              <>
                <td rowSpan={data.products.length} className="p-2 border border-black">{data?.userdata?.name || "N/A"}</td>
                <td rowSpan={data.products.length} className="p-2 border border-black">{data?.userdata?.phone || "N/A"}</td>
                <td rowSpan={data.products.length} className="p-2 border border-black">{data?.address?.landmark || "N/A"}</td>
              </>
            )}

            {/* Product Details */}
            <td className="p-2 border border-black">
              <div className="flex flex-col justify-center items-center gap-2">
                {d.image ? <img src={`${baseurlforimg}${d.image}`} alt={d.name} className="w-20 h-20 rounded-xl" /> : <p>No Image</p>}
                <p>{d.name}</p>
                {d.grams && <p className="normal-case">{d.grams}gm</p>}
              </div>
            </td>

            <td className="p-2 border border-black">{d.price || "N/A"}</td>
            <td className="p-2 border border-black">{d.quantity || "N/A"}</td>

            {/* Show Payment Proof only for the first product of each order */}
            {productIndex === 0 && (
              <td rowSpan={data.products.length} className="p-2 border border-black">
                <div className="flex flex-col justify-center items-center gap-2">
                  {data.paymentproof ? (
                    <img src={`${baseurlforimg}${data.paymentproof}`} alt="Payment Proof" className="w-20 h-20 rounded-xl" />
                  ) : (
                    <p>No Proof</p>
                  )}
                  <p>{data.ts_id || "N/A"}</p>
                  <p className={`capitalize px-2 rounded-lg font-bold ${data.payment_status === "Verify" ? "text-green-400" : "text-red-500"}`}>
                    {data.payment_status === "Verify" ? "Verified Payment" : "Payment Verification Pending"}
                  </p>
                  <button
                    className="bg-blue-400 px-2 py-1 rounded-lg capitalize font-semibold"
                    onClick={() => changepaymentstatus(data.payment_status, data._id)}
                  >
                    Change Status
                  </button>
                </div>
              </td>
            )}

            {/* Show Order Status only for the first product of each order */}
            {productIndex === 0 && (
              <td rowSpan={data.products.length} className="p-2 border border-black">{data.orderstatus || "N/A"}</td>
            )}

            {/* Show Invoice Button only for the first product of each order */}
            {productIndex === 0 && (
              <td rowSpan={data.products.length} className="p-2 border border-black">
                <button
                  className="border-2 p-2 rounded capitalize border-t-orange-500 border-b-green-500 border-l-white border-r-white disabled:bg-gray-50 disabled:text-gray-200"
                  onClick={() => {
                    setdata(data);
                    Submitdata();
                  }}
                  disabled={data.payment_status === "pending"}
                >
                  Invoice
                </button>
              </td>
            )}
          </tr>
        )))
      )}
    </tbody>
  </table>
</div>


      
     </Layout>
  )
}
