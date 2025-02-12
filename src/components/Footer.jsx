import React from 'react';

const Footer = ({ sendOrder }) => {
  if (!sendOrder) {
    console.error("⚠️ Footer.jsx: sendOrder funksiyasi kelmadi!");
  }

  return (
    <div className="sticky bottom-0 w-full bg-white py-4 shadow-md">
      <div className="text-center text-lg font-semibold">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
          onClick={() => {
            console.log("Tugma bosildi!"); // Konsolga yoziladi
            if (sendOrder) {
              sendOrder(); // Funksiyani chaqirish
            } else {
              console.error("❌ sendOrder funksiyasi aniqlanmadi!");
            }
          }}
        >
          Buyurtma berish
        </button>
      </div>
    </div>
  );
};

export default Footer;
