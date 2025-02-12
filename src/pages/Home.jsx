import React, { useState } from "react";
import products from "/data";
import Footer from "../components/Footer";

const Home = () => {
  const [cart, setCart] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const addToCart = (id) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: (prevCart[id] || 0) + 1,
    }));
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      if (prevCart[id] > 1) {
        return { ...prevCart, [id]: prevCart[id] - 1 };
      } else {
        const { [id]: removed, ...rest } = prevCart;
        return rest;
      }
    });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Buyurtmani Telegram kanalga yuborish
  const sendOrderToTelegram = async () => {
    const botToken = "7690252639:AAErU_goKNL3HxVSynY073bORs0o7jXh2Kg"; // O'z bot tokeningizni qo'ying
    const chatId = "6380897170"; // Telegram kanal yoki guruh chat ID

    if (Object.keys(cart).length === 0) {
      alert("Siz hali hech narsa tanlamadingiz!");
      return;
    }

    let message = "🛒 *Yangi buyurtma!* \n\n";
    for (const id in cart) {
      const product = products.find((p) => p.id === parseInt(id));
      if (product) {
        message += `🍕 ${product.name} - ${cart[id]} ta\n`;
      }
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const data = {
      chat_id: chatId,
      text: message,
      parse_mode: "Markdown",
    };

    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      alert("Buyurtmangiz yuborildi!");
      setCart({});
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      alert("Buyurtma yuborilmadi, qayta urinib ko'ring.");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Mahsulotni qidiring..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="p-4 bg-transparent rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-24 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-center">{product.name}</h3>
            <p className="text-center text-red-500">{product.price} UZS</p>

            <div className="flex justify-center items-center mt-4 space-x-4">
              <button
                onClick={() => removeFromCart(product.id)}
                className={`${
                  cart[product.id] > 0 ? "block" : "hidden"
                } bg-red-500 text-white py-1 px-4 rounded`}
              >
                -
              </button>
              <span>{cart[product.id] || 0}</span>
              <button
                onClick={() => addToCart(product.id)}
                className="bg-green-500 text-white py-1 px-4 rounded"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <Footer sendOrder={sendOrderToTelegram} />
    </div>
  );
};

export default Home;
