import "./register.css";
import React, { useEffect, useState } from "react";
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { Link } from "react-router-dom";

export default function Register(){

    const initialValues = { username: "", name: "", password: "", phone:"", address:"" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const[validation,setValidation]=useState("");


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate(formValues);
        if(Object.keys(errors).length > 0 ){
            setFormErrors(errors);
        }else{
            fetch('http://localhost:3001/register', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formValues)
                })
                .then((x)=>x.json())
                .then((x)=>{
                    if(x.error){
                        setValidation(x.message);
                    }else{
                        alert("ثبت نام با موفقیت انجام شد");
                    }
                })
                .then(()=>{setFormValues(initialValues)});
        }
        
        setIsSubmit(true);
        
    };

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
          console.log(formValues);
        }
    }, [formErrors]);


    const validate = (values) => {
        const errors = {};
        if (!values.username) {
          errors.username = "Username is required*";
        } else if (values.username.length<4){
            errors.username = "Username must be mor than 4 letters*";
        }
        if (!values.name){
            errors.name = "Name is required*";
        }
        if (!values.phone){
            errors.phone = "Phone is required*";
        }else if (values.phone.length<11){
            errors.phone = "Phone must be 11 numbers*";
        }else if (values.phone.length>11){
            errors.phone = "Phone cannot exceed mor than 11 numbers*";
        }
        if (!values.address){
            errors.address = "Address is required*";
        }
        if (!values.password) {
          errors.password = "Password is required*";
        } else if (values.password.length < 4) {
          errors.password = "Password must be more than 4 characters*";
        } else if (values.password.length > 10) {
          errors.password = "Password cannot exceed more than 10 characters*";
        }
        return errors;
    };



    return(
        <div className="bodyOfRegister">
            <div className="fixed right-5 bottom-4" style={{ zIndex: '1000' }}>
                <TooltipComponent
                content="پنل مدیریت"
                position="Top"
                >
                    <Link to="/Admin">
                        <button
                            type="button"
                            style={{ background: "#e60f4f", borderRadius: '50%' }}
                            className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                        >
                            <MdOutlineAdminPanelSettings />
                        </button>
                    </Link>
                </TooltipComponent>
            </div>
            <div className="register-wrapper">
                <h1>به صفحه ثبت نام خوش آمدید !</h1>
                <p> لطفا اطلاعات خواسته شده را با دقت ثبت کنید, از همکاری شما سپاسگذاریم .</p>
                <form >
                    <label>
                        <h3>Name:</h3>
                        <input className="ipnut-of-register" type="text" name="name" value={formValues.name}
                        onChange = {handleChange} placeholder="نام و نام خانوادگی">
                        </input>
                    </label>
                    <p className="p-of-validate">{formErrors.name}</p>
                    <label>
                        <h3>User name:</h3>
                        <input className="ipnut-of-register" type="text" name="username" value={formValues.username}
                        onChange = {handleChange} placeholder="نام کاربری">
                        </input>
                    </label>
                    <p className="p-of-validate">{formErrors.username}{validation}</p>
                    <label>
                        <h3>Password:</h3>
                        <input className="ipnut-of-register" type="password" name="password" value={formValues.password}
                        onChange = {handleChange} placeholder="رمز عبور">
                        </input>
                    </label>
                    <p className="p-of-validate">{formErrors.password}</p>
                    <label>
                        <h3>Phone:</h3>
                        <input className="ipnut-of-register" type="tel" name="phone" value={formValues.phone}
                        onChange = {handleChange} placeholder="تلفن همراه">
                        </input>
                    </label>
                    <p className="p-of-validate">{formErrors.phone}</p>
                    <label>
                        <h3>Address:</h3>
                        <textarea className="textarea-of-register" type="text" name="address" value={formValues.address}
                        onChange = {handleChange} placeholder="آدرس">
                        </textarea>
                    </label>
                    <p className="p-of-validate">{formErrors.address}</p>
                </form>
                <div className='btnregister'>
                    <a  
                    onClick={(e) => {
                    handleSubmit(e)
                    }}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        ثبت نام
                    </a>
                </div>
            </div>
        </div>
    );
}