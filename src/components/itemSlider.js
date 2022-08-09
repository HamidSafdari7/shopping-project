import "./itemSlider.css";
import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function Itemslider(){

    const [product , setProduct] = React.useState([]);
    React.useEffect(() =>
    {fetch("http://localhost:3001/products")
      .then((x) => x.json())
      .then((x) => setProduct(x))}
      ,[]);

        return (
        <div>
            <InformationsOfItemslider
               products={product}
            />
        </div>
        );
}


function InformationsOfItemslider(props){
    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2500,
        autoplaySpeed: 1500,
        cssEase: "linear",
        responsive:[
            {
                breakpoint:620,
                settings:{
                    slidesToShow: 2
                }
            },
            {
                breakpoint:400,
                settings:{
                    slidesToShow: 1
                }
            },
        ]
    };
    return(
        <>
        <div>
            <Slider {...settings}>
                {props.products.map((x , i)=>
                (<div key={i} className="slideshow-of-itemslider"> 
                    <img className="picture-of-itemslider" src={x.image}></img>
                    <p className="name-of-product">{x.name}</p>
                    <button className="btn-of-price">{x.price} $</button>
                </div>))}
            </Slider>
        </div>
        <h6 className="pragraph2">تضمین ما رضایت شماست </h6>
        </>
    );
}
