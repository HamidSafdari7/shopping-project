import { useState } from 'react';

export default function AdminuseToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('admintoken');
        const userToken = JSON.parse(tokenString);
        return userToken?.admintoken
      };
    const [admintoken, setAdmintoken] = useState(getToken());

    const saveToken = userToken => {
        sessionStorage.setItem('admintoken', JSON.stringify(userToken));
        setAdmintoken(userToken.admintoken);
      };

      return (
        { setAdmintoken: saveToken,admintoken }

      );

}
