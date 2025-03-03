import React from 'react'
import { Link } from 'react-router-dom';
import { baseurlforimg } from '../../axios';
export const Productscard = ({allproducts}) => {
  return (<>
    {
        allproducts.map((data,index) => {
          return <div className='mt-4' id={data.catagoryname} key={index}>
         {data?.products?.length >0&& <p className='text-center underline font-bold text-lg lg:text-2xl'>{data.catagoryname}</p>}
            <div className='grid grid-cols-3 gap-1.5 lg:justify-center items-center ml-2.5 mr-2.5 lg:flex lg:space-x-2'>
              {data?.products?.map((item,index) => <div className=" lg:w-40 min-w-24  rounded-xl overflow-hidden cursor-pointer border-r-2 border-l-2 border-b-2 border-blue-100 mt-2 bg-gray-100 relative" key={index} >
                <Link to={`/products/${data.catagoryname}/${item.id}`}>
               {item.stuck===0 && <div className='absolute h-24 w-full  text-white bg-white bg-opacity-45 flex justify-center items-center'>
                       <p className='text-red-500 capitalize '>out of stuck</p>
                </div>}


                <div className="image">
                  <img src={`${baseurlforimg}${item?.image}`} className='object-cover h-24 w-full lg:w-40 lg:h-32' />
                </div>
                <div className=" text-xs  px-0.5 text-center  mt-2 uppercase font-bold  mb-2">{item.name}</div>
                <div className="flex justify-between px-1">
                  <div className="text-xs">
                    ₹{item.price}
                  </div>
                  <div className="text-xs">
                    {item.grams}/g
                  </div>
                </div>
                <div className="text-center text-sm ">
       
          <div className="flex justify-center items-center mt-1">
            {Array.from({ length: 5 }, (_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${index+1 <= item.rating ? 'text-blue-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <path
                  d="M10 15l-3.5 2 1-4.5L3 8.5l4.5-.5L10 3l2.5 4 4.5.5-3.5 4.5 1 4.5L10 15z"
                />
              </svg>
            ))}
          </div>
        </div>
        </Link>  
          </div>)}
            </div>
          </div>
        })
      }
 </> )
}
