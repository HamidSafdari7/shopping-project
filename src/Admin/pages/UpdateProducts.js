import React from 'react'
import "./UpdateProducts.css";

function UpdateProducts(props) {
    const {name , setName , image , setImage , price , setPrice , id , setId , updateProduct} = props;
  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
      <div className='body'>
        <div className='login-box'>
          <form>
            <div className='user-box'>
              <input type="text" value={image} onChange={(e)=>{setImage(e.target.value)}} />
              <label>Image</label>
            </div>
            <div className='user-box'>
              <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} />
              <label>Name</label>
            </div>
            <div className='user-box'>
              <input type="text" value={price}  onChange={(e)=>{setPrice(e.target.value)}} />
              <label>Price</label>
            </div>
            <a  onClick={updateProduct} >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Update 
            </a>
          </form>  
        </div>
      </div>
    </div>

  )
}

export default UpdateProducts