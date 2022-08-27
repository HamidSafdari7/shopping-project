import React from 'react';
import pic from '../data/pic.svg';

const Dashboard = () => {

  return (
    <div className="mt-24">
      
      <h1 className="dark:text-gray-200 text-gray-700 text-center m-20" style={{fontSize:20}}>
        Welcome to the admin panel...
      </h1>

      <img
        
        src={pic}
        alt=""
      />
      
  </div>
  );
};

export default Dashboard;