import "./pay.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import UseToken from "./useToken";
import { useEffect } from "react";
import { UserContext } from "..";

export default function Pay(props){
    const value = React.useContext(UserContext);
    const { cartItems , setCartItems} = props;
    const { token, setToken } = UseToken();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!token){
            navigate("/login")
        }
    })

    return(
        <div className="pay">
            <h1 className="p-of-pay">صفحه پرداخت</h1>
            <button onClick={() =>{
                fetch('http://localhost:3001/cart', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({cartItems , token: value.token})
                })
                setCartItems([]);
            }}>done</button>
        </div>
    );
}

