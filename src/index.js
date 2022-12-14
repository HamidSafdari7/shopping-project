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
    useParams,
    Outlet
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
import App from "./Admin/App"
import { ContextProvider } from "./Admin/contexts/ContextProvider";
import { Dashboard } from "./Admin/pages";
import {Orders} from "./Admin/pages";
import {Customers} from "./Admin/pages";
import {AdminProducts} from "./Admin/pages";
import {UpdateProducts} from "./Admin/pages";
import {UpdateUsers} from "./Admin/pages";
import AdminLogin from "./components/AdminLogin";
import AdminuseToken from "./components/AdminuseToken";
import PageNotFound from "./components/PageNotFound";


function BasicLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export const UserContext = React.createContext();


export default function MainApp(){

  const { token, setToken } = UseToken();
  const { admintoken, setAdmintoken } = AdminuseToken();
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
      <UserContext.Provider value={{token,setToken , admintoken , setAdmintoken}}>
        <BrowserRouter>
      
          <Routes>
            <Route path="/" element={<BasicLayout />}>
              <Route index element={<Home/>}/>
              <Route path="products" element={<Products cartItems={cartItems} onAdd={onAdd} onRemove={onRemove}/>}/>
              <Route path="cart" element={<Cart cartItems={cartItems} onAdd={onAdd} onRemove={onRemove}/>}/>
              <Route path="pay" element={<Pay setCartItems={setCartItems} cartItems={cartItems}/>}/>
              <Route path="login" element={<Login setToken={setToken}/>}/>
              <Route path="register" element={<Register/>}/>
              <Route path="AdminLogin" element={<AdminLogin setAdmintoken={setAdmintoken}/>}/>
            </Route>
            
            <Route path="/Admin" element={<ContextProvider><App /></ContextProvider>}>
              {/* dashboard  */}
              <Route path="/Admin" element={(<Dashboard />)} />
              <Route path="Dashboard" element={(<Dashboard />)} />
              {/* pages  */}
              <Route path="Orders" element={(<Orders />)} />
              <Route path="customers" element={(<Customers />)} />
              <Route path="AdminProducts" element={(<AdminProducts />)} />
              <Route path="UpdateProducts" element={(<UpdateProducts />)} />
              <Route path="UpdateUsers" element={(<UpdateUsers />)} />
            </Route>

            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        
        </BrowserRouter>
      </UserContext.Provider>
    );
  }

ReactDOM.render(<MainApp/>, document.getElementById("root"));
