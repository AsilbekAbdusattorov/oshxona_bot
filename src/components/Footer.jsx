import React from 'react';

const Footer = ({ sendOrder, language }) => {
  if (!sendOrder) {
    console.error("⚠️ Footer.jsx: sendOrder funksiyasi kelmadi!");
  }

  // Button text based on the selected language
  const buttonText = {
    uz: "🛒 Buyurtma berish",
    eng: "🛒 Place Order",
    ru: "🛒 Оформить заказ",
  };

  return (
    <div className="sticky bottom-0 w-full bg-gradient-to-r from-green-500 to-indigo-700 rounded-3xl py-5 shadow-lg">
      <div className="text-center">
        <button
          className="bg-white text-blue-600 px-8 py-3 text-lg font-semibold rounded-full shadow-md hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => {
            console.log("Tugma bosildi!"); 
            if (sendOrder) {
              sendOrder();
            } else {
              console.error("❌ sendOrder funksiyasi aniqlanmadi!");
            }
          }}
        >
          {buttonText[language]}  {/* Dynamic button text based on language */}
        </button>
      </div>
    </div>
  );
};

export default Footer;
