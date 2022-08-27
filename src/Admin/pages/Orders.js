import React , {useState , useEffect , useMemo} from 'react';
import { Header } from '../components';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Pagination from '../Pagination';
import { Link } from "react-router-dom";


export default function Orders(props){
    const [product , setProduct] = React.useState([]);
    React.useEffect(() =>
        {fetch("http://localhost:3001/cart")
        .then((x) => x.json())
        .then((x) => setProduct(x))}
      ,[]);

    return(
        <InfoOfOrders
            Products={product}
            setProduct={setProduct}
        />
    );
}


let PageSize = 5;

function InfoOfOrders(props){
    const {setProduct} = props;
    const [query, setQuery] = useState("")
    const filterProduct = props.Products.filter(x => {
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
        return filterProduct.slice(firstPageIndex, lastPageIndex);
      }, [currentPage , filterProduct]);

    async function deleteOperation(id){
        {
            let result = await fetch('http://localhost:3001/cart/'+ id, {
                method: 'DELETE'
            });
            result = await result.json();
            console.warn(result) 
            getList();              
        }
    }

    function getList(){
        {fetch("http://localhost:3001/cart")
        .then((x) => x.json())
        .then((x) => setProduct(x))}
    }
    

    return(
        <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
            <Header category="Page" title="Orders" />
            <div className='NavbarWrapper'>
              <input className="searchbar" placeholder=" Search " onChange={event => setQuery(event.target.value)} />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Orders</th>
                        <th>User</th>
                        <th>ID</th>
                        <th>Del</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTableData.map((x,i)=>(
                        <tr key={i}>
                          <td align='center'>{x.cartItems.map((y,i)=>(
                            <div key={i}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th align='center' style={{border:"none"}}></th>
                                            <th align='center' style={{border:"none"}}></th>
                                            <th align='center' style={{border:"none"}}></th>
                                            <th align='center' style={{border:"none" , color:"#e60f4f"}}>Qty</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td align='center'><img className="rounded-xl h-20 md:ml-3" src={y.image}></img></td>
                                            <td align='center'>{y.name}</td>
                                            <td align='center'>{y.price}</td>
                                            <td align='center'>{y.qty}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                          ))}</td>
                          <td align='center'>{x.username}</td>
                          <td align='center'>{x.id}</td>
                          <td align='center'><button onClick={()=>deleteOperation(x.id)}><RiDeleteBin6Line/></button></td>
                        </tr>
                    ))}
                   
                </tbody>
            </table>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={props.Products.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />

            
        </div>
    );
}


