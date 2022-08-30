import React , {useState , useEffect , useMemo} from 'react';
import "./AdminProducts.css";
import { Header } from '../components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RiEdit2Line } from 'react-icons/ri';
import Pagination from '../Pagination';
import { Link } from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    height: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  

export default function AdminProducts(props){
    const [product , setProduct] = React.useState([]);
    const {name , setName , image , setImage , price , setPrice , id , setId} = props;
    React.useEffect(() =>
        {fetch("http://localhost:3001/products")
        .then((x) => x.json())
        .then((x) => setProduct(x))}
      ,[]);

    return(
        <InfoOfProducts
            Products={product}
            setProduct={setProduct}
            name={name}
            setName={setName}
            image={image}
            setImage={setImage}
            price={price}
            setPrice={setPrice}
            id={id}
            setId={setId}
        />
    );
}


let PageSize = 10;

function InfoOfProducts(props){
    const {name , setName , image , setImage , price , setPrice , id , setId} = props;
    const {setProduct} = props;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const initialValues = { name: "", price: "", image:"" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const[validation,setValidation]=useState("");
    const [query, setQuery] = useState("")
    const filterProduct = props.Products.filter(x => {
        if (query === '') {
        return true;
        } else if (x.name.toLowerCase().includes(query.toLowerCase())) {
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
            fetch('http://localhost:3001/products', {
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
                        alert("  محصول جدید اضافه شد   ");
                    }
                })
                .then(()=>{setFormValues(initialValues)})
                .then(()=>{fetch("http://localhost:3001/products")
                .then((x) => x.json())
                .then((x) => setProduct(x))});
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
        if (!values.name){
            errors.name = "Name is required*";
        }
        if (!values.price){
            errors.price = "Price is required*";
        }
        if (!values.image){
            errors.image = "Image is required*";
        }
        return errors;
    };



    async function deleteOperation(id){
        {
            let result = await fetch('http://localhost:3001/products/'+ id, {
                method: 'DELETE'
            });
            result = await result.json();
            console.warn(result) 
            getList();              
        }
    }

    function getList(){
        {fetch("http://localhost:3001/products")
        .then((x) => x.json())
        .then((x) => setProduct(x))}
    }

    function selectProduct(id)
    {
        let item=props.Products[id-1];
            setName(item.name)
            setImage(item.image)
            setPrice(item.price);
            setId(item.id)
    }

    

    return(
        <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
            <Header category="Page" title="Products" />
            <div className='NavbarWrapper'>
                <div>
                    <button onClick={handleOpen} className='btnOfAdd'>Add</button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add New Product
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            
                            <div className="wrapper">
                                
                                <form >
                                    <label>
                                        <h3>Name:</h3>
                                        <input className="ipnut-of-register" type="text" name="name" value={formValues.name}
                                        onChange = {handleChange} placeholder="نام محصول">
                                        </input>
                                    </label>
                                    <p className="p-of-validate">{formErrors.name}</p>
                                    <label>
                                        <h3>Price:</h3>
                                        <input className="ipnut-of-register" type="text" name="price" value={formValues.price}
                                        onChange = {handleChange} placeholder="قیمت محصول ">
                                        </input>
                                    </label>
                                    <p className="p-of-validate">{formErrors.price}</p>
                                    <label>
                                        <h3>Image:</h3>
                                        <textarea className="textarea-of-add" type="text" name="image" value={formValues.image}
                                        onChange = {handleChange} placeholder=" آدرس عکس محصول را اضافه کنید">
                                        </textarea>
                                    </label>
                                    <p className="p-of-validate">{formErrors.image}</p>
                                </form>
                                <div>
                                    <button className='btnOfAdd' type="submit" 
                                    onClick={(e) => {
                                        handleSubmit(e)
                                    }}>
                                    اضافه کردن
                                    </button>
                                </div>
                            </div>


                        </Typography>
                    </Box>
                    </Modal>
                </div>
                <input className="searchbar" placeholder=" Search " onChange={event => setQuery(event.target.value)} />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>ID</th>
                        <th>Del</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTableData.map((x,i)=>(
                        <tr key={i}>
                          <td align='center'><img className="rounded-xl h-20 md:ml-3" src={x.image}></img></td>
                          <td align='center'>{x.name}</td>
                          <td align='center'>{x.price}</td>
                          <td align='center'>{x.id}</td>
                          <td align='center'><button onClick={()=>deleteOperation(x.id)}><RiDeleteBin6Line/></button></td>
                          <td align='center'><Link to="/Admin/UpdateProducts"><button onClick={() => selectProduct(x.id)}><RiEdit2Line/></button></Link></td>
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


