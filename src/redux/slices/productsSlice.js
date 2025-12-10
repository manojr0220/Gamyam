import { createSlice } from '@reduxjs/toolkit';

// Generate mock products
const generateMockProducts = () => {
  const categories = ['Electronics', 'Clothing', 'Food & Beverage', 'Home & Garden', 'Sports', 'Books', 'Toys', 'Beauty'];
  const productNames = {
    Electronics: ['Laptop', 'Smartphone', 'Headphones', 'Smartwatch', 'Tablet'],
    Clothing: ['T-Shirt', 'Jeans', 'Jacket', 'Sneakers', 'Dress'],
    'Food & Beverage': ['Coffee Beans', 'Green Tea', 'Chocolate', 'Honey', 'Olive Oil'],
    'Home & Garden': ['Plant Pot', 'Garden Tools', 'Lamp', 'Cushion', 'Rug'],
    Sports: ['Yoga Mat', 'Dumbbells', 'Running Shoes', 'Water Bottle', 'Resistance Bands'],
    Books: ['Fiction Novel', 'Cookbook', 'Self-Help Book', 'Biography', 'Science Book'],
    Toys: ['Building Blocks', 'Puzzle', 'Action Figure', 'Board Game', 'Stuffed Animal'],
    Beauty: ['Face Cream', 'Shampoo', 'Lipstick', 'Perfume', 'Sunscreen']
  };

  const products = [];
  let id = 1;

  categories.forEach(category => {
    productNames[category].forEach(name => {
      products.push({
        id: id.toString(),
        name: `${name} - Premium Quality`,
        price: Math.floor(Math.random() * 500) + 10,
        category,
        stock: Math.floor(Math.random() * 100),
        description: `High-quality ${name.toLowerCase()} with excellent features and durability. Perfect for everyday use.`
      });
      id++;
    });
  });

  return products;
};

const initialState = {
  items: generateMockProducts(),
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newProduct = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.items.push(newProduct);
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(product => product.id !== action.payload);
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
