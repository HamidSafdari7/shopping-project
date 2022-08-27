import React , {useState , useEffect , useMemo} from 'react';
import { Header } from '../components';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RiEdit2Line } from 'react-icons/ri';
import Pagination from '../Pagination';
import { Link } from "react-router-dom";


export default function Customers(props){
    const [user , setUser] = React.useState([]);
    const {name , setName , address , setAddress , phone , setPhone , password , setPassword ,
      username , setUsername , id , setId} = props;
    React.useEffect(() =>
        {fetch("http://localhost:3001/register")
        .then((x) => x.json())
        .then((x) => setUser(x))}
      ,[]);


    return(
        <InfoOfCustomers
            Users={user}
            setUser={setUser}
            name={name}
            setName={setName}
            address={address}
            setAddress={setAddress}
            phone={phone}
            setPhone={setPhone}
            password={password}
            setPassword={setPassword}
            username={username}
            setUsername={setUsername}
            id={id}
            setId={setId}
        />
    );
}


let PageSize = 10;
function InfoOfCustomers(props){
    const {name , setName , address , setAddress , phone , setPhone , password , setPassword ,
        username , setUsername , id , setId} = props;
    const {setUser} = props;
    const [query, setQuery] = useState("")
    const filterUser = props.Users.filter(x => {
        if (query === '') {
        return true;
        } else if (x.username.toLowerCase().includes(query.toLowerCase())) {
        return true;
        }
        return false;
    })

    const [currentPage, setCurrentPage] = useState(1);
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return filterUser.slice(firstPageIndex, lastPageIndex);
      }, [currentPage , filterUser]);


      async function deleteOperation(id){
        {
            let result = await fetch('http://localhost:3001/register/'+ id, {
                method: 'DELETE'
            });
            result = await result.json();
            console.warn(result) 
            getList();              
        }
    }

    function getList(){
        {fetch("http://localhost:3001/register")
        .then((x) => x.json())
        .then((x) => setUser(x))}
    }

    function selectUser(id)
    {
        let item=props.Users[id-1];
            setName(item.name)
            setAddress(item.address)
            setPhone(item.phone);
            setId(item.id)
            setUsername(item.username)
            setPassword(item.password)
    }
    

    return(
        <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
            <Header category="Page" title="Customers" />
            <div className='NavbarWrapper'>
              <input className="searchbar" placeholder=" Search " onChange={event => setQuery(event.target.value)} />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>ID</th>
                        <th>Del</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTableData.map((x,i)=>(
                        <tr key={i}>
                          <td align='center'>{x.name}</td>
                          <td align='center'>{x.address}</td>
                          <td align='center'>{x.phone}</td>
                          <td align='center'>{x.username}</td>
                          <td align='center'>{x.password}</td>
                          <td align='center'>{x.id}</td>
                          <td align='center'><button onClick={()=>deleteOperation(x.id)}><RiDeleteBin6Line/></button></td>
                          <td align='center'><Link to="/UpdateUsers"><button onClick={() => selectUser(x.id)}><RiEdit2Line/></button></Link></td>
                        </tr>
                    ))}
                   
                </tbody>
            </table>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={props.Users.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />

        </div>
    );
}