import React from 'react'
import QRCode from "react-qr-code";

export const Paymentqrcode = ({amount}) => {
    const upiID = "ritamaharana92@okaxis"; 
// Fixed amount
    const name = "YourName"; // Your name
    const upiURL = `upi://pay?pa=${upiID}&pn=${name}&am=${amount}&cu=INR`;

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Scan to Pay</h2>
            <QRCode value={upiURL} size={200} />
            <p className="mt-2 text-gray-600">Pay ₹{amount} using PhonePe</p>
            <a href={upiURL}>clicktopay </a>
        </div>
    );
}
