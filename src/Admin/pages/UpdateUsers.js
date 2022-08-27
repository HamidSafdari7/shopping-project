import React from 'react'

function UpdateUsers(props){
    const {name , setName , address , setAddress , phone , setPhone , password , setPassword ,
        username , setUsername , id , setId , updateUser} = props;
        return (
            <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
              <div className='body'>
                <div className='login-box'>
                  <form>
                    <div className='user-box'>
                      <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} />
                      <label>Name</label>
                    </div>
                    <div className='user-box'>
                      <input type="text" value={address} onChange={(e)=>{setAddress(e.target.value)}} />
                      <label>Address</label>
                    </div>
                    <div className='user-box'>
                      <input type="text" value={phone}  onChange={(e)=>{setPhone(e.target.value)}} />
                      <label>Phone</label>
                    </div>
                    <div className='user-box'>
                      <input type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                      <label>Password</label>
                    </div>
                    <div className='user-box'>
                      <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                      <label>UserName</label>
                    </div>
                    <a  onClick={updateUser} >
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

export default UpdateUsers