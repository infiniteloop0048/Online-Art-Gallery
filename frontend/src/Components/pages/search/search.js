import React,{ useState, useEffect } from 'react';
import Products from '../../Products/ProductsBootstrap.jsx';
import Axios from "axios";
import JumbotronExample from '../../Jumbo/jumbo.js';
import Checkbox from '../../Checkbox/checkbox.js';
import Navbar from '../../Navbar/Navbar1.js';

import {
  BrowserRouter as Router,
  Switch,
  useLocation
} from "react-router-dom";

import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory({forceRefresh:true});


const Search = () => {
  const [products, setProducts] = useState([]);
  const [productsClone, setProdClone] = useState([]);
  const [user, setUser] = useState({});
  const [cartCount, setCartCount] = useState(0);
  
  const urlString = "http://localhost:4000/products/";
  const urlStringUser = `http://localhost:4000/users/${localStorage.getItem('userid')}`;
  var constantProduct;

  

  let location = useLocation();
  console.log(location);
  console.log(location.search);

  var queryStr = location.search.repeat(1);
  queryStr = queryStr.toLowerCase();

  for(let i = 0; i < queryStr.length; i++){
    if(queryStr[i] == '+') {
      queryStr = queryStr.split('');
      queryStr[i] = ' ';
      queryStr = queryStr.join('');
    }
  }
  console.log(queryStr);

  var  queryStrVal = queryStr.split("=");

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

  const getProductClone = () => {
    Axios({
        method: "GET",
        withCredentials: true,
        url: urlString      //this is API url
    }).then((res)=>{
        //console.log(res.data);
        const {data} = res;
        setProdClone(data);
    })
  }

  useEffect(()=>{
      getProduct();
  },[] );

  useEffect(()=>{
    console.log("is called?");
    getProductClone();
  },[products] );

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

  constantProduct = JSON.parse(JSON.stringify(productsClone));
  console.log(constantProduct);

  var newArray = products.filter(function (el) {
    var flag = false;

    //if(typeof el.Medium === 'undefined') console.log("ehy undef---------------");
    if(typeof el.Product !== 'undefined') flag = flag || el.Product.toLowerCase().includes(queryStrVal[1]);
    if(typeof el.Catagory !== 'undefined') flag = flag || el.Catagory.toLowerCase().includes(queryStrVal[1]);
    if(typeof el.Artist !== 'undefined') flag = flag || el.Artist.toLowerCase().includes(queryStrVal[1]);
    if(typeof el.Description !== 'undefined') flag = flag || el.Description.toLowerCase().includes(queryStrVal[1]);
    if(typeof el.Subject !== 'undefined') flag = flag || el.Subject.toLowerCase().includes(queryStrVal[1]);
    if(typeof el.Style !== 'undefined') flag = flag || el.Style.toLowerCase().includes(queryStrVal[1]);
    if(typeof el.Medium !== 'undefined') flag = flag || el.Medium.toLowerCase().includes(queryStrVal[1]);

    if (typeof el.Tags !== 'undefined') {
      el.Tags.map((tag) => {
        flag = flag || tag.toLowerCase().includes(queryStrVal[1]);
      });
    }

    return flag;
  });

  
  
  

  return (
      <div>
          <Navbar user={user} cartCount={cartCount}/>
          <JumbotronExample/>
          <div>
            <b><h4 className="text-center">Showing results for "{queryStrVal[1]}"</h4></b>
          </div>
          <div className="container">
            <div className="row">
                <div className="col-2">
                    <Checkbox products={constantProduct} SettingProducts={setProducts}/>
                </div>
                <div className="col-10">
                    <Products productData={newArray} user={user} setUser={setUser} 
                    cartCount = {cartCount}
                    setCartCount = {setCartCount}
                    flag={1}
                    carouselAdd = {1}
                    />
                </div>
            </div>
        </div>
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

export default Search;