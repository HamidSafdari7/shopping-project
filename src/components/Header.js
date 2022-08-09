import "./Header.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import UseToken from "./useToken";
import { useEffect } from "react";
import { UserContext } from "..";
import { BsCart3 } from 'react-icons/bs';
import { IoHomeOutline } from 'react-icons/io5';
import { FiPhoneCall } from 'react-icons/fi';
import { RiQuestionnaireLine } from 'react-icons/ri';
import { AiOutlineForm } from 'react-icons/ai';
import { BiExit } from 'react-icons/bi';
import { GrTooltip } from 'react-icons/gr';

export default function Header(){

    const value = React.useContext(UserContext);

    const { token, setToken } = UseToken();

    const logout = () => {
        sessionStorage.removeItem('token');
        value.setToken(false);
      };
    
    const [wide , setWide] = React.useState("-250px");
    const openSidenav = () =>{
        setWide ("0px");
    }
    const closeSidenav = () =>{
        setWide("-250px");
    }
    return(
        <>
          <div className="fix_flex_nav_bar">
              <div className="nav_bar">
                  <div className="nav_bar_menu">
                      <ul>
                            <li className="nav_item"><a href="#" className="a"><strong>درباره ما</strong></a><RiQuestionnaireLine/></li>
                            
                      </ul>
                      <ul>
                            {value.token ? <li onClickCapture={logout} className="nav_item a"><strong>خروج از حساب کاربری</strong><BiExit/></li> 
                                :
                            <Link to="/register" style={{ textDecoration: 'none' }}><li className="nav_item a"><strong>ثبت نام</strong><AiOutlineForm/></li></Link>}
                            
                      </ul>
                      <ul>
                            <Link to="/cart" style={{ textDecoration: 'none' }}><li className="nav_item a"><strong>سبد خرید</strong><BsCart3/></li></Link>
                            
                      </ul>
                      <div className="img_logo">
                        <img src="images/logo.jpg"></img>
                      </div>
                      <ul>
                            <Link to="/" style={{ textDecoration: 'none' }}><li className="nav_item a"><strong>صفحه نخست</strong><IoHomeOutline/></li></Link>
                            
                      </ul>
                      <ul>
                            <Link to="/products" style={{ textDecoration: 'none' }}><li className="nav_item a"><strong>محصولات</strong><GrTooltip/></li></Link>
                      </ul>
                      <ul>
                            <li className="nav_item"><a href="#" className="a"><strong>تماس با ما</strong></a><FiPhoneCall/></li>
                            
                      </ul>
                  </div>
              </div>
          </div>

          <div className="side_nav_bar">
              <div className="sidenav" style={{right:wide}}>
                    <a href="javascript:void(0)" className="closebtn" onClick={closeSidenav}>&times;</a>
                    <div className="items-of-sidenav">
                        {value.token ? <a onClickCapture={logout} href="#">&#9919; خروج از حساب کاربری</a> 
                            :
                        <Link to="/register">&#9919; ثبت نام</Link>}
                        <Link to="/products">&#128722; محصولات</Link>
                        <Link to="/">&#x1F3E0; صفحه نخست</Link>             
                        <Link to="/cart">&#128722; سبد خرید</Link>
                        <a href="#">&#9743; تماس با ما</a>
                        <a href="#">&#128172; درباره ما</a>
                    </div>
              </div>
              <div className="flex_image_nav_bar_for_mobile_design">
                  <span className="btn_open" onClick={openSidenav}>&#9776;</span>
                  <img src="images/logo.jpg" style={{width:119 , height:117}}></img>
                  <div className="phone2">
                        <img className="img-person" src="images/person.webp"></img>
                        <span className="p_style_for_header2"> 62 77 495 0939 </span>
                  </div>
              </div>
          </div>
        </>
    );
}