import React,{ useState, useEffect} from 'react';
import Axios from "axios";
import JumbotronExample from '../../Jumbo/jumbo.js';
import { useHistory, useParams } from 'react-router-dom';
import Products from '../../Products/ProductsBootstrap.jsx';
import Navbar from '../../Navbar/Navbar1.js';


const Tag = () => {
    
    const { tag } = useParams();
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState({});
    const [cartCount, setCartCount] = useState(0);

    const urlString = "http://localhost:4000/products/tags/" + tag + "/";
    const urlStringUser = `http://localhost:4000/users/${localStorage.getItem('userid')}`;

    console.log(urlString);

    const getProduct = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: urlString     //this is API url
        }).then((res)=>{
            const {data} = res;
            setProducts(data);
        })
    }



    useEffect(()=>{
        getProduct();
    },[] );

    const getUser = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: urlStringUser    //this is API url
        }).then((res)=>{
            console.log(res.data);
            const {data} = res;
            setUser(data);
            console.log(user);
        })
    }

    useEffect(()=>{
        getUser();
    },[] );


    
    return (
        <div>
            <Navbar user={user} cartCount={cartCount}/>
            <JumbotronExample/>
            <div>
                <b><h4 className="text-center">Showing results for "{tag}"</h4></b>
            </div>
            <Products productData={products} user={user} setUser={setUser}
                cartCount = {cartCount}
                setCartCount = {setCartCount}
            />
        </div>
    );

}

export default Tag;