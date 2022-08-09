import "./home.css";
import Slider from "./slider";
import Itemslider from "./itemSlider";


export default function Home(){
    return(
        <>
        <div>
            <video className="video-of-header-of-home" loop autoPlay>
                <source src="images/header.mp4" type="video/mp4"></source>
            </video>
        </div>
        <Slider/>
        <div className="separator">
            <div className="line"></div>
            <h3 style={{margin:25}}>محصولات</h3>
            <div className="line"></div>
        </div>
        <Itemslider/>
        <div className="body-of-faq">
        <div className="custom-shape-divider-top-1651066826">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
            </svg>
        </div>
        <div className="faq">
            <div>
                <h2 className="mtn">ارسال رایگان به سراسر کشور</h2>
            </div>
            <div>
                <video className="video-of-faq" loop autoPlay>
                    <source src="images/deliver.mp4" type="video/mp4"></source>
                </video>
            </div>
        </div>
        </div>
        </>
    );
}