import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    useLocation,
    Route,
    Link,
    Routes,
    Switch,
    BrowserRouter,
    useParams
} from "react-router-dom";
import './index.css';
import Header from './components/Header';
import Footer from './components/footer';
import Itemslider from './components/itemSlider';
import Slider from './components/slider';
import Home from './components/home';
import Products from './components/products';
import Cart from './components/cart';
import Pay from "./components/pay";
import Login from "./components/login";
import UseToken from "./components/useToken";
import Register from "./components/register";

export const UserContext = React.createContext();


export default function App(){

  const { token, setToken } = UseToken();
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);


  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

    return(
      <UserContext.Provider value={{token,setToken}}>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/products" element={<Products cartItems={cartItems} onAdd={onAdd} onRemove={onRemove}/>}/>
            <Route path="/cart" element={<Cart cartItems={cartItems} onAdd={onAdd} onRemove={onRemove}/>}/>
            <Route path="/pay" element={<Pay setCartItems={setCartItems} cartItems={cartItems}/>}/>
            <Route path="/login" element={<Login setToken={setToken}/>}/>
            <Route path="/register" element={<Register/>}/>
            {/* <Route path="/test" element={<Test/>}/> */} 
          </Routes>
          <Footer/>
        </BrowserRouter>
      </UserContext.Provider>
    );
  }

ReactDOM.render(<App/>, document.getElementById("root"));
