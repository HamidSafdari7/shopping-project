import "./footer.css";

export default function Footer(){

    return(
        <>
        <div className="footer">
            <img className="arch" src="images/arch.webp"></img>
            <div className="links">
                <h2 className="border">لینک های مرتبط</h2>
                <ul>
                    <li>
                        <a className="li" href="#">ثبت شکایت</a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a className="li" href="#">تماس با ما</a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a className="li" href="#">سوال های متداول</a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a className="li" href="#">روش های ارسال</a>
                    </li>
                </ul>
            </div>
            <div className="informations">
                <h2 className="border">اطلاعات</h2>
                <ul>
                    <li>
                        <a className="li" href="#">قوانین و مقررات </a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a className="li" href="#">درباره فروشگاه </a>
                    </li>
                </ul>
            </div>
            <div className="address">
                <h2 className="border">آدرس</h2>
                <h5>دفتر مرکزی : مشهد, بولوار وکیل آباد ,خیابان کوثر ,کوثر شمالی 2 ,پلاک 21</h5>
                <h5>تلفن : 26 77 495 0939</h5>
            </div>
        </div>
        <h4 style={{direction:"rtl" ,display:"flex", backgroundColor:"silver",margin:0,padding:0,alignItems:"center",justifyContent:"center"}}>طراحی توسط Hamid.s7</h4>
        </>
    );
}