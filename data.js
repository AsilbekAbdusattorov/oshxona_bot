import Taom from './src/img/Taom.png';
import Ichimlik from './src/img/ichimliklar.png';

const products = {
  nationalFood: [
    {
      id: 1,
      name: {
        uz: 'Mahsulot 1',
        eng: 'Product 1',
        ru: 'Продукт 1',
      },
      price: 100,
      imageUrl: Taom,
    },
    {
      id: 2,
      name: {
        uz: 'Mahsulot 2',
        eng: 'Product 2',
        ru: 'Продукт 2',
      },
      price: 150,
      imageUrl: Taom,
    },
    {
      id: 3,
      name: {
        uz: 'Mahsulot 3',
        eng: 'Product 3',
        ru: 'Продукт 3',
      },
      price: 200,
      imageUrl: Taom,
    },
    // Boshqa milliy taomlar...
  ],

  drinks: [
    {
      id: 1,
      name: {
        uz: 'Ichimlik 1',
        eng: 'Drink 1',
        ru: 'Напиток 1',
      },
      price: 50,
      imageUrl: Ichimlik,
    },
    {
      id: 2,
      name: {
        uz: 'Ichimlik 2',
        eng: 'Drink 2',
        ru: 'Напиток 2',
      },
      price: 70,
      imageUrl: Ichimlik,
    },
    {
      id: 3,
      name: {
        uz: 'Ichimlik 3',
        eng: 'Drink 3',
        ru: 'Напиток 3',
      },
      price: 90,
      imageUrl: Ichimlik,
    },
    // Boshqa ichimliklar...
  ],
};

export default products;
