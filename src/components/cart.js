import "./cart.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cart(props){
  const { cartItems, onAdd, onRemove } = props;
  const totalPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
    return(
      <>
      <div>
      {cartItems.length === 0 && 
      <div className="body">
        <h2 className="p-when-cart-is-empty">  ¯\_(ツ)_/¯ محصولی اضافه نکردی</h2>
        <div className="container">
          <div className="headChar"></div>
          <div className="bodyChar"></div>
          <div className="firstLeg"></div>
          <div className="secondLeg"></div>
          <div className="shadowChar"></div>
        </div>
      </div>}
      {cartItems.map((item) => (
          <div className="slideshow" key={item.id}>
            <img className="picture" src={item.image}></img>
            <p className="name-of-product">{item.name}</p>

            <h3 className="price">
              {item.qty} x {item.price.toFixed(0)} $
            </h3>

            <div className="button-of-cart">
              <button className="button-for-add" onClick={() => onAdd(item)}>
                +
              </button>
              <button className="button-for-remove" onClick={() => onRemove(item)}>
                -
              </button>
            </div>
          </div>
        ))}
        
        {cartItems.length !== 0 && (
          <>
            <div className="totalPrice">
              <h2><strong>{totalPrice.toFixed(0)} $</strong></h2>
              <h2><strong>جمع کل</strong></h2>
            </div>
            <div className="body-of-payButton">
              <Link to="/pay"><button className="payButton" >پرداخت</button></Link>
            </div>
          </>
        )}    
      </div>
      </>
    );
}
