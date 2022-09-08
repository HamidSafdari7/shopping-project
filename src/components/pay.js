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

    const Alert = () => {
        alert("محصول با موفقیت ثبت شد");
      }

    return(
        <div className="pay">
            <p>با فشردن دکمه " ثبت سفارش " محصول شما با موفقیت ثبت خواهد شد و در اسرع وقت به آدرس شما ارسال میگردد , هزینه محصول را پس از دریافت درب منزل پرداخت کنید از همکاری شما سپاسگذاریم</p>
            <div className='btnpay'>
                <a onClick={() =>{
                    fetch('http://localhost:3001/cart', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({cartItems , token: value.token})
                    })
                    .then((x)=>{
                        
                        Alert()
                    })
                    setCartItems([]);
                }}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    ثبت سفارش
                </a>
            </div>
        </div>
    );
}

