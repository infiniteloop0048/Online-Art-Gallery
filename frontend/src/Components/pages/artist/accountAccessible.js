import React,{ useState, useEffect} from 'react';
import Axios from "axios";
import Navbar from '../../Navbar/Navbar1';
import Products from '../../Products/ProductsBootstrap';
import JumbotronExample from '../../Jumbo/jumbo';
import { useHistory, useParams } from 'react-router-dom';


const ArtistAccount = () => {
    const { name } = useParams();
    const [user, setUser] = useState({});
    const [cartCount, setCartCount] = useState(0);
    const [products, setProducts] = useState([]);

    const urlStringUser = `http://localhost:4000/users/${localStorage.getItem('userid')}`;

    /* if(localStorage.getItem('role') === "artist"){
        urlStringUser = `http://localhost:4000/artists/${localStorage.getItem('userid')}`;
    }
    else{
        urlStringUser = `http://localhost:4000/users/${localStorage.getItem('userid')}`;
    } */
    console.log(urlStringUser);


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

  var urlString = `http://localhost:4000/products/artist/aaaaaa`;


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

  if(typeof user.Name !== 'undefined')
  {
    urlString = `http://localhost:4000/products/artist/${user.Name}`;
  }


  useEffect(()=>{
    getProduct();
  },[urlString] );


    return (

      <div>
      <Navbar user={user} cartCount={cartCount}/>
      <JumbotronExample/>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <img src={user.Image} class="img-fluid" alt="NA"/>
          </div>
          <div className="col-8">
            <h3>{user.Name}</h3>
            <p><b>Hometown:</b> {user.Location}</p>
            <p><b>Education:</b> {user.Education}</p>
            <p>{user.Bio}</p>
            
          </div>
        </div>
        <hr/>
        <h3 className="text-center">Arts For Sale</h3>
        <hr/>
        <Products productData = {products} 
            user={user} setUser={setUser}
            cartCount = {cartCount}
            setCartCount = {setCartCount}
            flag = {0}
          />
      </div>
      </div>
    )
   


    
    
   

}

export default ArtistAccount;