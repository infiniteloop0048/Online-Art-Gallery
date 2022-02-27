import React,{ useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// import Products from './Components/Products/Products';
// import Navbar from "./Components/Navbar/Navbar";

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./Components/pages/Home";
import Abstract from "./Components/pages/paintings/Abstract";
import Drawings from "./Components/pages/paintings/Drawings";
import OilPaint from "./Components/pages/paintings/OilPaint";
import PlainArt from "./Components/pages/paintings/PlainArt";
import SignUp from "./Components/pages/users/user/register";
import SignIn from "./Components/pages/users/user/login";
import AddProduct from "./Components/Products/add";
import ProductDetail from './Components/pages/ProductDetail';
import Navbar from './Components/Navbar/Navbar1';
import Material from './Components/pages/drawings/material';
import Tag from './Components/pages/tags/tags';
import Account from './Components/pages/users/user/account';
import createBrowserHistory from 'history/createBrowserHistory';
import NavbarSearch from './Components/Navbar/NavbarSearch';
import Search from './Components/pages/search/search';
import Paintings from './Components/pages/paintings/Paintings';
import ControlledCarousel from './Components/Carousel/Carousel';
import Favorites from './Components/pages/users/user/favorites';
import Carts from './Components/pages/users/user/cart';
import Curator_Dashboard from './Components/pages/curator/dashboard';
import Artist_Account from './Components/pages/artist/account';
import Artworks from './Components/pages/artist/artworks';
import Admin_Dashboard from './Components/pages/admin/dashboard';
import User_Orders from './Components/pages/users/user/orders';
import Order from './Components/Orders/Order/Order';
import Total_Orders from './Components/pages/admin/checkOrders';
import ArtistAccount from './Components/pages/artist/accountAccessible';

const history = createBrowserHistory({forceRefresh:true});

const App = () => {

    return (
        <div>
            <Router history={history}>
                {/* <Navbar/> */}
                {/* <NavbarSearch/> */}
                    <Route path="/" exact component={Home} />
                    <Route path="/Abstract" component={Abstract} />
                    <Route path="/Drawings/Material/:material" component={Material}/>
                    <Route path="/Drawings" component={Drawings} />
                    <Route path="/Paintings" component={Paintings} />
                    <Route path="/OilPaint" component={OilPaint} />
                    <Route path="/PlainArt" component={PlainArt} />
                    <Route path="/products/:id" component={ProductDetail}/>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/signin" component={SignIn}/>
                    <Route path="/addprod" component={AddProduct}/>
                    <Route path="/Tags/:tag" component={Tag}/>
                    <Route path="/user/account" component={Account}/>
                    <Route path="/artist/account" component={Artist_Account}/>
                    <Route path="/artist/artworks" component={Artworks}/>
                    <Route path="/artist/favorites" component={Favorites}/>
                    <Route path="/user/favorites" component={Favorites}/>
                    <Route path="/user/cart" component={Carts}/>
                    <Route path="/search" component={Search}/>
                    <Route path="/curator/dashboard" component={Curator_Dashboard}/>
                    <Route path="/admin/dashboard" component={Admin_Dashboard}/>
                    <Route path="/orders/:orderid" component={Order}/>
                    <Route path="/userorders" component={User_Orders}/>
                    <Route path="/adminorders" component={Total_Orders}/>
                    <Route path="/detailArtist/:name" component={ArtistAccount}/>
                    
                    
            </Router>
        </div>
    )
}



export default App;