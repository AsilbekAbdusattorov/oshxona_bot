import React, { useState } from "react";
import products from "/data";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  const [cartNationalFood, setCartNationalFood] = useState({});
  const [cartDrinks, setCartDrinks] = useState({});
  const [activeCategory, setActiveCategory] = useState("nationalFood"); // Default to nationalFood category
  const [language, setLanguage] = useState("uz"); // Default language is Uzbek

  const addToCartNationalFood = (id) => {
    setCartNationalFood((prevCart) => ({
      ...prevCart,
      [id]: (prevCart[id] || 0) + 1,
    }));
  };

  const removeFromCartNationalFood = (id) => {
    setCartNationalFood((prevCart) => {
      if (prevCart[id] > 1) {
        return { ...prevCart, [id]: prevCart[id] - 1 };
      } else {
        const { [id]: removed, ...rest } = prevCart;
        return rest;
      }
    });
  };

  const addToCartDrinks = (id) => {
    setCartDrinks((prevCart) => ({
      ...prevCart,
      [id]: (prevCart[id] || 0) + 1,
    }));
  };

  const removeFromCartDrinks = (id) => {
    setCartDrinks((prevCart) => {
      if (prevCart[id] > 1) {
        return { ...prevCart, [id]: prevCart[id] - 1 };
      } else {
        const { [id]: removed, ...rest } = prevCart;
        return rest;
      }
    });
  };

  const sendOrderToTelegram = async () => {
    const botToken = "7690252639:AAErU_goKNL3HxVSynY073bORs0o7jXh2Kg";
    const chatId = "6380897170";

    if (
      Object.keys(cartNationalFood).length === 0 &&
      Object.keys(cartDrinks).length === 0
    ) {
      alert(language === "uz"
        ? "Siz hali hech narsa tanlamadingiz!"
        : language === "eng"
        ? "You haven't selected anything yet!"
        : "Вы еще ничего не выбрали!");
      return;
    }

    let message = language === "uz"
      ? "🛒 *Yangi buyurtma!* \n\n"
      : language === "eng"
      ? "🛒 *New Order!* \n\n"
      : "🛒 *Новый заказ!* \n\n";

    for (const id in cartNationalFood) {
      const product = products.nationalFood.find((p) => p.id === parseInt(id));
      if (product) {
        message += `${language === "uz" ? "🍕" : language === "eng" ? "🍕" : "🍕"} ${product.name[language]} - ${cartNationalFood[id]} ta\n`;
      }
    }

    for (const id in cartDrinks) {
      const product = products.drinks.find((p) => p.id === parseInt(id));
      if (product) {
        message += `${language === "uz" ? "🥤" : language === "eng" ? "🥤" : "🥤"} ${product.name[language]} - ${cartDrinks[id]} ta\n`;
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
      alert(language === "uz"
        ? "Buyurtmangiz yuborildi!"
        : language === "eng"
        ? "Your order has been sent!"
        : "Ваш заказ отправлен!");
      setCartNationalFood({});
      setCartDrinks({});
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      alert(language === "uz"
        ? "Buyurtma yuborilmadi, qayta urinib ko'ring."
        : language === "eng"
        ? "Order not sent, please try again."
        : "Заказ не отправлен, попробуйте снова.");
    }
  };

  return (
    <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-700">
      <Header setLanguage={setLanguage} /> {/* Language selection */}

      {/* Kategoriyalar uchun tugmalar */}
      <div className="mb-6 text-center">
        <button
          onClick={() => setActiveCategory("nationalFood")}
          className={`py-2 px-4 m-2 rounded-md text-white ${activeCategory === "nationalFood" ? "bg-blue-600" : "bg-blue-400"}`}
        >
          {language === "uz" ? "Milliy Taomlar" : language === "eng" ? "National Foods" : "Национальные блюда"}
        </button>
        <button
          onClick={() => setActiveCategory("drinks")}
          className={`py-2 px-4 m-2 rounded-md text-white ${activeCategory === "drinks" ? "bg-blue-600" : "bg-blue-400"}`}
        >
          {language === "uz" ? "Ichimliklar" : language === "eng" ? "Drinks" : "Напитки"}
        </button>
      </div>

      {/* Milliy taomlar yoki ichimliklar ro‘yxati */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {activeCategory === "nationalFood" && products.nationalFood.map((product) => (
          <div
            key={product.id}
            className="p-4 bg-transparent rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <img
              src={product.imageUrl}
              alt={product.name[language]}  // Display image with appropriate alt text
              className="w-full h-28 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-center">{product.name[language]}</h3>
            <p className="text-center text-red-500 font-bold">{product.price} UZS</p>

            {/* Tugmalar */}
            <div className="flex justify-center items-center mt-4 space-x-4">
              <button
                onClick={() => removeFromCartNationalFood(product.id)}
                className={`${cartNationalFood[product.id] > 0 ? "block" : "hidden"} bg-red-500 text-white py-2 px-5 rounded-full shadow-md hover:bg-red-600 transition duration-300`}
              >
                -
              </button>
              <span className="text-lg font-semibold">{cartNationalFood[product.id] || 0}</span>
              <button
                onClick={() => addToCartNationalFood(product.id)}
                className="bg-green-500 text-white py-2 px-5 rounded-full shadow-md hover:bg-green-600 transition duration-300"
              >
                +
              </button>
            </div>
          </div>
        ))}

        {activeCategory === "drinks" && products.drinks.map((product) => (
          <div
            key={product.id}
            className="p-4 bg-transparent rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <img
              src={product.imageUrl}
              alt={product.name[language]}  // Display image with appropriate alt text
              className="w-full h-28 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-center">{product.name[language]}</h3>
            <p className="text-center text-red-500 font-bold">{product.price} UZS</p>

            {/* Tugmalar */}
            <div className="flex justify-center items-center mt-4 space-x-4">
              <button
                onClick={() => removeFromCartDrinks(product.id)}
                className={`${cartDrinks[product.id] > 0 ? "block" : "hidden"} bg-red-500 text-white py-2 px-5 rounded-full shadow-md hover:bg-red-600 transition duration-300`}
              >
                -
              </button>
              <span className="text-lg font-semibold">{cartDrinks[product.id] || 0}</span>
              <button
                onClick={() => addToCartDrinks(product.id)}
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
