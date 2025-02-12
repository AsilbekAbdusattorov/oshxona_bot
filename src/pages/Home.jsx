import React, { useState } from "react";
import products from "/data";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  const [cart, setCart] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState("uz"); // Default language is Uzbek

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
    product.name[language].toLowerCase().includes(searchTerm.toLowerCase()) // Use the selected language for product names
  );

  const sendOrderToTelegram = async () => {
    const botToken = "7690252639:AAErU_goKNL3HxVSynY073bORs0o7jXh2Kg";
    const chatId = "6380897170";

    if (Object.keys(cart).length === 0) {
      alert(language === "uz" ? "Siz hali hech narsa tanlamadingiz!" : language === "eng" ? "You haven't selected anything yet!" : "Вы еще ничего не выбрали!");
      return;
    }

    let message = language === "uz" ? "🛒 *Yangi buyurtma!* \n\n" : language === "eng" ? "🛒 *New Order!* \n\n" : "🛒 *Новый заказ!* \n\n";

    for (const id in cart) {
      const product = products.find((p) => p.id === parseInt(id));
      if (product) {
        message += `${language === "uz" ? "🍕" : language === "eng" ? "🍕" : "🍕"} ${product.name[language]} - ${cart[id]} ta\n`; // Show the name in the selected language
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
      alert(language === "uz" ? "Buyurtmangiz yuborildi!" : language === "eng" ? "Your order has been sent!" : "Ваш заказ отправлен!");
      setCart({});
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      alert(language === "uz" ? "Buyurtma yuborilmadi, qayta urinib ko'ring." : language === "eng" ? "Order not sent, please try again." : "Заказ не отправлен, попробуйте снова.");
    }
  };

  return (
    <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-700">
      <Header setLanguage={setLanguage} /> {/* Language selection */}

      {/* Qidiruv inputi */}
      <div className="mb-10">
        <input
          type="text"
          placeholder={language === "uz" ? "🔍 Mahsulotni qidiring..." : language === "eng" ? "🔍 Search for products..." : "🔍 Поиск товаров..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded-full shadow-md bg-gradient-to-r from-blue-50 to-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Mahsulotlar ro‘yxati */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="p-4 bg-transparent rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <img
              src={product.imageUrl}
              alt={product.name[language]}  // Display image with appropriate alt text
              className="w-full h-28 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-center">{product.name[language]}</h3> {/* Display name in selected language */}
            <p className="text-center text-red-500 font-bold">{product.price} UZS</p>

            {/* Tugmalar */}
            <div className="flex justify-center items-center mt-4 space-x-4">
              <button
                onClick={() => removeFromCart(product.id)}
                className={`${
                  cart[product.id] > 0 ? "block" : "hidden"
                } bg-red-500 text-white py-2 px-5 rounded-full shadow-md hover:bg-red-600 transition duration-300`}
              >
                -
              </button>
              <span className="text-lg font-semibold">{cart[product.id] || 0}</span>
              <button
                onClick={() => addToCart(product.id)}
                className="bg-green-500 text-white py-2 px-5 rounded-full shadow-md hover:bg-green-600 transition duration-300"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <Footer sendOrder={sendOrderToTelegram} language={language} />
    </div>
  );
};

export default Home;
