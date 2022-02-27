import React,{ useState, useEffect} from 'react';
import Products from '../../Products/ProductsBootstrap';
import Axios from "axios";
import Checkbox from '../../Checkbox/checkbox';
import { useLocation, useParams } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import 'reactjs-popup/dist/index.css';
import './popup.css';
import Navbar from '../../Navbar/Navbar1';


const history = createBrowserHistory({forceRefresh:true});



const Drawings = () => {
    const [products, setProducts] = useState([]);
    const [productsClone, setProdClone] = useState([]);
    const [user, setUser] = useState({});

    var constantProduct;
    let location = useLocation();
    const urlStringUser = `http://localhost:4000/users/${localStorage.getItem('userid')}`;

    /* console.log(location);
    console.log(location.search);
    console.log(typeof(location.search)); */

    const getProduct = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url:"http://localhost:4000/products/category/Drawing"      //this is API url
        }).then((res)=>{
            //console.log(res.data);
            const {data} = res;
            setProducts(data);
            setProdClone(data);
        })
    }

    const getProductClone = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url:"http://localhost:4000/products/category/Drawing"      //this is API url
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


    if(location.search !== ""){
        history.push("/Drawings");
    }

    const [cartCount, setCartCount] = useState(0);
    /* var str = location.search;
    str = str.slice(1, str.length);
    console.log(str);
    var myArray = str.split("&");
    console.log(myArray);

    var newArray = products.filter(function (el) {
        var ret = true;
        for(let i = 0; i < myArray.length; i++){
            var myNewArray = myArray[i].split("=");
            console.log(myNewArray);
            if (typeof myNewArray !== 'undefined') {
                //console.log(el[myNewArray[0]]);
                ret = ret && el[myNewArray[0]] == myNewArray[1];
            }
        }
        return ret;
    }); */

    return <div>
                <Navbar user={user} cartCount={cartCount}/>
                    <div className="container">
                        
                        {/* <Popup className="my-popup"
                            trigger={open => (
                                <a className="btn btn-primary rounded-3 btn-light" href="/signup" role="button">button</a>
                            )}
                            position="bottom center"
                            closeOnDocumentClick
                            on = "hover"
                            >
                            <div className="container">
                                hi i am here but wait hwere are ou df df dfsdf
                            </div>
                        </Popup> */}
                        <div className="row">
                            <div className="col-2">
                                <Checkbox products={constantProduct} SettingProducts={setProducts}/>
                            </div>
                            <div className="col-10" style={{marginTop: '100px'}}>
                                <hr/>
                                <h3 class="text-center fst-italic">Drawing</h3>
                                <hr/>
                                <Products productData={products}  user={user} setUser={setUser} 
                                cartCount = {cartCount}
                                setCartCount = {setCartCount}
                                flag={1}
                                carouselAdd = {1}
                                />
                            </div>
                        </div>
                    </div>
        
                </div>
}

export default Drawings;