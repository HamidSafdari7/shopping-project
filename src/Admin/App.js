import React, { useEffect , useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Dashboard, Orders, Customers , AdminProducts, UpdateProducts , UpdateUsers } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import { useNavigate } from "react-router-dom";
import AdminuseToken from '../components/AdminuseToken';
import { UserContext } from '..';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  const value = React.useContext(UserContext);
  const { admintoken, setAdmintoken } = AdminuseToken();
  const navigate = useNavigate();
    useEffect(()=>{
        if(!admintoken){
            navigate("/AdminLogin")
        }
    })
  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [id,setId]=useState(null);
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    function updateProduct()
    {
        let item={name,image,price}
        console.warn("item",item)
        fetch(`http://localhost:3001/products/${id}`, {
        method: 'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(item)
        }).then((result) => {
        result.json().then((resp) => {
            console.warn(resp)
            
        })
        })
    }

    function updateUser()
    {
        let item={name,address,phone,password,username}
        console.warn("item",item)
        fetch(`http://localhost:3001/register/${id}`, {
        method: 'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(item)
        }).then((result) => {
        result.json().then((resp) => {
            console.warn(resp)
            
        })
        })
    }

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent
              content="Settings"
              position="Top"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}

              <Routes>
                {/* dashboard  */}
                <Route path="/" element={(<Dashboard />)} />
                <Route path="/Dashboard" element={(<Dashboard />)} />

                {/* pages  */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/customers" element={<Customers
                  name={name} address={address} phone={phone} password={password} username={username} id={id}
                  setName={setName} setAddress={setAddress} setPhone={setPhone} setPassword={setPassword}
                  setUsername={setUsername} setId={setId} 
                />} />
                <Route path="/AdminProducts" element={<AdminProducts 
                  name={name} image={image} price={price} id={id}
                  setName={setName} setImage={setImage} setPrice={setPrice} setId={setId}
                />} />
                <Route path="/UpdateProducts" element={<UpdateProducts 
                  name={name} image={image} price={price} id={id}
                  setName={setName} setImage={setImage} setPrice={setPrice} setId={setId}
                  updateProduct={updateProduct}
                />} />
                <Route path="/UpdateUsers" element={<UpdateUsers
                  name={name} address={address} phone={phone} password={password} username={username} id={id}
                  setName={setName} setAddress={setAddress} setPhone={setPhone} setPassword={setPassword}
                  setUsername={setUsername} setId={setId} 
                  updateUser={updateUser}
                />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      
    </div>
  );
};

export default App;