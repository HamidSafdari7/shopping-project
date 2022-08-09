import "./modal.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function Modal(props){
    const { setOpenModal , cartItems, onAdd, onRemove } = props;
    const settings = {
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return(
        <div className="modalBackground">
          <div className="modalContainer">
            <div className="titleCloseBtn">
              <button onClick={() => {setOpenModal(false);}}>X</button>
            </div>
            <div className="title">
              <h1>Products</h1>
            </div>

            <div >
              {cartItems.length === 0 && <div><h2 className="p-when-cart-is-empty">  ¯\_(ツ)_/¯ محصولی اضافه نکردی</h2></div>}
              <div>
                <Slider {...settings}>
                  {cartItems.map((item) => (
                    <div className="slideshow-of-itemslider" key={item.id}>
                      <img className="picture" src={item.image}></img>
                      <p className="name-of-product">{item.name}</p>

                      <h3 className="price">
                        {item.qty} x {item.price.toFixed(0)} $
                      </h3>

                      <div className="button-of-cart">
                        <button className="button-for-add" onClick={() => onAdd(item)}>+</button>
                        <button className="button-for-remove" onClick={() => onRemove(item)}>-</button>
                      </div>
                    </div>))}
                </Slider>
              </div>
        
            </div>

            <div className="footer-of-modal">
              <button onClick={() => {setOpenModal(false);}}>Cancel</button>
            </div>
          </div>
        </div>

    );
}