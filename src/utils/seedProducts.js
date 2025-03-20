import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const sampleProducts = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation technology. Perfect for music lovers and professionals who need to focus.',
    price: 129.99,
    category: 'electronics',
    imageUrl: 'https://res.cloudinary.com/conectart/image/upload/v1742401531/tiqmrolf8jwyciiimfqu.jpg',
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Smart Watch',
    description: 'Track your fitness goals, receive notifications, and more with this advanced smartwatch. Water-resistant and long battery life.',
    price: 199.99,
    category: 'electronics',
    imageUrl: 'https://res.cloudinary.com/conectart/image/upload/v1742402690/x6rix2uxg7ok1nwcrjke.jpg',
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Cotton T-Shirt',
    description: 'Comfortable 100% cotton t-shirt available in multiple colors. Perfect for casual wear or layering.',
    price: 24.99,
    category: 'clothing',
    imageUrl: 'https://source.unsplash.com/random/800x600/?tshirt',
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Denim Jeans',
    description: 'Classic denim jeans with a modern fit. Durable and stylish for everyday wear.',
    price: 49.99,
    category: 'clothing',
    imageUrl: 'https://source.unsplash.com/random/800x600/?jeans',
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with a built-in grinder. Make the perfect cup of coffee every morning.',
    price: 89.99,
    category: 'home',
    imageUrl: 'https://res.cloudinary.com/conectart/image/upload/v1742402555/wth5ekimloaqxpjdopk4.jpg',
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat made from eco-friendly materials. Perfect for yoga, pilates, or any floor exercise.',
    price: 29.99,
    category: 'sports',
    imageUrl: 'https://source.unsplash.com/random/800x600/?yogamat',
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Bestselling Novel',
    description: 'The latest bestselling fiction novel that everyone is talking about. A thrilling story of adventure and mystery.',
    price: 19.99,
    category: 'books',
    imageUrl: 'https://source.unsplash.com/random/800x600/?book',
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Facial Cleanser',
    description: 'Gentle facial cleanser suitable for all skin types. Removes makeup and impurities without drying the skin.',
    price: 14.99,
    category: 'beauty',
    imageUrl: 'https://source.unsplash.com/random/800x600/?skincare',
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
];

export const seedProducts = async () => {
  try {
    for (const product of sampleProducts) {
      await addDoc(collection(db, 'products'), product);
    }
    console.log('Sample products added successfully!');
    return true;
  } catch (error) {
    console.error('Error adding sample products:', error);
    return false;
  }
};