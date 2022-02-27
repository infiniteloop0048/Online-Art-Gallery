import React,{ useState, useEffect} from 'react';
import Products from '../../../Products/ProductsBootstrap.jsx';
import Axios from "axios";
import JumbotronExample from '../../../Jumbo/jumbo.js';
import Navbar from '../../../Navbar/Navbar1.js';
import PaymentForm from '../../payment/payment.js';
import Payment1 from '../../payment1/payment1.js';
import Payment2 from '../../payment2/payment2.js';


function OrderSummary( {cartArray, setTotPrice} ){
    var tot = 0;
    if(typeof cartArray.length !== 'undefined')
    {
        for(let i = 0; i < cartArray.length; i++) tot += cartArray[i].Price;
    }

    setTotPrice(tot);

    return (
        <div>
            <div>
                <h4>
                    <b><i>Order Summary</i></b>
                </h4>
                <div className="row" style={{marginTop: '20px'}}>
                    <div className="col-7">
                        <h6>Subtotal</h6>
                        <h6>Shipping</h6>
                    </div>
                    <div className="col-2">
                        US$
                        US$
                    </div>
                    <div className="col-3">
                        {tot}
                        <h6>TBC</h6>
                    </div>
                </div>

            </div>
            <hr/>
            <div className = "row">
                <div className = "col-9">
                    <h5>Order Total</h5>
                </div>
                <div className = "col-3">
                    {tot}
                </div>
            </div>
            <hr/>
        </div>
        

    );
}

const Carts = () => {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState({});
    const [cartCount, setCartCount] = useState(0);
    const [totPrice, setTotPrice] = useState(0);

    const urlString = "http://localhost:4000/products/";
    const urlStringUser = `http://localhost:4000/users/${localStorage.getItem('userid')}`;

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

    var newArray = [];
    if(typeof user.Cart !== 'undefined'){
      newArray = products.filter(function (el) {
        return user.Cart.includes(el._id);
      });
    }
 

    return (
        <div>
            
            <Navbar user={user} cartCount={cartCount}/>
            <JumbotronExample/>
            <h3 class="text-center">Billing and Shipping</h3>
            <hr/>
            <div  className = "row container">
                <div className="col-7 offset-1">
                    <h4 class="text-center">Your Cart</h4>
                    <Products productData = {newArray} user={user} setUser={setUser}
                    cartCount = {cartCount}
                    setCartCount = {setCartCount}
                    flag = {2}
                    />
                </div>
                <div className="col-4">
                    <OrderSummary cartArray = {newArray} setTotPrice = {setTotPrice}/>
                </div>
            </div>
            {/* <div style={{display: 'flex',justifyContent:'center'}}>
                <a className="btn btn-outline-danger col-4" href="/signin" role="button" style={{display: 'grid', justifyContent: 'center', margin: 'auto', marginBottom: '50px', marginTop: '50px'}}>Proceed to Order</a>
            </div> */}
            <hr/>
            <h4 className="text-center">Enter Card Detail</h4>
            <div style={{margin: '50px'}}>
                <Payment2 cartArray={newArray} Price={totPrice}/>
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

export default Carts;