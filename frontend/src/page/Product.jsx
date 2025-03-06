import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import server from '../server';
import Nav from '../components/nav';
import { IoAddOutline } from 'react-icons/io5';
import { RiSubtractFill } from 'react-icons/ri';

const ProductDetail = () => {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState('');
  const { id } = useParams();
  const [img, setImg] = useState('');
  const [state, setState] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => { 

      try {
        const { data } = await axios.get(`${server}/product/product/${id}`);
        console.log(data);
        setProduct(data);
        setImg(data.images[0] || '');
        console.log(img);
      } catch (e) {
        console.log(e.message);
        setError(e.message);
      }
    };

    if (error) {
        return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
      }
    fetchProduct();
  }, [id]);

  
  return (
    <div>
      <h1 className="text-xl font-bold">{product.name}</h1>
      <img 
        src={`http://localhost:5000/products/${img}`} 
        alt={product.name} 
        className="w-64 h-64 object-cover" 
      />
      <p className="mt-2">{product.description}</p>
      <p className="mt-2 font-semibold">Price: ${product.price}</p>
  
      <button>Add to Wishlist</button>
  
      <div className="flex justify-center items-center gap-1">
        <IoAddOutline onClick={() => setState((prev) => prev + 1)} />
        Add to Cart
        <RiSubtractFill onClick={() => setState((prev) => (prev === 0 ? 0 : prev - 1))} />
        {state}
      </div>
    </div>
  );
}
  export default ProductDetail;
  
