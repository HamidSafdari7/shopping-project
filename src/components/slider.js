import "./slider.css";
import { useState } from "react";

function SliderItem (props){
    return(
        <div className={props.active ?"option active" : "option"} onClick={props.onClick} >
                <div className="shadow"></div>
                <div className="label">
                    <div className="info">
                        <div className="main">safdari</div>
                        <div className="sub">0939 495 77 26</div>
                    </div>
                </div>
            </div>
    );
}
export default function Slider(){
const [active , setActive]= useState(2);
    return(
        <div className="full-body">
            <h4 className="pragraph"> Sports </h4>
        <div className="options">
          <SliderItem active={active == 0 ? true : false} onClick={()=>setActive(0) }/>
          <SliderItem active={active == 1 ? true : false} onClick={()=>setActive(1) }/>
          <SliderItem active={active == 2 ? true : false} onClick={()=>setActive(2) }/>
          <SliderItem active={active == 3 ? true : false} onClick={()=>setActive(3) }/>
          <SliderItem active={active == 4 ? true : false} onClick={()=>setActive(4) }/>  
        </div>
        
        </div>
    );
}