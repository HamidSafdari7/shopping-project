import "./products.css";
import React, { useEffect, useState } from "react";
import { FaShoppingCart } from 'react-icons/fa';
import Cart from "./cart";
import Modal from "./modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


export default function Products(props){

    const [product , setProduct] = React.useState([]);
    const {onAdd , cartItems ,onRemove} = props;
    React.useEffect(() =>
        {fetch("http://localhost:3001/products")
        .then((x) => x.json())
        .then((x) => setProduct(x))}
      ,[]);

        return (
        <div>
            <div>
                <video className="video-of-header-of-product" loop autoPlay>
                    <source src="images/h.mp4" type="video/mp4"></source>
                </video>
            </div>
            <InformationsOfProducts
               products={product}
               onAdd={onAdd}
               cartItems={cartItems}
               onRemove={onRemove}
            />
        </div>
        );
}

function InformationsOfProducts(props){
    const [query, setQuery] = useState("")
    const {onAdd , cartItems ,onRemove} = props;
    const [modalOpen, setModalOpen] = useState(false);

    const settings = {
        dots: true,
        infinite: false,
        centerPadding: "2px",
        slidesToShow: 5,
        speed: 500,
        rows: 4,
        slidesPerRow: 1,
        responsive:[
            {
                breakpoint:1030,
                settings:{
                    slidesToShow: 3
                }
            },
            {
                breakpoint:600,
                settings:{
                    centerPadding: "0",
                    slidesToShow: 1
                }
            },
        ]
    };
    return(
        <>
        <div>
            <div className="navbar-for-product">
                <h1 className="p-of-product">Products</h1>
                <input className="searchbar" placeholder=" Search " onChange={event => setQuery(event.target.value)} />
                <button onClick={() => {setModalOpen(true);}} className="img-of-cart" type="submit">
                    <div className="number-of-products">
                      {cartItems.length}
                    </div>
                    <FaShoppingCart style={{marginLeft:"auto" , marginRight:"auto"}}/>
                </button>
                {modalOpen && <Modal setOpenModal={setModalOpen} cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />}
            </div>
            <Slider {...settings}>
                {props.products.filter(x => {
                    if (query === '') {
                      return true;
                    } else if (x.name.toLowerCase().includes(query.toLowerCase())) {
                      return true;
                    }
                    return false;
                  }).map((x , i)=>
                (<div key={i} className="slideshow"> 
                    <img className="picture" src={x.image}></img>
                    <p className="name-of-product">{x.name}</p>
                    <h3 className="price">{x.price} $</h3>
                    <button onClick={() => onAdd(x)} className="btn-of-buy">افزودن به سبد خرید</button>
                </div>))}
            </Slider>
        </div>
        <h6 className="pragraph2">کمترین قیمت , بهترین کیفیت </h6>
        </>
    );

}