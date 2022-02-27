import React,{ useState, useEffect} from 'react';
import Products from './../Products/ProductsBootstrap';
import Axios from "axios";
import SignUp from './users/user/register.js';
import SignIn from './users/user/login.js';
import AddProduct from '../Products/add.js';
import JumbotronExample from '../Jumbo/jumbo.js';
import Navbar from '../Navbar/Navbar1';


const Home = () => {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState({});
    const [room, setRoom] = useState([]);

    const urlString = "http://localhost:4000/products/";
    const urlStringUser = `http://localhost:4000/users/${localStorage.getItem('userid')}`;

    /* if(localStorage.getItem('role') === "artist"){
        urlStringUser = `http://localhost:4000/artists/${localStorage.getItem('userid')}`;
    }
    else{
        urlStringUser = `http://localhost:4000/users/${localStorage.getItem('userid')}`;
    } */
    const urlStringRoom = "http://localhost:4000/rooms/";
    console.log(urlStringUser);

    const getProduct = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: urlString    //this is API url
        }).then((res)=>{
            console.log(res.data);
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

    console.log(user);

    const getRooms = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: urlStringRoom    //this is API url
        }).then((res)=>{
            console.log(res.data);
            const {data} = res;
            setRoom(data);
            console.log(user);
        })
    }

    useEffect(()=>{
        getRooms();
    },[] );

   
    const [cartCount, setCartCount] = useState(0);


    const productList = [];
    for(let i = 1; i <= room.length; i++){
        var newArray = products.filter(function (el) {
            return el.Roomid === room[i - 1].Id;
        });
        productList.push(<div>
            <h2 class="text-center fst-italic bg-light border" style={{margin: '25px'}}>{room[i - 1].Title}</h2>
            <Products productData = {newArray} 
                        user={user} setUser={setUser}
                        cartCount = {cartCount}
                        setCartCount = {setCartCount}
                        flag = {0}
                        />
        </div>);
    }
    
    
    

    return (
        <div>
            <Navbar user={user} cartCount={cartCount}/>
            <JumbotronExample/>
            {productList}
        </div>
    );

    /* return (
        <div style={{display:'flex', flexDirection:'column'}}>
            <div style={{width:'100%'}}>
                <Products productData = {products}/>
            </div>
            <div>
                <SignUp/>
            </div>
            
            <SignIn/>
            <AddProduct/>
        </div>
        
    ); */
}

export default Home;