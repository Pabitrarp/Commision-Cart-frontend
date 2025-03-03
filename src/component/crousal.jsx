import React, { useEffect, useState } from 'react'
const images = [
    "https://media.istockphoto.com/id/496689738/photo/assorted-nuts.webp?s=2048x2048&w=is&k=20&c=X52Zqn4F42PY2JR0UQ2_7TUBiQX3-C56_IYjI0y6gUs=",

    "https://images.unsplash.com/photo-1503668322945-28e31574689e?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "https://media.istockphoto.com/id/691910445/photo/smiling-businessman-with-cup-looking-away-in-city.webp?a=1&b=1&s=612x612&w=0&k=20&c=rGyjnpxplXpKJZue_hutENYtoidA1i58aJRb87Q9690=",

    "https://images.unsplash.com/photo-1611864555846-1d5dea66587c?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];
export const Crousal = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
   
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 6000); // 5000ms = 5 seconds

        return () => clearInterval(interval); 
    }, []); 

    const prevSlide = () => {
       
        setCurrentIndex((previ)=>
            previ===0?images.length-1:previ-1
        );
    };
    const nextSlide = () => {
        setCurrentIndex((previ)=>
            previ===images.length-1?0:previ+1
        );
    };
    const goToSlide=(index)=>{
       setCurrentIndex(index)
    }

  return (<>
    <div className="relative mx-4 my-4 overflow-hidden mt-6 rounded-xl  h-52 lg:h-[450px]">
    
    <div
        className="flex transition-transform duration-500 ease-out  object-cover"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
        {images.map((image, index) => (
            <img
                key={index}
                src={image}
                alt={`Slide ${index}`}
                className="w-full h-fit flex-shrink-0  object-cover "
            /> 
        ))}
    </div>

    {/* Previous Button */}
    <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-600"
    >
        &#10094;
    </button>

    {/* Next Button */}
    <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-600"
    >
        &#10095;
    </button>
    
</div>
<div className="w-full m-auto mb-5">
    <div className="flex justify-center space-x-2 mt-4">
        {images.map((_, index) => (
            <div
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 w-3 rounded-full cursor-pointer ${
                    currentIndex === index ? 'bg-blue-400' : 'bg-gray-400'
                } focus:outline-none`}
            ></div>
        ))}
    </div>
</div>


</>
  )
}
